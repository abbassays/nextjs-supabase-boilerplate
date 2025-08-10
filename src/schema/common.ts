import * as z from 'zod';

export const passwordSchema = z
  .string({ message: 'Password is required' })
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[^A-Za-z0-9]/,
    'Password must contain at least one special character',
  );

export const phoneNumberSchema = z
  .string()
  .min(7, 'Phone number must be at least 7 digits')
  .transform((val) => val.replace(/[^0-9]/g, ''));

export function optional<T>(
  schema: z.ZodType<T>,
): z.ZodType<T | undefined | null> {
  return schema.nullable().optional();
}

const errorMapMessage = (message: string) => {
  return { message };
};

export const requiredString = (name: string): z.ZodString => {
  const errorMessage = `${name} is required`;
  return z
    .string({
      errorMap: () => errorMapMessage(errorMessage),
    })
    .min(1, errorMessage);
};

export const requiredNumber = (name: string): z.ZodNumber => {
  const errorMessage = `${name} is required`;
  return z.coerce
    .number({
      errorMap: () => errorMapMessage(errorMessage),
    })
    .min(1, `${name} must be greater than 0`);
};

export function getZodEnum<T extends string>(
  data: T[],
): z.ZodEnum<[T, ...T[]]> {
  return z.enum([data[0], ...data.slice(1)], {
    invalid_type_error: 'Invalid value',
  });
}
