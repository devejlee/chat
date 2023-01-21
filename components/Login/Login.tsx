"use client";
import { useSession, signIn, signOut } from 'next-auth/react'
import UserCard from '../UserCard/UserCard';

export default function Login() {
  const { data: session } = useSession()
  console.log('session: ', session)
  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>
          Sign out of Google
        </button>
        <UserCard user={session?.user} />
      </>
    )
  }

  return (
    <button onClick={() => signIn()}>
      Sign in with Google
    </button>
  )
}
