import type { VercelRequest, VercelResponse } from '@vercel/node';

import { env } from './env.server';
import type { CNBRatesResponse, Rate } from '../src/types';

/**
 * Helper for building the proxy URL with query params
 */
export function buildProxyUrl(req: VercelRequest) {
  const url = new URL(env.CNB_RATES_BASE_URL);
  const queryParams = new URLSearchParams(req.query as Record<string, string>);
  url.search = queryParams.toString();

  return url;
}

/**
 * Parse the CNB rates response into a CNBRatesResponse object.
 */
export function parseCNBRatesResponse(text: string): CNBRatesResponse {
  const [meta, ...data] = text.split('\n');
  const [_, ...rates] = data;
  const [date, publishedCount] = meta.split('#');

  return {
    date,
    publishedCount: Number.parseInt(publishedCount) || 0,
    rates: rates.map((line): Rate => {
      const [country, currency, amount, code, rate] = line.split('|');

      return {
        country,
        currency,
        amount: Number.parseInt(amount),
        code,
        rate: Number.parseFloat(rate),
      };
    }),
  };
}

/**
 * Since CNB has cors restrictions, we need to create dumb reverse
 * proxy to bypass them.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();

    return;
  }

  try {
    const url = buildProxyUrl(req);
    const response = await fetch(url.toString());
    const text = await response.text();

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(parseCNBRatesResponse(text));
  } catch {
    res.status(500).json({ message: 'Failed to fetch CNB data' });
  }
}
