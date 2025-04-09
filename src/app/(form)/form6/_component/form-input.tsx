'use client';

import {
  Button,
  Checkbox,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { getCheckboxProps, getSelectProps, getSelectTriggerProps } from '@/lib/shadcn';
import { getFormProps, useField, useFormMetadata } from '@conform-to/react';

const items = [
  { value: 'apple', label: 'りんご' },
  { value: 'banana', label: 'バナナ' },
  { value: 'orange', label: 'オレンジ' },
];

export const FormInput: React.FC = () => {
  // FormProvider経由で状態を取得
  const form = useFormMetadata();
  const [select] = useField<string>('select');
  const [checkbox1] = useField<string>('checkbox1');
  const [checkbox2] = useField<string>('checkbox2');

  return (
    <div className="w-[360px] rounded-lg border bg-white shadow hover:shadow-md">
      <header className="rounded-t-lg border-b bg-slate-600 p-2 text-white">Form6(Input)</header>
      <form
        {...getFormProps(form)}
        onSubmit={form.onSubmit}
        className="space-y-4 px-6 py-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor={select.id}>Select</Label>
          <Select
            {...getSelectProps(select)}
            defaultValue={select.value ?? select.initialValue}
          >
            <SelectTrigger {...getSelectTriggerProps(select)}>
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
            id={select.errorId}
            className="text-sm text-red-500"
          >
            {select.errors}
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={checkbox1.id}>Checkbox</Label>
          <div className="flex items-center">
            <Checkbox
              {...getCheckboxProps(checkbox1)}
              className="mr-1"
            />
            <Label
              htmlFor={checkbox1.id}
              className="text-sm"
            >
              Check
            </Label>
          </div>
          <p
            id={checkbox1.errorId}
            className="text-sm text-red-500"
          >
            {checkbox1.errors}
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={checkbox2.id}>Checkbox Group</Label>
          {items.map((item) => (
            <div
              key={item.value}
              className="flex items-center"
            >
              <Checkbox
                {...getCheckboxProps(checkbox2)}
                key={item.value}
                id={`${checkbox2.id}-${item.value}`}
                value={item.value}
                defaultChecked={(() => {
                  const values =
                    typeof checkbox2.value === 'string'
                      ? checkbox2.value.split(',')
                      : Array.isArray(checkbox2.value)
                        ? checkbox2.value
                        : [];
                  return values.includes(item.value);
                })()}
                className="mr-1"
              />
              <Label
                htmlFor={`${checkbox2.id}-${item.value}`}
                className="text-sm"
              >
                {item.label}
              </Label>
            </div>
          ))}
          <p
            id={checkbox2.errorId}
            className="text-sm text-red-500"
          >
            {checkbox2.errors}
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
