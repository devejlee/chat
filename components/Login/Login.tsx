'use client';
import styles from './Login.module.scss';
import { useSession, signIn, signOut } from 'next-auth/react';
import UserCard from '../UserCard/UserCard';

export default function Login() {
  const { data: session } = useSession();
  console.log('session: ', session);
  if (session) {
    return (
      <div className={styles.wrapper}>
        <button onClick={() => signOut()}>
          Sign out of Google
        </button>
        <UserCard user={session?.user} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={() => signIn('google')}>
        Sign in with Google
      </button>
    </div>
  );
}
