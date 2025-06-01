'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 3, columns = 4 }: TableSkeletonProps) {
  return (
    <div className='rounded-lg border border-zinc-200'>
      <Table>
        <TableHeader>
          <TableRow className='text-base hover:bg-transparent'>
            {Array(columns)
              .fill(0)
              .map((_, i) => (
                <TableHead
                  key={i}
                  className='bg-white py-4 first-of-type:pl-5 last-of-type:pr-5'
                >
                  <Skeleton className='h-4 w-[120px]' />
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(rows)
            .fill(0)
            .map((_, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={`h-1 border-zinc-100 text-sm hover:bg-transparent ${
                  rowIndex % 2 === 0 ? 'bg-zinc-50' : 'bg-white'
                }`}
              >
                {Array(columns)
                  .fill(0)
                  .map((_, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className='border-zinc-200 py-5 first-of-type:pl-5 last-of-type:pr-5'
                    >
                      <Skeleton className='h-4 w-[120px]' />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
