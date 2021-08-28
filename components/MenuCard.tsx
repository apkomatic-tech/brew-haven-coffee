import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image';
import client from '../sanityClient';

type MenuCardProps = {
  id: number | string;
  image: any;
  title: string;
  slug: string;
  price: number;
};

function MenuCard({ image, title, slug, price }: MenuCardProps) {
  const imageProps = useNextSanityImage(client, image, {
    enableBlurUp: true
  });
  return (
    <Link href={`/menu/${slug}`}>
      <a className='flex flex-col items-center h-full'>
        <div className='flex flex-col relative h-full rounded-sm border border-gray-100 shadow-sm drop-shadow-sm hover:shadow-md transition-all duration-150'>
          <div className='max-w-xs'>
            <Image {...imageProps} alt={title} />
          </div>
          <h3 className='text-center font-bold text-lg mt-3 mb-3'>{title}</h3>
          <div className='absolute -top-2 -right-2 py-1 px-3 transform rotate-6 font-bold rounded-sm bg-secondary shadow-lg drop-shadow-sm text-black text-lg'>
            <sup>$</sup>
            {price.toFixed(2)}
          </div>
        </div>
      </a>
    </Link>
  );
}

export default MenuCard;
