import Image from 'next/image';
import React from 'react'
import { IoIosMenu } from "react-icons/io";
import BecomeHost from './BecomeHost';


const Menu = () => {
  return (
    <div className='flex basis-full justify-end gap-4'>
    <BecomeHost />
    <div className='flex items-center flex-shrink-0 justify-center gap-2 px-3 hover:shadow-md py-2 rounded-full border-2'>
        <IoIosMenu className='w-6 h-6' />
        <Image className='rounded-full' src='/avatar.png' alt='user pic' width={30} height={30}/>
    </div>
    </div>
  )
}

export default Menu