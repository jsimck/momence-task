import { fromPartial } from '@total-typescript/shoehorn';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { MOCK_CNB_BASE_URL } from './test-constants';
import handler, { buildProxyUrl, parseCNBRatesResponse } from '../cnb-rates';

describe('cnb-rates', () => {
  describe('buildProxyUrl', () => {
    it('should build URL without query params', () => {
      const req = fromPartial<VercelRequest>({});
      const url = buildProxyUrl(req);

      expect(url.toString()).toBe(MOCK_CNB_BASE_URL);
    });

    it('should pass query params into the reverse-proxy url', () => {
      const req = fromPartial<VercelRequest>({
        query: {
          date: '2024-01-01',
        },
      });

      const url = buildProxyUrl(req);

      expect(url.toString()).toBe(`${MOCK_CNB_BASE_URL}?date=2024-01-01`);
    });

    it('should throw error for invalid params', () => {
      const req = fromPartial<VercelRequest>({
        query: {
          date: Object.create(null),
        },
      });

      expect(() => buildProxyUrl(req)).toThrow(Error);
    });
  });

  describe('parseCNBRatesResponse', () => {
    it('should parse valid CNB rates response', () => {
      const text = `11 Dec 2025 #240
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|13.764
Brazil|real|100|BRL|3.800`;

      const result = parseCNBRatesResponse(text);

      expect(result.date).toBe('11 Dec 2025');
      expect(result.publishedCount).toBe(240);
      expect(result.rates).toHaveLength(2);
      expect(result.rates[0]).toEqual({
        country: 'Australia',
        currency: 'dollar',
        amount: 1,
        code: 'AUD',
        rate: 13.764,
      });
      expect(result.rates[1]).toEqual({
        country: 'Brazil',
        currency: 'real',
        amount: 100,
        code: 'BRL',
        rate: 3.8,
      });
    });

    it('should filter out invalid rate entries', () => {
      const text = `11 Dec 2025 #240
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|13.764
||||

Brazil|real|1|BRL|3.800`;

      const result = parseCNBRatesResponse(text);

      expect(result.rates).toHaveLength(2);
      expect(result.rates[0].code).toBe('AUD');
      expect(result.rates[1].code).toBe('BRL');
    });

    it('should handle empty rates', () => {
      const text = `11 Dec 2025 #240
Country|Currency|Amount|Code|Rate`;

      const result = parseCNBRatesResponse(text);

      expect(result.date).toBe('11 Dec 2025');
      expect(result.publishedCount).toBe(240);
      expect(result.rates).toHaveLength(0);
    });

    it('should handle missing publishedCount', () => {
      const text = `11 Dec 2025 #
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|13.764`;

      const result = parseCNBRatesResponse(text);

      expect(result.date).toBe('11 Dec 2025');
      expect(result.publishedCount).toBe(0);
      expect(result.rates).toHaveLength(1);
    });

    it('should trim whitespace from date', () => {
      const text = `  11 Dec 2025  #240
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|13.764`;

      const result = parseCNBRatesResponse(text);

      expect(result.date).toBe('11 Dec 2025');
    });
  });

  describe('handler', () => {
    let req: VercelRequest;
    let res: VercelResponse;
    let result: any;

    beforeEach(() => {
      result = undefined;
      req = fromPartial<VercelRequest>({
        method: 'GET',
      });
      res = fromPartial<VercelResponse>({
        status: vi.fn().mockReturnThis(),
        setHeader: vi.fn().mockReturnThis(),
        json: vi.fn(v => (result = v)),
        end: vi.fn(),
      });
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should return 200 for valid request and fetch correct rates', async () => {
      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      expect(result).toMatchInlineSnapshot(`
        {
          "date": "11 Dec 2025",
          "publishedCount": 240,
          "rates": [
            {
              "amount": 1,
              "code": "AUD",
              "country": "Australia",
              "currency": "dollar",
              "rate": 13.764,
            },
            {
              "amount": 1,
              "code": "BRL",
              "country": "Brazil",
              "currency": "real",
              "rate": 3.8,
            },
            {
              "amount": 1,
              "code": "BGN",
              "country": "Bulgaria",
              "currency": "lev",
              "rate": 12.35,
            },
            {
              "amount": 1,
              "code": "CAD",
              "country": "Canada",
              "currency": "dollar",
              "rate": 14.983,
            },
            {
              "amount": 1,
              "code": "CNY",
              "country": "China",
              "currency": "renminbi",
              "rate": 2.929,
            },
            {
              "amount": 1,
              "code": "DKK",
              "country": "Denmark",
              "currency": "krone",
              "rate": 3.243,
            },
            {
              "amount": 1,
              "code": "EUR",
              "country": "EMU",
              "currency": "euro",
              "rate": 24.22,
            },
            {
              "amount": 1,
              "code": "HKD",
              "country": "Hongkong",
              "currency": "dollar",
              "rate": 2.657,
            },
            {
              "amount": 100,
              "code": "HUF",
              "country": "Hungary",
              "currency": "forint",
              "rate": 6.309,
            },
            {
              "amount": 100,
              "code": "ISK",
              "country": "Iceland",
              "currency": "krona",
              "rate": 16.299,
            },
            {
              "amount": 1,
              "code": "XDR",
              "country": "IMF",
              "currency": "SDR",
              "rate": 28.163,
            },
            {
              "amount": 100,
              "code": "INR",
              "country": "India",
              "currency": "rupee",
              "rate": 22.891,
            },
            {
              "amount": 1000,
              "code": "IDR",
              "country": "Indonesia",
              "currency": "rupiah",
              "rate": 1.24,
            },
            {
              "amount": 1,
              "code": "ILS",
              "country": "Israel",
              "currency": "new shekel",
              "rate": 6.437,
            },
            {
              "amount": 100,
              "code": "JPY",
              "country": "Japan",
              "currency": "yen",
              "rate": 13.291,
            },
            {
              "amount": 1,
              "code": "MYR",
              "country": "Malaysia",
              "currency": "ringgit",
              "rate": 5.03,
            },
            {
              "amount": 1,
              "code": "MXN",
              "country": "Mexico",
              "currency": "peso",
              "rate": 1.138,
            },
            {
              "amount": 1,
              "code": "NZD",
              "country": "New Zealand",
              "currency": "dollar",
              "rate": 12.019,
            },
            {
              "amount": 1,
              "code": "NOK",
              "country": "Norway",
              "currency": "krone",
              "rate": 2.048,
            },
            {
              "amount": 100,
              "code": "PHP",
              "country": "Philippines",
              "currency": "peso",
              "rate": 35.04,
            },
            {
              "amount": 1,
              "code": "PLN",
              "country": "Poland",
              "currency": "zloty",
              "rate": 5.731,
            },
            {
              "amount": 1,
              "code": "RON",
              "country": "Romania",
              "currency": "leu",
              "rate": 4.758,
            },
            {
              "amount": 1,
              "code": "SGD",
              "country": "Singapore",
              "currency": "dollar",
              "rate": 15.989,
            },
            {
              "amount": 1,
              "code": "ZAR",
              "country": "South Africa",
              "currency": "rand",
              "rate": 1.221,
            },
            {
              "amount": 100,
              "code": "KRW",
              "country": "South Korea",
              "currency": "won",
              "rate": 1.406,
            },
            {
              "amount": 1,
              "code": "SEK",
              "country": "Sweden",
              "currency": "krona",
              "rate": 2.233,
            },
            {
              "amount": 1,
              "code": "CHF",
              "country": "Switzerland",
              "currency": "franc",
              "rate": 25.955,
            },
            {
              "amount": 100,
              "code": "THB",
              "country": "Thailand",
              "currency": "baht",
              "rate": 65.106,
            },
            {
              "amount": 100,
              "code": "TRY",
              "country": "Turkey",
              "currency": "lira",
              "rate": 48.512,
            },
            {
              "amount": 1,
              "code": "GBP",
              "country": "United Kingdom",
              "currency": "pound",
              "rate": 27.679,
            },
            {
              "amount": 1,
              "code": "USD",
              "country": "USA",
              "currency": "dollar",
              "rate": 20.674,
            },
          ],
        }
      `);
    });

    it('should return 500 for invalid response', async () => {
      vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Mocked error'));

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
      expect(result).toStrictEqual({ message: 'Failed to fetch CNB data' });
    });
  });
});
