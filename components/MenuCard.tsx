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
};

function MenuCard({ image, title, slug }: MenuCardProps) {
  const imageProps = useNextSanityImage(client, image, {
    blurUpImageWidth: 124,
    blurUpImageQuality: 40,
    blurUpAmount: 24
  });
  return (
    <Link href={`/menu/${slug}`}>
      <a className='flex flex-col items-center'>
        <div className='rounded-sm border border-gray-100 shadow-sm drop-shadow-sm hover:shadow-md transition-all duration-150'>
          <div className='max-w-xs'>
            <Image {...imageProps} alt={title} />
          </div>
          <h3 className='text-center font-bold text-lg mt-3 mb-3'>{title}</h3>
        </div>
      </a>
    </Link>
  );
}

export default MenuCard;
