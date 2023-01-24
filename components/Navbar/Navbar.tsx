'use client';
import styles from './Navbar.module.scss';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>Live Chat</span>
      <div className={styles.useRouter}>
        {session?.user?.image ? (
          <Image
            src={session?.user?.image}
            alt="user image"
            width={50}
            height={50}
          />
        ) : (
          <div>image</div>
        )}
        <span>{session?.user?.name}</span>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    </div>
  );
}
