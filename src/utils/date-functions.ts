import { format } from 'date-fns';

export function getRelativeTime(dateString?: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const timeDifferenceInSeconds = Math.floor(
    (date.getTime() - now.getTime()) / 1000,
  );
  const isFuture = timeDifferenceInSeconds > 0;

  const TIME_UNITS = [
    { unit: 'year', seconds: 365 * 24 * 60 * 60, abbreviation: 'y' },
    { unit: 'month', seconds: 30 * 24 * 60 * 60, abbreviation: 'mo' },
    { unit: 'day', seconds: 24 * 60 * 60, abbreviation: 'd' },
    { unit: 'hour', seconds: 60 * 60, abbreviation: 'h' },
    { unit: 'minute', seconds: 60, abbreviation: 'm' },
    { unit: 'second', seconds: 1, abbreviation: 's' },
  ];

  for (const { seconds, abbreviation } of TIME_UNITS) {
    if (Math.abs(timeDifferenceInSeconds) >= seconds) {
      const value = Math.floor(Math.abs(timeDifferenceInSeconds) / seconds);
      return isFuture
        ? `in ${value}${abbreviation}`
        : `${value}${abbreviation} ago`;
    }
  }

  return 'just now';
}

export function calculateTimeLeft(expiryDate: string) {
  if (!expiryDate) {
    return 'No end date set';
  }
  const endDate = new Date(expiryDate);
  if (isNaN(endDate.getTime())) {
    return 'Invalid date';
  }
  endDate.setHours(23, 59, 59, 999); // Set to 11:59:59.999 PM
  const now = new Date();
  const difference = endDate.getTime() - now.getTime();

  if (difference <= 0) {
    return 'Auction ended';
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export function formatTimestamp(
  timestamp: number | Date | string | undefined | null,
) {
  if (!timestamp) return '';
  return format(timestamp, 'dd/MM/yy HH:mm:ss');
}
