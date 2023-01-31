'use client';
import styles from './Messages.module.scss';
import React, { useContext, useEffect } from 'react';
import Message from '../Message/Message';
import { ChatContext } from '@/context/ChatContext';
import { useMessages } from '@/hooks/useMessages';
import { MessageData } from '@/typedef';

interface MessagesProps {
  sendMessages: {
    isMutating: boolean;
  };
};

export default function Messages({ sendMessages }: MessagesProps) {
  const { data: chatContextData } = useContext(ChatContext);
  const { data, isLoading, mutate } = useMessages(chatContextData.chatId ? chatContextData.chatId : '', chatContextData.chatId !== null);

  useEffect(() => {
    if (!sendMessages.isMutating) {
      mutate();
    }
  }, [sendMessages.isMutating, mutate]);

  return (
    <div className={styles.messages}>
      {isLoading && <p>Loading...</p>}
      {data && data?.chats?.messages.map((message: MessageData) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
}