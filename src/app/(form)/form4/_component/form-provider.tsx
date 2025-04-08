'use client';

import { startTransition, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { action } from '@/app/(form)/form4/_action';
import { formSchema } from '@/app/(form)/form4/_types';
import { FormProvider as ConformFormProvider, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { format } from 'date-fns';

// ISO週番号を計算する関数
// https://programming-cafe.com/programming/javascript-programming/js-references/js-references-1-55/
const getISOWeekNumber = (date: Date) => {
  const targetDate = new Date(date.getTime());
  targetDate.setHours(0, 0, 0, 0);
  targetDate.setDate(targetDate.getDate() + 4 - (targetDate.getDay() || 7));

  const firstDayOfYear = new Date(targetDate.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((targetDate.getTime() - firstDayOfYear.getTime()) / 86400000 + 1) / 7);
  return weekNumber;
};

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
      tel: '090-1234-5678',
      range: 50,
      date: format(new Date(), 'yyyy-MM-dd'),
      datetime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      time: format(new Date(), 'HH:mm:ss'),
      month: format(new Date(), 'yyyy-MM'),
      week: `${format(new Date(), 'yyyy')}-W${getISOWeekNumber(new Date())}`,
      color: '#666666',
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
