import { toast } from 'sonner';

import { enumToLabel } from '@/utils/string-functions';

/**
 * Represents the error structure returned by Next Safe Action when an action fails.
 * This type is used to handle both server-side errors and validation errors from form submissions.
 */
type NextSafeActionError = {
  /** Server-side error message returned by the action */
  serverError?: string;
  /** Validation errors containing form-level and field-level errors from the action */
  validationErrors?:
    | {
        /** Array of form-level error messages */
        formErrors: string[];
        /** Object containing field-specific error messages */
        fieldErrors: {
          [key: string]: string[] | undefined;
        };
      }
    | undefined;
  /** Additional error properties that might be returned by the action */
  [key: string]: unknown;
};

/**
 * Extracts error messages from a Next Safe Action error object and formats them into a structured array.
 * This is useful for displaying errors from server actions in a user-friendly format.
 * @param args - Object containing the Next Safe Action error and input data
 * @returns Array of error messages with their types
 *
 * @example
 * ```typescript
 * const errors = getErrorMessage({
 *   error: {
 *     serverError: "Database connection failed",
 *     validationErrors: {
 *       formErrors: ["Form is invalid"],
 *       fieldErrors: { email: ["Invalid email format"] }
 *     }
 *   },
 *   input: {}
 * });
 * ```
 */
export function getErrorMessage(
  args: OnErrorArgs,
): { type: string; message: string }[] {
  const { error } = args;
  const messages: { type: string; message: string }[] = [];
  if (error.serverError) {
    messages.push({ type: 'Server Error', message: error.serverError });
  }

  if (error.validationErrors) {
    if (error.validationErrors.formErrors.length > 0) {
      error.validationErrors.formErrors.forEach((formError) => {
        messages.push({ type: 'Form Error', message: formError });
      });
    }

    Object.entries(error.validationErrors.fieldErrors).forEach(
      ([field, errors]) => {
        if (errors && errors.length > 0) {
          messages.push({
            type: 'Invalid Input',
            message: `${enumToLabel(field)}: ${errors.join(', ')}`,
          });
        }
      },
    );
  }

  if (!error.serverError && !error.validationErrors) {
    messages.push({
      type: 'Unexpected Error',
      message:
        'An unknown error occurred. If the problem persists, please contact support.',
    });
  }
  return messages;
}

/**
 * Displays Next Safe Action error messages as toast notifications using the sonner library.
 * Handles both server errors and validation errors from form submissions.
 * @param error - The Next Safe Action error object containing server and/or validation errors
 *
 * @example
 * ```typescript
 * showErrorToast({
 *   serverError: "Failed to save data",
 *   validationErrors: {
 *     formErrors: ["Please check your input"],
 *     fieldErrors: { name: ["Name is required"] }
 *   }
 * });
 * ```
 */
export function showErrorToast(error: NextSafeActionError) {
  console.log(error);

  if (error.serverError) {
    toast.error('Server Error', {
      description: error.serverError,
    });
  }

  if (error.validationErrors) {
    if (error.validationErrors.formErrors.length > 0) {
      error.validationErrors.formErrors.forEach((formError) => {
        toast.error('Form Error', {
          description: formError,
        });
      });
    }

    Object.entries(error.validationErrors.fieldErrors).forEach(
      ([field, errors]) => {
        if (errors && errors.length > 0) {
          toast.error(`Validation Error: ${field}`, {
            description: errors.join(', '),
          });
        }
      },
    );
  }

  if (!error.serverError && !error.validationErrors) {
    toast.error('An unexpected error occurred');
  }
}

/**
 * Arguments type for Next Safe Action error handling functions
 */
type OnErrorArgs = {
  /** The Next Safe Action error object containing server and/or validation errors */
  error: NextSafeActionError;
  /** The input data that was passed to the action */
  input: unknown;
};

/**
 * Default error handler for Next Safe Action errors that displays error messages as toast notifications.
 * This is typically used as the onError callback in form submissions.
 * @param args - Object containing the Next Safe Action error and input data
 *
 * @example
 * ```typescript
 * onError({
 *   error: { serverError: "Operation failed" },
 *   input: { id: 123 }
 * });
 * ```
 */
export function onError(args: OnErrorArgs) {
  showErrorToast(args.error);
}
