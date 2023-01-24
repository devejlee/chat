'use client';
import styles from './ChatWrapper.module.scss';
import { useSession } from 'next-auth/react';;
import Login from '@/components/Login/Login';
import Sidebar from '@/components/Sidebar/Sidebar';
import Chat from '@/components/Chat/Chat';

export default function ChatWrapper() {
  const { data: session } = useSession();

  return (
    <main>
      {session ? (
        <div className={styles.home}>
          <div className={styles.container}>
            <Sidebar />
            <Chat />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </main>
  );
}
