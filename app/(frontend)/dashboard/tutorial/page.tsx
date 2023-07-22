import Image from "next/image"
import Link from "next/link"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function tutorialPage() {
  function codeText(text: string) {
    return (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold dark:bg-slate-400 text-slate-800">
        {text}
      </code>
    )
  }
  function mutedText(text: string) {
    return <p className="text-sm text-muted-foreground">{text}</p>
  }
  function extertnalLinkText(text: string, link: string) {
    return (
      <Link
        className="underline hover:no-underline"
        href={link}
        target="_blank"
      >
        {text}
      </Link>
    )
  }
  function image<T>(imgName: T) {
    return (
      <Image
        className="rounded-md"
        src={`/images/tutorial/${imgName}.webp`}
        alt={`tutorial-${imgName}`}
        width="600"
        height="600"
      />
    )
  }
  return (
    <Tabs defaultValue="whisper">
      <TabsList>
        <TabsTrigger value="whisper">Whipser</TabsTrigger>
      </TabsList>
      <TabsContent value="whisper" className="ml-6">
        Note: If you have the NVIDIA GPU, the transcription process will be
        faster than using a CPU.
        <ol className="list-decimal my-6 ml-3 [&>li]:mt-5">
          <li>
            Install{" "}
            {extertnalLinkText("ffmpeg", "https://ffmpeg.org/download.html")}
          </li>
          <li>
            Install{" "}
            {extertnalLinkText("Python", "https://www.python.org/downloads/")},
            preferably version{" "}
            {extertnalLinkText(
              "3.8-3.11",
              "https://github.com/openai/whisper#setup"
            )}
          </li>
          <li>
            create a new empty folder named {codeText("test-whisper")}
            and open VS Code to open the folder or any other name you prefer to
            use as the location for running Whisper.
            <br />
            {mutedText(
              "This is because Python will install additional files, and using VS Code to run Whisper will help isolate and reduce conflicts."
            )}
            {image("3")}
          </li>
          <li>
            Enter the command
            {codeText("python3 -m venv (virtual environment folder name)")}
            to create a Python virtual environment. For example,
            {codeText("python3 -m venv myenv")}
            <br />
            {image("4-1")}
            <br />
            {image("4-2")}
            {mutedText(
              `This command creates a virtual environment and a folder named "myenv" in the "test-whisper" directory, which contains the virtual environment's files and directories.`
            )}
          </li>
          <li>
            To activate the virtual environment, run the following command:{" "}
            <br />
            <ul className="list-disc pl-3">
              <li>
                On macOS and Linux: {codeText("source myenv/bin/activate")}
              </li>
              <li>On Windows: {codeText("myenv\\scripts\\activate")}</li>
            </ul>
            {image("5")}
          </li>
          <li>
            Once the virtual environment is activated, you can install and run
            the Python packages required for the project without affecting the
            global Python environment. You will see {codeText("(myenv)")} before
            the command prompt, indicating that you are now inside the virtual
            environment.
            {image("6")}
            {mutedText("To exit the virtual environment:")}
            <ul className="list-disc pl-3 text-sm text-muted-foreground">
              <li>On macOS and Linux: {codeText("deactivate")}</li>
              <li>On Windows: {codeText("myenv\\scripts\\deactivate.bat")}</li>
            </ul>
          </li>

          <li>
            Install Whisper by entering the following command in the terminal:
            {codeText("pip install git+https://github.com/openai/whisper.git")}
            <p className="text-sm text-muted-foreground">
              If the installation fails with{" "}
              <code className="bg-slate-300 text-slate-800">
                &#34;No module named &apos;setuptools_rust&apos;&#34;
              </code>
              , you need to install &#34;setuptools_rust&#34; , e.g. by running{" "}
              <code className="bg-slate-300 text-slate-800">
                &#34;pip install setuptools-rust&#34;
              </code>
            </p>
            {image("7")}
          </li>
          <li>
            You must have the audio file and place it next to the
            &#34;myenv&#34; folder.
            {image("8")}
          </li>
          <li>
            In the terminal, enter the command{" "}
            {codeText(
              "whisper test.m4a --language English --model large --fp16 False"
            )}
            {image("9")}
            <ul className="list-disc pl-3 text-sm text-muted-foreground">
              <li>The first parameter is the file name</li>
              <li>The second is the language spoken in the audio</li>
              <li>
                The third is the{" "}
                {extertnalLinkText(
                  "model name",
                  "https://github.com/openai/whisper/blob/main/whisper/__init__.py"
                )}
              </li>
              <li>
                The fourth is the precision of floating-point numbers. If you
                have a GPU, you can skip the fourth parameter, otherwise, you
                must enter{" "}
                <code className="bg-slate-300 text-slate-800">
                  --fp16 False
                </code>{" "}
                each time.
              </li>
            </ul>
          </li>
          <li>
            Wait patiently for the transcription process to complete. Once
            finished, several output files will be generated. You can upload the
            SRT file to &#34;create the transcript&#34;.
            {image("10")}
          </li>
        </ol>
      </TabsContent>
    </Tabs>
  )
}
