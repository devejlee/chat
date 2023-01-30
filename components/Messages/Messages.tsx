'use client';
import styles from './Messages.module.scss';
import React, { useState, useContext } from 'react';
import Message from '../Message/Message';
import { ChatContext } from '@/context/ChatContext';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  return (
    <div className={styles.messages}>
      {messages.map((m: any) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
}