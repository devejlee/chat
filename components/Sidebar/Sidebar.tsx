'use client';
import styles from './Sidebar.module.scss';
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';
import Chats from '../Chats/Chats';
import { useSelect } from '@/hooks/useSelect';

export default function Sidebar() {
  const select = useSelect();

  return (
    <div className={styles.sidebar}>
      <Navbar />
      <Search select={select} />
      <Chats select={select} />
    </div>
  );
}
