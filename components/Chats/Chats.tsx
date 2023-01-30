'use client';
import styles from './Chats.module.scss';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useChats } from '@/hooks/useChats';

interface Chat {
  userInfo: {
    name: string;
    email: string;
  };
  date: {
    _seconds: number;
    _nanoseconds: number;
  };
}

export default function Chats() {
  const { data: session } = useSession();
  const { data, isMutating, trigger } = useChats();

  useEffect(() => {
    if (session?.user?.email) {
      trigger({ email: session?.user.email });
    }
  }, [session?.user?.email, trigger]);

  const handleSelect = (u: Chat['userInfo']) => {
    // dispatch({ type: "CHANGE_USER", payload: u });
  };

  const chats = data && data.userChats && Object.entries(data?.userChats) as Array<[string, Chat]>;

  return (
    <div className={styles.chats}>
      <div className={styles.chats}>
        {isMutating && <p>Loading...</p>}
        {chats?.sort((a: [string, Chat], b: [string, Chat]) => (b[1].date._seconds || 0) - (a[1].date._seconds || 0))
          .map((chat: [string, Chat]) => (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              {/* <img src={chat[1].userInfo.image} alt="" /> */}
              <div className="userChatInfo">
                <span>{chat[1].userInfo.name}</span>
                <br />
                <span>{chat[1].userInfo.email}</span>
                {/* <p>{chat[1].lastMessage?.text}</p> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}