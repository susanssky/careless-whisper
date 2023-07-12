import { Suspense } from "react"
import Image from "next/image"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/authOptions"
import SignInButton from "@/components/general/SignInButton"

import Loading from "../components/dashboard/Loading"

// export const revalidate = 1
export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/dashboard")
  }
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
          <SignInButton />
        </div>
      </section>
    </Suspense>
  )
}
