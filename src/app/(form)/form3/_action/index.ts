'use server';

import fs from 'fs';
import path from 'path';
import { redirect } from 'next/navigation';
import { formSchema } from '@/app/(form)/form3/_types';
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

  const { text, password, email, search, url, tel, range, date, datetime, time, month, week, color, file } =
    submission.value;
  console.log('=== Submission Data ===');
  console.log({ text, password, email, search, url, tel, range, date, datetime, time, month, week, color, file });

  // DB処理
  await wait(2000);

  // ファイル保存
  await saveFile(file);

  // 送信完了ページへ遷移
  redirect('/form3/complete');
};
