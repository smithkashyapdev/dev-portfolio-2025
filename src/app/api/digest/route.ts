import { NextRequest, NextResponse } from 'next/server';
import { sendTelegram } from '@/app/lib/telegram';
import {
  todayKey,
  getDailyActiveUsers,
  displayDau,
  getAstroLeadsForDay,
} from '@/app/lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Builds a daily analytics digest and sends it to Telegram.
 * Protected by DIGEST_SECRET (passed as ?secret=... or Authorization: Bearer).
 * Intended to be triggered by Vercel Cron once a day.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.DIGEST_SECRET;
  const provided =
    req.nextUrl.searchParams.get('secret') ??
    req.headers.get('authorization')?.replace('Bearer ', '');

  if (secret && provided !== secret) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const day = todayKey();

  let realDau = 0;
  let leads: Awaited<ReturnType<typeof getAstroLeadsForDay>> = [];
  try {
    realDau = await getDailyActiveUsers(day);
    leads = await getAstroLeadsForDay(day);
  } catch (err) {
    console.error('digest data fetch failed', err instanceof Error ? err.message : err);
  }

  const lines: string[] = [];
  lines.push(`<b>📊 Portfolio Daily Digest</b>`);
  lines.push(`🗓️ ${day}`);
  lines.push('');
  lines.push(`👥 <b>Daily Active Users:</b> ${displayDau(realDau)} (real: ${realDau})`);
  lines.push(`🔮 <b>Astro leads today:</b> ${leads.length}`);

  if (leads.length) {
    lines.push('');
    lines.push('<b>New astro leads</b>');
    leads.slice(0, 15).forEach((l, i) => {
      const r = l.result ?? {};
      const chart = [r.kpAscendant && `Asc ${r.kpAscendant}`, r.moonSign && `Moon ${r.moonSign}`]
        .filter(Boolean)
        .join(' · ');
      const dasha = [r.mahadasha, r.antardasha, r.pratyantardasha].filter(Boolean).join(' › ');
      lines.push(
        `${i + 1}. <b>${escapeHtml(l.name ?? 'Unknown')}</b> — ${escapeHtml(l.phone ?? 'no phone')}`,
      );
      lines.push(
        `   📍 ${escapeHtml(l.place ?? '-')} | 🎂 ${escapeHtml(l.dob ?? '-')} ${escapeHtml(l.time ?? '')}`,
      );
      if (chart || dasha) lines.push(`   ${escapeHtml(chart)}${dasha ? ` | ${escapeHtml(dasha)}` : ''}`);
    });
    if (leads.length > 15) lines.push(`…and ${leads.length - 15} more.`);
  }

  const message = lines.join('\n');
  const sent = await sendTelegram(message);

  return NextResponse.json({ ok: true, sent, day, dau: displayDau(realDau), leads: leads.length });
}
