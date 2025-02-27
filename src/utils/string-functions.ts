import { getDialCodeFromCountryCode } from '@/constants/countries';

export const getFullName = (
  firstName: string | null | undefined,
  lastName: string | null | undefined,
) => {
  return `${firstName || ''} ${lastName || ''}`.trim();
};

export const enumToLabel = (str: string) => {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};

export const getFullPhoneNumber = (
  countryCode: string,
  phoneNumber: string,
) => {
  return `${getDialCodeFromCountryCode(countryCode)}${phoneNumber}`.replace(
    /[^\d]/g,
    '',
  );
};
