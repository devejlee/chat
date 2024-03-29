'use client';
import styles from './Input.module.scss';
import { useSession } from 'next-auth/react';
import { useState, useContext, KeyboardEventHandler, useEffect } from 'react';
import { BsPaperclip } from 'react-icons/bs';
import { AiOutlinePicture } from 'react-icons/ai';
import { ChatContext } from '@/context/ChatContext';
import { CurrentUser } from '@/typedef';
import Modal from '../Modal/Modal';

interface InputProps {
  sendMessages: {
    trigger: (selectedUser: { selectedUser: CurrentUser; currentUser: CurrentUser, text: string }) => void;
    isMutating: boolean;
  };
};

export default function Input({ sendMessages }: InputProps) {
  const [text, setText] = useState('');
  const [img, setImg] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();
  const { data: chatContextData, dispatch } = useContext(ChatContext);

  const handleKey: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      handleSend();
    }
  };

  const handleSend = async () => {
    if (text.length === 0) {
      return;
    }
    if (!chatContextData.user.name) {
      setIsOpen(true);
      return;
    }
    if (session?.user?.email) {
      sendMessages.trigger({
        selectedUser: chatContextData.user,
        currentUser: session.user,
        text: text
      });
    }
    setText('');
  };

  useEffect(() => {
    if (sendMessages.isMutating) {
      dispatch({ type: 'SENDING_MESSAGE' });
    } else {
      dispatch({ type: 'NOT_SENDING_MESSAGE' });
    }
  }, [sendMessages.isMutating, dispatch]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} text={<>Open the mobile menu and search for a user to chat. <br /> Try: Elijah Lee</>}>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
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
    </Modal>
  );
}