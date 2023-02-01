import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const useMessages = (slug: string, shouldFetch: boolean) => {
  const encodedSlug = encodeURIComponent(slug);
  const { data, isLoading, error, mutate } = useSWR(
    shouldFetch ? `/api/messages/?chatId=${encodedSlug}` : null,
    fetcher, {
      refreshInterval: 500
    }
  );

  return {
    data,
    isLoading,
    error,
    mutate
  };
};