import { s3 } from './s3-client';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const IP_HEADER_CANDIDATES = [
  'x-forwarded-for',
  'cf-connecting-ip',
  'true-client-ip',
  'x-real-ip',
  'x-client-ip',
  'x-cluster-client-ip',
  'forwarded',
] as const;

type HeadersLike = { get(name: string): string | null };

interface IpHeaderInfo {
  primaryIp: string;
  allSources: string;
}

export function collectIpHeaderValues(h: HeadersLike): IpHeaderInfo {
  let primaryIp = 'unknown';
  const parts: string[] = [];

  for (const name of IP_HEADER_CANDIDATES) {
    const raw = h.get(name);

    if (raw === null) {
      parts.push(`${name}=<none>`);
      continue;
    }

    parts.push(`${name}=${raw}`);

    let candidate: string | null = null;

    if (name === 'x-forwarded-for') {
      candidate = raw.split(',')[0]!.trim();
    } else if (name === 'forwarded') {
      const match = raw.match(/for="?([^;"]+)"?/i);
      candidate = match ? match[1] : null;
    } else {
      candidate = raw;
    }

    if (primaryIp === 'unknown' && candidate) {
      primaryIp = candidate;
    }
  }

  return {
    primaryIp,
    allSources: parts.join(' | '),
  };
}

async function readObjectAsString(bucket: string, key: string): Promise<string | null> {
  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));

    const body = await res.Body?.transformToString?.('utf-8');
    return body ?? '';
  } catch (err: unknown) {
    const e = err as { $metadata?: { httpStatusCode?: number } };

    if (e.$metadata?.httpStatusCode === 404) {
      return null;
    }

    throw err;
  }
}

export async function appendIpToS3(ip: string) {
  const bucket = process.env.S3_LOG_BUCKET!;
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const key = `ip-logs/${today}.txt`;

  const existing = await readObjectAsString(bucket, key);
  const line = `[${new Date().toISOString()}] ${ip}\n`;
  const newContent = (existing ?? '') + line;

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: newContent,
      ContentType: 'text/plain; charset=utf-8',
    }),
  );
}
