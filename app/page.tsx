"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"

import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/Icons"

export default function LoginPage() {
  const session = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard")
    }
  })
  return (
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
        <Link
          rel="noreferrer"
          href="/"
          className={buttonVariants({ variant: "secondary" })}
          onClick={() => signIn("github")}
        >
          <Icons.github /> Login with GitHub
        </Link>
      </div>
    </section>
  )
}
