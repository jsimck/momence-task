import * as matchers from '@testing-library/jest-dom/vitest';
import { beforeAll, afterEach, afterAll, expect, vi } from 'vitest';

import { server } from './api/__test__/__mocks__/node';
import { MOCK_CNB_BASE_URL } from './api/__test__/test-constants';

expect.extend(matchers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeAll(() => {
  process.env.CNB_RATES_BASE_URL = MOCK_CNB_BASE_URL;
});

vi.mock('@t3-oss/env-core', () => ({
  createEnv: vi.fn().mockReturnValue({
    VITE_APP_URL: 'https://example.com',
  }),
}));
