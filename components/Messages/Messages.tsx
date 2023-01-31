'use client';
import styles from './Messages.module.scss';
import React, { useState, useContext, useEffect } from 'react';
import Message from '../Message/Message';
import { ChatContext } from '@/context/ChatContext';
import { useMessages } from '@/hooks/useMessages';
import { MessageData } from '@/typedef';

export default function Messages() {
  const [messages, setMessages] = useState<Array<MessageData>>([]);

  const { data: chatContextData } = useContext(ChatContext);
  const slug = chatContextData.chatId ? chatContextData.chatId : '';
  const encodedSlug = encodeURIComponent(slug);
  const { isLoading } = useMessages(chatContextData.chatId || '', Boolean(chatContextData.chatId));

  useEffect(() => {
    if (!encodedSlug) {
      return;
    }
    const eventSource = new EventSource(`/api/messages?chatId=${encodedSlug}`);

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(message?.chats?.messages);
    };

    return () => {
      eventSource.close();
    };
  }, [encodedSlug]);

  return (
    <div className={styles.messages}>
      {isLoading && <p>Loading...</p>}
      {messages?.map((message: MessageData) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
}