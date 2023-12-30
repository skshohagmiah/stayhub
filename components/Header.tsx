import React from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'
import Menu from './Menu'
import { getCurrentUser, getCurrentSession } from '@/libs/getCurrentUser'

const Header = async() => {
  const session = await getCurrentSession()
  return (
    <header className='flex lg:gap-8  sm:gap-0 items-center justify-between max-w-7xl mx-auto h-fit p-2 fixed z-40 bg-white inset-0'>
        <Logo />
        <SearchBar />
        <Menu session={session!}/>
    </header>
  )
}

export default Header