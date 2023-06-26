import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Start seeding th database")

  const transcription = await prisma.transcription.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      sentences: {
        create: [
          {
            content: "First sentence",
          },
          {
            content: "Second sentence",
          },
        ],
      },
    },
    include: {
      sentences: true,
    },
  })

  console.log("Transcription:", transcription)

  console.log("Seeding finished.")
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
