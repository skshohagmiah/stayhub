import Categories from '@/components/Categories'
import Listing from '@/components/Listing'
import Image from 'next/image'


interface HomeProps {
  searchParams:{search:string,guests:string, startDate:string, endDate:string,category?:string}
}


export default function Home({searchParams}:HomeProps) {
  return (
    <div className='relative mx-auto max-w-7xl'>
    <Categories />
    <Listing searchParams={searchParams}/>
    </div>
  )
}
