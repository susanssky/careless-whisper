"use client"

import { useSession } from "next-auth/react"

export default function UserSession() {
  const { data: session } = useSession()
  return (
    <div>
      <p>
        Hi {session?.user?.name}, You are {session?.user?.role}
      </p>
    </div>
  )
}
