'use client';
import styles from './Search.module.scss';
import Image from 'next/image';
import { useState, KeyboardEventHandler } from 'react';

interface User {
  image: string;
  name: string;
}

export default function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    try {
      const res = await fetch('/api/searchUsers', {
        method: 'POST',
        body: JSON.stringify({ name: username }),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      if (!res.ok) {
        throw new Error(`Error searching user: ${res.status}`);
      }
      const data = await res.json();
      console.log('data', data);
      if (data.user) {
        setErr(false);
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
      setErr(true);
      setUser(null);
    }
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
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span className={styles.error}>User not found!</span>}
      {user && (
        <div className={styles.userChat} onClick={handleSelect}>
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
      )}
    </div>
  );
};