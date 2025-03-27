import { z } from '@/lib/utils';

export const loginSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(8).max(100),
  privacy: z.string().min(1),
});

export type loginType = z.infer<typeof loginSchema>;
