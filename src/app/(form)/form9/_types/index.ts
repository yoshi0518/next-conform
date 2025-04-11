import { z } from '@/lib/utils';

export const formSchema = z.object({
  persons: z.array(
    z.object({
      no: z.number(),
      name: z.string().max(100),
      gender: z.enum(['male', 'female']),
    }),
  ),
});
