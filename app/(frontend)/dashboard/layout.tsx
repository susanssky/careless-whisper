import { Metadata } from "next"

import { UserServerSession } from "@/lib/helpers"
import Sidebar from "@/components/Dashboard/Sidebar"

// export const metadata: Metadata = {}

interface RootLayoutProps {
  children: React.ReactNode
}
export default async function DashBoardRootLayout({
  children,
}: RootLayoutProps) {
  // const [barState, setBarState] = useState<boolean>(false)
  const session = await UserServerSession()

  return (
    <main className="grow container flex">
      <Sidebar />
      {children}
    </main>
  )
}
