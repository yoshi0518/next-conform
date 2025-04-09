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
  const [select] = useField<string>('select');
  const [checkbox1] = useField<string>('checkbox1');
  const [checkbox2] = useField<string>('checkbox2');

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // ServerActionでバリデーションエラーがあった場合は入力ページへ遷移
  // replaceでブラウザに履歴を残さない
  useEffect(() => {
    if (form.status === 'error') {
      router.replace('/form6');
    }
  }, [form.status, router]);

  return (
    <div className="w-[360px] rounded-lg border bg-white shadow hover:shadow-md">
      <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form6(Confirm)</header>
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
            htmlFor={select.id}
            className="text-sm font-semibold"
          >
            Select
          </Label>
          <p>{select.value}</p>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor={checkbox1.id}
            className="text-sm font-semibold"
          >
            Checkbox
          </Label>
          <p>{checkbox1.value ? 'true' : 'false'}</p>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor={checkbox2.id}
            className="text-sm font-semibold"
          >
            Checkbox Group
          </Label>
          <p>{checkbox2.value}</p>
        </div>
        {/* === 画面表示 End ===*/}

        {/* === Form送信用 Start ===*/}
        <input
          {...getInputProps(select, { type: 'hidden' })}
          key={select.key}
          defaultValue={select.value}
        />

        <input
          {...getInputProps(checkbox1, { type: 'hidden' })}
          key={checkbox1.key}
          defaultValue={checkbox1.value}
        />

        <input
          {...getInputProps(checkbox2, { type: 'hidden' })}
          key={checkbox2.key}
          defaultValue={checkbox2.value}
        />
        {/* === Form送信用 End ===*/}

        <div className="flex justify-between">
          <Link href="/form6">
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
