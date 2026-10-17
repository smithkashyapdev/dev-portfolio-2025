import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

/**
 * Shared DynamoDB Document client.
 *
 * Credentials are resolved from the standard AWS environment variables
 * (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY) or the default provider chain.
 * On Vercel, set these as project environment variables.
 */
const region = process.env.AWS_REGION ?? 'ap-south-1';

const baseClient = new DynamoDBClient({ region });

export const ddbDoc = DynamoDBDocumentClient.from(baseClient, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

/** Name of the DynamoDB table used for analytics / DAU tracking. */
export const ANALYTICS_TABLE =
  process.env.ANALYTICS_TABLE ?? 'portfolio-analytics';
