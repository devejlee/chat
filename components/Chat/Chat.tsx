'use client';
import styles from './Chat.module.scss';
import { useSession } from 'next-auth/react';

export default function Chat() {
  const { data: session } = useSession();
  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <span>{session?.user?.name}</span>
        <div className={styles.chatIcons}>
        </div>
      </div>
    </div>
  );
};