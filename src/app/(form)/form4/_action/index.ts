'use server';

import { redirect } from 'next/navigation';
import { formSchema } from '@/app/(form)/form4/_types';
import { wait } from '@/lib/utils';
import { parseWithZod } from '@conform-to/zod';

export const action = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: formSchema });

  // バリデーションエラー
  if (submission.status !== 'success') return submission.reply();

  const { text, email, search, url, tel, range, date, datetime, time, month, week, color } = submission.value;
  console.log('=== Submission Data ===');
  console.log({ text, email, search, url, tel, range, date, datetime, time, month, week, color });

  // DB処理
  await wait(2000);

  // 送信完了ページへ遷移
  redirect('/form4/complete');
};
