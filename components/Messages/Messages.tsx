'use client';
import styles from './Messages.module.scss';
import React, { useContext } from 'react';
import Message from '../Message/Message';
import { ChatContext } from '@/context/ChatContext';
import { useMessages } from '@/hooks/useMessages';

export default function Messages() {
  const { data: chatContextData } = useContext(ChatContext);
  const chatMessages = useMessages(chatContextData.chatId ? chatContextData.chatId : '', chatContextData.chatId !== null);
  return (
    <div className={styles.messages}>
      {chatMessages.isLoading && <p>Loading...</p>}
      {chatMessages.data && chatMessages.data.chats.messages.map((message: any) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
}