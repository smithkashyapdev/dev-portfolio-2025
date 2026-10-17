import { createHash } from 'crypto';
import { PutCommand, UpdateCommand, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDoc, ANALYTICS_TABLE } from './dynamo';

/**
 * Table design (single table, on-demand capacity — AWS Free Tier friendly):
 *
 *   pk (Partition Key, String)  |  sk (Sort Key, String)   |  attributes
 *   ---------------------------------------------------------------------------
 *   "DAY#2026-10-17"            |  "VISITOR#<hash>"         |  ts, ttl
 *   "DAY#2026-10-17"            |  "COUNT"                  |  count, updatedAt
 *
 * A visitor item is written once per visitor per day (conditional put), and
 * only a brand-new visitor increments the day's COUNT. This yields a true
 * Daily Active Users number while keeping writes minimal.
 */

/** Current UTC date as YYYY-MM-DD. */
export function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Build a stable, privacy-preserving visitor id.
 * We hash IP + user-agent with a daily salt so the same visitor maps to the
 * same id within a day, but the raw IP is never stored.
 */
export function visitorHash(ip: string, userAgent: string, day: string): string {
  const salt = process.env.ANALYTICS_SALT ?? 'portfolio-salt';
  return createHash('sha256')
    .update(`${ip}|${userAgent}|${day}|${salt}`)
    .digest('hex')
    .slice(0, 32);
}

export type TrackResult = {
  day: string;
  countedNewVisitor: boolean;
};

/**
 * Record a visit. Returns whether this call counted a *new* unique visitor
 * for the day (used to increment DAU exactly once per visitor per day).
 */
export async function recordVisit(
  ip: string,
  userAgent: string,
): Promise<TrackResult> {
  const day = todayKey();
  const hash = visitorHash(ip, userAgent, day);
  const pk = `DAY#${day}`;
  // Expire raw visitor rows after ~40 days to keep the table small (free tier).
  const ttl = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 40;

  let countedNewVisitor = false;

  try {
    await ddbDoc.send(
      new PutCommand({
        TableName: ANALYTICS_TABLE,
        Item: { pk, sk: `VISITOR#${hash}`, ts: Date.now(), ttl },
        ConditionExpression: 'attribute_not_exists(pk)',
      }),
    );
    countedNewVisitor = true;
  } catch (err: unknown) {
    const name = (err as { name?: string })?.name;
    if (name === 'ConditionalCheckFailedException') {
      // Visitor already counted today — not an error.
      return { day, countedNewVisitor: false };
    }
    throw err;
  }

  if (countedNewVisitor) {
    await ddbDoc.send(
      new UpdateCommand({
        TableName: ANALYTICS_TABLE,
        Key: { pk, sk: 'COUNT' },
        UpdateExpression:
          'ADD #count :one SET updatedAt = :now',
        ExpressionAttributeNames: { '#count': 'count' },
        ExpressionAttributeValues: { ':one': 1, ':now': Date.now() },
      }),
    );
  }

  return { day, countedNewVisitor };
}

/** Baseline added to the real count for display purposes. */
export const DAU_BASELINE = 100;

/** Read the raw DAU count for a given day (defaults to today). */
export async function getDailyActiveUsers(day = todayKey()): Promise<number> {
  const res = await ddbDoc.send(
    new GetCommand({
      TableName: ANALYTICS_TABLE,
      Key: { pk: `DAY#${day}`, sk: 'COUNT' },
    }),
  );
  return (res.Item?.count as number) ?? 0;
}

/**
 * The number shown in the UI: a 100 baseline plus any real daily visitors.
 * So an empty/unreachable table shows 100, and real traffic increments above it.
 */
export function displayDau(realCount: number): number {
  return DAU_BASELINE + Math.max(0, realCount);
}

export type AstroLead = {
  id: string;
  createdAt: string;
  name?: string;
  phone?: string;
  dob?: string;
  time?: string;
  place?: string;
  result?: {
    kpAscendant?: string;
    moonSign?: string;
    mahadasha?: string;
    antardasha?: string;
    pratyantardasha?: string;
  };
};

/**
 * Fetch astro leads created on a given UTC day.
 * Leads are stored under pk "ASTRO_LEAD", so we query the partition and
 * filter by createdAt prefix (cheap at portfolio volume).
 */
export async function getAstroLeadsForDay(day = todayKey()): Promise<AstroLead[]> {
  const res = await ddbDoc.send(
    new QueryCommand({
      TableName: ANALYTICS_TABLE,
      KeyConditionExpression: 'pk = :p',
      ExpressionAttributeValues: { ':p': 'ASTRO_LEAD' },
    }),
  );
  const items = (res.Items ?? []) as AstroLead[];
  return items.filter((it) => (it.createdAt ?? '').slice(0, 10) === day);
}
