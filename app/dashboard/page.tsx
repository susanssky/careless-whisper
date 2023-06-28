"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UpdateIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"

const Dashboard = () => {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()
  useEffect(() => {
    switch (status) {
      case "unauthenticated":
        router.push("/")
        break
      case "authenticated":
        router.push("/dashboard")
        break
      case "loading":
        setIsLoading(true)
        break
    }
    setIsLoading(false)
  }, [status, router])
  if (isLoading) {
    return (
      <>
        <UpdateIcon className="mr-2 h-4 w-4 animate-spin" /> Loading...
      </>
    )
  }
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
