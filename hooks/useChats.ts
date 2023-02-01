import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const useChats = (slug: string) => {
  const { data, isLoading, error, mutate } = useSWR(`/api/userChats/?email=${slug}`, fetcher, {
    refreshInterval: 500
  });

  return {
    data,
    isLoading,
    error,
    mutate
  };
};