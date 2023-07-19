import { NextRequest, NextResponse } from "next/server";



import { prisma } from "@/lib/prisma";



import { Post } from ".prisma/client";


   


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const user = searchParams && searchParams.get("user")
   const leader = searchParams && searchParams.get("leader")
  const cohort = searchParams && searchParams.get("cohort")
  const keywords = searchParams && searchParams.get("keywords")
  const syllabusModule = searchParams && searchParams.get("syllabusModule")
  const duration = searchParams ? searchParams.get("duration") || "" : ""
try {
    let posts: Post[] = [];

 
    


    if (user) {
        const userSentences = await prisma.post.findMany({
          where: {
            transcription: {
              post: {
                user: {
                  name: {
                    contains: user,
                    mode: "insensitive",
                  },
                },
              },
            },
          },
          include: {
            cohort: true,
            syllabus: true,
            transcription: {
              include: {
                sentences: true,
              },
            },
          },
        })

      posts.push(...userSentences)
    }


     if (leader) {
       const leaderSentences = await prisma.post.findMany({
         where: {
           transcription: {
             post: {
               leaderName: {
                contains: leader,
                 mode: "insensitive",
               },
             },
           },
         },
         include: {
           cohort: true,
           syllabus: true,
           transcription: {
             include: {
               sentences: true,
             },
           },
         },
       })

       posts.push(...leaderSentences)
     }

    if (cohort) {
      const cohortSentences = await prisma.post.findMany({
        where: {
          transcription: {
            post: {
              cohort: {
                name: {
                  equals: cohort,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        include: {
          cohort: true,
          syllabus: true,
          transcription: {
            include: {
              sentences: true,
            },
          },
        },
      })

      posts.push(...cohortSentences)
    }

    if (keywords) {
      const keywordSentences = await prisma.post.findMany({
        where: {
          transcription: {
            post: {
              keywords: {
                equals: keywords,
                mode: "insensitive",
              },
            },
          },
        },
        include: {
          cohort: true,
          syllabus: true,
          transcription: {
            include: {
              sentences: true,
            },
          },
        },
      })

     posts.push(...keywordSentences)
    }

    if (syllabusModule) {
      const syllabusSentences = await prisma.post.findMany({
        where: {
          transcription: {
            post: {
              syllabus: {
                name: {
                  contains: syllabusModule,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        include: {
          cohort: true,
          syllabus: true,
          transcription: {
            include: {
              sentences: true,
            },
          },
        },
      })

      posts.push(...syllabusSentences)
    }

    if (duration) {
      const durationSentences = await prisma.post.findMany({
        where: {
          transcription: {
            post: {
              duration: {
                equals: parseInt(duration),
              },
            },
          },
        },
        include: {
          cohort: true,
          syllabus: true,
          transcription: {
            include: {
              sentences: true,
            },
          },
        },
      });

      posts.push(...durationSentences)
    }

    return NextResponse.json(posts)
  } catch (error: any) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }
}