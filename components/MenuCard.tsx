import React from 'react';
import Link from 'next/link';

type MenuCardProps = {
  id?: number | string;
  image: any;
  slug: string;
  title: string;
};

function MenuCard({ image, slug, title }: MenuCardProps) {
  return (
    <Link href={`/menu/${slug}`}>
      <a className='flex flex-col items-center'>
        <div className='flex items-center justify-center p-6 mb-4 bg-gray-200 rounded-full w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 hover:bg-gray-300 transition-all duration-150'>
          {image}
        </div>
        <h3 className='text-center'>{title}</h3>
      </a>
    </Link>
  );
}

export default MenuCard;
