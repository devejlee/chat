'use client';
import styles from './Search.module.scss';
import Image from 'next/image';
import { useState, KeyboardEventHandler } from 'react';
import { useSearch } from '@/hooks/useSearch';

export default function Search() {
  const [username, setUsername] = useState('');

  const { trigger, data, error, isMutating } = useSearch();

  const handleSearch = async () => {
    trigger({ name: username });
  };

  const handleKey: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === 'Enter') {
      handleSearch();
    }
  };

  const handleSelect = async () => {

  };

  return (
    <div className={styles.search}>
      <div className={styles.searchForm}>
        <input
          disabled={isMutating}
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {error && <span className={styles.message}>Error searching</span>}
      {isMutating && <span className={styles.message}>Seaching...</span>}
      {!isMutating && data && !data?.user && <span className={styles.message}>User not found!</span>}
      {data?.user && (
        <div className={styles.userChat} onClick={handleSelect}>
          <Image
            src={data?.user.image}
            alt="user image"
            width={50}
            height={50}
          />
          <div className={styles.userChatInfo}>
            <span>{data?.user.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};