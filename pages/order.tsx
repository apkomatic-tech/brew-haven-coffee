import type { NextPage } from 'next';
import { useNextSanityImage } from 'next-sanity-image';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import sanityClient from '../sanityClient';
import CartContext from '../state/cartContext';
import { OrderItem } from '../types/OrderItem';

function LineItem(item: OrderItem) {
  const { id, title, image, quantity, price } = item;
  const imageProps = useNextSanityImage(sanityClient, image);
  const ctx = useContext(CartContext);

  return (
    <div className='flex mb-6 pb-6 border-b border-gray-200 relative'>
      <div>
        <Image {...imageProps} width={167} height={167} alt={title} />
      </div>
      <div className='ml-4 block flex-grow'>
        <h3 className='text-base md:text-lg font-bold flex justify-between mb-1 text-black'>
          <span>{title}</span> <span>${price}</span>
        </h3>
        <p>Quantity: {quantity}</p>
      </div>
      <button className='text-primary font-bold absolute bottom-6 right-0' type='button' onClick={() => ctx?.removeFromOrder(id)}>
        Remove
      </button>
    </div>
  );
}

const Order: NextPage = () => {
  const ctx = useContext(CartContext);
  const orderItems = ctx?.items ?? [];
  return (
    <>
      <Head>
        <title>Doge Coffee | Order</title>
      </Head>
      <div className='page-content mx-auto max-w-4xl px-8 md:px-2 text-left'>
        <h1 className='text-2xl font-bold text-center mb-6 pb-6 border-b border-gray-200'>Review Your Order</h1>
        {!orderItems.length && (
          <div className='text-center mb-24 text-gray-600'>
            No Items in Your Order. <br />
            Take a look at the{' '}
            <Link href='/menu'>
              <a className='text-primary font-bold underline'>Menu</a>
            </Link>
          </div>
        )}
        {orderItems.length > 0 && (
          <div>
            <div className='mb-6'>
              {orderItems.map((item) => (
                <LineItem key={item.id} {...item} />
              ))}
            </div>
            <div className='mb-24 pt-6'>
              <div className='flex justify-between items-center mb-6'>
                <div>
                  <h3 className='font-bold text-xl'>Subtotal</h3>
                  <p className='text-gray-600'>Taxes will be calculated at checkout</p>
                </div>
                <div className='font-bold text-xl'>${ctx?.subtotal}</div>
              </div>
              <Link href='/'>
                <a className='font-bold rounded-sm bg-primary text-white px-3 py-3 text-center w-full block opacity-100 hover:opacity-90 transition transition-opacity md:ml-auto md:w-72'>
                  Proceed to Order
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Order;
