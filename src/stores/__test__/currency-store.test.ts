import { beforeEach, describe, expect, it } from 'vitest';

import type { Currency } from '../../types';
import { useCurrencyStore } from '../currency-store';

describe('currency-store', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useCurrencyStore.setState({
      rates: [],
      isLoading: true,
      isRefetching: false,
      isError: false,
      error: null,
      lastUpdated: null,
      fromCurrency: 'CZK',
      toCurrency: 'EUR',
      fromAmount: '',
      toAmount: '',
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = useCurrencyStore.getState();

      expect(state.rates).toEqual([]);
      expect(state.isLoading).toBe(true);
      expect(state.isRefetching).toBe(false);
      expect(state.isError).toBe(false);
      expect(state.error).toBe(null);
      expect(state.lastUpdated).toBe(null);
      expect(state.fromCurrency).toBe('CZK');
      expect(state.toCurrency).toBe('EUR');
      expect(state.fromAmount).toBe('');
      expect(state.toAmount).toBe('');
    });
  });

  describe('setRates', () => {
    it('should update rates and related state', () => {
      const mockRates: Currency[] = [
        {
          country: 'USA',
          currency: 'dollar',
          amount: 1,
          code: 'USD',
          rate: 20.674,
        },
        {
          country: 'EMU',
          currency: 'euro',
          amount: 1,
          code: 'EUR',
          rate: 24.22,
        },
      ];

      useCurrencyStore.getState().setRates({
        rates: mockRates,
        lastUpdated: '11 Dec 2025',
        isLoading: false,
        isError: false,
        isRefetching: false,
        error: null,
      });

      const state = useCurrencyStore.getState();

      expect(state.rates).toEqual(mockRates);
      expect(state.lastUpdated).toBe('11 Dec 2025');
      expect(state.isLoading).toBe(false);
      expect(state.isError).toBe(false);
    });

    it('should handle error state', () => {
      const error = new Error('Failed to fetch');

      useCurrencyStore.getState().setRates({
        rates: [],
        lastUpdated: null,
        isLoading: false,
        isError: true,
        isRefetching: false,
        error,
      });

      const state = useCurrencyStore.getState();

      expect(state.isError).toBe(true);
      expect(state.error).toBe(error);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('getCurrency', () => {
    it('should return currency by code', () => {
      const mockRates: Currency[] = [
        {
          country: 'USA',
          currency: 'dollar',
          amount: 1,
          code: 'USD',
          rate: 20.674,
        },
        {
          country: 'EMU',
          currency: 'euro',
          amount: 1,
          code: 'EUR',
          rate: 24.22,
        },
      ];

      useCurrencyStore.getState().setRates({
        rates: mockRates,
        lastUpdated: null,
        isLoading: false,
        isError: false,
        isRefetching: false,
        error: null,
      });

      const currency = useCurrencyStore.getState().getCurrency('USD');

      expect(currency).toEqual(mockRates[0]);
    });

    it('should return undefined for non-existent currency', () => {
      const mockRates: Currency[] = [
        {
          country: 'USA',
          currency: 'dollar',
          amount: 1,
          code: 'USD',
          rate: 20.674,
        },
      ];

      useCurrencyStore.getState().setRates({
        rates: mockRates,
        lastUpdated: null,
        isLoading: false,
        isError: false,
        isRefetching: false,
        error: null,
      });

      const currency = useCurrencyStore.getState().getCurrency('XXX');

      expect(currency).toBeUndefined();
    });
  });

  describe('getCurrencyRate', () => {
    it('should return rate for currency', () => {
      const mockRates: Currency[] = [
        {
          country: 'USA',
          currency: 'dollar',
          amount: 1,
          code: 'USD',
          rate: 20.674,
        },
      ];

      useCurrencyStore.getState().setRates({
        rates: mockRates,
        lastUpdated: null,
        isLoading: false,
        isError: false,
        isRefetching: false,
        error: null,
      });

      const rate = useCurrencyStore.getState().getCurrencyRate('USD');

      expect(rate).toBe(20.674);
    });

    it('should return undefined for non-existent currency', () => {
      const rate = useCurrencyStore.getState().getCurrencyRate('XXX');

      expect(rate).toBeUndefined();
    });
  });

  describe('setFromCurrency', () => {
    it('should update from currency and recalculate', () => {
      const mockRates: Currency[] = [
        {
          country: 'Czech Republic',
          currency: 'koruna',
          amount: 1,
          code: 'CZK',
          rate: 1,
        },
        {
          country: 'USA',
          currency: 'dollar',
          amount: 1,
          code: 'USD',
          rate: 20.674,
        },
        {
          country: 'EMU',
          currency: 'euro',
          amount: 1,
          code: 'EUR',
          rate: 24.22,
        },
      ];

      useCurrencyStore.getState().setRates({
        rates: mockRates,
        lastUpdated: null,
        isLoading: false,
        isError: false,
        isRefetching: false,
        error: null,
      });

      useCurrencyStore.getState().setFromAmount('100');
      useCurrencyStore.getState().setFromCurrency('USD');

      const state = useCurrencyStore.getState();

      expect(state.fromCurrency).toBe('USD');
      expect(state.toAmount).not.toBe('');
    });
  });

  describe('setToCurrency', () => {
    it('should update to currency and recalculate', () => {
      const mockRates: Currency[] = [
        {
          country: 'Czech Republic',
          currency: 'koruna',
          amount: 1,
          code: 'CZK',
          rate: 1,
        },
        {
          country: 'USA',
          currency: 'dollar',
          amount: 1,
          code: 'USD',
          rate: 20.674,
        },
        {
          country: 'EMU',
          currency: 'euro',
          amount: 1,
          code: 'EUR',
          rate: 24.22,
        },
      ];

      useCurrencyStore.getState().setRates({
        rates: mockRates,
        lastUpdated: null,
        isLoading: false,
        isError: false,
        isRefetching: false,
        error: null,
      });

      useCurrencyStore.getState().setFromAmount('100');
      useCurrencyStore.getState().setToCurrency('USD');

      const state = useCurrencyStore.getState();

      expect(state.toCurrency).toBe('USD');
      expect(state.toAmount).not.toBe('');
    });
  });

  describe('setFromAmount', () => {
    it('should update from amount and recalculate', () => {
      const mockRates: Currency[] = [
        {
          country: 'Czech Republic',
          currency: 'koruna',
          amount: 1,
          code: 'CZK',
          rate: 1,
        },
        {
          country: 'EMU',
          currency: 'euro',
          amount: 1,
          code: 'EUR',
          rate: 24.22,
        },
      ];

      useCurrencyStore.getState().setRates({
        rates: mockRates,
        lastUpdated: null,
        isLoading: false,
        isError: false,
        isRefetching: false,
        error: null,
      });

      useCurrencyStore.getState().setFromAmount('100');

      const state = useCurrencyStore.getState();

      expect(state.fromAmount).toBe('100');
      expect(state.toAmount).toBe('4.13');
    });

    it('should clear to amount for empty string', () => {
      useCurrencyStore.getState().setFromAmount('100');
      useCurrencyStore.getState().setFromAmount('');

      const state = useCurrencyStore.getState();

      expect(state.fromAmount).toBe('');
      expect(state.toAmount).toBe('');
    });

    it('should clear to amount for dot only', () => {
      useCurrencyStore.getState().setFromAmount('100');
      useCurrencyStore.getState().setFromAmount('.');

      const state = useCurrencyStore.getState();

      expect(state.fromAmount).toBe('.');
      expect(state.toAmount).toBe('');
    });

    it('should clear to amount for invalid number', () => {
      useCurrencyStore.getState().setFromAmount('100');
      useCurrencyStore.getState().setFromAmount('abc');

      const state = useCurrencyStore.getState();

      expect(state.fromAmount).toBe('abc');
      expect(state.toAmount).toBe('');
    });
  });

  describe('swapCurrencies', () => {
    it('should swap from and to currencies', () => {
      useCurrencyStore.getState().setFromAmount('100');
      useCurrencyStore.setState({
        fromCurrency: 'CZK',
        toCurrency: 'EUR',
      });

      useCurrencyStore.getState().swapCurrencies();

      const state = useCurrencyStore.getState();

      expect(state.fromCurrency).toBe('EUR');
      expect(state.toCurrency).toBe('CZK');
    });

    it('should swap amounts when swapping currencies', () => {
      const mockRates: Currency[] = [
        {
          country: 'Czech Republic',
          currency: 'koruna',
          amount: 1,
          code: 'CZK',
          rate: 1,
        },
        {
          country: 'EMU',
          currency: 'euro',
          amount: 1,
          code: 'EUR',
          rate: 24.22,
        },
      ];

      useCurrencyStore.getState().setRates({
        rates: mockRates,
        lastUpdated: null,
        isLoading: false,
        isError: false,
        isRefetching: false,
        error: null,
      });

      useCurrencyStore.getState().setFromAmount('100');
      const beforeSwap = useCurrencyStore.getState();

      useCurrencyStore.getState().swapCurrencies();

      const afterSwap = useCurrencyStore.getState();

      expect(afterSwap.fromAmount).toBe(beforeSwap.toAmount);
      expect(afterSwap.toAmount).toBe(beforeSwap.fromAmount);
    });
  });

  describe('recalculate', () => {
    it('should calculate correct conversion', () => {
      const mockRates: Currency[] = [
        {
          country: 'Czech Republic',
          currency: 'koruna',
          amount: 1,
          code: 'CZK',
          rate: 1,
        },
        {
          country: 'EMU',
          currency: 'euro',
          amount: 1,
          code: 'EUR',
          rate: 24.22,
        },
      ];

      useCurrencyStore.getState().setRates({
        rates: mockRates,
        lastUpdated: null,
        isLoading: false,
        isError: false,
        isRefetching: false,
        error: null,
      });

      useCurrencyStore.setState({
        fromCurrency: 'CZK',
        toCurrency: 'EUR',
        fromAmount: '2422',
      });

      useCurrencyStore.getState().recalculate();

      const state = useCurrencyStore.getState();

      expect(state.toAmount).toBe('100.00');
    });

    it('should handle currencies with different amounts', () => {
      const mockRates: Currency[] = [
        {
          country: 'Czech Republic',
          currency: 'koruna',
          amount: 1,
          code: 'CZK',
          rate: 1,
        },
        {
          country: 'Japan',
          currency: 'yen',
          amount: 100,
          code: 'JPY',
          rate: 13.291,
        },
      ];

      useCurrencyStore.getState().setRates({
        rates: mockRates,
        lastUpdated: null,
        isLoading: false,
        isError: false,
        isRefetching: false,
        error: null,
      });

      useCurrencyStore.setState({
        fromCurrency: 'CZK',
        toCurrency: 'JPY',
        fromAmount: '100',
      });

      useCurrencyStore.getState().recalculate();

      const state = useCurrencyStore.getState();

      // 100 CZK = 100 * 1 / (13.291/100) ≈ 752.4 JPY
      expect(Number.parseFloat(state.toAmount)).toBeCloseTo(752.4, 1);
    });

    it('should return empty string when currencies are not found', () => {
      useCurrencyStore.setState({
        fromCurrency: 'XXX',
        toCurrency: 'YYY',
        fromAmount: '100',
      });

      useCurrencyStore.getState().recalculate();

      const state = useCurrencyStore.getState();

      expect(state.toAmount).toBe('0.00');
    });
  });
});
