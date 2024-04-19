import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST (request: NextRequest) {

  try {
    console.log("GİRİLDİ")
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body

    if(!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized..." , { status: 401 })
    }

    if(isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 })
    }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data : {
          name,
          isGroup,
          users : {
            // if the current user is the one the create a group chat, he needs to be seperately added to the group
            connect: [
              ...members.map((member: {value: string}) => ({
                id: member.value
              })),
              {
                id: currentUser.id
              }
            ]
          }
        },
        include: {
          users: true
        }
      })
      return NextResponse.json(newConversation)
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId]
            }
          },
          {
            userIds: {
              equals: [userId, currentUser.id]
            }
          }
        ]
      }
    })

    const singleConversation = existingConversations[0]


    if(singleConversation) {
      return NextResponse.json(singleConversation)
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id
            },
            {
              id: userId
            }
          ]
        }
      },
      include: {
        users: true
      }
    })

    return NextResponse.json(newConversation)

  } catch (error: any) {
    return new NextResponse(`Internal Server Error: ${error}` , { status: 500})
  }
} 