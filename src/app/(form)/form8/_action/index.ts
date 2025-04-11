'use server';

import { redirect } from 'next/navigation';
import { formSchema } from '@/app/(form)/form8/_types';
import { wait } from '@/lib/utils';
import { parseWithZod } from '@conform-to/zod';

export const action = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: formSchema });

  // バリデーションエラー
  if (submission.status !== 'success') return submission.reply();

  const { switchValue } = submission.value;
  console.log('=== Submission Data ===');
  console.log({ switchValue });

  // DB処理
  await wait(2000);

  // 送信完了ページへ遷移
  redirect('/form8/complete');
};
