import { beforeAll, afterEach, afterAll, vi } from 'vitest';

import { server } from './api/__test__/__mocks__/node';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

vi.mock('./api/env.server', () => ({
  env: {
    CNB_RATES_BASE_URL: 'http://localhost:3000/test-cnb-api/daily.txt',
  },
}));
