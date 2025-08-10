'use server';

import { authActionClient } from '@/lib/server/safe-action';

import { sampleSchema } from '@/schema/sample';

export const createSample = authActionClient
  .schema(sampleSchema)
  .action(async ({ parsedInput, ctx: { supabase } }) => {
    const { error: createError } = await supabase
      .from('sample')
      // @ts-expect-error - This error won't occur when we use actual table
      .insert(parsedInput);

    if (createError) throw new Error(createError.message);

    return { success: true };
  });
