'use client';
import styles from './Messages.module.scss';
import React, { useState, useContext } from 'react';
import Message from '../Message/Message';
import { ChatContext } from '@/context/ChatContext';
import { useMessages } from '@/hooks/useMessages';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { data: chatContextData } = useContext(ChatContext);
  const { data, isLoading, mutate } = useMessages(chatContextData.chatId ? chatContextData.chatId : '', chatContextData.chatId !== null);
  return (
    <div className={styles.messages}>
      {messages.map((m: any) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
}