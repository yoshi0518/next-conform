import { z } from '@/lib/utils';

export const formSchema = z.object({
  select: z.string(),
  checkbox1: z.boolean().default(false),
  checkbox2: z.array(z.string()).refine((value) => value.some((item) => item), { message: '1つ以上選択してください' }),
  radio: z.string(),
  switchValue: z.boolean().default(false),
});
