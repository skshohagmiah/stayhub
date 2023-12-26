import React from 'react'
import { LuWarehouse } from "react-icons/lu";

const Category = () => {
  return (
    <div className='flex items-center justify-center group flex-col gap-2 text-gray-600 hover:text-black transition-all'>
        <LuWarehouse className='w-6 h-6 '/>
        <p className=' text-sm font-md group-hover:font-semibold'>House</p>
    </div>
  )
}

export default Category