"use client"

import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

export default function SignInButton() {
  return (
    <Button
      variant="secondary"
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
    >
      <GitHubLogoIcon className="mr-2 h-4 w-4" /> Login with GitHub
    </Button>
  )
}
