import { getServerSession } from "next-auth/next"
import { prisma } from "./db"
import { authOptions } from "@/app/api/auth/authOption"


export const getCurrentSession = async () => {
    try {
        //@ts-ignore
        const session = await getServerSession(authOptions)
        return session;
    } catch (error) {
        console.log(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const session = await getCurrentSession()
        const currentUser = await prisma.user.findFirst({
            where:{
                email: session?.user?.email
            }
        })
        return currentUser
    } catch (error) {
        console.log(error)
    }
}