'use client';

import Image from 'next/image';
import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';

import { countries, getCountryFlag } from '@/constants/countries';

import { Label } from '../label';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PhoneInputProps<TFieldValues extends FieldValues, TContext = any> = {
  phoneName: FieldPath<TFieldValues>;
  codeName: FieldPath<TFieldValues>;
  control: Control<TFieldValues, TContext>;
  className?: string;
  inputClassName?: string;
  label?: string;
  disabled?: boolean;
};

function PhoneInput<TFieldValues extends object>({
  control,
  codeName,
  phoneName,
  className,
  inputClassName,
  label,
  disabled,
}: PhoneInputProps<TFieldValues>) {
  const form = useFormContext();

  const isErrors =
    form.formState.errors[codeName] || form.formState.errors[phoneName];

  return (
    <div className='flex w-full flex-col justify-start gap-3'>
      {label && <Label>{label}</Label>}
      <div
        className={cn(
          'flex h-10 items-center gap-2 rounded-md border bg-white px-2 focus-within:border-primary',
          className,
        )}
      >
        <div className='relative -mr-1 aspect-square w-5 overflow-hidden rounded-full border'>
          <Image
            src={getCountryFlag(form.watch(codeName))}
            alt='flag'
            fill
            className='scale-[1.75] object-cover'
          />
        </div>
        <FormField
          control={control}
          name={codeName}
          render={({ field }) => (
            <FormItem>
              <Select
                disabled={disabled}
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className='m-0 h-fit w-fit border-0 p-0 py-1 focus:ring-0 focus:ring-offset-0'>
                    <p>
                      {countries.find((c) => c.code === field.value)?.dialCode}
                    </p>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {countries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.dialCode} - {c.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={phoneName}
          render={({ field }) => (
            <FormItem className='flex-grow'>
              <FormControl>
                <Input
                  disabled={disabled}
                  style={{ fontSize: 'inherit' }}
                  className={cn(
                    'm-0 h-fit w-full border-0 p-0 pr-4 text-sm placeholder:text-sm focus-visible:ring-0 focus-visible:ring-offset-0 disabled:text-sm',
                    inputClassName,
                  )}
                  placeholder='Phone Number'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      {isErrors && (
        <div className='mt-2 text-sm text-red-500 dark:text-red-900'>
          {form.getFieldState(phoneName).error?.message}
          {form.getFieldState(codeName).error?.message?.padStart(2, ' ')}
        </div>
      )}
    </div>
  );
}

export default PhoneInput;
