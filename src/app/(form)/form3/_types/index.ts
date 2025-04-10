import { z } from '@/lib/utils';

export const formSchema = z.object({
  text: z.string().max(100),
  password: z.string().max(100),
  email: z.string().email().max(100),
  search: z.string().max(100),
  url: z.string().url().max(100),
  tel: z
    .string()
    .regex(/^\d{2,5}-\d{1,4}-\d{3,4}$|^\d{10,11}$/, { message: '電話番号の書式に誤りがあります' })
    .transform((value) => value.replaceAll('-', '')),
  range: z.number().min(0).max(100),
  date: z.date(),
  datetime: z.date().refine((value) => !Number.isNaN(new Date(value).getTime())),
  time: z.string().time(),
  month: z.string().refine((value) => !Number.isNaN(new Date(value).getMonth())),
  week: z.string(),
  color: z.string(),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, { message: 'ファイルサイズは5MB以下にしてください' })
    .refine((file) => ['application/pdf'].includes(file.type), { message: 'PDFのみ選択可能です' }),
});

export type formType = z.infer<typeof formSchema>;
