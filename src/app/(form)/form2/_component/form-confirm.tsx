'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/(form)/form2/_component/button';
import { getFormProps, getInputProps, useField, useFormMetadata } from '@conform-to/react';
import { Label } from '@radix-ui/react-label';

export const FormConfirm: React.FC = () => {
  // FormProvider経由で状態を取得
  const form = useFormMetadata();
  const [email] = useField<string>('email');
  const [password] = useField<string>('password');
  const [privacy] = useField<string>('privacy');
  const router = useRouter();

  // ServerActionでバリデーションエラーがあった場合は入力ページへ遷移
  // replaceでブラウザに履歴を残さない
  useEffect(() => {
    if (form.status === 'error') {
      console.log('useEffect');
      router.replace('/form2');
    }
  }, [form.status, router]);

  return (
    <div className="w-[360px] rounded-lg border bg-white shadow hover:shadow-md">
      <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form2(Confirm)</header>
      <form
        {...getFormProps(form)}
        onSubmit={form.onSubmit}
        className="space-y-4 px-6 py-4"
      >
        {/* === 画面表示 Start ===*/}
        <div className="space-y-1.5">
          <Label
            htmlFor={email.id}
            className="text-sm font-semibold"
          >
            メールアドレス
          </Label>
          <p>{email.value}</p>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor={password.id}
            className="text-sm font-semibold"
          >
            パスワード
          </Label>
          <p>{password.value}</p>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor={privacy.id}
            className="text-sm font-semibold"
          >
            privacy
          </Label>
          <p>{privacy.value}</p>
        </div>
        {/* === 画面表示 End ===*/}

        {/* === Form送信用 Start ===*/}
        <input
          {...getInputProps(email, { type: 'hidden' })}
          key={email.key}
          defaultValue={email.value}
        />
        <input
          {...getInputProps(password, { type: 'hidden' })}
          key={password.key}
          defaultValue={password.value}
        />
        <input
          {...getInputProps(privacy, { type: 'hidden' })}
          key={privacy.key}
          defaultValue={privacy.value}
        />
        {/* === Form送信用 End ===*/}

        <div className="flex justify-between">
          <Button
            className="w-36 cursor-pointer"
            variant="outline"
            type="submit"
            name="intent"
            value="modify"
          >
            修正
          </Button>

          <Button
            className="w-36 cursor-pointer"
            type="submit"
            name="intent"
            value="submit"
          >
            送信
          </Button>
        </div>
      </form>
    </div>
  );
};
