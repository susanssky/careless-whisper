import { UpdateIcon } from "@radix-ui/react-icons"

export default function LoadingComponent() {
  return (
    <div className="grid place-items-center">
      <UpdateIcon className="mr-2 h-4 w-4 animate-spin" /> Loading...
    </div>
  )
}
