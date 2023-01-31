'use client';
import styles from './Chat.module.scss';
import { useContext } from 'react';
import { BsCameraVideoFill, BsPersonPlusFill } from 'react-icons/bs';
import { FaEllipsisH } from 'react-icons/fa';
import { ChatContext } from '@/context/ChatContext';
import MessagesWithInput from '../MessagesWithInput/MessagesWithInput';

export default function Chat() {
  const { data } = useContext(ChatContext);
  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <span>{data.user?.name}</span>
        <div className={styles.chatIcons}>
          <BsCameraVideoFill />
          <BsPersonPlusFill />
          <FaEllipsisH />
        </div>
      </div>
      <MessagesWithInput />
    </div>
  );
};