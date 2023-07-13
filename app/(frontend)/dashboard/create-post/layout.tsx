// import "@/styles/globals.css"

import { Metadata } from "next"

import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "@/components/AuthProvider"

export const metadata: Metadata = {}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  )
}
