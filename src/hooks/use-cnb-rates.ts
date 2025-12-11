import { useQuery } from '@tanstack/react-query';

export function useCNBRates() {
  return useQuery({
    queryKey: ['cnb'],
    queryFn: async () => {
      const response = await fetch('/api/cnb-rates');

      if (!response.ok) {
        throw new Error('Failed to fetch CNB data');
      }

      return response.text();
    },
  });
}
