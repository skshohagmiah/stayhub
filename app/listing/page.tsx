import DeleteButton from "@/components/DeleteButton";
import { prisma } from "@/libs/db";
import { getCurrentUser } from "@/libs/getCurrentUser";
import Image from "next/image";
import React from "react";

const ListingPage = async () => {
  const user = await getCurrentUser();
  const listing = await prisma.listing.findMany({
    where: {
      ownerId: user?.id,
    },
  });
  return (
    <div className="max-w-7xl mx-auto p-4 mt-[5rem] gap-2 md:h-full">
      {listing.length === 0 ? (
        <p>There is no property of your`s</p>
      ) : (
        <div className="">
          <h2 className="text-xl text-center font-semibold">Your Properties</h2>
          {listing.map((list) => (
            <div
              key={list.id}
              className="flex gap-2 flex-col md:flex-row items-start md:items-center justify-between mt-2 font-medium"
            >
              <div className="relative w-full h-[14rem] md:w-[100px] md:h-[100px] rounded-md overflow-hidden">
                <Image src={list.image} alt={list.name} fill />
              </div>
              <p>Name : {list.name}</p>
              <p>Address : {list.address}</p>
              <p>Price : ${list.price}</p>
              <DeleteButton listId={list.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingPage;
