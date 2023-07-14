import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
type syllabusDataType = { name: string; link: string }
const syllabusData: syllabusDataType[] = [
  {
    name: "Git and Github - 1",
    link: "https://syllabus.codeyourfuture.io/git/desktop/lesson",
  },
  {
    name: "Git and Github - 2",
    link: "https://syllabus.codeyourfuture.io/git/terminal/lesson",
  },
  {
    name: "Git and Github - 3",
    link: "https://syllabus.codeyourfuture.io/git/cli/lesson",
  },
  {
    name: "Git and Github - 4",
    link: "https://syllabus.codeyourfuture.io/git/branches/",
  },
  {
    name: "HTML/CSS - 1",
    link: "https://syllabus.codeyourfuture.io/html-css/week-1/lesson",
  },
  {
    name: "HTML/CSS - 2",
    link: "https://syllabus.codeyourfuture.io/html-css/week-2/lesson",
  },
  {
    name: "HTML/CSS - 3",
    link: "https://syllabus.codeyourfuture.io/html-css/week-3/lesson",
  },
  {
    name: "HTML/CSS - 4",
    link: "https://syllabus.codeyourfuture.io/html-css/week-4/lesson",
  },
  {
    name: "JavaScript Core I - 1",
    link: "https://syllabus.codeyourfuture.io/js-core-1/week-1/lesson",
  },
  {
    name: "JavaScript Core I - 2",
    link: "https://syllabus.codeyourfuture.io/js-core-1/week-2/lesson",
  },
  {
    name: "JavaScript Core I - 3",
    link: "https://syllabus.codeyourfuture.io/js-core-1/week-3/lesson",
  },
  {
    name: "JavaScript Core I - 4",
    link: "https://syllabus.codeyourfuture.io/js-core-1/week-4/lesson",
  },
  {
    name: "JavaScript Core II - 1",
    link: "https://syllabus.codeyourfuture.io/js-core-2/week-1/lesson",
  },
  {
    name: "JavaScript Core II - 2",
    link: "https://syllabus.codeyourfuture.io/js-core-2/week-2/lesson",
  },
  {
    name: "JavaScript Core II - 3",
    link: "https://syllabus.codeyourfuture.io/js-core-2/week-3/lesson",
  },
  {
    name: "JavaScript Core II - 4",
    link: "https://syllabus.codeyourfuture.io/js-core-2/week-4/lesson",
  },
  {
    name: "JavaScript Core III - 1",
    link: "https://syllabus.codeyourfuture.io/js-core-3/week-1/lesson",
  },
  {
    name: "JavaScript Core III - 2",
    link: "https://syllabus.codeyourfuture.io/js-core-3/week-2/lesson",
  },
  {
    name: "JavaScript Core III - 3",
    link: "https://syllabus.codeyourfuture.io/js-core-3/week-3/lesson",
  },
  {
    name: "JavaScript Core III - 4",
    link: "https://syllabus.codeyourfuture.io/js-core-3/week-4/lesson",
  },
  {
    name: "React - 1",
    link: "https://syllabus.codeyourfuture.io/react/week-1/lesson",
  },
  {
    name: "React - 2",
    link: "https://syllabus.codeyourfuture.io/react/week-2/lesson",
  },
  {
    name: "React - 3",
    link: "https://syllabus.codeyourfuture.io/react/week-3/lesson",
  },
  {
    name: "React - 4",
    link: "https://syllabus.codeyourfuture.io/react/week-4/lesson",
  },
  {
    name: "Node - 1",
    link: "https://syllabus.codeyourfuture.io/node/week-1/lesson",
  },
  {
    name: "Node - 2",
    link: "https://syllabus.codeyourfuture.io/node/week-2/lesson",
  },
  {
    name: "Node - 3",
    link: "https://syllabus.codeyourfuture.io/node/week-3/lesson",
  },
  {
    name: "Node - 4",
    link: "https://syllabus.codeyourfuture.io/node/week-4/lesson",
  },
  {
    name: "SQL - 1",
    link: "https://syllabus.codeyourfuture.io/db/week-1/lesson",
  },
  {
    name: "SQL - 2",
    link: "https://syllabus.codeyourfuture.io/db/week-2/lesson",
  },
  {
    name: "SQL - 3",
    link: "https://syllabus.codeyourfuture.io/db/week-3/lesson",
  },
  {
    name: "SQL - 4",
    link: "https://syllabus.codeyourfuture.io/db/week-4/lesson",
  },
]

async function createAllSyllabuses() {
  try {
    await prisma.$disconnect()
    console.log(`Start seeding ...`)

    const syllabus = await prisma.syllabus.createMany({
      data: syllabusData,
      skipDuplicates: true,
    })
    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  }
}

createAllSyllabuses()
