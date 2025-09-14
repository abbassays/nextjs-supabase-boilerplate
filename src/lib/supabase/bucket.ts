import { createSupabaseBrowserClient } from '@/lib/supabase/client';

import { env } from '@/env';

export type TBucket = 'bucket-name';
/**
  This function uploads a file to the supabase bucket
  @param file The file to be uploaded
  @param filePath The file path
  @param bucket The bucket name
*/
export const uploadToSupabase = async (
  file: File | Blob | Buffer | ArrayBuffer,
  filePath: string,
  bucket: TBucket,
) => {
  const supabase = createSupabaseBrowserClient();

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { upsert: true });
  if (error) return { url: null, error };

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return { url: publicUrl, error: null };
};

/**
 * This function checks if the given URL is a Supabase URL.
 * @param url The URL to check
 * @returns boolean
 */
export function isSupabaseURL(url: string) {
  if (!url) return false;
  // Check if the URL has the supabase URL as a prefix
  const supabaseURL = env.NEXT_PUBLIC_SUPABASE_URL as string;
  if (!url) return false;
  return url.includes(supabaseURL);
}

/**
 * This function deletes files from the supabase bucket
 * @param files An array of objects containing the file path and bucket name
 * @returns An object containing errors that occurred and a success flag
 */
export const deleteFilesFromSupabase = async (
  files: {
    path: string;
    bucket: TBucket;
  }[],
) => {
  const supabase = createSupabaseBrowserClient();
  const buckets = Array.from(new Set(files.map((file) => file.bucket)));
  let bucketUrls: Record<TBucket, string>;
  for (const bucket of buckets) {
    const bucketUrl = await getSupabaseImageURL({ bucket, filePath: '' });
    bucketUrls = { [bucket]: bucketUrl } as Record<TBucket, string>;
  }

  // remove supabaseUrl from the path
  const newURLs = files.map((file) => ({
    path: file.path.replace(bucketUrls[file.bucket], ''),
    bucket: file.bucket,
  }));

  // remove files from each of the buckets
  const results = await Promise.all(
    buckets.map(async (bucket) => {
      const urls = newURLs
        .filter((file) => file.bucket === bucket)
        .map((file) => file.path);
      if (urls.length === 0) return null;
      const { error } = await supabase.storage.from(bucket).remove(urls);
      if (error) {
        return { bucket, error };
      }
      return null;
    }),
  );

  const errors = results.filter((result) => result !== null);
  if (errors.length > 0) {
    return {
      errors,
      success: false,
    };
  }

  return {
    errors: [],
    success: true,
  };
};

/**
 * This function returns the supabase url of a file path
 * @param bucket The bucket name where the file is stored
 * @param filePath The file path
 * @returns The public url of the file
 */
export const getSupabaseImageURL = async ({
  filePath,
  bucket,
}: {
  filePath: string;
  bucket: TBucket;
}) => {
  const supabase = createSupabaseBrowserClient();
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return publicUrl;
};

/**
 * This function returns the file paths from the supabase url
 * @param urls An array of supabase urls
 * @param bucket The bucket name
 * @returns An array of file paths
 */
export const getPathFromURL = (urls: string[], bucket: TBucket) => {
  const supabase = createSupabaseBrowserClient();
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl('');
  return urls.map((url) => url.replace(publicUrl, ''));
};
