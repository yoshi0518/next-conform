'use client';

import { startTransition, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { action } from '@/app/(form)/form4/_action';
import { formSchema } from '@/app/(form)/form4/_types';
import { FormProvider as ConformFormProvider, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [lastResult, dispatch] = useActionState(action, null);
  const [form] = useForm({
    // 初期値
    defaultValue: {
      text: 'test',
      email: 'test@example.com',
      search: 'keyword',
      url: 'https://example.com',
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
    // Submitイベント
    onSubmit: (event, { formData }) => {
      event.preventDefault();

      switch (formData.get('intent')) {
        case 'confirm':
          router.push('/form4/confirm');
          break;
        case 'modify':
          router.push('/form4');
          break;
        case 'submit':
          // formタグのactionプロパティにServerActionを指定する方法の代替手段
          startTransition(() => dispatch(formData));
          break;
        default:
          break;
      }
    },
  });

  // useFormで設定した状態管理を子コンポーネントに伝搬するプロバイダ
  return <ConformFormProvider context={form.context}>{children}</ConformFormProvider>;
};
