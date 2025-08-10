import { User } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { supabase } from '@/lib/supabase/client';

import { QueryKeys } from '@/constants/query-keys';

export const useUser = () => {
  const queryClient = useQueryClient();
  const queryData = useQuery<User | null>({
    queryKey: [QueryKeys.USER],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData([QueryKeys.USER], session?.user ?? null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return queryData;
};
