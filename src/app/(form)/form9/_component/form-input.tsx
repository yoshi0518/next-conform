'use client';

import { useActionState, useState } from 'react';
import { action } from '@/app/(form)/form9/_action';
import { formSchema } from '@/app/(form)/form9/_types';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { getSelectProps, getSelectTriggerProps } from '@/lib/shadcn';
import { cn } from '@/lib/utils';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { FaSpinner } from 'react-icons/fa6';

const items = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
];

export const FormInput: React.FC = () => {
  const [lastResult, dispatch, isPending] = useActionState(action, null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [form, fields] = useForm({
    // 初期値
    defaultValue: {
      persons: [
        {
          no: 1,
          name: '田中太郎',
          gender: 'male',
        },
        {
          no: 2,
          name: '山田花子',
          gender: 'female',
        },
      ],
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
  const persons = fields.persons.getFieldList();

  return (
    <div className="w-[600px] rounded-lg border bg-white shadow hover:shadow-md">
      <form
        {...getFormProps(form)}
        action={dispatch}
      >
        {/* === Input Start === */}
        <div className={cn(isConfirm && 'hidden')}>
          <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form9(Input)</header>
          <div className="space-y-4 px-6 py-4">
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {persons.map((person, index) => {
                    const personFields = person.getFieldset();

                    return (
                      <TableRow key={person.key}>
                        <TableCell>
                          <Input
                            {...getInputProps(personFields.no, { type: 'number' })}
                            key={personFields.no.key}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            {...getInputProps(personFields.name, { type: 'text' })}
                            key={personFields.name.key}
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            {...getSelectProps(personFields.gender)}
                            key={personFields.gender.key}
                            onValueChange={(value) => form.update({ name: personFields.gender.name, value })}
                          >
                            <SelectTrigger {...getSelectTriggerProps(personFields.gender)}>
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
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            {...form.remove.getButtonProps({
                              name: fields.persons.name,
                              index,
                            })}
                          >
                            Del
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
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
              // 「type="button"」を指定すると動作しないので注意
              variant="outline"
              {...form.insert.getButtonProps({
                name: fields.persons.name,
                defaultValue: {
                  no: 100,
                  name: null,
                  gender: 'male',
                },
              })}
            >
              Add
            </Button>

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
          <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form9(Confirm)</header>
          <div className="space-y-4 px-6 py-4">
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Gender</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {persons.map((person) => {
                    const personFields = person.getFieldset();

                    return (
                      <TableRow key={person.key}>
                        <TableCell>{personFields.no.value}</TableCell>
                        <TableCell>{personFields.name.value}</TableCell>
                        <TableCell>{personFields.gender.value}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
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
