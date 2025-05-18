'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

import { PosthogEventKeys } from '@/constants/posthog-events';

export default function PageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  useEffect(() => {
    // Track pageviews
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture(PosthogEventKeys.PAGE_VIEW, {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}
