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

  const imageSrc = message.senderId === session?.user?.email ? session?.user?.image || '' : chatContextData.user.image;

  return (
    <div ref={ref} className={`${styles.message} ${message.senderId === session?.user?.email && styles.owner}`}>
      <div className={styles.messageInfo}>
        <Image
          src={imageSrc}
          alt="current user image"
          width={24}
          height={24}
        />
        <span>just now</span>
      </div>
      <div className={styles.messageContent}>
        <p>{message.text}</p>
        {message.image && <Image src={message.image} alt="selected user image" width={100} height={100} />}
      </div>
    </div>
  );
}