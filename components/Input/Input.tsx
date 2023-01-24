'use client';
import styles from './Input.module.scss';
import { useState } from 'react';
import { BsPaperclip } from 'react-icons/bs';
import { AiOutlinePicture } from 'react-icons/ai';

export default function Input() {
  const [text, setText] = useState('');
  const [img, setImg] = useState<File | null>(null);

  const handleSend = async () => {

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