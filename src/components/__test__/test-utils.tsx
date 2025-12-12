import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../theme';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithProviders(ui: ReactElement) {
  const testQueryClient = createTestQueryClient();

  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    </ThemeProvider>,
  );
}
