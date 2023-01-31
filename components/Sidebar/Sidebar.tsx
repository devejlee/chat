import styles from './Sidebar.module.scss';
import Navbar from '../Navbar/Navbar';
import SearchWithChats from '../SearchWithChats/SearchWithChats';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Navbar />
      <SearchWithChats />
    </div>
  );
}
