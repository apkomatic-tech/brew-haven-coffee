import React from 'react';
import { useContext } from 'react';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { HiOutlineTrash as DeleteIcon } from 'react-icons/hi';

import { OrderItem } from '../types/OrderItem';
import sanityClient from '../sanityClient';
import CartContext from '../state/cartContext';

function OrderLineItem(item: OrderItem) {
  const { title, image, quantity, price } = item;
  const imageProps = useNextSanityImage(sanityClient, image)! as ImageProps;
  const { removeFromCart } = useContext(CartContext);
  const removeFromCartFn = removeFromCart!;
  return (
    <div className="flex mb-6 pb-6 border-b border-gray-200 relative">
      <Link href={`/menu/${item.slug}`}>
        <a>
          <Image {...imageProps} width={167} height={167} alt={title} />
        </a>
      </Link>
      <div className="ml-4 block flex-grow">
        <h3 className="text-base md:text-lg font-bold flex justify-between mb-1 text-black">
          <span>{title}</span> <span>${price.toFixed(2)}</span>
        </h3>
        <p>Quantity: {quantity}</p>
      </div>
      <button
        className="flex items-center text-red-700 font-bold absolute bottom-6 right-0 py-1 px-2 rounded-sm text-sm hover:text-red-800"
        type="button"
        onClick={() => removeFromCartFn(item)}>
        <DeleteIcon style={{ marginRight: '0.15rem' }} />
        Remove
      </button>
    </div>
  );
}

export default OrderLineItem;
