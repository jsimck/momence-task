import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '../../__test__/test-utils';
import { Error } from '../error';

describe('Error', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display error message', () => {
    const { container } = renderWithProviders(
      <Error message='Network error occurred' />,
    );

    expect(container.textContent).toContain('Failed to load currency rates');
    expect(container.textContent).toContain('Network error occurred');
  });

  it('should display retry button when onRetry is provided', async () => {
    const handleRetry = vi.fn();
    const user = userEvent.setup();

    const { container } = renderWithProviders(
      <Error message='Error message' onRetry={handleRetry} />,
    );

    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button).not.toBeNull();
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Try again');

    await user.click(button);

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('should not display retry button when onRetry is not provided', () => {
    const { container } = renderWithProviders(
      <Error message='Error message' />,
    );

    const button = container.querySelector('button');

    expect(button).toBeNull();
  });

  it('should display error without message', () => {
    const { container } = renderWithProviders(<Error />);

    expect(container.textContent).toContain('Failed to load currency rates');
  });
});
