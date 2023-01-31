'use client';
import styles from './Modal.module.scss';
import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  text: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Modal({ children, text, isOpen, setIsOpen }: ModalProps) {
  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <p>{text}</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
      {children}
    </>
  );
};