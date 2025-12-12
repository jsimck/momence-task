import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { useCurrencyStore } from '../../../stores/currency-store';
import type { Currency } from '../../../types';
import { renderWithProviders } from '../../__test__/test-utils';
import { ConverterDivider } from '../converter-divider';

describe('ConverterDivider', () => {
  beforeEach(() => {
    // Reset store to initial state
    useCurrencyStore.setState({
      rates: [],
      isLoading: false,
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

  afterEach(() => {
    cleanup();
  });

  it('should swap currencies when button is clicked', async () => {
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
      fromAmount: '100',
      toAmount: '4.13',
    });

    const user = userEvent.setup();

    const { container } = renderWithProviders(<ConverterDivider />);

    const button = container.querySelector(
      'button[aria-label="Swap currencies"]',
    ) as HTMLButtonElement;

    await user.click(button);

    const state = useCurrencyStore.getState();

    expect(state.fromCurrency).toBe('EUR');
    expect(state.toCurrency).toBe('CZK');
    expect(state.fromAmount).toBe('4.13');
    expect(state.toAmount).toBe('100');
  });

  it('should have accessible button', () => {
    const { container } = renderWithProviders(<ConverterDivider />);

    const button = container.querySelector(
      'button[aria-label="Swap currencies"]',
    );

    expect(button).not.toBeNull();
    expect(button).toBeInTheDocument();
  });
});
