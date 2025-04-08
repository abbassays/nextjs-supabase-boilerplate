export const getFullName = (
  firstName: string | null | undefined,
  lastName: string | null | undefined,
) => {
  return `${firstName || ''} ${lastName || ''}`.trim();
};

export const getInitials = (
  firstName: string | null | undefined,
  lastName: string | null | undefined,
) => {
  return `${firstName?.[0]}${lastName?.[0]}`.trim();
};

export const enumToLabel = (str?: string | null) => {
  if (!str) return '';
  return str.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};
