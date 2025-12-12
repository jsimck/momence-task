import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '../../__test__/test-utils';
import { ConverterInput } from '../converter-input';

describe('ConverterInput', () => {
  afterEach(() => {
    cleanup();
  });

  it('should call onChange with valid number input', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    const { container } = renderWithProviders(
      <ConverterInput
        value=''
        onChange={handleChange}
        currency='USD'
        onCurrencyChange={vi.fn()}
      />,
    );

    const input = container.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    await user.type(input, '100');

    expect(handleChange).toHaveBeenCalledWith('1');
    expect(handleChange).toHaveBeenCalledWith('0');
    expect(handleChange).toHaveBeenCalledWith('0');
    expect(handleChange).toHaveBeenCalledTimes(3);
  });

  it('should allow decimal point input', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    const { container } = renderWithProviders(
      <ConverterInput
        value=''
        onChange={handleChange}
        currency='USD'
        onCurrencyChange={vi.fn()}
      />,
    );

    const input = container.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    await user.type(input, '100.50');

    expect(handleChange).toHaveBeenCalledWith('1');
    expect(handleChange).toHaveBeenCalledWith('0');
    expect(handleChange).toHaveBeenCalledWith('0');
    expect(handleChange).toHaveBeenCalledWith('.');
    expect(handleChange).toHaveBeenCalledWith('5');
    expect(handleChange).toHaveBeenCalledWith('0');
  });

  it('should allow empty string', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    const { container } = renderWithProviders(
      <ConverterInput
        value='100'
        onChange={handleChange}
        currency='USD'
        onCurrencyChange={vi.fn()}
      />,
    );

    const input = container.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    await user.clear(input);

    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('should allow single decimal point', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    const { container } = renderWithProviders(
      <ConverterInput
        value=''
        onChange={handleChange}
        currency='USD'
        onCurrencyChange={vi.fn()}
      />,
    );

    const input = container.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    await user.type(input, '.');

    expect(handleChange).toHaveBeenCalledWith('.');
  });

  it('should reject invalid characters', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    const { container } = renderWithProviders(
      <ConverterInput
        value=''
        onChange={handleChange}
        currency='USD'
        onCurrencyChange={vi.fn()}
      />,
    );

    const input = container.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    await user.type(input, 'abc123');

    expect(handleChange).toHaveBeenCalledWith('1');
    expect(handleChange).toHaveBeenCalledWith('2');
    expect(handleChange).toHaveBeenCalledWith('3');
    expect(handleChange).not.toHaveBeenCalledWith('a');
    expect(handleChange).not.toHaveBeenCalledWith('b');
    expect(handleChange).not.toHaveBeenCalledWith('c');
  });

  it('should not allow multiple decimal points', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    const { container } = renderWithProviders(
      <ConverterInput
        value='100.50'
        onChange={handleChange}
        currency='USD'
        onCurrencyChange={vi.fn()}
      />,
    );

    const input = container.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    const callCountBefore = handleChange.mock.calls.length;

    await user.type(input, '.');

    expect(handleChange.mock.calls.length).toBe(callCountBefore);
  });

  it('should display readOnly input correctly', () => {
    const { container } = renderWithProviders(
      <ConverterInput
        value='123.45'
        readOnly
        currency='EUR'
        onCurrencyChange={vi.fn()}
      />,
    );

    const input = container.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    expect(input.value).toBe('123.45');
    expect(input.readOnly).toBe(true);
  });
});
