'use client';
import styles from './Chats.module.scss';
import React, { useEffect, useContext } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useChats } from '@/hooks/useChats';
import { Chat } from '@/typedef';
import { ChatContext } from '@/context/ChatContext';

export default function Chats() {
  const { data: session } = useSession();
  const { data, isMutating, trigger } = useChats();

  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (session?.user?.email) {
      trigger({ email: session?.user.email });
    }
  }, [session?.user?.email, trigger]);

  const handleSelect = (userInfo: Chat['userInfo']) => {
    dispatch({ type: 'CHANGE_USER', payload: userInfo });
  };

  const chats = data && data.userChats && Object.entries(data?.userChats) as Array<[string, Chat]>;

  return (
    <div className={styles.chats}>
      <div className={styles.chats}>
        {isMutating && <p>Loading...</p>}
        {chats?.sort((a: [string, Chat], b: [string, Chat]) => (b[1].date._seconds || 0) - (a[1].date._seconds || 0))
          .map((chat: [string, Chat]) => (
            <div
              className={styles.userChat}
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <Image
                src={chat[1].userInfo.image}
                alt="user image"
                width={50}
                height={50}
              />
              <div className={styles.userChatInfo}>
                <span>{chat[1].userInfo.name}</span>
                {/* <p>{chat[1].lastMessage?.text}</p> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}