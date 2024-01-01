"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Marker, Popup } from "react-map-gl";

interface MapMarkerProps {
  latitude: string;
  longitude: string;
  image: string;
  address: string;
  id?:string
}

const MapMarker = ({ latitude, longitude, image, address,id }: MapMarkerProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const params = useParams()


  return (
    <>
      <Marker
        latitude={parseFloat(latitude || "0")}
        longitude={parseFloat(longitude || "0")}
      >
        <div
          className="relative"
          onClick={() => setIsPopupOpen((prev) => !prev)}
        >
          <FaMapMarkerAlt className="w-10 h-10 text-rose-500" />
          {isPopupOpen && (
            <Link href={`/listing/${id || params.id}`} className="absolute top-10 w-[10rem] h-auto rounded-md shadow-md bg-white p-2">
              <Image
                src={image}
                alt="place"
                width={200}
                height={200}
                className="rounded-md "
              />
              <p>{address}</p>
            </Link>
          )}
        </div>
      </Marker>
    </>
  );
};

export default MapMarker;
