'use client';

import { useActionState, useState } from 'react';
import { action } from '@/app/(form)/form10/_action';
import { formSchema } from '@/app/(form)/form10/_types';
import { Button, Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { FaSpinner } from 'react-icons/fa6';

export const FormInput: React.FC = () => {
  const [lastResult, dispatch, isPending] = useActionState(action, null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [form, fields] = useForm({
    // 初期値
    defaultValue: {
      zipcode: '',
      prefecture: '',
      city: '',
      suburb: '',
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

  const getAddressByZipcode = async (zipcode: string) => {
    const response = await fetch(`https://postcode.teraren.com/postcodes/${zipcode.replaceAll('-', '')}.json`);

    if (!response.ok) {
      console.error('住所取得に失敗しました');
      return;
    }

    const data = (await response.json()) as { new: string; prefecture: string; city: string; suburb: string };
    form.update({ name: fields.prefecture.name, value: data.prefecture });
    form.update({ name: fields.city.name, value: data.city });
    form.update({ name: fields.suburb.name, value: data.suburb });
  };

  return (
    <div className="w-[360px] rounded-lg border bg-white shadow hover:shadow-md">
      <form
        {...getFormProps(form)}
        action={dispatch}
      >
        {/* === Input Start === */}
        <div className={cn(isConfirm && 'hidden')}>
          <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form10(Input)</header>
          <div className="space-y-4 px-6 py-4">
            <div className="space-y-1.5">
              <Label htmlFor={fields.zipcode.id}>郵便番号</Label>
              <Input
                {...getInputProps(fields.zipcode, { type: 'text' })}
                key={fields.zipcode.key}
                defaultValue={(lastResult?.initialValue?.zipcode as string) ?? form.initialValue?.zipcode}
              />
              <p
                id={fields.zipcode.errorId}
                className="text-sm text-red-500"
              >
                {fields.zipcode.errors}
              </p>
            </div>

            <Button
              className="w-full cursor-pointer"
              type="button"
              variant="outline"
              onClick={async () => {
                if (typeof fields.zipcode.value === 'string' && fields.zipcode.value !== '') {
                  await getAddressByZipcode(fields.zipcode.value);
                }
              }}
            >
              {'郵便番号 => 住所'}
            </Button>

            <div className="space-y-1.5">
              <Label htmlFor={fields.prefecture.id}>都道府県</Label>
              <Input
                {...getInputProps(fields.prefecture, { type: 'text' })}
                key={fields.prefecture.key}
                defaultValue={(lastResult?.initialValue?.prefecture as string) ?? form.initialValue?.prefecture}
              />
              <p
                id={fields.prefecture.errorId}
                className="text-sm text-red-500"
              >
                {fields.prefecture.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={fields.city.id}>住所1</Label>
              <Input
                {...getInputProps(fields.city, { type: 'text' })}
                key={fields.city.key}
                defaultValue={(lastResult?.initialValue?.city as string) ?? form.initialValue?.city}
              />
              <p
                id={fields.city.errorId}
                className="text-sm text-red-500"
              >
                {fields.city.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={fields.suburb.id}>住所2</Label>
              <Input
                {...getInputProps(fields.suburb, { type: 'text' })}
                key={fields.suburb.key}
                defaultValue={(lastResult?.initialValue?.suburb as string) ?? form.initialValue?.suburb}
              />
              <p
                id={fields.suburb.errorId}
                className="text-sm text-red-500"
              >
                {fields.suburb.errors}
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
          <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form10(Confirm)</header>
          <div className="space-y-4 px-6 py-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">郵便番号</Label>
              <p>{fields.zipcode.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">都道府県</Label>
              <p>{fields.prefecture.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">住所1</Label>
              <p>{fields.city.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">住所2</Label>
              <p>{fields.suburb.value}</p>
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
