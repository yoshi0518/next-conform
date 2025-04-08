import { z } from '@/lib/utils';

export const formSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(8).max(100),
  privacy: z.string().min(1),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, { message: 'ファイルサイズは5MB以下にしてください' })
    .refine((file) => ['application/pdf'].includes(file.type), { message: 'PDFのみ選択可能です' }),
});

export type formType = z.infer<typeof formSchema>;
