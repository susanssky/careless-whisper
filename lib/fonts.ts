// import { JetBrains_Mono as FontMono, Inter as FontSans } from "next/font/google"

// export const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })

// export const fontMono = FontMono({
//   subsets: ["latin"],
//   variable: "--font-mono",
// })

import { Inter, Lora } from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
})
