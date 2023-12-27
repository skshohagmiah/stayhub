'use client';
import useListModal from '@/hooks/useListModal';
import useSearchModal from '@/hooks/useSearchModal';
import React from 'react'

const BecomeHost = () => {
  const {onOpen} = useListModal()
  return (
    <button onClick={onOpen} className='hidden md:block text-left p-2  font-medium text-medium hover:bg-gray-200 transition-all rounded-full px-3'>Become a Host</button>
  )
}

export default BecomeHost