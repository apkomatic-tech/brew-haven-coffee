import React from 'react';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { useNextSanityImage } from 'next-sanity-image';

import sanityClient from '../sanityClient';
import { OrderItem } from '../types/OrderItem';

interface IOrderSummaryItemProps {
  item: OrderItem;
}

const OrderSummaryItem: React.FC<IOrderSummaryItemProps> = ({ item }) => {
  const { title, price, image, slug } = item;
  const imageProps = useNextSanityImage(sanityClient, image)! as ImageProps;

  return (
    <div className="p-6 flex border-b border-gray-300 relative">
      <Link href={`/menu/${slug}`} passHref>
        <a className="w-24 h-24 mr-8 block">
          <Image {...imageProps} alt={title} />
        </a>
      </Link>
      <div className="flex-grow">
        <div className="font-bold">{title}</div>
        <div className="font-bold mt-10">${price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default OrderSummaryItem;
