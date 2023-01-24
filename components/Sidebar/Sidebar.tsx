import styles from './Sidebar.module.scss';
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';
import Chats from '../Chats/Chats';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
}
