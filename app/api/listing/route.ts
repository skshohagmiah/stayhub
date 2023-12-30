import { prisma } from "@/libs/db"
import {getCurrentUser } from "@/libs/getCurrentUser";

export async function POST(req:Request) {
    try {
        const user = await getCurrentUser()
        const {name,description,placeType,price,address,amenities,imageUrl,guests,latitude,longitude} = await req.json();
        const list = await prisma.listing.create({
            data:{
                ownerId: user?.id!,
                name,
                description,
                placeType,
                price: parseInt(price),
                guests:parseInt(guests),
                latitude,
                longitude,
                address,
                amenities,
                image:imageUrl

            }
        })
        console.log(list)
        return Response.json({message:'listing created successfully', data:list}, {status:200})
    } catch (error) {
        console.log('listing error', error)
        return Response.json({message:'listing creating error', error},{status:500})
    }
    
}