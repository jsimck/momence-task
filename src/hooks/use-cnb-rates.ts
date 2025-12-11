import { useQuery } from '@tanstack/react-query';

import { env } from '../env.client';
import type { CNBRatesResponse } from '../types';

export function useCNBRates() {
  return useQuery<CNBRatesResponse>({
    queryKey: ['cnb'],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_APP_URL}/api/cnb-rates`);

      if (!response.ok) {
        throw new Error('Failed to fetch CNB data');
      }

      return response.json() as Promise<CNBRatesResponse>;
    },
  });
}
