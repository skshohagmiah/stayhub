import React from 'react'
import List from './List'
import { prisma } from '@/libs/db'


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
    <section className='max-w-7xl mx-auto p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-[11rem] pb-[3rem] '>
       {listing.map((list) => (
        <List key={list.id} list={list}/>
       ))}
    </section>
  )
}

export default Listing