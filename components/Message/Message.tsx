'use client';
import styles from './Message.module.scss';
import Image from 'next/image';
import React, { useRef } from 'react';

interface MessageProps {
  message: any;
}

export default function Message({ message }: MessageProps) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref}>
      <div className={styles.messageInfo}>
        <Image
          src={''}
          alt="user image"
          width={24}
          height={24}
        />
        <span>just now</span>
      </div>
      <div className={styles.messageContent}>
        <p>{message.text}</p>
        {message.img && <Image src={''} alt="user image" width={24} height={24} />}
      </div>
    </div>
  );
}