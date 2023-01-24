'use client';
import styles from './Messages.module.scss';
import React, { useState } from 'react';
import Message from '../Message/Message';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  return (
    <div className={styles.messages}>
      {messages.map((m: any) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
}