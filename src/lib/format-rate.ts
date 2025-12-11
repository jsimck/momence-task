/**
 * CNB rates are per "amount" units, so we normalize to per 1 unit
 */
export function formatRate(rate: number, amount: number): string {
  const normalizedRate = rate / amount;

  return normalizedRate.toFixed(4);
}
