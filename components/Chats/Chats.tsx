'use client';
import styles from './Chats.module.scss';
import React, { useEffect, useContext } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useChats } from '@/hooks/useChats';
import { Chat } from '@/typedef';
import { ChatContext } from '@/context/ChatContext';

interface ChatsProps {
  select: {
    isMutating: boolean;
  };
};

export default function Chats({ select }: ChatsProps) {
  const { data: session } = useSession();
  const userChats = useChats(session?.user?.email ? session?.user?.email : '');

  const { dispatch } = useContext(ChatContext);

  const handleSelect = (userInfo: Chat['userInfo']) => {
    dispatch({ type: 'CHANGE_USER', payload: userInfo });
  };

  useEffect(() => {
    if (!select.isMutating) {
      userChats.mutate();
    }
  }, [select.isMutating, userChats.mutate]);

  const chats = userChats.data && userChats.data.userChats && Object.entries(userChats.data?.userChats) as Array<[string, Chat]>;

  return (
    <div className={styles.chats}>
      <div className={styles.chats}>
        {userChats.isLoading || select.isMutating ? <p className={styles.message}>Loading...</p>
          : <>
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
          </>}
      </div>
    </div>
  );
}