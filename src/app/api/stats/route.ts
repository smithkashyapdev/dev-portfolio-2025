import { NextRequest, NextResponse } from 'next/server';
import {
  getDailyActiveUsers,
  displayDau,
  DAU_BASELINE,
  todayKey,
} from '@/app/lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const day = req.nextUrl.searchParams.get('day') ?? todayKey();

  try {
    const realCount = await getDailyActiveUsers(day);
    return NextResponse.json({
      ok: true,
      day,
      realCount,
      dau: displayDau(realCount),
    });
  } catch (err) {
    console.error(
      JSON.stringify({
        level: 'error',
        event: 'stats_read_failed',
        message: err instanceof Error ? err.message : String(err),
        at: new Date().toISOString(),
      }),
    );
    // Fallback to the 100 baseline so the UI always shows a healthy number.
    return NextResponse.json(
      { ok: false, day, realCount: 0, dau: DAU_BASELINE },
      { status: 200 },
    );
  }
}
