"use client"

import React, { FormEvent, useState } from "react"
import { UpdateIcon } from "@radix-ui/react-icons"
import { Configuration, OpenAIApi } from "openai"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type SummaryProps = {
  article: string
  id: number
}

export default function Summary({ article, id }: SummaryProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [summaried, setSummaried] = useState<string>("")
  const [apiKey, setApiKey] = useState<string>("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // const res = await getSummary(article)

    const configuration = new Configuration({
      // apiKey: "xxxxxx",
      apiKey,
    })
    const openai = new OpenAIApi(configuration)
    try {
      setErrorMsg("")
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Summarize this ${article}.`,
        // prompt: `Summarize this in five lines ${article}. and break them into seperate lines`,
        temperature: 0.6,
        max_tokens: 60,
        top_p: 1.0,
        // frequency_penalty: 0.0,
        presence_penalty: 1,
      })
      // ;

      if (res.status === 200) {
        const summary = res?.data?.choices[0]?.text as string
        setSummaried(summary.replace(/\n/g, ""))
      }
    } catch (error: any) {
      console.error({ error })
      setErrorMsg(error.response.data.error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const updateSummary = async (id: number) => {
    setIsLoading(true)

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/summary/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summaried,
      }),
    })
    if (!res.ok) {
      setIsLoading(false)
      return
    }
    setIsLoading(false)
    return await res.json()
  }
  const closeAlertDialog = () => {
    setApiKey("")
    setSummaried("")
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button>Generate the summary with API Key</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Generate the summary with OpenAI API Key
          </AlertDialogTitle>
          <AlertDialogDescription>
            Please enter your OpenAI API Key and press the button to generate
            the summary.
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-3 items-center gap-1.5">
                  <Label htmlFor="api-key">OpenAI API Key</Label>
                  <Input
                    id="api-key"
                    className="col-span-3"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea
                    className="resize-none"
                    placeholder="A summary will be generated here."
                    id="summary"
                    rows={10}
                    value={summaried}
                    onChange={(e) => setSummaried(e.target.value)}
                  />
                  <p className="text-sm text-rose-600">{errorMsg}</p>
                </div>
              </div>

              {isLoading && (
                <Button disabled className="w-full">
                  <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              )}
              {!isLoading && (
                <Button type="submit" className="w-full">
                  Generate
                </Button>
              )}
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={closeAlertDialog}>
            Close
          </Button>
          {summaried && !isLoading && (
            <Button onClick={() => updateSummary(id)}>
              Update on Database
            </Button>
          )}
          {isLoading && summaried && (
            <Button disabled>
              <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
