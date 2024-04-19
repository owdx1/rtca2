import prisma from "@/app/lib/db";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt"

export async function POST (request: NextRequest) {
  
  try {
    const { body } = await request.json();

    const { email, password } = body;

    if(!email || !password) {
      return new NextResponse("Missing credentials...", { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    
    if(!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword as string);
    
    if(!isPasswordValid) {
      return new NextResponse("Password is wrong..", { status: 401 })
    }

    return NextResponse.json(user)
  
  } catch (error) {
    console.log("error login")
    return new NextResponse("Server Error", { status: 500 })
  }

}