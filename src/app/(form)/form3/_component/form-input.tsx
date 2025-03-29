'use client';

import { useActionState, useState, useTransition } from 'react';
import { action } from '@/app/(form)/form3/_action';
import { formSchema } from '@/app/(form)/form3/_types';
import { Button, Input, Label } from '@/components/ui';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { FaSpinner } from 'react-icons/fa6';

export const FormInput: React.FC = () => {
  const [isModal, setIsModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [lastResult, dispatch] = useActionState(action, null);
  const [form, fields] = useForm({
    // 初期値
    defaultValue: {
      email: 'test@example.com',
      password: 'password',
      privacy: 'privacy data',
    },
    // action実行後の値
    lastResult: lastResult?.result,
    // バリデーションスキーマ
    onValidate: ({ formData }) => parseWithZod(formData, { schema: formSchema }),
    // 初回のバリデーション実行タイミング
    shouldValidate: 'onBlur',
    // 2回目以降のバリデーション実行タイミング
    shouldRevalidate: 'onInput',
    // Zodスキーマをもとに各フィールドのバリデーション属性を自動設定
    constraint: getZodConstraint(formSchema),
    // Submitイベント
    onSubmit: (event, { formData }) => {
      event.preventDefault();

      switch (formData.get('intent')) {
        case 'confirm':
          setIsModal(true);
          break;
        case 'modify':
          setIsModal(false);
          break;
        case 'submit':
          // formタグのactionプロパティにServerActionを指定する方法の代替手段
          startTransition(() => {
            dispatch(formData);

            // サーバーエラーありの場合はモーダルを消してエラーメッセージ表示
            setIsModal(lastResult?.isModal ?? false);
          });
          break;
      }
    },
  });

  return (
    <div className="w-[360px] rounded-lg border bg-white shadow hover:shadow-md">
      <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form3(Input)</header>
      <form
        {...getFormProps(form)}
        onSubmit={form.onSubmit}
        className="space-y-4 px-6 py-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor={fields.email.id}>メールアドレス</Label>
          <Input
            {...getInputProps(fields.email, { type: 'email' })}
            key={fields.email.key}
            defaultValue={(lastResult?.result.initialValue?.email as string) ?? form.initialValue?.email}
          />
          <p
            id={fields.email.errorId}
            className="text-sm text-red-500"
          >
            {fields.email.errors}
          </p>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={fields.password.id}>パスワード</Label>
          <Input
            {...getInputProps(fields.password, { type: 'password' })}
            key={fields.password.key}
            defaultValue={(lastResult?.result.initialValue?.password as string) ?? form.initialValue?.password}
          />
          <p
            id={fields.password.errorId}
            className="text-sm text-red-500"
          >
            {fields.password.errors}
          </p>
        </div>
        <Input
          {...getInputProps(fields.privacy, { type: 'hidden' })}
          key={fields.privacy.key}
          defaultValue={(lastResult?.result.initialValue?.privacy as string) ?? form.initialValue?.privacy}
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

      <AlertDialog open={isModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>登録確認</AlertDialogTitle>
            <AlertDialogDescription>登録します。よろしいですか？</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              type="submit"
              name="intent"
              value="modify"
              form={form.id}
              disabled={isPending}
              className="w-30"
            >
              修正
            </AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              name="intent"
              value="submit"
              form={form.id}
              disabled={isPending}
              className="w-30"
            >
              {isPending && <FaSpinner className="animate-spin" />}
              登録
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
