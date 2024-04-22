import getCurrentUser from "@/app/action/getCurrentUser"
import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server"



export async function POST(request: NextRequest) {
  console.log("İSTEK GELDİ jweqhweqjkwhe")
  
  try {


    const body = await request.json();

    const { status } = body;

    
    const currentUser = await getCurrentUser();
    console.log("/************************ currenter user: ", currentUser)
    if(!currentUser?.email || !currentUser?.id) {
      return new NextResponse("Unauthorized" , { status: 401 })
    }

    await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data : {
        status: status
      }
    })

    return NextResponse.json({ message : "successfuly updated" })


  } catch (error) {
    console.log(error, "status update")
    return new NextResponse("Server error", { status : 500 })
  }

  

}