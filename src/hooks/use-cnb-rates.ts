import { useQuery } from '@tanstack/react-query';

import { env } from '../env.client';

export function useCNBRates() {
  return useQuery({
    queryKey: ['cnb'],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_APP_URL}/api/cnb-rates`);

      if (!response.ok) {
        throw new Error('Failed to fetch CNB data');
      }

      return response.text();
    },
  });
}
