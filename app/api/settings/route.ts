import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    const body = await request.json();

    const { name, image } = body

    if(!currentUser?.email || !currentUser?.id ) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        image: image,
        name: name
      }
    })
    return NextResponse.json(updatedUser)

  } catch (error) {
    return new NextResponse("Server Error", { status: 500 })
  }
}