import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

import { useCNBRates } from '../hooks/use-cnb-rates';
import type { Currency } from '../types';

interface CurrencyContextValue {
  rates: Currency[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  lastUpdated: string | null;

  fromCurrency: string;
  toCurrency: string;
  setFromCurrency: (code: string) => void;
  setToCurrency: (code: string) => void;
  swapCurrencies: () => void;

  getCurrency: (code: string) => Currency | undefined;
  getCurrencyRate: (code: string) => number | undefined;
  refreshRates: () => void;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(
  undefined,
);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, isError, error, refetch } = useCNBRates();
  const [fromCurrency, setFromCurrency] = useState<string>('CZK');
  const [toCurrency, setToCurrency] = useState<string>('EUR');

  /**
   * Add CZK as it's the base currency
   */
  const rates = useMemo(
    () => [
      {
        country: 'Czech Republic',
        currency: 'koruna',
        amount: 1,
        code: 'CZK',
        rate: 1,
      },
      ...(data?.rates || []),
    ],
    [data?.rates],
  );

  const swapCurrencies = useCallback(() => {
    const currentFrom = fromCurrency;
    const currentTo = toCurrency;

    setFromCurrency(currentTo);
    setToCurrency(currentFrom);
  }, [fromCurrency, toCurrency]);

  const getCurrency = useCallback(
    (code: string): Currency | undefined => {
      return rates.find(rate => rate.code === code);
    },
    [rates],
  );

  const getCurrencyRate = useCallback(
    (code: string): number | undefined => {
      return getCurrency(code)?.rate;
    },
    [getCurrency],
  );

  const refreshRates = useCallback(() => {
    refetch();
  }, [refetch]);

  const value: CurrencyContextValue = useMemo(
    () => ({
      rates,
      isLoading,
      isError,
      error: error as Error | null,
      lastUpdated: data?.date || null,
      fromCurrency,
      toCurrency,
      setFromCurrency,
      setToCurrency,
      swapCurrencies,
      getCurrency,
      getCurrencyRate,
      refreshRates,
    }),
    [
      rates,
      isLoading,
      isError,
      error,
      data?.date,
      fromCurrency,
      toCurrency,
      swapCurrencies,
      getCurrency,
      getCurrencyRate,
      refreshRates,
    ],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (context === undefined) {
    throw new Error('Make sure to wrap your app in <CurrencyProvider>');
  }

  return context;
}
