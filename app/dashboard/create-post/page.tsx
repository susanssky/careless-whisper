"use client"

import React, { ChangeEvent, FormEvent, useRef, useState } from "react"
//----left card------
import { CaretSortIcon, CheckIcon, UpdateIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { Configuration, OpenAIApi } from "openai"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const cohortsName = [
  {
    region: "London",
    value: "London 9",
  },
  { region: "London", value: "London 10" },
  { region: "London", value: "London 11" },
]
const syllabusesName = [
  {
    group: "HTML-CSS",
    value: "HTML-CSS Lesson 1",
  },
  {
    group: "HTML-CSS",
    value: "HTML-CSS Lesson 2",
  },
]

export default function CreatePost() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { toast } = useToast()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [summaryState, setSummaryState] = useState({
    apiKey: "",
    isLoading: false,
    errorMsg: "",
  })

  const [data, setData] = useState<createPostType>({
    cohortName: { open: false, value: "" },
    syllabusName: { open: false, value: "" },
    sessionName: "",
    leaderName: "",
    originalVideoLink: "",
    summary: "",
    transcription: [],
  })
  const parseSrtFile = (contents: string) => {
    const regex =
      /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n([\s\S]*?)(?=\n\n|$)/g
    let match
    const transcription: createSentenceType[] = []
    while ((match = regex.exec(contents))) {
      transcription.push({
        lineNumber: match[1],
        startTime: match[2],
        endTime: match[3],
        content: match[4],
      })
    }
    setData({ ...data, transcription })
    // console.log(transcription)
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
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
    console.log(data)
    console.log(summaryState)
  }
  const validateForm = (data: createPostType) => {
    const {
      cohortName: { value: cohortName },
      syllabusName: { value: syllabusName },
      sessionName,
      leaderName,
      transcription,
    } = data

    if (
      !cohortName ||
      !syllabusName ||
      !sessionName ||
      !leaderName ||
      transcription.length <= 0
    ) {
      return false
    }
    return true
  }

  const toastSuccess = () => {
    toast({
      title: "Congratulations.",
      description: "You have sent a new transcription",
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
        transcription,
        summary,
      } = data
      // console.log(data)

      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post`, {
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
          transcription,
          user: session?.user,
          summary,
        }),
      })
      if (!res.ok) {
        return
      }

      const result = await res.json()

      setData({
        cohortName: { open: false, value: "" },
        syllabusName: { open: false, value: "" },
        sessionName: "",
        leaderName: "",
        originalVideoLink: "",
        transcription: [],
        summary: "",
      })
      setSummaryState({ apiKey: "", errorMsg: "", isLoading: false })

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      console.log(result)
      return result
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const generateSummary = async (e: FormEvent) => {
    e.preventDefault()
    if (data.transcription.length <= 0) return
    setSummaryState((prev) => ({ ...prev, isLoading: true }))
    setIsLoading(true)
    // const res = await getSummary(article)

    const configuration = new Configuration({
      apiKey: summaryState.apiKey,
    })
    const openai = new OpenAIApi(configuration)
    const article = data.transcription
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
  return (
    <div className="flex max-md:flex-col max-md:items-center">
      <form onSubmit={handleSubmit}>
        <Card className="w-[350px] max-md:w-[400px]">
          <CardHeader>
            <CardTitle>Create post</CardTitle>
            <CardDescription>
              Create post for reading the transcription.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cohort-name">
                  Cohort Name<span className="text-rose-600">*</span>
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
                      <CommandGroup heading="London">
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="syllabus-name">
                  Syllabus Name<span className="text-rose-600">*</span>
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
                      <CommandGroup heading="London">
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
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="sessionName">
                  Session Name<span className="text-rose-600">*</span>
                </Label>
                <Input
                  id="sessionName"
                  name="sessionName"
                  value={data.sessionName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="leaderName">
                  Leader Name<span className="text-rose-600">*</span>
                </Label>
                <Input
                  id="leaderName"
                  name="leaderName"
                  value={data.leaderName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="originalVideoLink">Video Link</Label>
                <Input
                  id="originalVideoLink"
                  name="originalVideoLink"
                  value={data.originalVideoLink}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="apiKey">OpenAI API Key</Label>
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
              <Tabs defaultValue="whisper" className="w-full">
                <TabsList className="flex justify-center">
                  <TabsTrigger value="whisper">Whisper</TabsTrigger>
                  {/* <TabsTrigger value="whisper-jax">Whisper JAX</TabsTrigger> */}
                </TabsList>

                <TabsContent value="whisper">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="whisper">
                      Please upload .srt file
                      <span className="text-rose-600">*</span>
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
                </TabsContent>
                {/* <TabsContent value="whisper-jax">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="whisper-jax">
                      Please paste below with timestamp
                    </Label>
                    <Textarea
                      id="whisper-jax"
                      name="whisper-jax"
                      placeholder="Paste here from Huggingface."
                      className="resize-none"
                    />
                  </div>
                </TabsContent> */}
              </Tabs>
              {summaryState.apiKey && data.transcription.length > 0 && (
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="summary">OpenAI Summary</Label>
                  <Textarea
                    className="resize-none"
                    placeholder="A summary will be generated here."
                    id="summary"
                    name="summary"
                    rows={10}
                    value={data.summary}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-rose-600">
                    {summaryState.errorMsg}
                  </p>
                  {!summaryState.isLoading && (
                    <Button onClick={(e) => generateSummary(e)}>
                      Generate the summary
                    </Button>
                  )}
                  {summaryState.isLoading && (
                    <Button disabled className="w-full">
                      <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {isLoading && (
              <Button disabled className="w-full">
                <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            )}
            {!isLoading && (
              <Button
                type="submit"
                className="w-full"
                onClick={() =>
                  validateForm(data) && !summaryState.errorMsg
                    ? toastSuccess()
                    : toastFail()
                }
              >
                Submit
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
      {data.transcription.length > 0 && (
        <ScrollArea className="h-[600px]  rounded-md border p-4">
          <Table>
            <TableCaption>You have reached the last line.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">id</TableHead>
                <TableHead className="text-center">Start Time</TableHead>
                <TableHead className="text-center">End Time</TableHead>
                <TableHead className="text-center">Sentence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.transcription.map((sentence) => (
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
    </div>
  )
}
