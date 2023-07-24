import { redirect } from "next/navigation"

import { UserServerSession } from "@/lib/helpers"
import HomePage from "@/components/Homepage/HomePage"

// export const revalidate = 1
export default async function LoginPage() {
  const session = await UserServerSession()
  // console.log(session)
  if (session) {
    redirect("/dashboard")
  }

  return <HomePage />
}
