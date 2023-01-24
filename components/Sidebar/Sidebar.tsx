import styles from './Sidebar.module.scss';
import Navbar from '../Navbar/Navbar';

export default function Sidebar() {

  return (
    <div className={styles.sidebar}>
      <Navbar />
    </div>
  );
}
