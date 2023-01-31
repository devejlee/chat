'use client';
import styles from './Messages.module.scss';
import React, { useState, useContext, useEffect } from 'react';
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
  const [messages, setMessages] = useState<any>([]);

  const { data: chatContextData } = useContext(ChatContext);
  const slug = chatContextData.chatId ? chatContextData.chatId : '';
  const encodedSlug = encodeURIComponent(slug);
  const { data, isLoading, mutate } = useMessages(chatContextData.chatId ? chatContextData.chatId : '', chatContextData.chatId !== null);

  useEffect(() => {
    if (!sendMessages.isMutating) {
      mutate();
    }
  }, [sendMessages.isMutating, mutate]);

  useEffect(() => {
    if (!encodedSlug) {
      return;
    }
    const eventSource = new EventSource(`/api/messages?chatId=${encodedSlug}`);

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(message);
    };

    return () => {
      eventSource.close();
    };
  }, [encodedSlug]);

  return (
    <div className={styles.messages}>
      {isLoading && <p>Loading...</p>}
      {messages?.chats?.messages.map((message: MessageData) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
}