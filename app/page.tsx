import { Inter } from '@next/font/google';
import styles from './page.module.scss';
import Login from '@/components/Login/Login';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={styles.main}>
      <h3>Log in</h3>
      <Login />
    </main>
  );
}
