import { prisma } from "@/libs/db";
import { getCurrentUser } from "@/libs/getCurrentUser";

export async function POST(req:Request) {
    const user = await getCurrentUser();
    const {startDate,endDate,guests,listId}= await req.json()
    try {
        const res = await prisma.reservation.create({
            //@ts-ignore
            data:{
                startDate,
                endDate,
                guests,
                listingId:listId,
                userId:user?.id
            },
            include:{
                listing:true,
                user:true
            }
        })
        return Response.json('reservation created succefully', {status:200})
    } catch (error) {
        console.log('reservation route', error)
        return Response.json('something went wrong', {status:500})
    }
    
}