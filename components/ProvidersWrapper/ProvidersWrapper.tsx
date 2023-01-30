'use client';
import { SessionProvider } from 'next-auth/react';
import { ChatContextProvider } from '@/context/ChatContext';

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChatContextProvider>
        {children}
      </ChatContextProvider>
    </SessionProvider>
  );
}
