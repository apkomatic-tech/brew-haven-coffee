import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

function toSlug(value: string) {
  return value.trim().toLowerCase().replace(/\s/gm, '-');
}

type MenuCardProps = {
  id: number | string;
  image: any;
  title: string;
};

function MenuCard({ image, title }: MenuCardProps) {
  const router = useRouter();
  return (
    <button
      type='button'
      onClick={() => {
        router.push(`/menu/${toSlug(title)}`, undefined, {});
      }}>
      <a className='flex flex-col items-center'>
        <div className='flex items-center justify-center p-6 mb-4 bg-gray-200 rounded-full w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 hover:bg-gray-300 transition-all duration-150'>
          <Image src={image} alt={title} />
        </div>
        <h3 className='text-center'>{title}</h3>
      </a>
    </button>
  );
}

export default MenuCard;
