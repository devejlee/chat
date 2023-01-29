import useSWRMutation from 'swr/mutation';

const fetcher = async (url: string, { arg }: { arg: { email: string } }) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  });
  return await res.json();
};

export const useChats = () => {
  const { trigger, reset, data, error, isMutating } = useSWRMutation('/api/userChats', fetcher);

  return {
    trigger,
    reset,
    data,
    error,
    isMutating
  };
};