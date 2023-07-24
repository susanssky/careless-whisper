import Image from "next/image"
import { redirect } from "next/navigation"

import { UserServerSession } from "@/lib/helpers"
import SignInButton from "@/components/Header/SignInButton"

// export const revalidate = 1
export default async function LoginPage() {
  const session = await UserServerSession()
  // console.log(session)
  if (session) {
    redirect("/dashboard")
  }
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
        <SignInButton />
      </div>
    </section>
  )
}
