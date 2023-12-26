import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'} className='hidden sm:flex  gap-2 items-center basis-full p-4'>
        <Image src='/logo.svg' width={30} height={30} alt='logo'/>
        <p className='text-rose-500 text-lg font-bold'>StayHub</p>
    </Link>
  )
}

export default Logo