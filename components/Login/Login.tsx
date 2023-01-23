'use client';
import styles from './Login.module.scss';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Login() {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.logo}>Live Chat</span>
        <span className={styles.title}>Login</span>
        <button onClick={() => signIn('google')}>
          Sign in with Google
        </button>
        <p>You don&apos;t have an account? <Link href="/register">Register</Link></p>
      </div>
    </div >
  );
}
