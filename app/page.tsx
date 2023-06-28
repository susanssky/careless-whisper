import Image from 'next/image';
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"



export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
         Careless Whisper
        </h1>
      <div className="flex max-w-[980px] flex-col items-center gap-8">
      
        <h2 className="text-2xl font-bold">
          Login Page
        </h2>
      <Image src="/images/OIP.jpg" alt="image related to cyf" width={550} height={550} />
        <Link
          target="_blank"
          rel="noreferrer"
          href="/display"
          className={buttonVariants({ variant: "secondary" })}
        > Login with GitHub
        </Link>
      </div> 
    </section>
  )
}