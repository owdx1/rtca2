import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/app/lib/db";
import { pusherServer } from "@/app/lib/pusher";
import { NextRequest, NextResponse } from "next/server";


interface IParams {
  conversationId?: string
}

export async function DELETE (request: NextRequest, { params } : { params: IParams}) {
  try {
    const currentUser = await getCurrentUser()
    const { conversationId } = params 

  if(!currentUser?.email || !currentUser?.id) {
    return new NextResponse("Unauthorized" , { status: 401 })
  }

  const existingConversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId
    },
    include: {
      users: true
    }
  })
  
  if(!existingConversation) {
    return new NextResponse("Invalid id of convo" , { status: 400 })
  }

  const deletedConversation = await prisma.conversation.deleteMany({
    where: {
      id: conversationId,
      userIds: {
        hasSome: [currentUser.id]
      }
    }
  })

  existingConversation?.users.forEach((user) => {
    if(user.email) {
      pusherServer.trigger(user.email, "conversation:remove", existingConversation)
    }  
  })
  

  return NextResponse.json(deletedConversation)

  

  return NextResponse.json({message: params})
  } catch (error) {
    return new NextResponse("Server error", { status: 500 })
  }
}