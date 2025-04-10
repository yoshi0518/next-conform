'use client';

import { useActionState, useState } from 'react';
import { action } from '@/app/(form)/form5/_action';
import { formSchema } from '@/app/(form)/form5/_types';
import { Button, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { getSelectProps, getSelectTriggerProps } from '@/lib/shadcn';
import { cn } from '@/lib/utils';
import { getFormProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { FaSpinner } from 'react-icons/fa6';

const items = [
  { value: 'apple', label: 'りんご' },
  { value: 'banana', label: 'バナナ' },
  { value: 'orange', label: 'オレンジ' },
];

export const FormInput: React.FC = () => {
  const [lastResult, dispatch, isPending] = useActionState(action, null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [form, fields] = useForm({
    // 初期値
    defaultValue: {
      select: 'banana',
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
          <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form5(Input)</header>
          <div className="space-y-4 px-6 py-4">
            <div className="space-y-1.5">
              <Label htmlFor={fields.select.id}>Select</Label>

              <Select
                {...getSelectProps(fields.select)}
                key={fields.select.key}
                defaultValue={fields.select.value ?? fields.select.initialValue}
                onValueChange={(value) => form.update({ name: fields.select.name, value })}
              >
                <SelectTrigger {...getSelectTriggerProps(fields.select)}>
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem
                      value={item.value}
                      key={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <p
                id={fields.select.errorId}
                className="text-sm text-red-500"
              >
                {fields.select.errors}
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
          <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form5(Confirm)</header>
          <div className="space-y-4 px-6 py-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">Select</Label>
              <p>{fields.select.value}</p>
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
