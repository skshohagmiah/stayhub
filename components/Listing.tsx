import React from 'react'
import List from './List'
import { prisma } from '@/libs/db'
import Link from 'next/link'
import { FaMap } from "react-icons/fa";

interface ListingProps {
  searchParams:{search:string,guests:string, startDate:string, endDate:string,category?:string}
}

const Listing = async({searchParams}:ListingProps) => {

  let query:any = {};

  if(searchParams.search){
    query.name = {
      contains:searchParams.search,
      mode:'insensitive'
    }
  }

  if(searchParams.guests){
    query.guests = {
      gte:parseInt(searchParams.guests)
    }
  }
  if(searchParams.category){
    query.amenities = {
      has: searchParams.category
    }
  }


  if(searchParams.startDate || searchParams.endDate){
    query.reservations = {
      none:{
        OR:[
          {
            startDate: new Date(searchParams.startDate)
          },
          {
            endDate: new Date(searchParams.endDate)
          }
        ]
      }
    }
  }

  const listing = await prisma.listing.findMany({
    where:query
  
  });

  return (
    <section className='max-w-7xl h-full mx-auto p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-[11rem] pb-[3rem] relative'>
       {listing.map((list) => (
        <List key={list.id} list={list}/>
       ))}
       <Link href={`/mapview`} className='flex gap-2 items-center fixed bottom-5 md:bottom-10 left-[35%] md:left-[45%] text-white p-4 rounded-full bg-gray-500 z-40 hover:bg-gray-600 transition-all'>Mapview <FaMap /></Link>
    </section>
  )
}

export default Listing