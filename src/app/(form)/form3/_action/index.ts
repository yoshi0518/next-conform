'use server';

import { redirect } from 'next/navigation';
import { formSchema } from '@/app/(form)/form1/_types';
import { wait } from '@/lib/utils';
import { parseWithZod } from '@conform-to/zod';

export const action = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: formSchema });

  // バリデーションエラー
  if (submission.status !== 'success') return { result: submission.reply(), isModal: false };

  const { email, password, privacy, intent } = Object.fromEntries(formData);
  console.log('=== Post Data ===');
  console.log({ email, password, privacy, intent });

  // DB処理
  await wait(2000);

  // // サーバーエラーありパターン
  // return {
  //   result: submission.reply({
  //     formErrors: ['登録に失敗しました'],
  //   }),
  //   isModal: false,
  // };

  // 送信完了ページへ遷移
  redirect('/form3/complete');
};
