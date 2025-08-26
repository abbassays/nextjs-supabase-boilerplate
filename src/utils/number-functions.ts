import { appConfig } from '@/config/app';

export const formatCurrency = (
  amount?: number | null,
  decimalPlaces?: number,
) => {
  if (!amount) return '';
  return new Intl.NumberFormat(appConfig.defaultLocale, {
    style: 'currency',
    currency: appConfig.defaultCurrency,
    minimumFractionDigits: decimalPlaces ?? 0,
    maximumFractionDigits: decimalPlaces ?? 0,
  }).format(amount);
};

export const formatNumber = (
  num?: number | null,
  decimalPlaces?: number,
): string => {
  if (!num) return '';
  return num.toLocaleString(appConfig.defaultLocale, {
    minimumFractionDigits: decimalPlaces ?? 0,
    maximumFractionDigits: decimalPlaces ?? 0,
  });
};
