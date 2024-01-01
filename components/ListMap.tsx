"use client";

import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import MapMarker from "./MapMarker";

interface ListMapProps{
  longitude:string |undefined,
  latitude:string | undefined,
  image:string;
  address:string
}


const ListMap = ({longitude,latitude,image,address}:ListMapProps) => {


  return (
    <ReactMapGL
    //@ts-ignore
    // mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
    mapboxAccessToken="pk.eyJ1Ijoic2hvaGFnLW1pYWgiLCJhIjoiY2xwcmt4MzA3MDl3cDJycDhiY2poOTFnbyJ9.aMMUoVKyevSez0wp8KDW_g"
    // onViewportChange={(newViewport: any) => setViewport(newViewport)}
    mapStyle="mapbox://styles/shohag-miah/clqs8hsq900yo01qr6ago2ca3"
    style={{width:'100%', height:'100%'}}
    initialViewState={{
        longitude: parseFloat(longitude || '0'),
        latitude: parseFloat(latitude || '0'),
        zoom: 11
      }}
    >
      <MapMarker  latitude={latitude!} longitude={longitude!} address={address} image={image} />
    </ReactMapGL>
  );
};

export default ListMap;
