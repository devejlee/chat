'use client';
import styles from './Chat.module.scss';
import { useSession } from 'next-auth/react';
import { BsCameraVideoFill, BsPersonPlusFill } from 'react-icons/bs';
import { FaEllipsisH } from 'react-icons/fa';

export default function Chat() {
  const { data: session } = useSession();
  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <span>{session?.user?.name}</span>
        <div className={styles.chatIcons}>
          <BsCameraVideoFill />
          <BsPersonPlusFill />
          <FaEllipsisH />
        </div>
      </div>
    </div>
  );
};