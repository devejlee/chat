'use client';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Login from '@/components/Login/Login';

export default function Home() {
  const { data: session } = useSession();
  console.log('session: ', session);

  return (
    <main>
      {session ? (
        <>
          <p>name: {session?.user?.name}</p>
          <p>email: {session?.user?.email}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <Login />
      )}
    </main>
  );
}
