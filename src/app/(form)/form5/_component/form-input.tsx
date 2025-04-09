'use client';

import { useState } from 'react';
import { Button, Label, Textarea } from '@/components/ui';
import { getFormProps, getTextareaProps, useField, useFormMetadata } from '@conform-to/react';

export const FormInput: React.FC = () => {
  // FormProvider経由で状態を取得
  const form = useFormMetadata();
  const [text1] = useField<string>('text1');
  const [text2] = useField<string>('text2');

  const [count, setCount] = useState<number>((text2.value ?? text2.initialValue ?? '').replaceAll('\n', '').length);

  return (
    <div className="w-[360px] rounded-lg border bg-white shadow hover:shadow-md">
      <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form5(Input)</header>
      <form
        {...getFormProps(form)}
        onSubmit={form.onSubmit}
        className="space-y-4 px-6 py-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor={text1.id}>基本</Label>
          <Textarea
            {...getTextareaProps(text1)}
            key={text1.key}
            defaultValue={text1.value ?? text1.initialValue}
          />
          <p
            id={text1.errorId}
            className="text-sm text-red-500"
          >
            {text1.errors}
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between">
            <Label htmlFor={text2.id}>文字数カウント</Label>
            <p className="text-sm text-gray-600">{count}/100</p>
          </div>
          <Textarea
            {...getTextareaProps(text2)}
            key={text2.key}
            defaultValue={text2.value ?? text2.initialValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setCount(e.target.value.replaceAll('\n', '').length)
            }
          />
          <p
            id={text2.errorId}
            className="text-sm text-red-500"
          >
            {text2.errors}
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
          type="submit"
          name="intent"
          value="confirm"
        >
          確認
        </Button>
      </form>
    </div>
  );
};
