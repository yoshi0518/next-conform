'use client';

import { useEffect, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Label } from '@/components/ui';
import { getFormProps, getInputProps, useField, useFormMetadata } from '@conform-to/react';
import { FaSpinner } from 'react-icons/fa6';

export const FormConfirm: React.FC = () => {
  // FormProvider経由で状態を取得
  const form = useFormMetadata();
  const [text] = useField<string>('text');
  const [email] = useField<string>('email');
  const [search] = useField<string>('search');
  const [url] = useField<string>('url');
  const [tel] = useField<string>('tel');
  const [range] = useField<string>('range');
  const [date] = useField<string>('date');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // ServerActionでバリデーションエラーがあった場合は入力ページへ遷移
  // replaceでブラウザに履歴を残さない
  useEffect(() => {
    if (form.status === 'error') {
      router.replace('/form4');
    }
  }, [form.status, router]);

  return (
    <div className="w-[360px] rounded-lg border bg-white shadow hover:shadow-md">
      <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form4(Confirm)</header>
      <form
        {...getFormProps(form)}
        onSubmit={(event) => {
          startTransition(() => {
            form.onSubmit(event);
          });
        }}
        className="space-y-4 px-6 py-4"
      >
        {/* === 画面表示 Start ===*/}
        <div className="space-y-1.5">
          <Label
            htmlFor={text.id}
            className="text-sm font-semibold"
          >
            テキスト(text)
          </Label>
          <p>{text.value}</p>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor={email.id}
            className="text-sm font-semibold"
          >
            メールアドレス(email)
          </Label>
          <p>{email.value}</p>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor={search.id}
            className="text-sm font-semibold"
          >
            検索(search)
          </Label>
          <p>{search.value}</p>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor={url.id}
            className="text-sm font-semibold"
          >
            URL(url)
          </Label>
          <p>{url.value}</p>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor={tel.id}
            className="text-sm font-semibold"
          >
            TEL(tel)
          </Label>
          <p>{tel.value}</p>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor={range.id}
            className="text-sm font-semibold"
          >
            範囲(range)
          </Label>
          <p>{range.value}</p>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor={date.id}
            className="text-sm font-semibold"
          >
            日付(date)
          </Label>
          <p>{date.value}</p>
        </div>
        {/* === 画面表示 End ===*/}

        {/* === Form送信用 Start ===*/}
        <input
          {...getInputProps(text, { type: 'hidden' })}
          key={text.key}
          defaultValue={text.value}
        />

        <input
          {...getInputProps(email, { type: 'hidden' })}
          key={email.key}
          defaultValue={email.value}
        />

        <input
          {...getInputProps(search, { type: 'hidden' })}
          key={search.key}
          defaultValue={search.value}
        />

        <input
          {...getInputProps(url, { type: 'hidden' })}
          key={url.key}
          defaultValue={url.value}
        />

        <input
          {...getInputProps(tel, { type: 'hidden' })}
          key={tel.key}
          defaultValue={tel.value}
        />

        <input
          {...getInputProps(range, { type: 'hidden' })}
          key={range.key}
          defaultValue={range.value}
        />

        <input
          {...getInputProps(date, { type: 'hidden' })}
          key={date.key}
          defaultValue={date.value}
        />
        {/* === Form送信用 End ===*/}

        <div className="flex justify-between">
          <Link href="/form4">
            <Button
              className="w-36 cursor-pointer"
              variant="outline"
              type="button"
              disabled={isPending}
            >
              修正
            </Button>
          </Link>

          <Button
            className="w-36 cursor-pointer"
            type="submit"
            name="intent"
            value="submit"
            disabled={isPending}
          >
            {isPending && <FaSpinner className="animate-spin" />}
            送信
          </Button>
        </div>
      </form>
    </div>
  );
};
