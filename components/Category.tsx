import React from 'react'
import { IconType } from 'react-icons';
import { LuWarehouse } from "react-icons/lu";

interface CategoryProps{
  icon:any,
  title:string
}

const Category = ({icon,title}:CategoryProps) => {
  return (
    <div className='flex items-center justify-center group flex-col gap-2 text-gray-600 hover:text-black transition-all whitespace-nowrap'>
       {icon}
        <p className=' text-sm font-md group-hover:font-semibold'>{title}</p>
    </div>
  )
}

export default Category