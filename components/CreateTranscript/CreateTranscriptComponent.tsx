"use client"

import React, { ChangeEvent, FormEvent, useRef, useState } from "react"
import { useRouter } from "next/navigation"
//----left card------
import { CaretSortIcon, CheckIcon, UpdateIcon } from "@radix-ui/react-icons"
import { Configuration, OpenAIApi } from "openai"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
//----right table----
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const cohortsName = [
  {
    value: "London 9",
  },
  { value: "London 10" },
  { value: "London 11" },
]
type PropsType = {
  syllabusesName: { value: string }[]
  session: any
}

export default function CreateTranscriptForm({
  syllabusesName,
  session,
}: PropsType) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [summaryState, setSummaryState] = useState({
    apiKey: "",
    isLoading: false,
    errorMsg: "",
  })

  const [data, setData] = useState<createTranscriptType>({
    cohortName: { open: false, value: "" },
    syllabusName: { open: false, value: "" },
    sessionName: "",
    leaderName: "",
    originalVideoLink: "",
    summary: "",
    sentences: [],
  })
  const parseSrtFile = (contents: string) => {
    const regex =
      /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n([\s\S]*?)(?=\n\n|$)/g
    let match
    const sentences: createSentenceType[] = []
    while ((match = regex.exec(contents))) {
      sentences.push({
        lineNumber: match[1],
        startTime: match[2],
        endTime: match[3],
        content: match[4],
      })
    }
    // console.log(sentences)
    setData({ ...data, sentences })
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files?.length === 0) return
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = function (e) {
      const contents = e.target?.result as string
      parseSrtFile(contents)
    }
    reader.readAsText(file)
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
    // console.log(data)
    // console.log(summaryState)
  }
  const validateForm = (data: createTranscriptType) => {
    const {
      cohortName: { value: cohortName },
      syllabusName: { value: syllabusName },
      sessionName,
      leaderName,
      sentences,
    } = data

    if (
      !cohortName ||
      !syllabusName ||
      !sessionName ||
      !leaderName ||
      sentences.length <= 0
    ) {
      return false
    }
    return true
  }

  const toastSuccess = () => {
    toast({
      title: "Congratulations.",
      description: "You have sent a new transcript",
      action: <ToastAction altText="Close">Close</ToastAction>,
    })
  }
  const toastFail = () => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: summaryState.errorMsg
        ? "Please clear API Key"
        : "You have to fill out cohort, syllabus, session, leader and upload valid srt file.",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (!validateForm(data) || summaryState.errorMsg) {
        return
      }

      const {
        cohortName: { value: cohortName },
        syllabusName: { value: syllabusName },
        sessionName,
        leaderName,
        originalVideoLink,
        sentences,
        summary,
      } = data
      // console.log(data)

      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/transcript`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cohortName,
          syllabusName,
          sessionName,
          leaderName,
          originalVideoLink,
          sentences,
          user: session?.user,
          summary,
        }),
      })
      if (!res.ok) {
        return
      }

      const result = await res.json()
      toastSuccess()

      setData({
        cohortName: { open: false, value: "" },
        syllabusName: { open: false, value: "" },
        sessionName: "",
        leaderName: "",
        originalVideoLink: "",
        sentences: [],
        summary: "",
      })
      setSummaryState({ apiKey: "", errorMsg: "", isLoading: false })

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // console.log(result)
      router.refresh()
      return result
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const generateSummary = async (e: FormEvent) => {
    e.preventDefault()
    // console.log(data.transcript.length)
    if (data.sentences.length <= 0) return

    setSummaryState((prev) => ({ ...prev, isLoading: true }))
    setIsLoading(true)
    // const res = await getSummary(article)

    const configuration = new Configuration({
      apiKey: summaryState.apiKey,
    })
    const openai = new OpenAIApi(configuration)
    const article = data.sentences
      .map((sentence: { content: string }) => sentence.content)
      .join(" ")
    try {
      setSummaryState((prev) => ({ ...prev, errorMsg: "" }))
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Summarise this ${article}.`,
        // prompt: `Summarise this in five lines ${article}. and break them into seperate lines`,
        temperature: 0.6,
        max_tokens: 60,
        top_p: 1.0,
        // frequency_penalty: 0.0,
        presence_penalty: 1,
      })
      // ;

      if (res.status === 200) {
        const summary = res?.data?.choices[0]?.text as string
        setData((prev) => ({ ...prev, summary: summary.replace(/\n/g, "") }))
      }
    } catch (error: any) {
      // console.error({ error })
      setSummaryState((prev) => ({
        ...prev,
        errorMsg: error.response.data.error.message,
      }))
    } finally {
      setSummaryState((prev) => ({ ...prev, isLoading: false }))
      setIsLoading(false)
    }
  }
  // grid grid-cols-[auto_100px] md:grid-cols-[auto_200px] gap-y-2 bg-[#c8c8c8] dark:bg-[#27272a]
  return (
    <section className="grow flex items-start gap-4 max-md:flex-col max-md:items-center p-4">
      <form onSubmit={handleSubmit} className="md:max-w-[300px] rounded-lg">
        {/* h-full w-[350px] max-md:w-[400px] */}
        <div className="flex flex-col gap-4 bg-[#c8c8c8] dark:bg-zinc-800 p-4 rounded-md">
          <h2 className="text-2xl font-lora font-semibold">
            <span className="text-red-500 dark:text-red-500">Upload</span> A
            Transcript
          </h2>
          {/* card body */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="cohort-name">
                Cohort Name<span className="text-red-500">*</span>
              </Label>
              <Popover
                open={data.cohortName.open}
                onOpenChange={(open) =>
                  setData({
                    ...data,
                    cohortName: { ...data.cohortName, open },
                  })
                }
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={data.cohortName.open}
                    className="justify-between"
                  >
                    {data.cohortName.value || "Select cohort..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search cohort..." />
                    <CommandEmpty>No chort found.</CommandEmpty>
                    <CommandGroup>
                      {cohortsName.map((cohort) => (
                        <CommandItem
                          key={cohort.value}
                          onSelect={(currentValue) => {
                            {
                              setData((prevData) => ({
                                ...prevData,
                                cohortName: {
                                  open: false,
                                  value:
                                    currentValue === data.cohortName.value
                                      ? ""
                                      : cohort.value,
                                },
                              }))
                            }
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              data.cohortName.value === cohort.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {cohort.value}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="syllabus-name">
                Syllabus Name<span className="text-red-500">*</span>
              </Label>
              <Popover
                open={data.syllabusName.open}
                onOpenChange={(open) =>
                  setData({
                    ...data,
                    syllabusName: { ...data.syllabusName, open },
                  })
                }
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={data.syllabusName.open}
                    className="justify-between"
                  >
                    {data.syllabusName.value || "Select syllabus..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search syllabus..." />
                    <CommandEmpty>No syllabus found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-[200px]">
                        {syllabusesName.map((syllabus) => (
                          <CommandItem
                            key={syllabus.value}
                            onSelect={(currentValue) => {
                              {
                                setData((prevData) => ({
                                  ...prevData,
                                  syllabusName: {
                                    open: false,
                                    value:
                                      currentValue === data.syllabusName.value
                                        ? ""
                                        : syllabus.value,
                                  },
                                }))
                              }
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                data.syllabusName.value === syllabus.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {syllabus.value}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="sessionName">
                Session Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="sessionName"
                name="sessionName"
                autoComplete="off"
                value={data.sessionName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="leaderName">
                Leader Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="leaderName"
                name="leaderName"
                autoComplete="off"
                value={data.leaderName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="originalVideoLink">Video Link</Label>
              <Input
                id="originalVideoLink"
                name="originalVideoLink"
                autoComplete="off"
                value={data.originalVideoLink}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="apiKey">
                OpenAI API Key{" "}
                <Badge
                  className="rounded-full px-1.5 cursor-pointer dark:text-white dark:bg-[#8c8c8c] hover:bg-red-500 hover:text-black dark:hover:bg-red-500 dark:hover:text-black"
                  onClick={() =>
                    setSummaryState((prev) => ({
                      ...prev,
                      errorMsg: "",
                      apiKey: "",
                    }))
                  }
                >
                  Clear
                </Badge>
              </Label>
              <Input
                id="apiKey"
                name="apiKey"
                autoComplete="off"
                value={summaryState.apiKey}
                onChange={(e) => {
                  setSummaryState((prev) => ({
                    ...prev,
                    errorMsg: "",
                    apiKey: e.target.value,
                  }))
                  if (summaryState.apiKey.length <= 0) {
                    setData((prev) => ({
                      ...prev,
                      summary: "",
                    }))
                  }
                }}
              />
            </div>

            {/* w-full max-w-sm */}
            <div className="grid items-center gap-2">
              <Label htmlFor="whisper">
                Please upload .srt file
                <span className="text-red-500">*</span>
              </Label>
              <Input
                ref={fileInputRef}
                id="whisper"
                name="whisper"
                type="file"
                accept=".srt"
                onChange={handleFileUpload}
              />
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="summary">
                OpenAI Summary{" "}
                {!summaryState.isLoading && (
                  <Badge
                    className="rounded-full px-1.5 cursor-pointer dark:text-white dark:bg-[#8c8c8c] hover:bg-red-500 hover:text-black dark:hover:bg-red-500 dark:hover:text-black"
                    onClick={generateSummary}
                  >
                    Generate
                  </Badge>
                )}
                {summaryState.isLoading && (
                  <Badge className="rounded-lg place-items-center">
                    <UpdateIcon className="animate-spin" />
                  </Badge>
                )}
              </Label>
              <Textarea
                placeholder="A summary will be generated here."
                id="summary"
                name="summary"
                rows={7}
                value={data.summary}
                onChange={handleChange}
                className="resize-none  bg-white dark:bg-[#1f1f1f]"
              />
              <p className="text-sm text-red-500">{summaryState.errorMsg}</p>
            </div>
          </div>
          <div className="flex justify-between">
            {isLoading && (
              <Button disabled className="w-full">
                <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            )}
            {!isLoading && (
              <Button
                type="submit"
                className="flex gap-2 w-full h-7 rounded dark:text-white dark:bg-[#8c8c8c] hover:bg-red-500 hover:text-black dark:hover:bg-red-500 dark:hover:text-black"
                onClick={() =>
                  (!validateForm(data) || summaryState.errorMsg) && toastFail()
                }
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </form>
      {data.sentences.length > 0 && (
        // #222225 #313133 #252528 #27272a #28282a #202027
        <ScrollArea className="grow rounded-md p-4 bg-[#c8c8c8] dark:bg-[#27272a]">
          <Table className="w-full">
            <TableCaption>You have reached the last line.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center font-semibold text-black">
                  #
                </TableHead>
                <TableHead className="text-center font-semibold text-black">
                  Start Time
                </TableHead>
                <TableHead className="text-center font-semibold text-black">
                  End Time
                </TableHead>
                <TableHead className="text-center font-semibold text-black">
                  Sentence
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.sentences.map((sentence) => (
                <TableRow key={sentence.lineNumber}>
                  <TableCell className="font-medium text-center">
                    {sentence.lineNumber}
                  </TableCell>
                  <TableCell className="text-center">
                    {sentence.startTime}
                  </TableCell>
                  <TableCell className="text-center">
                    {sentence.endTime}
                  </TableCell>
                  <TableCell className="text-left">
                    {sentence.content}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      )}
    </section>
  )
}
