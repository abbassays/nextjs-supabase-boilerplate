import { RxChevronLeft, RxChevronRight } from 'react-icons/rx';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';

import { Input } from '../input';

interface DataTablePaginationProps {
  onPageChange: (index: number) => void;
  onSizeChange: (size: number) => void;
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  className?: string;
  showSelected?: boolean;
}

export function DataTablePagination({
  onPageChange,
  onSizeChange,
  pageIndex,
  pageSize,
  totalCount,
  className,
  showSelected = true,
}: DataTablePaginationProps) {
  const pageCount = Math.ceil(totalCount / pageSize);

  const handlePageSizeChange = (value: string) => {
    const newSize = Number(value);
    onSizeChange(newSize);
  };

  const handlePageIndexChange = (value: string) => {
    const newIndex = Number(value) - 1;
    if (newIndex >= 0 && newIndex < pageCount) {
      onPageChange(newIndex);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-2 md:flex-row md:items-center md:gap-4',
        className,
        {
          'justify-end': !showSelected,
          'justify-between': showSelected,
        },
      )}
    >
      {showSelected && (
        <div className='text-sm text-muted-foreground md:mr-auto'>
          {/* Placeholder for selected rows count */}
          {/* {selectedRowsCount} of {totalCount} row(s) selected. */}
        </div>
      )}
      <div className='flex flex-wrap items-center justify-between gap-2 sm:justify-start md:gap-4'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Entries per page</p>
          <Select value={`${pageSize}`} onValueChange={handlePageSizeChange}>
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[5, 10, 15, 20].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='flex items-center space-x-2 text-sm font-medium md:self-end'>
          <span>Page</span>
          <Input
            pattern='[0-9]*'
            className='h-8 w-20'
            type='number'
            value={pageIndex + 1}
            onChange={(event) => handlePageIndexChange(event.target.value)}
          />
          <span>of {pageCount || 1}</span>
        </div>

        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8 p-0'
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <span className='sr-only'>Go to previous page</span>
            <RxChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8 p-0'
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex >= pageCount - 1}
          >
            <span className='sr-only'>Go to next page</span>
            <RxChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
