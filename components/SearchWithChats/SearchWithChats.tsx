import Search from '../Search/Search';
import Chats from '../Chats/Chats';
import { useSelect } from '@/hooks/useSelect';

export default function SearchWithChats() {
  const select = useSelect();
  return (
    <>
      <Search select={select} />
      <Chats select={select} />
    </>
  );
}