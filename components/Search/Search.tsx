'use client';
import styles from './Search.module.scss';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState, KeyboardEventHandler } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { useSelect } from '@/hooks/useSelect';
import { DataUser } from '@/typedef';

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

  const handleSelect = async (user: DataUser) => {
    let combinedId = '';
    if (session?.user?.email) {
      combinedId = `${session?.user?.email}+${user.email}`;
      select.trigger({
        selectedUser: user,
        currentUser: session.user
      });
    }
    search.reset();
    setUsername('');
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
      {!search.isMutating && search.data && !search.data?.users && <span className={styles.message}>Users not found!</span>}
      {!search.isMutating && search.data?.users && (
        <div className={styles.userList}>
          {search.data?.users.map((user) => (
            <div className={styles.userChat} key={user.email} onClick={() => handleSelect(user)}>
              <Image
                src={user.image}
                alt="user image"
                width={50}
                height={50}
              />
              <div className={styles.userChatInfo}>
                <span>{user.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};