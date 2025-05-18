import { headers } from 'next/headers';

/**
 * Retrieves the current server location information from request headers.
 * This function is useful for getting the current URL information in server-side contexts,
 * particularly in Next.js server components or API routes.
 *
 * @returns {Promise<{
 *   href: string;
 *   protocol: string;
 *   host: string;
 *   hostname: string;
 *   port: string;
 *   pathname: string;
 *   search: string;
 *   hash: string;
 *   origin: string;
 * }>} An object containing various URL components
 *
 * @example
 * ```typescript
 * const location = await getServerLocation();
 * console.log(location.host); // e.g., "example.com:3000"
 * console.log(location.protocol); // e.g., "https:"
 * ```
 */
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

/**
 * Type definitions for the Result type system that provides type-safe error handling
 */

/**
 * Represents a successful operation with data of type T
 */
type Success<T> = {
  data: T;
  error: null;
};

/**
 * Represents a failed operation with error of type E
 */
type Failure<E> = {
  data: null;
  error: E;
};

/**
 * A discriminated union type that represents either a successful or failed operation
 * @template T - The type of the successful data
 * @template E - The type of the error, defaults to Error
 */
type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Wraps an async operation in a type-safe error handler that returns a Result type.
 * This utility helps handle async operations without try-catch blocks in the calling code,
 * while maintaining type safety and proper error handling.
 *
 * @template T - The type of the successful data (automatically inferred from the promise)
 * @template E - The type of the error, defaults to Error
 * @param asyncFn - An async function or promise to be executed
 * @returns A Promise that resolves to a Result containing either the data or the error
 *
 * @example
 * ```typescript
 * // Example with async function - return type is automatically inferred
 * async function fetchUser(id: string) {
 *   const response = await fetch(`/api/users/${id}`);
 *   return response.json() as Promise<User>;
 * }
 *
 * // Type is automatically inferred as Result<User, Error>
 * const result = await tryCatch(() => fetchUser("123"));
 * if (result.error) {
 *   console.error('Failed to fetch user:', result.error);
 *   return;
 * }
 * // TypeScript knows result.data is User type here
 * console.log(result.data.name);
 *
 * // Also works with direct promises
 * const result2 = await tryCatch(fetch('https://api.example.com/data'));
 * ```
 */
export async function tryCatch<T, E = Error>(
  asyncFn: Promise<T> | (() => Promise<T>),
): Promise<Result<T, E>> {
  try {
    const promise = typeof asyncFn === 'function' ? asyncFn() : asyncFn;
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
