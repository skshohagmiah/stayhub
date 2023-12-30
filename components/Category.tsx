import React from 'react';
import { IconType } from 'react-icons';
import { LuWarehouse } from 'react-icons/lu';

interface CategoryProps {
  icon: any;
  title: string;
  selected: boolean;
  onSelect: (title: string) => void;
}

const Category = ({ icon, title, selected, onSelect }:CategoryProps) => {
  const handleSelected = () => {
    onSelect(title);
  };

  return (
    <div
      onClick={handleSelected}
      className={`${
        selected ? 'border-b-2 border-black text-black' : 'text-gray-600'
      } flex items-center justify-center group flex-col gap-2 hover:text-black transition-all whitespace-nowrap`}
    >
      {icon}
      <p className='text-sm font-md group-hover:text-black'>{title}</p>
    </div>
  );
};

export default Category;
