"use client"

import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"

export default function AuthUser() {
  const { data: session } = useSession()
  //   console.log(session)

  return (
    <div>
      {session && (
        <Button onClick={() => signOut({ callbackUrl: "/" })}>
          <GitHubLogoIcon className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      )}
    </div>
  )
}
