'use client';
import styles from './Chat.module.scss';
import { useContext } from 'react';
import { BsCameraVideoFill, BsPersonPlusFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaEllipsisH } from 'react-icons/fa';
import { ChatContext } from '@/context/ChatContext';
import MessagesWithInput from '../MessagesWithInput/MessagesWithInput';

export default function Chat() {
  const { data } = useContext(ChatContext);

  const handleButtonClick = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('show');
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <div className={styles.buttonWrap}>
          <button onClick={handleButtonClick}>
            <GiHamburgerMenu />
          </button>
          <span>{data.user?.name}</span>
        </div>
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