import { prisma } from "@/libs/db";
import { getCurrentUser } from "@/libs/getCurrentUser";

export async function DELETE(req:Request,{params}:{params:{id:string}}) {
    const user = await getCurrentUser();
    const {id} = params
    try {
        await prisma.listing.delete({
            where:{
                id:id,
                ownerId:user?.id
            }
        })
        return Response.json('property deleted seuccesfully', {status:200})
    } catch (error) {
        console.log('properly delete route', error)
        return Response.json('something went wrong', {status:500})
    }
}