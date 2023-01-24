'use client';
import styles from './Chats.module.scss';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';

interface Chat {
  userInfo: any;
  lastMessage?: { text: string };
  date?: number;
}

export default function Chats() {
  const [chats, setChats] = useState<Chat[]>([]);

  const handleSelect = (u: any) => {
    // dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className={styles.chats}>
      {chats && chats.sort((a, b) => (b.date ? b.date : 0) - (a.date ? a.date : 0)).map((chat) => (
        <div
          className={styles.userChat}
          key={'chat[0]'}
        // onClick={() => handleSelect(chat[1].userInfo)}
        >
          <Image
            src={'chat[1].userInfo.photoURL'}
            alt="user image"
            width={24}
            height={24}
          />
          <div className={styles.userChatInfo}>
            {/* <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
}