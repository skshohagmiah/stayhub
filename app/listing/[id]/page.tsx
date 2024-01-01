import ListMap from "@/components/ListMap";
import ReservationPage from "@/components/Reservation";
import Review from "@/components/Review";
import { prisma } from "@/libs/db";
import { getCurrentSession, getCurrentUser } from "@/libs/getCurrentUser";
import Image from "next/image";
import React from "react";

const SingleListingPage = async ({ params }: { params: { id: string } }) => {
  const user = await getCurrentUser();
  const session = await getCurrentSession();
  const list = await prisma.listing.findUnique({
    where: {
      id: params.id,
    },
    include:{
      owner:true,
      reservations:true
    }
  });

  return (
    <div className="mt-[5rem] pb-[5rem] max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-2 w-full">
      <div className="flex-1">
        <div className="relative w-full h-[20rem] md:h-[25rem]">
          <Image
            className="object-cover rounded-lg"
            src={list?.image!}
            alt={list?.name || "list name"}
            fill
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center items-start justify-between">
          <div>
            <h2 className="text-2xl font-medium py-2">{list?.name}</h2>
            <p className="text-sm text-gray-600">{list?.description}</p>
          </div>
          <p className="text-2xl font-bold">${list?.price}</p>
        </div>

        <h3 className="text-xl font-semibold py-4">Facilities You Will Get</h3>

        <div className="flex gap-2 flex-wrap">
          {list?.amenities.map((amen) => (
            <div
              className="px-4 py-2 bg-gray-300 text-md  rounded-md"
              key={amen}
            >
              {amen}
            </div>
          ))}
        </div>

        <h2 className="text-xl font-medium mt-4 underline p-1">
          This property is Hosted By
        </h2>

        <div className="flex items-center justify-center md:justify-between gap-4 flex-wrap p-2 bg-gray-100 rounded-md">
          <Image
            src={list?.owner.image || ""}
            alt="host image"
            width={40}
            height={40}
            className="rounded-full ring-2"
          />
          <p>{list?.owner.name}</p>
          <p>{list?.owner.email}</p>
        </div>

        <h2 className="text-xl font-medium mt-4">Reviews and Rating</h2>
        <small className="text-xs font-light -mt-2 leading-snug">creating review and rating is open for testing, but in reality it would be accessible for authorized user</small>
        <Review list={list!}/>
      </div>
      <div className="flex-1">
        <ReservationPage session={session} list={list!} user={user!} />
        <div className="md:p-4">
          <h2 className="mt-4 text-xl font-medium">Where we are?</h2>
          <p className="">{list?.address}</p>
          <div className="w-full h-[30rem] rounded-[2rem] overflow-hidden">
            <ListMap
              longitude={list?.longitude}
              latitude={list?.latitude}
              image={list?.image!}
              address={list?.address!}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListingPage;
