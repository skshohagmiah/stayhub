
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const List = () => {
  return (
    <div className="w-full">
      <div className="relative w-full h-72 ">
        <Image
          src="/tokyo.webp"
          alt="asset"
          fill
          className="object-cover rounded-lg"
        />
            <FaRegHeart className='absolute top-2 right-2 w-8 h-8' />
      </div>

      <div className="flex justify-between py-2">
        <h2 className="text-xl font-mediums">Tailo Tokyo Hotel</h2>
        <p className="flex items-center justify-center gap-2">
          <FaStar />
          4.7
        </p>
      </div>

      <div className="text-gray-500 text-sm -mt-2">Ocene and Sea viewa</div>

      <div className="text-xl font-bold">
        $515 <span className="text-sm font-light">night</span>
      </div>
    </div>
  );
};

export default List;
