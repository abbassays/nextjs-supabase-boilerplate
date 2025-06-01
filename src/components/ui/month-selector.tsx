'use client';

import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface MonthSelectorProps {
  value: string; // YYYY-MM format
  onChange: (value: string) => void;
  placeholder?: string;
  minDate?: string; // YYYY-MM format
  maxDate?: string; // YYYY-MM format
}

export function MonthSelector({
  value,
  onChange,
  minDate,
  maxDate,
}: MonthSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Parse the current value or default to current month
  const currentDate = value ? new Date(value + '-01') : new Date();
  const [viewYear, setViewYear] = useState(currentDate.getFullYear());

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const isDateDisabled = (year: number, month: number) => {
    const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}`;

    if (minDate && dateString < minDate) {
      return true;
    }

    if (maxDate && dateString > maxDate) {
      return true;
    }

    return false;
  };

  const handleMonthSelect = (monthIndex: number) => {
    if (isDateDisabled(viewYear, monthIndex)) {
      return;
    }

    const year = viewYear;
    const month = monthIndex + 1; // Convert to 1-based month
    const formattedValue = `${year}-${month.toString().padStart(2, '0')}`;
    onChange(formattedValue);
    setIsOpen(false);
  };

  const canGoToPreviousYear = () => {
    if (!minDate) return true;
    const minYear = parseInt(minDate.split('-')[0]);
    return viewYear > minYear;
  };

  const canGoToNextYear = () => {
    if (!maxDate) return true;
    const maxYear = parseInt(maxDate.split('-')[0]);
    return viewYear < maxYear;
  };

  const goToPreviousYear = () => {
    if (canGoToPreviousYear()) {
      setViewYear((prev) => prev - 1);
    }
  };

  const goToNextYear = () => {
    if (canGoToNextYear()) {
      setViewYear((prev) => prev + 1);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='w-full justify-start text-left font-normal'
          onClick={() => setIsOpen(true)}
        >
          {format(new Date(value + '-01'), 'MMMM yyyy')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-0' align='start'>
        <div className='p-4'>
          {/* Year navigation */}
          <div className='mb-4 flex items-center justify-between'>
            <Button
              variant='outline'
              size='icon'
              onClick={goToPreviousYear}
              className='h-7 w-7'
              disabled={!canGoToPreviousYear()}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <div className='text-sm font-semibold'>{viewYear}</div>
            <Button
              variant='outline'
              size='icon'
              onClick={goToNextYear}
              className='h-7 w-7'
              disabled={!canGoToNextYear()}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>

          {/* Month grid */}
          <div className='grid grid-cols-3 gap-2'>
            {months.map((month, index) => {
              const isSelected =
                value &&
                new Date(value + '-01').getFullYear() === viewYear &&
                new Date(value + '-01').getMonth() === index;

              const isDisabled = isDateDisabled(viewYear, index);

              return (
                <Button
                  key={month}
                  variant={isSelected ? 'default' : 'ghost'}
                  size='sm'
                  className='h-9 text-xs'
                  onClick={() => handleMonthSelect(index)}
                  disabled={isDisabled}
                >
                  {month.slice(0, 3)}
                </Button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
