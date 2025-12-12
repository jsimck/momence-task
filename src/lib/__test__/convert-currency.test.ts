import { describe, expect, it } from 'vitest';

import type { Currency } from '../../types';
import { convertCurrency } from '../convert-currency';

describe('convertCurrency', () => {
  const mockGetCurrency = (code: string): Currency | undefined => {
    const currencies: Record<string, Currency> = {
      CZK: {
        country: 'Czech Republic',
        currency: 'koruna',
        amount: 1,
        code: 'CZK',
        rate: 1,
      },
      EUR: {
        country: 'EMU',
        currency: 'euro',
        amount: 1,
        code: 'EUR',
        rate: 24.22,
      },
      USD: {
        country: 'USA',
        currency: 'dollar',
        amount: 1,
        code: 'USD',
        rate: 20.674,
      },
      JPY: {
        country: 'Japan',
        currency: 'yen',
        amount: 100,
        code: 'JPY',
        rate: 13.291,
      },
      HUF: {
        country: 'Hungary',
        currency: 'forint',
        amount: 100,
        code: 'HUF',
        rate: 6.309,
      },
    };

    return currencies[code];
  };

  it('should convert between currencies with same amount', () => {
    const result = convertCurrency(100, 'EUR', 'USD', mockGetCurrency);

    // 100 EUR = 100 * 24.22 / 20.674 ≈ 117.15 USD
    expect(result).toBeCloseTo(117.15, 2);
  });

  it('should convert from CZK to EUR', () => {
    const result = convertCurrency(100, 'CZK', 'EUR', mockGetCurrency);

    // 100 CZK = 100 * 1 / 24.22 ≈ 4.13 EUR
    expect(result).toBeCloseTo(4.13, 2);
  });

  it('should convert from EUR to CZK', () => {
    const result = convertCurrency(100, 'EUR', 'CZK', mockGetCurrency);

    // 100 EUR = 100 * 24.22 / 1 = 2422 CZK
    expect(result).toBe(2422);
  });

  it('should handle currencies with different amounts (JPY)', () => {
    const result = convertCurrency(100, 'USD', 'JPY', mockGetCurrency);

    // 100 USD = 100 * 20.674 / (13.291/100) ≈ 15554.9 JPY
    expect(result).toBeCloseTo(15554.9, 1);
  });

  it('should handle currencies with different amounts (HUF)', () => {
    const result = convertCurrency(100, 'EUR', 'HUF', mockGetCurrency);

    // 100 EUR = 100 * 24.22 / (6.309/100) ≈ 38389.6 HUF
    expect(result).toBeCloseTo(38389.6, 1);
  });

  it('should return 0 when from currency is not found', () => {
    const result = convertCurrency(100, 'XXX', 'EUR', mockGetCurrency);

    expect(result).toBe(0);
  });

  it('should return 0 when to currency is not found', () => {
    const result = convertCurrency(100, 'EUR', 'XXX', mockGetCurrency);

    expect(result).toBe(0);
  });

  it('should return 0 when both currencies are not found', () => {
    const result = convertCurrency(100, 'XXX', 'YYY', mockGetCurrency);

    expect(result).toBe(0);
  });

  it('should handle zero amount', () => {
    const result = convertCurrency(0, 'EUR', 'USD', mockGetCurrency);

    expect(result).toBe(0);
  });

  it('should handle negative amount', () => {
    const result = convertCurrency(-100, 'EUR', 'USD', mockGetCurrency);

    expect(result).toBeCloseTo(-117.15, 2);
  });

  it('should handle same currency conversion', () => {
    const result = convertCurrency(100, 'EUR', 'EUR', mockGetCurrency);

    expect(result).toBe(100);
  });
});
