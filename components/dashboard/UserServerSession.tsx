import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/authOptions"

export default async function UserServerSession() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return <div>UserServerSession</div>
}
