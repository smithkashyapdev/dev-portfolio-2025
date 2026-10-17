import swisseph from 'swisseph';
import { resolvePlace } from './geo';

/**
 * Real KP / Vedic astrology engine using Swiss Ephemeris (sidereal, Lahiri).
 *
 * Computes:
 *  - Ascendant (Lagna) sign & KP star/sub lord
 *  - Moon sign (rashi) + nakshatra
 *  - D2 (Hora) wealth-chart sign
 *  - Vimshottari Mahadasha / Antardasha / Pratyantardasha (current)
 *  - A 7-day good/average/bad outlook (Moon-transit heuristic)
 *
 * NOTE: positions are astronomically accurate. The 7-day day-quality score is a
 * simplified heuristic (Moon's angle to natal Moon), not a full predictive
 * system — a complete reading is offered via booking.
 */

export type AstroInput = {
  name: string;
  phone: string; // mandatory contact number
  dob: string; // YYYY-MM-DD
  time: string; // HH:mm (24h, local birth time)
  place: string;
  lat?: number; // optional exact birth latitude
  lon?: number; // optional exact birth longitude
  tz?: number; // optional UTC offset in hours (e.g. 5.5 for IST)
};

export type DayForecast = {
  date: string;
  label: string;
  good: number;
  average: number;
  bad: number;
  verdict: 'Good' | 'Average' | 'Challenging';
};

export type AstroResult = {
  kpAscendant: string;
  moonSign: string;
  nakshatra: string;
  kpStarLord: string; // nakshatra lord of the ascendant
  kpSubLord: string; // KP sub-lord of the ascendant
  d2Insight: string;
  d2Sign: string;
  mahadasha: string;
  antardasha: string;
  pratyantardasha: string;
  summary: string;
  next7Days: DayForecast[];
  disclaimer: string;
  place: string;
};

const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Vimshottari dasha sequence & years (total 120).
const DASHA_LORDS = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
const DASHA_YEARS: Record<string, number> = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17,
};
// 27 nakshatras, each ruled (in order) by the dasha lords cycling.
const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya',
  'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana',
  'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
];
const YEAR_DAYS = 365.25;

function signOf(lon: number): string {
  return SIGNS[Math.floor((((lon % 360) + 360) % 360) / 30)];
}

function nakshatraIndex(moonLon: number): number {
  return Math.floor((((moonLon % 360) + 360) % 360) / (360 / 27));
}

/** D2 (Hora) sign: first half of a sign -> Leo or Cancer by odd/even sign rule. */
function horaSign(lon: number): string {
  const sign = Math.floor((((lon % 360) + 360) % 360) / 30); // 0-based
  const degInSign = (((lon % 360) + 360) % 360) % 30;
  const oddSign = sign % 2 === 0; // Aries(0) is odd in 1-based terms
  // Classical Hora: odd sign first half -> Sun (Leo), second half -> Moon (Cancer); reversed for even.
  if (oddSign) return degInSign < 15 ? 'Leo' : 'Cancer';
  return degInSign < 15 ? 'Cancer' : 'Leo';
}

type SwePos = { longitude: number };

function calcUT(jd: number, body: number, flag: number): Promise<SwePos> {
  return new Promise((resolve, reject) => {
    swisseph.swe_calc_ut(jd, body, flag, (res: unknown) => {
      const r = res as { longitude?: number; error?: string };
      if (typeof r.longitude === 'number') resolve({ longitude: r.longitude });
      else reject(new Error(r.error ?? 'swe_calc_ut failed'));
    });
  });
}

function julday(y: number, m: number, d: number, utHours: number): Promise<number> {
  return new Promise((resolve) => {
    swisseph.swe_julday(y, m, d, utHours, swisseph.SE_GREG_CAL, (jd: number) => resolve(jd));
  });
}

function houses(jd: number, lat: number, lon: number): Promise<number> {
  return new Promise((resolve, reject) => {
    swisseph.swe_houses_ex(jd, swisseph.SEFLG_SIDEREAL, lat, lon, 'P', (res: unknown) => {
      const r = res as { ascendant?: number; error?: string };
      if (typeof r.ascendant === 'number') resolve(r.ascendant);
      else reject(new Error(r.error ?? 'swe_houses failed'));
    });
  });
}

/** Compute current Vimshottari MD / AD / PD from natal Moon longitude. */
function vimshottari(moonLon: number, birthJd: number, nowJd: number) {
  const nakSize = 360 / 27;
  const idx = nakshatraIndex(moonLon);
  const startLord = DASHA_LORDS[idx % 9];
  // Fraction of the nakshatra already traversed at birth.
  const posInNak = ((((moonLon % 360) + 360) % 360) % nakSize) / nakSize;

  // Build the MD timeline (in days) starting from birth.
  const elapsedSinceBirth = nowJd - birthJd; // days

  // Balance of the starting MD at birth.
  let lordPos = DASHA_LORDS.indexOf(startLord);
  const remainingFirst = DASHA_YEARS[startLord] * (1 - posInNak) * YEAR_DAYS;

  // Walk MDs until we reach "now".
  let cursor = 0; // days from birth at start of current MD
  let mdLord = startLord;
  let mdLen = remainingFirst;
  while (cursor + mdLen <= elapsedSinceBirth) {
    cursor += mdLen;
    lordPos = (lordPos + 1) % 9;
    mdLord = DASHA_LORDS[lordPos];
    mdLen = DASHA_YEARS[mdLord] * YEAR_DAYS;
  }
  const intoMd = elapsedSinceBirth - cursor; // days into current MD

  // Antardasha: sub-periods proportional to each lord's years, order starting from MD lord.
  const adOrder = Array.from({ length: 9 }, (_, i) => DASHA_LORDS[(lordPos + i) % 9]);
  let adCursor = 0;
  let adLord = mdLord;
  let adLen = (DASHA_YEARS[mdLord] / 120) * mdLen; // proportion
  let adStartIndex = 0;
  for (let i = 0; i < 9; i++) {
    const lord = adOrder[i];
    const len = (DASHA_YEARS[lord] / 120) * mdLen;
    if (adCursor + len > intoMd) {
      adLord = lord;
      adLen = len;
      adStartIndex = i;
      break;
    }
    adCursor += len;
  }
  const intoAd = intoMd - adCursor;

  // Pratyantardasha within the AD.
  const pdOrder = Array.from({ length: 9 }, (_, i) => DASHA_LORDS[(lordPos + adStartIndex + i) % 9]);
  let pdCursor = 0;
  let pdLord = adLord;
  for (let i = 0; i < 9; i++) {
    const lord = pdOrder[i];
    const len = (DASHA_YEARS[lord] / 120) * adLen;
    if (pdCursor + len > intoAd) {
      pdLord = lord;
      break;
    }
    pdCursor += len;
  }

  return { mahadasha: mdLord, antardasha: adLord, pratyantardasha: pdLord };
}

export async function generateAstro(input: AstroInput): Promise<AstroResult> {
  // Prefer exact coordinates sent from the client's city picker; else resolve by name.
  const geo =
    typeof input.lat === 'number' && typeof input.lon === 'number'
      ? { lat: input.lat, lon: input.lon, tz: input.tz ?? 5.5, matched: input.place }
      : resolvePlace(input.place);

  const [y, m, d] = input.dob.split('-').map(Number);
  const [hh, mm] = input.time.split(':').map(Number);
  const utHours = hh + mm / 60 - geo.tz; // local -> UT

  swisseph.swe_set_sid_mode(swisseph.SE_SIDM_LAHIRI, 0, 0);
  const flag = swisseph.SEFLG_SWIEPH | swisseph.SEFLG_SIDEREAL;

  const birthJd = await julday(y, m, d, utHours < 0 ? utHours + 24 : utHours);
  // If UT rolled to the previous day, adjust the Julian day.
  const jd = utHours < 0 ? birthJd - 1 : birthJd;

  const moon = await calcUT(jd, swisseph.SE_MOON, flag);
  const ascLon = await houses(jd, geo.lat, geo.lon);

  const moonSign = signOf(moon.longitude);
  const kpAscendant = signOf(ascLon);
  const nakIdx = nakshatraIndex(moon.longitude);
  const nakshatra = NAKSHATRAS[nakIdx];

  // KP lords for the ascendant degree.
  const ascNakIdx = nakshatraIndex(ascLon);
  const kpStarLord = DASHA_LORDS[ascNakIdx % 9];
  // Sub-lord: subdivide the nakshatra span by dasha-year proportions from the star lord.
  const kpSubLord = subLord(ascLon, ascNakIdx);

  const d2Sign = horaSign(moon.longitude);
  const d2Insight =
    d2Sign === 'Leo'
      ? 'Hora (D2) in Sun’s hora: wealth grows through initiative, authority roles and self-driven effort.'
      : 'Hora (D2) in Moon’s hora: wealth grows through nurturing fields, public dealing and steady saving.';

  const now = new Date();
  const nowJd = await julday(
    now.getUTCFullYear(),
    now.getUTCMonth() + 1,
    now.getUTCDate(),
    now.getUTCHours() + now.getUTCMinutes() / 60,
  );

  const { mahadasha, antardasha, pratyantardasha } = vimshottari(moon.longitude, jd, nowJd);

  // 7-day outlook: day quality from transiting Moon's angle to natal Moon.
  const next7Days = await buildForecast(moon.longitude, now, flag);
  const best = [...next7Days].sort((a, b) => b.good - a.good)[0];

  const summary =
    `Lagna ${kpAscendant}, Moon in ${moonSign} (${nakshatra}). Current Vimshottari period: ` +
    `${mahadasha} › ${antardasha} › ${pratyantardasha}. Your most favourable day this week ` +
    `looks like ${best.label} (${best.date}). A full KP + divisional reading covers remedies and precise timing.`;

  return {
    kpAscendant,
    moonSign,
    nakshatra,
    kpStarLord,
    kpSubLord,
    d2Insight,
    d2Sign,
    mahadasha,
    antardasha,
    pratyantardasha,
    summary,
    next7Days,
    place: geo.matched,
    disclaimer:
      'Chart positions are astronomically accurate (sidereal/Lahiri). The 7-day score is a simplified heuristic — book for a full reading.',
  };
}

/** KP sub-lord of a longitude within its nakshatra. */
function subLord(lon: number, nakIdx: number): string {
  const nakSize = 360 / 27;
  const posInNak = ((((lon % 360) + 360) % 360) % nakSize) / nakSize; // 0..1
  const startLordPos = nakIdx % 9;
  let acc = 0;
  for (let i = 0; i < 9; i++) {
    const lord = DASHA_LORDS[(startLordPos + i) % 9];
    const frac = DASHA_YEARS[lord] / 120;
    if (acc + frac >= posInNak) return lord;
    acc += frac;
  }
  return DASHA_LORDS[startLordPos];
}

async function buildForecast(natalMoonLon: number, start: Date, flag: number): Promise<DayForecast[]> {
  const out: DayForecast[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    const jd = await julday(
      day.getUTCFullYear(),
      day.getUTCMonth() + 1,
      day.getUTCDate(),
      12, // midday
    );
    const tMoon = await calcUT(jd, swisseph.SE_MOON, flag);
    // Angular separation between transiting and natal Moon.
    const sep = Math.abs(((tMoon.longitude - natalMoonLon) % 360 + 360) % 360);
    const angle = sep > 180 ? 360 - sep : sep;
    // Favourable near trines/sextiles (60/120), tense near squares/opposition (90/180).
    const favour = Math.cos((angle * Math.PI) / 60); // smooth wave
    const good = Math.round(50 + favour * 35); // ~15..85
    const clampedGood = Math.max(15, Math.min(88, good));
    const bad = Math.max(0, Math.round((100 - clampedGood) * 0.55));
    const average = Math.max(0, 100 - clampedGood - bad);
    const verdict: DayForecast['verdict'] =
      clampedGood >= 60 ? 'Good' : clampedGood >= 40 ? 'Average' : 'Challenging';
    out.push({
      date: day.toISOString().slice(0, 10),
      label: DAY_LABELS[day.getDay()],
      good: clampedGood,
      average,
      bad,
      verdict,
    });
  }
  return out;
}
