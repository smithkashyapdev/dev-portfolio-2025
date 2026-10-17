import { NextRequest, NextResponse } from 'next/server';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDoc, ANALYTICS_TABLE } from '@/app/lib/dynamo';
import { generateAstro, AstroInput } from '@/app/lib/astro-engine';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function isValid(input: Partial<AstroInput>): input is AstroInput {
  const phoneDigits = (input.phone ?? '').replace(/\D/g, '');
  return Boolean(
    input.name?.trim() &&
      phoneDigits.length >= 10 &&
      input.dob &&
      /^\d{4}-\d{2}-\d{2}$/.test(input.dob) &&
      input.time &&
      /^\d{2}:\d{2}$/.test(input.time) &&
      input.place?.trim(),
  );
}

export async function POST(req: NextRequest) {
  let body: Partial<AstroInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const input: Partial<AstroInput> = {
    name: body.name?.toString().slice(0, 80),
    phone: body.phone?.toString().slice(0, 20),
    dob: body.dob?.toString().slice(0, 10),
    time: body.time?.toString().slice(0, 5),
    place: body.place?.toString().slice(0, 120),
    lat: typeof body.lat === 'number' ? body.lat : undefined,
    lon: typeof body.lon === 'number' ? body.lon : undefined,
    tz: typeof body.tz === 'number' ? body.tz : undefined,
  };

  if (!isValid(input)) {
    return NextResponse.json(
      { ok: false, error: 'Please provide a valid name, mobile number, date, time and place.' },
      { status: 422 },
    );
  }

  let result;
  try {
    result = await generateAstro(input);
  } catch (err) {
    console.error(
      JSON.stringify({
        level: 'error',
        event: 'astro_calc_failed',
        message: err instanceof Error ? err.message : String(err),
      }),
    );
    return NextResponse.json(
      { ok: false, error: 'Could not calculate the chart. Please check the details and try again.' },
      { status: 500 },
    );
  }
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = new Date().toISOString();

  // ---- Persist the lead + inputs + generated result to DynamoDB ----
  try {
    await ddbDoc.send(
      new PutCommand({
        TableName: ANALYTICS_TABLE,
        Item: {
          pk: 'ASTRO_LEAD',
          sk: `LEAD#${id}`,
          id,
          createdAt,
          name: input.name,
          phone: input.phone,
          dob: input.dob,
          time: input.time,
          place: input.place,
          ip: getClientIp(req),
          userAgent: (req.headers.get('user-agent') ?? '').slice(0, 160),
          result, // full generated preview for your records
        },
      }),
    );

    console.log(
      JSON.stringify({
        level: 'info',
        event: 'astro_lead_saved',
        id,
        place: input.place,
        at: createdAt,
      }),
    );
  } catch (err) {
    console.error(
      JSON.stringify({
        level: 'error',
        event: 'astro_lead_save_failed',
        message: err instanceof Error ? err.message : String(err),
        at: createdAt,
      }),
    );
    // Still return the preview so the UX isn't broken, but flag that it wasn't stored.
    return NextResponse.json({ ok: true, stored: false, id, result });
  }

  return NextResponse.json({ ok: true, stored: true, id, result });
}
