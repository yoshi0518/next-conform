'use server';

import { redirect } from 'next/navigation';
import { loginSchema } from '@/app/(form)/_types/login-form';
import { wait } from '@/lib/utils';
import { parseWithZod } from '@conform-to/zod';

export const loginAction = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: loginSchema });

  // バリデーションエラー
  if (submission.status !== 'success') return submission.reply();

  const { email, password, privacy } = Object.fromEntries(formData);
  console.log('=== Post Data ===');
  console.log({ email, password, privacy });

  // DB処理
  await wait(2000);

  // サーバーエラーありパターン
  // return submission.reply({
  //   formErrors: ['ログインに失敗しました'],
  // });

  // サーバーエラーなしパターン
  redirect('/');
};
