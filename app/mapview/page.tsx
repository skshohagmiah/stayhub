import ListingMap from '@/components/ListingMap';
import { prisma } from '@/libs/db'
import Link from 'next/link';
import React from 'react'
import { FaList } from "react-icons/fa";


const MapviewPage = async() => {

    const listing = await prisma.listing.findMany();


  return (
    <section className='max-w-7xl mx-auto mt-[5rem] h-full p-2 rounded-[2rem] overflow-hidden'>
        <ListingMap listiing={listing}/>
        <Link href={'/'} className='flex gap-2 items-center fixed bottom-5 md:bottom-10 left-[35%] md:left-[45%] text-white p-4 rounded-full bg-gray-500 z-40 hover:bg-gray-600 transition-all' >Listview <FaList /></Link>
    </section>
  )
}

export default MapviewPage