import React from 'react';
import { useContext } from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';

import { OrderItem } from '../types/OrderItem';
import sanityClient from '../sanityClient';
import CartContext from '../state/cartContext';

function OrderLineItem(item: OrderItem) {
  const { id, title, image, quantity, price } = item;
  const imageProps = useNextSanityImage(sanityClient, image)!;
  const { dispatch } = useContext(CartContext);

  return (
    <div className='flex mb-6 pb-6 border-b border-gray-200 relative'>
      <div>
        <Image {...imageProps} width={167} height={167} alt={title} />
      </div>
      <div className='ml-4 block flex-grow'>
        <h3 className='text-base md:text-lg font-bold flex justify-between mb-1 text-black'>
          <span>{title}</span> <span>${price.toFixed(2)}</span>
        </h3>
        <p>Quantity: {quantity}</p>
      </div>
      <button className='text-primary font-bold absolute bottom-6 right-0' type='button' onClick={() => dispatch({ type: 'REMOVE_ORDER', payload: id })}>
        Remove
      </button>
    </div>
  );
}

export default OrderLineItem;
