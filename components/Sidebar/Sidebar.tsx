import styles from './Sidebar.module.scss';
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Navbar />
      <Search />
    </div>
  );
}
