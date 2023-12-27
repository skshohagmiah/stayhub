import React from 'react'
import Category from './Category'
import getCategoryData from '@/libs/getCategoryData'

const Categories = () => {
  const allCategories = getCategoryData();
  return (
    <section className='categories fixed top-[4.2rem] md:top-[4.9rem] z-30 bg-white shadow-sm flex items-center space-x-12 justify-between max-w-7xl mx-auto p-4 overflow-scroll'>
        {
          allCategories.map((category) => (
            <Category key={category.title} title={category.title} icon={category.icon}/>
          ))
        }

    </section>
  )
}

export default Categories