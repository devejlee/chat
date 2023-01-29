'use client';
import styles from './Chats.module.scss';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useChats } from '@/hooks/useChats';

interface Chat {
  userInfo: any;
  lastMessage?: { text: string };
  date?: number;
}

export default function Chats() {
  const { data: session } = useSession();
  const { data, trigger } = useChats();

  useEffect(() => {
    if (session?.user?.email) {
      trigger({ email: session?.user.email });
    }
  }, [session?.user?.email, trigger]);

  const handleSelect = (u: any) => {
    // dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className={styles.chats}>
      <div className={styles.chats}>
        {/* {data && data.sort((a, b) => (b.date ? b.date : 0) - (a.date ? a.date : 0)).map((chat) => (
          <div
            className={styles.userChat}
            key={'chat[0]'}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <Image
              src={'chat[1].userInfo.photoURL'}
              alt="user image"
              width={24}
              height={24}
            />
            <div className={styles.userChatInfo}>
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))} */}
      </div>

    </div>
  );
}