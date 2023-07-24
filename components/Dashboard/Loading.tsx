import { UpdateIcon } from "@radix-ui/react-icons"

export default function LoadingComponent() {
  return (
    <main className="grow grid place-items-center">
      <div className="flex flex-col gap-4 text-center">
        <UpdateIcon className="mx-auto animate-spin h-[50px] w-[50px]" />
        <span className="text-xl font-lora">Loading...</span>
      </div>
    </main>
  )
}
