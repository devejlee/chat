"use client";
import { useSession, signIn, signOut } from 'next-auth/react'
import UserCard from '../UserCard/UserCard';

export default function Login() {
  const { data: session, status } = useSession()
  console.log('session: ', session)
  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

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
    <button onClick={() => signIn("google")}>
      Sign in with Google
    </button>
  )
}
