'use client';
import useSearchModal from '@/hooks/useSearchModal';
import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";


const SearchBar = () => {
  
  const {onOpen} = useSearchModal()

  return (
 <div className='lg:flex-1  md:flex-shrink relative' onClick={onOpen}>
     <div className='flex items-center w-fit  border-2 rounded-full py-2 px-1 md:p-2 cursor-pointer shadow hover:shadow-md  md:gap-2'>
        <p className=' border-r-2 text-md text-gray-700 font-medium px-2 '>Anywhere</p>
        <p className=' border-r-2 text-md text-gray-700 font-medium px-2 '>Any time</p>
        <p className='hidden lg:block text-md text-gray-500 font-medium  '>Add guest</p>
        <FaSearch className='w-8 h-8 p-2 bg-rose-500 text-white rounded-full ml-4'/>
    </div>
 </div>
  )
}

export default SearchBar