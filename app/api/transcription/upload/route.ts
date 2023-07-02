import { NextResponse, type NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

type Body = {
  lineNumber: string
  startTime: string
  endTime: string
  content: string
}[]


export async function POST(request: NextRequest) {

	const body: Body = await request.json();

	const transcriptionData = await prisma.transcription.create({
		data: {
			sentences: {
				createMany: { data: body }
			}
		}
	});

	return NextResponse.json(transcriptionData);
}
