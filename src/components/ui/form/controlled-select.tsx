'use client';

import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

import { cn } from '@/lib/utils';

type ControlledSelectProps<TFieldValues extends FieldValues> = {
  options:
    | string[]
    | {
        label: string;
        value: string;
      }[];
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  name: FieldPath<TFieldValues>;
  label?: string;
};

export function ControlledSelect<TFieldValues extends FieldValues>({
  options,
  placeholder,
  className,
  name,
  containerClassName,
  label,
}: ControlledSelectProps<TFieldValues>) {
  const form = useFormContext<TFieldValues>();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('', containerClassName)}>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
            }}
          >
            {!!label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <SelectTrigger
                className={cn(
                  'w-full gap-2.5 focus:ring-0 focus:ring-white md:min-w-28 ',
                  className,
                )}
              >
                <p className='text-sm'>
                  {field.value ? (
                    Array.isArray(options) && typeof options[0] !== 'string' ? (
                      (options as { label: string; value: string }[]).find(
                        (o) => o.value === field.value,
                      )?.label
                    ) : (
                      field.value
                    )
                  ) : (
                    <span className='text-neutral-400'>{placeholder}</span>
                  )}
                </p>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, idx) => {
                if (typeof option === 'string')
                  return (
                    <SelectItem key={idx} value={option}>
                      {option}
                    </SelectItem>
                  );
                else
                  return (
                    <SelectItem key={idx} value={option.value}>
                      {option.label}
                    </SelectItem>
                  );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
