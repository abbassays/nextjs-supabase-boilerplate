import { Metadata } from 'next';

import { env } from '@/env';

export const appConfig = {
  title: 'Next.js App',
  description:
    'A modern Next.js application with Supabase, React Query, and TypeScript',
  keywords: 'next.js, supabase, react-query, typescript, boilerplate',
  logo: '/logo/main.png',
  defaultLocale: 'en-US',
  defaultCurrency: 'USD',
  defaultCountryCode: 'US',
  appUrl: env.NEXT_PUBLIC_APP_URL,
  appName: env.NEXT_PUBLIC_APP_NAME,
  emails: {
    support: 'support@example.com',
    sender: 'noreply@example.com',
  },
} as const;

export default function getMetadata(): Metadata {
  return {
    metadataBase: new URL(appConfig.appUrl),
    title: { template: `%s | ${appConfig.title}`, default: appConfig.title },
    description: appConfig.description,
    robots: { index: true, follow: true },
    // icons: {
    //   icon: '/favicon/favicon.ico',
    //   shortcut: '/favicon/favicon-16x16.png',
    //   apple: '/favicon/apple-touch-icon.png',
    // },
    // manifest: `/favicon/site.webmanifest`,

    openGraph: {
      url: appConfig.appUrl,
      title: appConfig.title,
      description: appConfig.description,
      siteName: appConfig.title,
      images: [`/main/logo.png`],
      type: 'website',
      locale: appConfig.defaultLocale.replace('-', '_'),
    },

    twitter: {
      card: 'summary_large_image',
      title: appConfig.title,
      description: appConfig.description,
      images: [`/main/logo.png`],
    },
    keywords: [
      'next.js',
      'supabase',
      'react-query',
      'typescript',
      'boilerplate',
      'web development',
    ],
  };
}
