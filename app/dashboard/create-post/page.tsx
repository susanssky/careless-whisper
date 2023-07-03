"use client"

import React, { ChangeEvent, FormEvent, useState } from "react"
//----left card------
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
  const { data: session } = useSession()
  const [data, setData] = useState<createPostType>({
    cohortName: { open: false, value: "" },
    syllabusName: { open: false, value: "" },
    sessionName: "",
    leaderName: "",
    originalVideoLink: "",
    transcription: [],
  })
  const parseSrtFile = (contents: string) => {
    const regex =
      /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n([\s\S]*?)(?=\n\n|$)/g
    let match
    const transcription: transcriptionType = []
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const {
      cohortName: { value: cohortName },
      syllabusName: { value: syllabusName },
      sessionName,
      leaderName,
      originalVideoLink,
      transcription,
    } = data

    const res = await fetch("http://localhost:3000/api/create-post", {
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
      }),
    })

    const result = await res.json()
    // console.log(result)
  }
  return (
    <div>
      {data.transcription.length > 0 && (
        <Accordion
          type="single"
          defaultValue="transcription-item-1"
          collapsible
        >
          <AccordionItem value="transcription-item-1">
            <AccordionTrigger>Click here to toggle preview.</AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-[300px] rounded-md border p-4">
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      <form onSubmit={handleSubmit}>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Create post</CardTitle>
            <CardDescription>
              Create post for reading the transcription.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cohort-name">Cohort Name</Label>
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
                <Label htmlFor="syllabus-name">Syllabus Name</Label>
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
                <Label htmlFor="sessionName">Session Name</Label>
                <Input
                  id="sessionName"
                  name="sessionName"
                  value={data.sessionName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="leaderName">Leader Name</Label>
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Tabs defaultValue="whisper" className="w-full">
              <TabsList className="flex justify-center">
                <TabsTrigger value="whisper">Whisper</TabsTrigger>
                <TabsTrigger value="whisper-jax">Whisper JAX</TabsTrigger>
              </TabsList>

              <TabsContent value="whisper">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="whisper">Please upload .srt file</Label>
                  <Input
                    id="whisper"
                    type="file"
                    accept=".srt"
                    onChange={handleFileUpload}
                  />
                </div>
              </TabsContent>
              <TabsContent value="whisper-jax">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="whisper-jax">
                    Please paste below with timestamp
                  </Label>
                  <Textarea
                    id="whisper-jax"
                    placeholder="Paste here from Huggingface."
                    className="resize-none"
                  />
                </div>
              </TabsContent>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </Tabs>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
