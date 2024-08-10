import { z } from 'zod';

export const environmentVariables = z.object({
  PORT: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(100),
  JWT_REFRESH_TOKEN_EXP_IN_MILLISECONDS: z.string(),
  JWT_TOKEN_EXP_IN_MILLISECONDS: z.string(),
  LOG_LEVEL: z.string().optional(),
});
