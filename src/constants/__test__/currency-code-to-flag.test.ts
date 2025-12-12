import { describe, expect, it } from 'vitest';

import {
  CurrencyCodeToFlag,
  getFlagByCode,
  getFlagImageByCode,
} from '../currency-code-to-flag';

describe('currency-code-to-flag', () => {
  describe('getFlagByCode', () => {
    it('should return correct flag code for valid currency codes', () => {
      expect(getFlagByCode('USD')).toBe('us');
      expect(getFlagByCode('EUR')).toBe('eu');
      expect(getFlagByCode('GBP')).toBe('gb');
      expect(getFlagByCode('JPY')).toBe('jp');
      expect(getFlagByCode('CZK')).toBe('cz');
    });

    it('should return fallback flag code for invalid currency code', () => {
      expect(getFlagByCode('XXX')).toBeNull();
      expect(getFlagByCode('INVALID')).toBeNull();
      expect(getFlagByCode('')).toBeNull();
    });

    it('should handle all currency codes in CurrencyCodeToFlag', () => {
      Object.keys(CurrencyCodeToFlag).forEach(code => {
        const flagCode = getFlagByCode(code);

        expect(flagCode).not.toBeNull();
        expect(typeof flagCode).toBe('string');
        expect(flagCode?.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getFlagImageByCode', () => {
    it('should return flagcdn URL for valid currency codes', () => {
      expect(getFlagImageByCode('USD')).toBe('https://flagcdn.com/us.svg');
      expect(getFlagImageByCode('EUR')).toBe('https://flagcdn.com/eu.svg');
      expect(getFlagImageByCode('GBP')).toBe('https://flagcdn.com/gb.svg');
      expect(getFlagImageByCode('JPY')).toBe('https://flagcdn.com/jp.svg');
      expect(getFlagImageByCode('CZK')).toBe('https://flagcdn.com/cz.svg');
    });

    it('should return fallback image for invalid currency code', () => {
      expect(getFlagImageByCode('XXX')).toBe('/flag-fallback.svg');
      expect(getFlagImageByCode('INVALID')).toBe('/flag-fallback.svg');
      expect(getFlagImageByCode('')).toBe('/flag-fallback.svg');
    });

    it('should handle all currency codes in CurrencyCodeToFlag', () => {
      Object.keys(CurrencyCodeToFlag).forEach(code => {
        const imageUrl = getFlagImageByCode(code);

        expect(imageUrl).toMatch(/^https:\/\/flagcdn\.com\/[a-z]{2}\.svg$/);
      });
    });
  });

  describe('CurrencyCodeToFlag', () => {
    it('should be frozen object', () => {
      expect(Object.isFrozen(CurrencyCodeToFlag)).toBe(true);
    });

    it('should contain expected currency codes', () => {
      const expectedCodes = [
        'AUD',
        'BRL',
        'BGN',
        'CAD',
        'CNY',
        'DKK',
        'EUR',
        'HKD',
        'HUF',
        'ISK',
        'INR',
        'IDR',
        'ILS',
        'JPY',
        'MYR',
        'MXN',
        'NZD',
        'NOK',
        'PHP',
        'PLN',
        'RON',
        'SGD',
        'ZAR',
        'KRW',
        'SEK',
        'CHF',
        'CZK',
        'THB',
        'TRY',
        'GBP',
        'USD',
      ];

      expectedCodes.forEach(code => {
        expect(CurrencyCodeToFlag).toHaveProperty(code);
      });
    });
  });
});
