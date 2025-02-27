import { toast } from 'sonner';

type ErrorObject = {
  serverError?: string;
  validationErrors?:
    | {
        formErrors: string[];
        fieldErrors: {
          [key: string]: string[] | undefined;
        };
      }
    | undefined;
  [key: string]: unknown;
};

export function showErrorToast(error: ErrorObject) {
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
type OnErrorArgs = {
  error: ErrorObject;
  input: unknown;
};
export function onError(args: OnErrorArgs) {
  showErrorToast(args.error);
}
