'use client';

import { Button, Input, Label } from '@/components/ui';
import { getFormProps, getInputProps, useField, useFormMetadata } from '@conform-to/react';

export const FormInput: React.FC = () => {
  // FormProvider経由で状態を取得
  const form = useFormMetadata();
  const [text] = useField<string>('text');
  const [email] = useField<string>('email');
  const [search] = useField<string>('search');
  const [url] = useField<string>('url');

  return (
    <div className="w-[360px] rounded-lg border bg-white shadow hover:shadow-md">
      <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form4(Input)</header>
      <form
        {...getFormProps(form)}
        onSubmit={form.onSubmit}
        className="space-y-4 px-6 py-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor={text.id}>テキスト(text)</Label>
          <Input
            {...getInputProps(text, { type: 'text' })}
            key={text.key}
            defaultValue={text.value ?? text.initialValue}
          />
          <p
            id={text.errorId}
            className="text-sm text-red-500"
          >
            {text.errors}
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={email.id}>メールアドレス(email)</Label>
          <Input
            {...getInputProps(email, { type: 'email' })}
            key={email.key}
            defaultValue={email.value ?? email.initialValue}
          />
          <p
            id={email.errorId}
            className="text-sm text-red-500"
          >
            {email.errors}
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={search.id}>検索(search)</Label>
          <Input
            {...getInputProps(search, { type: 'search' })}
            key={search.key}
            defaultValue={search.value ?? search.initialValue}
          />
          <p
            id={search.errorId}
            className="text-sm text-red-500"
          >
            {search.errors}
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={url.id}>URL(url)</Label>
          <Input
            {...getInputProps(url, { type: 'url' })}
            key={url.key}
            defaultValue={url.value ?? url.initialValue}
          />
          <p
            id={text.errorId}
            className="text-sm text-red-500"
          >
            {url.errors}
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
