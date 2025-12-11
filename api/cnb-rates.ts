import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Since CNB has cors restrictions, we need to create dumb reverse
 * proxy to bypass them.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch(
      'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt',
    );

    console.log(response);

    const text = await response.text();

    res.status(200).json(text);
  } catch {
    res.status(500).json({ error: 'Failed to fetch CNB data' });
  }
}
