import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useNextSanityImage } from 'next-sanity-image';
import { HiTrash as RemoveIcon } from 'react-icons/hi';

import sanityClient from '../sanityClient';
import { OrderItem } from '../types/OrderItem';
import { CartAction } from '../state/cartContext';

interface IOrderSummaryItemProps {
  item: OrderItem;
  removeFromOrder: () => React.Dispatch<CartAction> | void;
}

const OrderSummaryItem: React.FC<IOrderSummaryItemProps> = ({ item: { title, price, image, slug }, removeFromOrder }) => {
  const imageProps = useNextSanityImage(sanityClient, image)!;

  return (
    <div className='p-6 flex border-b border-gray-300 relative'>
      <Link href={`/menu/${slug}`} passHref>
        <a className='w-24 h-24 mr-8 block'>
          <Image {...imageProps} alt={title} />
        </a>
      </Link>
      <div className='flex-grow'>
        <div className='font-bold'>{title}</div>
        <div className='font-bold mt-10'>${price.toFixed(2)}</div>
        <button type='button' onClick={removeFromOrder} className='flex items-center absolute bottom-6 right-6 text-primarydark hover:bg-primaryOpaque p-1 text-sm'>
          <span className='mr-1'>
            <RemoveIcon />
          </span>
          Remove
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryItem;
