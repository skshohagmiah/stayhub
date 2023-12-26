import Categories from '@/components/Categories'
import Listing from '@/components/Listing'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='relative mx-auto max-w-7xl'>
    <Categories />
    <Listing />
    </div>
  )
}
