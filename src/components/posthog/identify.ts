'use client';

import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';

import { createSupabaseBrowserClient } from '@/lib/supabase/client';

import { PosthogEventKeys } from '@/constants/posthog-events';

type TUserIdentify = {
  email: string | undefined;
  id: string;
};

export default function Identify() {
  const posthog = usePostHog();
  const supabase = createSupabaseBrowserClient();
  const [user, setUser] = useState<TUserIdentify | null>(null);

  // subscribe to supabase auth changes
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser({
          email: session.user.email,
          id: session.user.id,
        });
      } else if (event === 'SIGNED_OUT') {
        posthog.reset();
        window.location.replace('/auth/sign-in');
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [posthog, supabase]);

  useEffect(() => {
    if (user?.id && user?.email) {
      posthog.identify(user.id, { email: user.email });
      posthog.capture(PosthogEventKeys.LOGIN, { email: user.email });
    }
  }, [user?.id, user?.email, posthog]);

  return null;
}
