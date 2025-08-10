import { useQuery } from '@tanstack/react-query';

import { authQuery } from '@/lib/client/auth-query';

import { QueryKeys } from '@/constants/query-keys';

export const useSample = () => {
  return useQuery({
    queryKey: [QueryKeys.SAMPLE],
    queryFn: authQuery(async ({ supabase }) => {
      const { data, error } = await supabase
        .from('sample')
        .select('*')
        .order('created_at');

      if (error) throw new Error(error.message);
      return data;
    }),
  });
};
