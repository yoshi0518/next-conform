'use client';

import { useActionState, useState } from 'react';
import { action } from '@/app/(form)/form3/_action';
import { formSchema } from '@/app/(form)/form3/_types';
import { Button, Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { format } from 'date-fns';
import { FaSpinner } from 'react-icons/fa6';

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

export const FormInput: React.FC = () => {
  const [lastResult, dispatch, isPending] = useActionState(action, null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [form, fields] = useForm({
    // 初期値
    defaultValue: {
      text: 'test',
      password: 'password',
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
  });

  return (
    <div className="w-[360px] rounded-lg border bg-white shadow hover:shadow-md">
      <form
        {...getFormProps(form)}
        action={dispatch}
      >
        {/* === Input Start === */}
        <div className={cn(isConfirm && 'hidden')}>
          <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form3(Input)</header>
          <div className="space-y-4 px-6 py-4">
            <div className="space-y-1.5">
              <Label htmlFor={fields.text.id}>テキスト(text)</Label>
              <Input
                {...getInputProps(fields.text, { type: 'text' })}
                key={fields.text.key}
                defaultValue={(lastResult?.initialValue?.text as string) ?? form.initialValue?.text}
              />
              <p
                id={fields.text.errorId}
                className="text-sm text-red-500"
              >
                {fields.text.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={fields.password.id}>パスワード(password)</Label>
              <Input
                {...getInputProps(fields.password, { type: 'password' })}
                key={fields.password.key}
                defaultValue={(lastResult?.initialValue?.password as string) ?? form.initialValue?.password}
              />
              <p
                id={fields.password.errorId}
                className="text-sm text-red-500"
              >
                {fields.password.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={fields.email.id}>メールアドレス(email)</Label>
              <Input
                {...getInputProps(fields.email, { type: 'email' })}
                key={fields.email.key}
                defaultValue={(lastResult?.initialValue?.email as string) ?? form.initialValue?.email}
              />
              <p
                id={fields.email.errorId}
                className="text-sm text-red-500"
              >
                {fields.email.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={fields.search.id}>検索(search)</Label>
              <Input
                {...getInputProps(fields.search, { type: 'search' })}
                key={fields.search.key}
                defaultValue={(lastResult?.initialValue?.search as string) ?? form.initialValue?.search}
              />
              <p
                id={fields.search.errorId}
                className="text-sm text-red-500"
              >
                {fields.search.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={fields.url.id}>URL(url)</Label>
              <Input
                {...getInputProps(fields.url, { type: 'url' })}
                key={fields.url.key}
                defaultValue={(lastResult?.initialValue?.url as string) ?? form.initialValue?.url}
              />
              <p
                id={fields.url.errorId}
                className="text-sm text-red-500"
              >
                {fields.url.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={fields.tel.id}>TEL(tel)</Label>
              <Input
                {...getInputProps(fields.tel, { type: 'tel' })}
                key={fields.tel.key}
                defaultValue={(lastResult?.initialValue?.tel as string) ?? form.initialValue?.tel}
              />
              <p
                id={fields.tel.errorId}
                className="text-sm text-red-500"
              >
                {fields.tel.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor={fields.range.id}
                className="flex justify-between"
              >
                <span>範囲(range)</span>
                <span>{fields.range.value}</span>
              </Label>
              <Input
                {...getInputProps(fields.range, { type: 'range' })}
                key={fields.range.key}
                defaultValue={Number(lastResult?.initialValue?.range) || form.initialValue?.range}
              />
              <p
                id={fields.range.errorId}
                className="text-sm text-red-500"
              >
                {fields.range.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={fields.date.id}>日時(date)</Label>
              <Input
                {...getInputProps(fields.date, { type: 'date' })}
                key={fields.date.key}
                defaultValue={(lastResult?.initialValue?.date as string) ?? form.initialValue?.date}
                className="w-min"
              />
              <p
                id={fields.date.errorId}
                className="text-sm text-red-500"
              >
                {fields.date.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={fields.datetime.id}>日時(datetime-local)</Label>
              <Input
                {...getInputProps(fields.datetime, { type: 'datetime-local' })}
                key={fields.datetime.key}
                defaultValue={(lastResult?.initialValue?.datetime as string) ?? form.initialValue?.datetime}
                className="w-min"
              />
              <p
                id={fields.datetime.errorId}
                className="text-sm text-red-500"
              >
                {fields.datetime.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={fields.time.id}>時間(time)</Label>
              <Input
                {...getInputProps(fields.time, { type: 'time' })}
                key={fields.time.key}
                defaultValue={(lastResult?.initialValue?.time as string) ?? form.initialValue?.time}
                className="w-min"
              />
              <p
                id={fields.time.errorId}
                className="text-sm text-red-500"
              >
                {fields.time.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={fields.month.id}>年月(month)</Label>
              <Input
                {...getInputProps(fields.month, { type: 'month' })}
                key={fields.month.key}
                defaultValue={(lastResult?.initialValue?.month as string) ?? form.initialValue?.month}
                className="w-min"
              />
              <p
                id={fields.month.errorId}
                className="text-sm text-red-500"
              >
                {fields.month.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={fields.week.id}>週(week)</Label>
              <Input
                {...getInputProps(fields.week, { type: 'week' })}
                key={fields.week.key}
                defaultValue={(lastResult?.initialValue?.week as string) ?? form.initialValue?.week}
                className="w-min"
              />
              <p
                id={fields.week.errorId}
                className="text-sm text-red-500"
              >
                {fields.week.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={fields.color.id}>色(color)</Label>
              <Input
                {...getInputProps(fields.color, { type: 'color' })}
                key={fields.color.key}
                defaultValue={(lastResult?.initialValue?.color as string) ?? form.initialValue?.color}
                className="w-12"
              />
              <p
                id={fields.color.errorId}
                className="text-sm text-red-500"
              >
                {fields.color.errors}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={fields.file.id}>ファイル(file)</Label>
              <Input
                {...getInputProps(fields.file, { type: 'file' })}
                key={fields.file.key}
                defaultValue={(lastResult?.initialValue?.file as string) ?? form.initialValue?.file}
              />
              <p
                id={fields.file.errorId}
                className="text-sm text-red-500"
              >
                {fields.file.errors}
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
          <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form3(Confirm)</header>
          <div className="space-y-4 px-6 py-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">テキスト(text)</Label>
              <p>{fields.text.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">パスワード(password)</Label>
              <p>{'●'.repeat(fields.password.value?.length ?? 0)}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">メールアドレス(email)</Label>
              <p>{fields.email.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">検索(search)</Label>
              <p>{fields.search.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">URL(url)</Label>
              <p>{fields.url.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">TEL(tel)</Label>
              <p>{fields.tel.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">範囲(range)</Label>
              <p>{fields.range.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">日付(date)</Label>
              <p>{fields.date.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">日時(datetime-local)</Label>
              <p>{fields.datetime.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">時間(time)</Label>
              <p>{fields.time.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">年月(month)</Label>
              <p>{fields.month.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">週(week)</Label>
              <p>{fields.week.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">色(color)</Label>
              <p>{fields.color.value}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">ファイル(file)</Label>
              <p>{fields.file.value?.name}</p>
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
