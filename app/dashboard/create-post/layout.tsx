// import "@/styles/globals.css"

import { Metadata } from "next"

import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
