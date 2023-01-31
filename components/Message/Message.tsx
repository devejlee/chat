'use client';
import styles from './Message.module.scss';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React, { useRef, useContext } from 'react';
import { ChatContext } from '@/context/ChatContext';

interface MessageProps {
  message: any;
}

export default function Message({ message }: MessageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { data: chatContextData } = useContext(ChatContext);
  const { data: session } = useSession();

  return (
    <div ref={ref}>
      <div className={styles.messageInfo}>
        <Image
          src={session?.user?.image ? session?.user?.image : ''}
          alt="user image"
          width={24}
          height={24}
        />
        <span>just now</span>
      </div>
      <div className={styles.messageContent}>
        <p>{message.text}</p>
        {message.image && <Image src={chatContextData.user.image} alt="user image" width={24} height={24} />}
      </div>
    </div>
  );
}