import bcrypt from "bcrypt"
import NextAuth, {AuthOptions} from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/app/lib/db"


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers : [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: {label: 'email', type:'text'},
        password: {label:'password', type:'password'}
      },
      async authorize(credentials, req) {
        if(!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if(!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);


        if(!isCorrectPassword) {
          throw new Error("Invalid password")
        }

        return user;
      },
    })
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
}