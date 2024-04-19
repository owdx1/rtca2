import prisma from "../lib/db"
import getSession from "./getSession"


const getUsers = async () => {
  try {
    const session = await getSession()

    if(!session?.user?.email) {
      return []
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" }, // new users at the top
      where: {
        NOT: {
          email: session.user.email
        }
      } // all users excluding the current one
    })

    return users
      
  } catch (error) {
    return []
  }
}

export default getUsers