import { NextRequest, NextResponse } from 'next/server';
import { recordVisit } from '@/app/lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Extract the best-effort client IP from proxy headers. */
function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const userAgent = req.headers.get('user-agent') ?? 'unknown';

  try {
    const result = await recordVisit(ip, userAgent);

    // Structured log — visible in Vercel function logs for monitoring.
    console.log(
      JSON.stringify({
        level: 'info',
        event: 'visit_tracked',
        day: result.day,
        countedNewVisitor: result.countedNewVisitor,
        ua: userAgent.slice(0, 120),
        at: new Date().toISOString(),
      }),
    );

    return NextResponse.json({ ok: true, day: result.day });
  } catch (err) {
    console.error(
      JSON.stringify({
        level: 'error',
        event: 'visit_track_failed',
        message: err instanceof Error ? err.message : String(err),
        at: new Date().toISOString(),
      }),
    );
    // Never break the page because analytics failed.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
