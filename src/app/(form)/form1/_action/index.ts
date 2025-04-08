'use server';

import fs from 'fs';
import path from 'path';
import { redirect } from 'next/navigation';
import { formSchema } from '@/app/(form)/form1/_types';
import { wait } from '@/lib/utils';
import { parseWithZod } from '@conform-to/zod';

// https://zenn.dev/hyoni/articles/66de9d53c249ac
const saveFile = async (file: File) => {
  const filePath = path.join(process.cwd(), 'public', file.name);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
};

export const action = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: formSchema });

  // バリデーションエラー
  if (submission.status !== 'success') return submission.reply();

  const { email, password, privacy, file } = Object.fromEntries(formData);
  console.log('=== Post Data ===');
  console.log({ email, password, privacy, file });

  // DB処理
  await wait(2000);

  // ファイル保存
  await saveFile(file as File);

  // サーバーエラーありパターン
  // return submission.reply({
  //   formErrors: ['ログインに失敗しました'],
  // });

  // サーバーエラーなしパターン
  redirect('/');
};
