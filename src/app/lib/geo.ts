/**
 * Minimal built-in place → coordinates lookup.
 * Swiss Ephemeris needs latitude/longitude, not a city name.
 * Covers major Indian cities; falls back to a default when unknown.
 * `tz` is the UTC offset in hours (India Standard Time = +5.5).
 */
export type GeoPoint = { lat: number; lon: number; tz: number; matched: string };

const CITIES: Record<string, { lat: number; lon: number; tz: number }> = {
  patiala: { lat: 30.3398, lon: 76.3869, tz: 5.5 },
  chandigarh: { lat: 30.7333, lon: 76.7794, tz: 5.5 },
  amritsar: { lat: 31.634, lon: 74.8723, tz: 5.5 },
  ludhiana: { lat: 30.901, lon: 75.8573, tz: 5.5 },
  jalandhar: { lat: 31.326, lon: 75.5762, tz: 5.5 },
  delhi: { lat: 28.6139, lon: 77.209, tz: 5.5 },
  'new delhi': { lat: 28.6139, lon: 77.209, tz: 5.5 },
  gurgaon: { lat: 28.4595, lon: 77.0266, tz: 5.5 },
  gurugram: { lat: 28.4595, lon: 77.0266, tz: 5.5 },
  noida: { lat: 28.5355, lon: 77.391, tz: 5.5 },
  mumbai: { lat: 19.076, lon: 72.8777, tz: 5.5 },
  pune: { lat: 18.5204, lon: 73.8567, tz: 5.5 },
  bengaluru: { lat: 12.9716, lon: 77.5946, tz: 5.5 },
  bangalore: { lat: 12.9716, lon: 77.5946, tz: 5.5 },
  hyderabad: { lat: 17.385, lon: 78.4867, tz: 5.5 },
  chennai: { lat: 13.0827, lon: 80.2707, tz: 5.5 },
  kolkata: { lat: 22.5726, lon: 88.3639, tz: 5.5 },
  ahmedabad: { lat: 23.0225, lon: 72.5714, tz: 5.5 },
  jaipur: { lat: 26.9124, lon: 75.7873, tz: 5.5 },
  lucknow: { lat: 26.8467, lon: 80.9462, tz: 5.5 },
  indore: { lat: 22.7196, lon: 75.8577, tz: 5.5 },
  bhopal: { lat: 23.2599, lon: 77.4126, tz: 5.5 },
  patna: { lat: 25.5941, lon: 85.1376, tz: 5.5 },
  kochi: { lat: 9.9312, lon: 76.2673, tz: 5.5 },
  varanasi: { lat: 25.3176, lon: 82.9739, tz: 5.5 },
  dehradun: { lat: 30.3165, lon: 78.0322, tz: 5.5 },
  nagpur: { lat: 21.1458, lon: 79.0882, tz: 5.5 },
  surat: { lat: 21.1702, lon: 72.8311, tz: 5.5 },
  guwahati: { lat: 26.1445, lon: 91.7362, tz: 5.5 },
};

/** Resolve a free-text place string to coordinates. */
export function resolvePlace(place: string): GeoPoint {
  const q = place.trim().toLowerCase();
  // Try to match any known city name as a substring (e.g. "patiala punjab").
  for (const key of Object.keys(CITIES)) {
    if (q.includes(key)) {
      return { ...CITIES[key], matched: key };
    }
  }
  // Fallback: geographic centre of India, IST. (Approximate preview only.)
  return { lat: 22.5937, lon: 78.9629, tz: 5.5, matched: 'india (approx)' };
}
