import { useEffect } from 'react';
import { create } from 'zustand';

import { useCNBRates } from '../hooks/use-cnb-rates';
import { convertCurrency } from '../lib/convert-currency';
import type { Currency } from '../types';

/**
 * Global application store to manage and sync currency rates data.
 */
interface CurrencyStore {
  rates: Currency[];
  isLoading: boolean;
  isRefetching: boolean;
  isError: boolean;
  error: Error | null;
  lastUpdated: string | null;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;

  setRates: (params: {
    rates: Currency[];
    lastUpdated: string | null;
    isLoading: boolean;
    isError: boolean;
    isRefetching: boolean;
    error: Error | null;
  }) => void;
  setFromCurrency: (code: string) => void;
  setToCurrency: (code: string) => void;
  setFromAmount: (amount: string) => void;
  swapCurrencies: () => void;
  getCurrency: (code: string) => Currency | undefined;
  getCurrencyRate: (code: string) => number | undefined;
  recalculate: () => void;
}

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  // Initial State
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

  // Rates actions
  setRates: (params: {
    rates: Currency[];
    lastUpdated: string | null;
    isLoading: boolean;
    isError: boolean;
    isRefetching: boolean;
    error: Error | null;
  }) => {
    set(params);
  },

  getCurrency: (code: string) => {
    return get().rates.find(rate => rate.code === code);
  },

  getCurrencyRate: (code: string) => {
    return get().getCurrency(code)?.rate;
  },

  setFromCurrency: (code: string) => {
    set({ fromCurrency: code });
    get().recalculate();
  },

  setToCurrency: (code: string) => {
    set({ toCurrency: code });
    get().recalculate();
  },

  setFromAmount: (amount: string) => {
    set({ fromAmount: amount });
    get().recalculate();
  },

  swapCurrencies: () => {
    const { fromCurrency, toCurrency, fromAmount, toAmount } = get();

    set({
      fromCurrency: toCurrency,
      toCurrency: fromCurrency,
      fromAmount: toAmount,
      toAmount: fromAmount,
    });
  },

  /**
   * Recalculates the to amount based on the from amount and currencies.
   */
  recalculate: () => {
    const { fromAmount, fromCurrency, toCurrency } = get();
    const numericAmount = Number.parseFloat(fromAmount);

    if (
      Number.isNaN(numericAmount) ||
      fromAmount === '' ||
      fromAmount === '.'
    ) {
      set({ toAmount: '' });

      return;
    }

    const converted = convertCurrency(
      numericAmount,
      fromCurrency,
      toCurrency,
      get().getCurrency,
    );

    set({ toAmount: converted.toFixed(2) });
  },
}));

/**
 * Hook to sync React Query with Zustand store. Should be
 * called in the root component.
 */
export function useCurrencyStoreSync() {
  const { data, isLoading, isRefetching, isError, error } = useCNBRates();
  const setRates = useCurrencyStore(state => state.setRates);

  useEffect(() => {
    const rates = [
      {
        country: 'Czech Republic',
        currency: 'koruna',
        amount: 1,
        code: 'CZK',
        rate: 1,
      },
      ...(data?.rates || []),
    ];

    setRates({
      rates,
      lastUpdated: data?.date || null,
      isLoading,
      isError,
      isRefetching,
      error: error as Error | null,
    });
  }, [data, isLoading, isError, isRefetching, error, setRates]);
}
