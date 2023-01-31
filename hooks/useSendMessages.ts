import { DataPayload } from '@/typedef';
import useSWRMutation from 'swr/mutation';
import { DataUser, CurrentUser } from '@/typedef';

const fetcher = async (url: string, { arg }: { arg: { selectedUser: DataUser, currentUser: CurrentUser, text: string } }) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  });
  return await res.json();
};

export const useSendMessages = () => {
  const { trigger, data, error, isMutating } = useSWRMutation<DataPayload>('/api/sendMessages', fetcher);

  return {
    trigger,
    data,
    error,
    isMutating
  };
};