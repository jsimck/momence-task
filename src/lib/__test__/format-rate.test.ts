import { describe, expect, it } from 'vitest';

import { formatRate } from '../format-rate';

describe('formatRate', () => {
  it('should format rate with amount 1', () => {
    const result = formatRate(24.22, 1);

    expect(result).toBe('24.2200');
  });

  it('should normalize rate with amount 100', () => {
    const result = formatRate(13.291, 100);

    expect(result).toBe('0.1329');
  });

  it('should normalize rate with amount 1000', () => {
    const result = formatRate(1.24, 1000);

    expect(result).toBe('0.0012');
  });

  it('should handle decimal rates', () => {
    const result = formatRate(20.674, 1);

    expect(result).toBe('20.6740');
  });

  it('should round to 4 decimal places', () => {
    const result = formatRate(13.764, 1);

    expect(result).toBe('13.7640');
  });

  it('should handle very small rates', () => {
    const result = formatRate(0.001, 1);

    expect(result).toBe('0.0010');
  });

  it('should handle large rates', () => {
    const result = formatRate(1000.1234, 1);

    expect(result).toBe('1000.1234');
  });

  it('should handle zero rate', () => {
    const result = formatRate(0, 1);

    expect(result).toBe('0.0000');
  });
});
