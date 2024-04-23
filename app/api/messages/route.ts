import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/app/lib/pusher";

export async function POST (request: NextRequest){
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message , conversationId, image } = body;


    if(!currentUser?.email || !currentUser?.id) {
      return new NextResponse("Unauthorized" , { status: 401 })
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId
          }
        },
        sender: {
          connect: {
            id: currentUser.id
          }
        },
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      },
      include: {
        seen: true,
        sender: true
      }
    })

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true
          }
        }
      }
    })

    await pusherServer.trigger(conversationId, "messages:new" , newMessage)

    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1]

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        messages:[lastMessage],
        id: conversationId
      })
    })

    return NextResponse.json(newMessage)

  } catch (error : any) {
    return new NextResponse("Server Error" , { status : 500 })
  }
}