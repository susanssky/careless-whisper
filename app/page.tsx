"use client"

import { Suspense, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GitHubLogoIcon, UpdateIcon } from "@radix-ui/react-icons"
import { signIn, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"

import Loading from "../components/dashboard/Loading"

// export const revalidate = 1
export default function LoginPage() {
  const { status } = useSession()

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
        break
    }
  }, [status, router])

  return (
    <Suspense fallback={<Loading />}>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Careless Whisper
        </h1>
        <div className="flex max-w-[980px] flex-col items-center gap-8">
          <h2 className="text-2xl font-bold">Login Page</h2>
          <Image
            src="/images/OIP.jpg"
            alt="image related to cyf"
            width={550}
            height={550}
          />
          <Button
            variant="secondary"
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          >
            <GitHubLogoIcon className="mr-2 h-4 w-4" /> Login with GitHub
          </Button>
        </div>
      </section>
    </Suspense>
  )
}
