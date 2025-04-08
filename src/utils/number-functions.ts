export const formatCurrency = (
  amount?: number | null,
  decimalPlaces?: number,
) => {
  if (!amount) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimalPlaces ?? 0,
    maximumFractionDigits: decimalPlaces ?? 0,
  }).format(amount);
};

export const formatNumber = (
  num?: number | null,
  decimalPlaces?: number,
): string => {
  if (!num) return '';
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimalPlaces ?? 0,
    maximumFractionDigits: decimalPlaces ?? 0,
  });
};
