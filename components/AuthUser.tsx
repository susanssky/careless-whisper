"use client"

import { signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/Icons"

export default function AuthUser() {
  const { data: session } = useSession()
  //   console.log(session)

  return (
    <div>
      {session && (
        <Button onClick={() => signOut({ callbackUrl: "/" })}>
          <Icons.github className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      )}
    </div>
  )
}
