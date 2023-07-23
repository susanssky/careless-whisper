"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function loginFailPage() {
  return (
    <div className="grid place-items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Unauthorised!
      </h1>
      <Image
        src="/images/error/login-failed.svg"
        width={300}
        height={300}
        alt="Unauthorised"
      />

      <Button asChild>
        <Link href="/">Back to Home Page</Link>
      </Button>
    </div>
  )
}
