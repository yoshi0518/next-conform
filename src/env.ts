import { z } from 'zod';

const envSchema = z.object({
  ENV: z.enum(['prod', 'dev']).default('dev'),
  DEBUG: z.string().default('true'),
  BASE_URL: z.string().default('http://localhost:3000'),
});

const parsedEnv = envSchema.safeParse({
  ENV: process.env.ENV,
  DEBUG: process.env.DEBUG,
  BASE_URL: process.env.BASE_URL,
});

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
