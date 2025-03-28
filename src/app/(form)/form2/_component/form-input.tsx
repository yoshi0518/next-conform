'use client';

import { Button } from '@/app/(form)/form2/_component/button';
import { Input, Label } from '@/components/ui';
import { getFormProps, getInputProps, useField, useFormMetadata } from '@conform-to/react';

export const FormInput: React.FC = () => {
  // FormProvider経由で状態を取得
  const form = useFormMetadata();
  const [email] = useField<string>('email');
  const [password] = useField<string>('password');
  const [privacy] = useField<string>('privacy');

  return (
    <div className="w-[360px] rounded-lg border bg-white shadow hover:shadow-md">
      <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form2(Input)</header>
      <form
        {...getFormProps(form)}
        onSubmit={form.onSubmit}
        className="space-y-4 px-6 py-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor={email.id}>メールアドレス</Label>
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
          <Label htmlFor={password.id}>パスワード</Label>
          <Input
            {...getInputProps(password, { type: 'password' })}
            key={password.key}
            defaultValue={password.value ?? password.initialValue}
          />
          <p
            id={password.errorId}
            className="text-sm text-red-500"
          >
            {password.errors}
          </p>
        </div>
        <Input
          {...getInputProps(privacy, { type: 'hidden' })}
          key={privacy.key}
          defaultValue={privacy.value ?? privacy.initialValue}
        />
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
