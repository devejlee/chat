import useSWRMutation from 'swr/mutation';
import { DataUser } from '@/typedef';

const fetcher = async (url: string, { arg }: { arg: { combinedId: string, selectedUser: DataUser } }) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  });
  return await res.json();
};

export const useSelect = () => {
  const { trigger, data, error, isMutating } = useSWRMutation<any>('/api/selectUsers', fetcher);

  return {
    trigger,
    data,
    error,
    isMutating
  };
};