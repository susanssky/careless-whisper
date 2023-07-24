import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    // border-4 border-solid border-orange-400
    // mt-auto
    <footer className="w-screen bg-primary dark:bg-[#565656]">
      {/* border-4 border-solid border-yellow-400 */}
      <div className="container px-6 py-8 flex flex-col-reverse md:flex-row justify-between gap-6 md:gap-0">
        <Image src="/images/cyf-logo.png" alt="Logo" width={200} height={64} />
        <div className="flex flex-col gap-6">
          <nav className="flex flex-col md:flex-row gap-1 md:gap-4 text-white dark:text-white">
            <Link href="#" className="text-sm dark:hover:text-red-500 ">
              Careless Whisper
            </Link>
            <Link href="#" className="text-sm dark:hover:text-red-500">
              About
            </Link>
            <Link href="#" className="text-sm dark:hover:text-red-500">
              Login
            </Link>
            <Link href="#" className="text-sm dark:hover:text-red-500">
              Terms and Conditions
            </Link>
          </nav>
          <span className="text-xs md:text-right text-zinc-400 dark:text-zinc-400">
            Copyright © {currentYear}
          </span>
        </div>
      </div>
    </footer>
  )
}
