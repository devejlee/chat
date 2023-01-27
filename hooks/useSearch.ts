import useSWRMutation from 'swr/mutation';

const fetcher = async (url: string, { arg }: { arg: { name: string } }) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  });
  return await res.json();
};

export const useSearch = () => {
  const { trigger, data, isMutating } = useSWRMutation('/api/searchUsers', fetcher);

  return {
    trigger,
    data,
    isMutating
  };
};