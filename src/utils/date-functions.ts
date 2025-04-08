import { format, formatDistanceToNow } from 'date-fns';

const DATE_FORMAT = 'dd/MM/yy';
const TIME_FORMAT = 'HH:mm:ss a';

export function formatTimestamp(
  timestamp: number | Date | string | undefined | null,
) {
  if (!timestamp) return '';
  return format(timestamp, `${DATE_FORMAT} ${TIME_FORMAT}`);
}

export function formatDate(
  timestamp: number | Date | string | undefined | null,
) {
  if (!timestamp) return '';
  return format(timestamp, DATE_FORMAT);
}

export function formatTime(
  timestamp: number | Date | string | undefined | null,
): string {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return format(date, TIME_FORMAT);
}

export function formatTimeAgo(
  timestamp: number | Date | string | undefined | null,
): string {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
}
