
import React, { Suspense } from 'react';

import { env } from '@/env';

import IdentifyUser from './identify';
import PageView from './page-view';

const PosthogAnalytics = () => {
  if (!env.NEXT_PUBLIC_POSTHOG_HOST) return null;
  return (
    <>
      <IdentifyUser />
      <Suspense>
        <PageView />
      </Suspense>
    </>
  );
};

export default PosthogAnalytics;
