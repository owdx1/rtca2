import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  conversationId?: string, 
}

export async function POST (request: NextRequest, { params } : { params: IParams}) {
  try {
    
    const currentUser = await getCurrentUser()

    const { conversationId } = params

    if(!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized" , { status: 401 })
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            seen: true
          }
        },
        users: true
      }
    })

    if(!conversation) {
      return new NextResponse("Invalid id", { status: 400 })
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1]

    if(!lastMessage) {
      return NextResponse.json(conversation)
    }

    //update seen of last message
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id
      },
      include: {
        sender: true,
        seen:true
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    })

    return NextResponse.json(updatedMessage)

  } catch (error) {
    console.log(error, "error memssage seen")
    return new NextResponse("Server Error" , { status: 500 })
  }
}