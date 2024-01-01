"use client";

import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapMarker from "./MapMarker";
import { Listing } from "@prisma/client";

interface ListingMapProps {
  listiing: Listing[];
}

const ListingMap = ({ listiing }: ListingMapProps) => {
  const markers = listiing.map((list) => ({
    id: list.id,
    latitude: list.latitude,
    longitude: list.longitude,
    image:list.image,
    address:list.address
  }));

  return (
    <ReactMapGL
      //@ts-ignore
      // mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapboxAccessToken="pk.eyJ1Ijoic2hvaGFnLW1pYWgiLCJhIjoiY2xwcmt4MzA3MDl3cDJycDhiY2poOTFnbyJ9.aMMUoVKyevSez0wp8KDW_g"
      // onViewportChange={(newViewport: any) => setViewport(newViewport)}
      mapStyle="mapbox://styles/shohag-miah/clqs8hsq900yo01qr6ago2ca3"
      style={{ width: "100%", height: "100%" }}
      initialViewState={{
        longitude: parseFloat(markers[0].longitude || "0"),
        latitude: parseFloat(markers[0].latitude || "0"),
        zoom: 5,
      }}
    >
      {markers.map((marker) => (
        <MapMarker
        key={marker.id}
          latitude={marker.latitude}
          longitude={marker.longitude}
          address={marker.address}
          image={marker.image}
          id={marker.id}
        />
      ))}
    </ReactMapGL>
  );
};

export default ListingMap;
