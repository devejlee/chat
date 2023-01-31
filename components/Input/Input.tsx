'use client';
import styles from './Input.module.scss';
import { useSession } from 'next-auth/react';
import { useState, useContext } from 'react';
import { BsPaperclip } from 'react-icons/bs';
import { AiOutlinePicture } from 'react-icons/ai';
import { ChatContext } from '@/context/ChatContext';
import { CurrentUser } from '@/typedef';

interface InputProps {
  sendMessages: {
    trigger: (selectedUser: { selectedUser: CurrentUser; currentUser: CurrentUser, text: string }) => void;
  };
};

export default function Input({ sendMessages }: InputProps) {
  const [text, setText] = useState('');
  const [img, setImg] = useState<File | null>(null);

  const { data: session } = useSession();
  const { data: chatContextData } = useContext(ChatContext);

  const handleSend = async () => {
    if (session?.user?.email) {
      sendMessages.trigger({
        selectedUser: chatContextData.user,
        currentUser: session.user,
        text: text
      });
    }
    setText('');
  };

  return (
    <div className={styles.input}>
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className={styles.send}>
        <BsPaperclip />
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={(e) => setImg(e.target.files ? e.target.files[0] : null)}
        />
        <label htmlFor="file">
          <AiOutlinePicture />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}