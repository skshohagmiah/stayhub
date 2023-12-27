import React from 'react'
import List from './List'


interface ListingProps {
  searchParams:{search:string,guests:string, startDate:string, endDate:string}
}

const Listing = ({searchParams}:ListingProps) => {
  return (
    <section className='max-w-7xl mx-auto p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-[10rem] pb-[3rem] '>
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
    </section>
  )
}

export default Listing