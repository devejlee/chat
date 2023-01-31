'use client';
import styles from './Chats.module.scss';
import React, { useEffect, useContext } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useChats } from '@/hooks/useChats';
import { ChatData } from '@/typedef';
import { ChatContext } from '@/context/ChatContext';

interface ChatsProps {
  select: {
    isMutating: boolean;
  };
};

export default function Chats({ select }: ChatsProps) {
  const { data: session } = useSession();
  const { data, isLoading, mutate } = useChats(session?.user?.email ? session?.user?.email : '');

  const { dispatch } = useContext(ChatContext);

  const handleSelect = (userInfo: ChatData['userInfo']) => {
    dispatch({ type: 'CHANGE_USER', payload: userInfo });
  };

  useEffect(() => {
    if (!select.isMutating) {
      mutate();
    }
  }, [select.isMutating, mutate]);

  const chats = data && data.userChats && Object.entries(data?.userChats) as Array<[string, ChatData]>;
  const sortedChats = chats && [...chats]?.sort((a: [string, ChatData], b: [string, ChatData]) => (b[1].date._seconds || 0) - (a[1].date._seconds || 0));
  const sortedChatsFirstUserInfo = sortedChats?.[0]?.[1].userInfo;

  useEffect(() => {
    if (sortedChatsFirstUserInfo) {
      dispatch({ type: 'CHANGE_USER', payload: sortedChatsFirstUserInfo });
    }
  }, [sortedChatsFirstUserInfo, dispatch]);

  return (
    <div className={styles.chats}>
      <div className={styles.chats}>
        {isLoading || select.isMutating ? <p className={styles.message}>Loading...</p>
          : <>
            {sortedChats?.map((chat: [string, ChatData]) => (
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