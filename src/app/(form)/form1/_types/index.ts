import { z } from '@/lib/utils';

export const formSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(8).max(100),
  privacy: z.string().min(1),
});

export type formType = z.infer<typeof formSchema>;
