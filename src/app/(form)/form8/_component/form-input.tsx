'use client';

import { useActionState, useState } from 'react';
import { action } from '@/app/(form)/form8/_action';
import { formSchema } from '@/app/(form)/form8/_types';
import { Button, Label, Switch } from '@/components/ui';
import { getSwitchProps } from '@/lib/shadcn';
import { cn } from '@/lib/utils';
import { getFormProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { FaSpinner } from 'react-icons/fa6';

export const FormInput: React.FC = () => {
  const [lastResult, dispatch, isPending] = useActionState(action, null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [form, fields] = useForm({
    // 初期値
    defaultValue: {
      switchValue: false,
    },
    // action実行後の値
    lastResult,
    // バリデーションスキーマ
    onValidate: ({ formData }) => parseWithZod(formData, { schema: formSchema }),
    // 初回のバリデーション実行タイミング
    shouldValidate: 'onBlur',
    // 2回目以降のバリデーション実行タイミング
    shouldRevalidate: 'onInput',
    // Zodスキーマをもとに各フィールドのバリデーション属性を自動設定
    constraint: getZodConstraint(formSchema),
  });

  return (
    <div className="w-[360px] rounded-lg border bg-white shadow hover:shadow-md">
      <form
        {...getFormProps(form)}
        action={dispatch}
      >
        {/* === Input Start === */}
        <div className={cn(isConfirm && 'hidden')}>
          <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form8(Input)</header>
          <div className="space-y-4 px-6 py-4">
            <div className="space-y-1.5">
              <Label htmlFor={fields.switchValue.id}>
                <Switch
                  {...getSwitchProps(fields.switchValue)}
                  key={fields.switchValue.id}
                />
                Switch
              </Label>
              <p
                id={fields.switchValue.errorId}
                className="text-sm text-red-500"
              >
                {fields.switchValue.errors}
              </p>
            </div>

            {form.errors?.map((error, index) => (
              <p
                className="text-sm text-red-500"
                key={index}
              >
                {error}
              </p>
            ))}
            <Button
              className="w-full cursor-pointer"
              type="button"
              disabled={!form.valid}
              onClick={() => setIsConfirm(true)}
            >
              確認
            </Button>
          </div>
        </div>
        {/* === Input End === */}

        {/* === Confirm Start === */}
        <div className={cn(!isConfirm && 'hidden')}>
          <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form8(Confirm)</header>
          <div className="space-y-4 px-6 py-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">Switch</Label>
              <p>{fields.switchValue.value ? 'true' : 'false'}</p>
            </div>

            <div className="flex justify-between">
              <Button
                className="w-36 cursor-pointer"
                variant="outline"
                type="button"
                disabled={isPending}
                onClick={() => setIsConfirm(false)}
              >
                修正
              </Button>

              <Button
                className="w-36 cursor-pointer"
                type="submit"
                disabled={isPending}
              >
                {isPending && <FaSpinner className="animate-spin" />}
                送信
              </Button>
            </div>
          </div>
        </div>
        {/* === Confirm End === */}
      </form>
    </div>
  );
};
