export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Careless Whisper",
  description: "Using Whisper to transcribe the study sessions",
  mainNav: [
    {
      title: "Home",
      href: "/homepage",
      isMentor: false,
    },
    {
      title: "List of transcripts",
      href: "/dashboard",
      isMentor: false,
    },
    {
      title: "Create the transcript",
      href: "/dashboard/create-transcript",
      isMentor: true,
    },
    {
      title: "How to use",
      href: "/dashboard/tutorial",
      isMentor: true,
    },
  ],
}
