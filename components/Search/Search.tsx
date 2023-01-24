'use client';
import styles from './Search.module.scss';
import { useState, KeyboardEventHandler } from 'react';

export default function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {

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
      {err && <span>User not found!</span>}
      {user && (
        <div className={styles.userChat} onClick={handleSelect}>
          {/* <img src={user.photoURL} alt="" />
          <div className={styles.userChatInfo}>
            <span>{user.name}</span>
          </div> */}
        </div>
      )}
    </div>
  );
};