import Image from "next/image";
import React, { use } from "react";
import { Listing } from "@prisma/client";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { getCurrentSession, getCurrentUser } from "@/libs/getCurrentUser";
import { prisma } from "@/libs/db";

interface ListProps {
  list: Listing;
}

const List = async ({ list }: ListProps) => {
  const user = await getCurrentUser();
  const session = await getCurrentSession()

  const rating = await prisma.review.findMany({
    where:{
      listingId:list.id
    },
    select:{
      rating:true
    }
  })

  const averageRating = rating.reduce((sum, rat) => sum + rat.rating,0) / rating.length

  return (
    <Link href={`/listing/${list.id}`} className="">
      <div className="relative w-full h-72 ">
        <Image
          src={list?.image}
          alt={list?.name}
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2">
          <LikeButton session={session} list={list} user={user!}/>
        </div>
      </div>

      <div className="flex justify-between py-2">
        <h2 className="text-xl font-medium">{list?.name}</h2>
        <p className="flex items-center justify-center gap-2">
          <FaStar />
          {rating.length === 0 ? 3 : averageRating}
        </p>
      </div>

      <div className="text-gray-500 text-sm -mt-2">{list?.description}</div>

      <div className="text-xl font-bold">
        ${list?.price}
        <span className="text-sm font-light">night</span>
      </div>
    </Link>
  );
};

export default List;
