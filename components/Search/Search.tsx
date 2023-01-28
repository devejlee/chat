'use client';
import styles from './Search.module.scss';
import Image from 'next/image';
import { useSession } from 'next-auth/react';;
import { useState, KeyboardEventHandler } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { useSelect } from '@/hooks/useSelect';

export default function Search() {
  const [username, setUsername] = useState('');

  const { data: session } = useSession();
  const search = useSearch();
  const select = useSelect();

  const handleSearch = async () => {
    search.trigger({ name: username });
  };

  const handleKey: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === 'Enter') {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    let combinedId = '';
    if (session?.user?.email) {
      combinedId = `${session?.user?.email}+${search.data?.user?.email}`;
      select.trigger({
        combinedId: combinedId,
        user: search.data?.user
      });
    }
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchForm}>
        <input
          disabled={search.isMutating}
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {search.error && <span className={styles.message}>Error searching</span>}
      {search.isMutating && <span className={styles.message}>Seaching...</span>}
      {!search.isMutating && search.data && !search.data?.user && <span className={styles.message}>User not found!</span>}
      {!search.isMutating && search.data?.user && (
        <div className={styles.userChat} onClick={handleSelect}>
          <Image
            src={search.data?.user.image}
            alt="user image"
            width={50}
            height={50}
          />
          <div className={styles.userChatInfo}>
            <span>{search.data?.user.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};