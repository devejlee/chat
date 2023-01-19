import { DefaultSession } from 'next-auth'

interface UserCardProps {
  user: DefaultSession["user"]
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div>
      <p>Current Logged In User</p>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
    </div>
  )
}
