import { prisma } from "@/libs/db";
import { getCurrentUser } from "@/libs/getCurrentUser";
import Image from "next/image";
import React from "react";
import {format} from 'date-fns'

const Trips = async () => {
  const user = await getCurrentUser();
  const trips = await prisma.reservation.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      listing: true,
    },
  });

  const calculateDays = (startDate: Date, endDate: Date) => {
    const timeDifference = endDate.getTime() - startDate.getTime();

    // Calculate the number of days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference || 1;
  };

  if(trips.length === 0){
    return (
      <div className="max-w-7xl mx-auto h-full w-full text-center font-semibold text-xl mt-[10rem]">Sorry, You have No Reservation</div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto mt-[5rem] md:p-4 md:h-full">
      <h2 className="text-xl text-center font-bold mb-4">Your Trips</h2>
      <div className="">
        <div className="w-full ">
          <div className="bg-gray-200 text-gray-600 flex items-center justify-between overflow-x-auto p-2 whitespace-nowrap">
            <h2 className="p-2 md:px-4 ">Image</h2>
            <p className="p-2 md:px-4 ">Address</p>
            <p className="p-2 md:px-4 ">Start Date</p>
            <p className="p-2 md:px-4 ">End Date</p>
            <p className="p-2 md:px-4 ">Cost</p>
            <p className="p-2 md:px-4">Status</p>
          </div>
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="border-b border-gray-300 flex-col items-start flex pb-2 mt-4 md:flex-row md:items-center md:justify-between font-light text-xl w-[90%] md:w-full mx-auto"
            >
              <p className="p-2 md:px-4 relative w-full h-[14rem] md:w-[100px] md:h-[100px] overflow-hidden ">
                <Image
                  src={trip.listing.image}
                  alt={trip.listing.name}
                  className="mx-auto md:mx-0 object-cover rounded-lg"
                  fill
                />
              </p>
              <p className="px-2 md:px-4 py-2">{trip.listing.address}</p>
              <p className="px-2 md:px-4 py-2">
                {format(trip.startDate,'dd-MM-yyyy')}
              </p>
              <p className="px-2 md:px-4 py-2">{format(trip.endDate,'dd-MM-yyyy')}</p>
              <p className="px-2 md:px-4 py-2 text-xl font-semibold">
                $
                {calculateDays(trip.startDate, trip.endDate) *
                  trip.listing.price}
              </p>
              <p className={`px-2 md:px-4 py-2 font-medium ${new Date().getDate() !== trip.startDate.getDate() ? 'text-green-500' : 'text-rose-500'}`}>
                {new Date().getDate() !== trip.startDate.getDate()
                  ? "Upcoming"
                  : "Completed"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trips;
