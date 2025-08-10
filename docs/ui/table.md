## Data table guidelines

Use the provided utilities in `src/components/ui/data-table/*` with TanStack Table. Define columns in a separate file or a hook. If columns need other hooks, expose a `useColumns` hook.

Rule: always use `DataTableColumnHeader` for column headers to get built-in sorting controls.

### Columns as a hook (minimal example)

```tsx
'use client';

import { useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useAction } from 'next-safe-action/hooks';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { CenteredCell } from '@/components/ui/data-table/centered-cell';
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header';
import { Badge } from '@/components/ui/badge';

import { onError } from '@/lib/show-error-toast';
import { queryKeys } from '@/constants/query-keys';

// Example-only: choose fields that make sense for your table
type ItemRow = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: 'pending' | 'active' | 'removed';
};

// Example-only: replace with your real actions
import { resendItem, removeItem } from '@/actions/items';

export function useItemTableColumns() {
  const queryClient = useQueryClient();

  const resendAction = useAction(resendItem, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.items.list] });
      toast.success('Resent successfully');
    },
    onError,
  });

  const removeAction = useAction(removeItem, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.items.list] });
      toast.success('Removed successfully');
    },
    onError,
  });

  const columns = useMemo<ColumnDef<ItemRow>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Name' />
        ),
        cell: ({ getValue }) => (
          <div className='max-w-[200px] truncate font-medium'>
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: 'email',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Email' />
        ),
        cell: ({ getValue }) => (
          <CenteredCell formatter={() => (getValue() as string) || 'N/A'} />
        ),
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Created At' />
        ),
        cell: (props) => {
          const date = props.getValue() as string;
          return (
            <CenteredCell
              {...props}
              formatter={() =>
                date ? format(new Date(date), 'yyyy-MM-dd hh:mm a') : 'N/A'
              }
              className='whitespace-nowrap'
            />
          );
        },
      },
      {
        accessorKey: 'status',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Status' />
        ),
        cell: ({ row }) => {
          const status = row.original.status;
          const variant =
            status === 'pending'
              ? 'warning'
              : status === 'removed'
                ? 'destructive'
                : 'success';
          return (
            <div className='flex justify-center'>
              <Badge className='capitalize' variant={variant as any}>
                {status}
              </Badge>
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Actions' />
        ),
        cell: ({ row }) => {
          const { id, status } = row.original;
          return (
            <div className='flex justify-center space-x-2'>
              <Button
                onClick={() => resendAction.execute({ id })}
                disabled={status !== 'pending'}
                isLoading={
                  resendAction.isPending && resendAction.input?.id === id
                }
                variant='outline'
                size='sm'
              >
                Resend
              </Button>
              <Button
                onClick={() => removeAction.execute({ id })}
                isLoading={
                  removeAction.isPending && removeAction.input?.id === id
                }
                variant='destructive'
                size='sm'
              >
                Remove
              </Button>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [resendAction, removeAction],
  );

  return columns;
}
```

### Building the table with sorting, filtering, pagination (minimal)

```tsx
'use client';
import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { useItemTableColumns } from '@/components/items/item-table-columns';

export default function ItemsTable({ data }: { data: any[] }) {
  const columns = useItemTableColumns();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: { sorting, columnFilters, globalFilter },
  });

  return <DataTable table={table} />;
}
```

### Pagination and filters

- Use the pagination component from `src/components/ui/data-table/pagination.tsx`.
- Faceted filters are optional; use when many columns benefit from filtering.
