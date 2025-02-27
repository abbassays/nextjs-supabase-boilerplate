import { User } from '@supabase/supabase-js';
import { z, ZodError, ZodSchema } from 'zod';

import { createSupabaseBrowserClient } from '../supabase/client';

type UserType = 'your-custom-user-type' | 'another-custom-user-type';

type SchemaType<T> = T extends ZodSchema ? z.infer<T> : undefined;

type QueryFunctionContext<T extends ZodSchema | undefined> = {
  user: User;
  supabase: ReturnType<typeof createSupabaseBrowserClient>;
  params: SchemaType<T>;
};

type QueryHandler<T extends ZodSchema | undefined, R> = (
  ctx: QueryFunctionContext<T>,
) => Promise<R>;

type QueryOptions<T extends ZodSchema | undefined> = {
  paramsSchema?: T;
  userType?: UserType | UserType[];
};

export function authQuery<T extends ZodSchema | undefined, R>(
  handler: QueryHandler<T, R>,
  options: QueryOptions<T> = {},
) {
  return async (params?: SchemaType<T>): Promise<R> => {
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw new Error('Unauthorized');
    }
    const user = data.user;
    if (typeof options.userType === 'string') {
      if (user.user_metadata.user_type !== options.userType) {
        throw new Error(
          `You must be a ${options.userType} to access this data`,
        );
      }
    }
    if (Array.isArray(options.userType)) {
      if (!options.userType.includes(user.user_metadata.user_type)) {
        throw new Error(
          `You must be a ${options.userType.join(' or ')} to access this data`,
        );
      }
    }

    if (options.paramsSchema) {
      try {
        params = options.paramsSchema.parse(params);
      } catch (error) {
        if (error instanceof ZodError) {
          throw new Error('Invalid parameters');
        }
        throw error;
      }
    }

    return handler({ user, supabase, params: params as SchemaType<T> });
  };
}
