import bcrypt from "bcrypt"
import prisma from "@/app/lib/db"

import { NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest) {

  try {
    const body = await request.json()
  
    const {username, email , password} = body;

    if (!email || !username || !password) {
      return new NextResponse("Missing information", { status: 400 })
    }

    const isExists = await prisma.user.findUnique({
      where: {
        email: email 
      }
    })

    if(isExists) {
      return new NextResponse("User already exists" , { status : 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name : username
      }
    })

    return NextResponse.json(user)

  } catch (error) {
    console.log(error , "REGISTER ERROR")  
    return new NextResponse("Internal server error" , { status: 500 })  
  }
}