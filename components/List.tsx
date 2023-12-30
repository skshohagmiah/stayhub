
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { Listing } from "@prisma/client";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

interface ListProps{
  list:Listing
}

const List = ({list}:ListProps) => {
  return (
    <div className="w-full">
      <div className="relative w-full h-72 ">
        <Image
          src={list?.image}
          alt={list?.name}
          fill
          className="object-cover rounded-lg"
        />
            <FaRegHeart className='absolute top-2 right-2 w-8 h-8' />
      </div>

      <div className="flex justify-between py-2">
        <h2 className="text-xl font-mediums">{list?.name}</h2>
        <p className="flex items-center justify-center gap-2">
          <FaStar />
          4.7
        </p>
      </div>

      <div className="text-gray-500 text-sm -mt-2">{list?.description}</div>

      <div className="text-xl font-bold">
        ${list?.price}<span className="text-sm font-light">night</span>
      </div>
    </div>
  );
};

export default List;
