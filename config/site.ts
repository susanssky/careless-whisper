export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Careless Whisper",
  description: "Using Whisper to transcribe the study sessions",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Create the transcript",
      href: "/dashboard/create-post",
    },
  ],
}
