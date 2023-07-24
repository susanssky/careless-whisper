import "@/styles/globals.css"

import { Suspense } from "react"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { inter, lora } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import { ThemeProvider } from "@/components/Header/ThemeProvider"
import { TailwindIndicator } from "@/components/TailwindIndicator"

import Loading from "../../components/Dashboard/Loading"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export const dynamic = "force-dynamic"

export const revalidate = 0

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.className} ${lora.variable}`}
    >
      <head />
      <body
        className={cn(
          "bg-background antialiased flex flex-col min-h-screen" // max-h-screen relative
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
          {/* <TailwindIndicator /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
