import { z } from '@/lib/utils';

export const formSchema = z.object({
  switchValue: z.boolean().default(false),
});
