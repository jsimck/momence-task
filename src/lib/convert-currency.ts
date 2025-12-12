import type { Currency } from '../types';

/**
 * Helper function to convert currency amounts
 */
export function convertCurrency(
  amount: number,
  fromCode: string,
  toCode: string,
  getCurrency: (code: string) => Currency | undefined,
): number {
  const from = getCurrency(fromCode);
  const to = getCurrency(toCode);

  if (!from || !to) {
    return 0;
  }

  const fromNormalizedRate = from.rate / from.amount;
  const toNormalizedRate = to.rate / to.amount;

  return (amount * fromNormalizedRate) / toNormalizedRate;
}
