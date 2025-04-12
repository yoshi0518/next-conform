import { z } from 'zod';

export const formSchema = z.object({
  zipcode: z
    .string()
    .regex(/^\d{3}-\d{4}$|^\d{7}$/, { message: '郵便番号の書式に誤りがあります' })
    .transform((value) => value.replaceAll('-', '')),
  prefecture: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  suburb: z.string().min(1).max(100),
});
