import { Check, ChevronsUpDown, X } from 'lucide-react';
import * as React from 'react';
import {
  type Control,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  useController,
} from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  popoverOpen?: boolean;
  setPopoverOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  // * the above states are optional when we want to use the multi select popup as a controlled component
  options: Option[];
  placeholder?: string;
  name: TName;
  control: Control<TFieldValues>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  label?: string;
  isLoading?: boolean;
}

export function MultiSelect<TFieldValues extends FieldValues>({
  popoverOpen,
  setPopoverOpen,
  options,
  placeholder = 'Select items...',
  name,
  control,
  searchQuery,
  setSearchQuery,
  label,
}: MultiSelectProps<TFieldValues>) {
  const [open, setOpen] = React.useState(false);

  const {
    field: { value = [] as string[], onChange },
  } = useController({
    name,
    control,
    defaultValue: [] as PathValue<TFieldValues, Path<TFieldValues>>,
  });

  const selectedOptions = options.filter((option) =>
    (value || []).includes(option.value),
  );

  const toggleOption = (option: Option) => {
    const newValue = (value || []).includes(option.value)
      ? (value || []).filter((v: string) => v !== option.value)
      : [...(value || []), option.value];
    onChange(newValue);
  };

  const removeOption = (optionValue: string) => {
    onChange((value || []).filter((v: string) => v !== optionValue));
  };

  return (
    <div className='flex flex-col gap-2'>
      {label && <Label>{label}</Label>}
      {!!selectedOptions.length && (
        <div className='mt-2 flex flex-wrap items-center gap-1'>
          <p className='mr-2 text-sm text-muted-foreground'>
            Selected {label}:{' '}
          </p>
          {selectedOptions.map((option) => (
            <Badge key={option.value} variant='secondary'>
              {option.label}
              <button
                className='ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    removeOption(option.value);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => removeOption(option.value)}
              >
                <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
              </button>
            </Badge>
          ))}
        </div>
      )}
      <Popover
        open={popoverOpen ?? open}
        onOpenChange={setPopoverOpen ?? setOpen}
        modal={true}
      >
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={popoverOpen ?? open}
            className='w-full justify-between'
          >
            {selectedOptions.length > 0
              ? `${selectedOptions.length} selected`
              : placeholder}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        {popoverOpen && (
          <PopoverContent
            disablePortal
            className='w-80 p-0'
            align='start'
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Command>
              <CommandInput
                placeholder='Search...'
                className='border-input'
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>No options found.</CommandEmpty>
                <CommandGroup className='max-h-64 overflow-auto'>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => toggleOption(option)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value.includes(option.value)
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
