import { z } from '@/lib/utils';

export const formSchema = z.object({
  text: z.string().max(100),
  email: z.string().email().max(100),
  search: z.string().max(100),
  url: z.string().url().max(100),
});

export type formType = z.infer<typeof formSchema>;
