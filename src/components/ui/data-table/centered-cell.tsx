import type { CellContext } from '@tanstack/react-table';
import type React from 'react';

import { cn } from '@/lib/utils';

interface CenteredCellProps<TData, TValue> extends CellContext<TData, TValue> {
  formatter?: (value: TValue) => React.ReactNode;
  className?: string;
}

export function CenteredCell<TData, TValue>({
  getValue,
  formatter,
  className,
}: CenteredCellProps<TData, TValue>) {
  const value = getValue();
  const displayValue = formatter ? formatter(value) : String(value);

  return (
    <div className={cn('flex w-full items-center justify-center', className)}>
      {displayValue}
    </div>
  );
}
