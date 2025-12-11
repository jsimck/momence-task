import { beforeAll, afterEach, afterAll } from 'vitest';

import { server } from './api/__test__/__mocks__/node';
import { MOCK_CNB_BASE_URL } from './api/__test__/test-constants';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeAll(() => {
  process.env.CNB_RATES_BASE_URL = MOCK_CNB_BASE_URL;
});
