import React from 'react';
import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { HiOutlineTrash as DeleteIcon } from 'react-icons/hi';

import { OrderItem } from '../types/OrderItem';
import sanityClient from '../sanityClient';
import CartContext from '../state/cartContext';

import styles from './OrderLineItem.module.css';

function OrderLineItem(item: OrderItem) {
  const { id, title, image, quantity, price } = item;
  const imageProps = useNextSanityImage(sanityClient, image)!;
  const { dispatch } = useContext(CartContext);
  console.log(item.slug);
  return (
    <div className={styles.OrderLineItem}>
      <Link href={`/menu/${item.slug}`}>
        <a>
          <Image {...imageProps} width={167} height={167} alt={title} />
        </a>
      </Link>
      <div className='ml-4 block flex-grow'>
        <h3 className='text-base md:text-lg font-bold flex justify-between mb-1 text-black'>
          <span>{title}</span> <span>${price.toFixed(2)}</span>
        </h3>
        <p>Quantity: {quantity}</p>
      </div>
      <button className={styles.OrderLineItemRemoveBtn} type='button' onClick={() => dispatch({ type: 'REMOVE_ORDER', payload: id })}>
        <DeleteIcon style={{ marginRight: '0.15rem' }} />
        Remove
      </button>
    </div>
  );
}

export default OrderLineItem;
