import { headers } from 'next/headers';

export async function getServerLocation() {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const fullUrl =
    `${protocol}://${host}${headersList.get('x-invoke-path') || ''}`.trim();
  const url = new URL(fullUrl);

  return {
    href: url.href,
    protocol: url.protocol,
    host: url.host,
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
    search: url.search,
    hash: '', // Not available on the server
    origin: url.origin,
  };
}
