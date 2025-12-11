import 'dotenv/config';
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    CNB_RATES_BASE_URL: z.url(),
  },
  runtimeEnvStrict: {
    CNB_RATES_BASE_URL: process.env.CNB_RATES_BASE_URL,
  },
});
