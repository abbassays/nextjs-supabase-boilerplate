import { flexRender, type Table as TTable } from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<T> {
  table: TTable<T>;
}

export function DataTable<T>({ table }: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className='text-base first-of-type:pl-5 last-of-type:pr-5'
          >
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className='py-2 first-of-type:pl-5 last-of-type:pr-5'
                  align={
                    (
                      header.column.columnDef.meta as {
                        align: 'justify' | 'left' | 'center' | 'right';
                      }
                    )?.align
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            className='border-zinc-100 text-sm'
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className='py-3 first-of-type:pl-5 last-of-type:pr-5'
                align={
                  (
                    cell.column.columnDef.meta as {
                      align: 'justify' | 'left' | 'center' | 'right';
                    }
                  )?.align
                }
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
