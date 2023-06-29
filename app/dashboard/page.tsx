"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const Dashboard = () => {
  const { data: session } = useSession()

  const router = useRouter()
  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Hi {session?.user?.name}, You are {session?.user?.role}
      </p>
    </div>
  )
}

export default Dashboard
