import React, { useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import CartContext from '../../state/cartContext';
import OrderLineItem from '../../components/OrderLineItem';

const Order: NextPage = () => {
  const { state } = useContext(CartContext);
  const { items: orderItems, subtotal } = state;
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
                <OrderLineItem key={item.id} {...item} />
              ))}
            </div>
            <div className='mb-24 pt-6'>
              <div className='flex justify-between items-center mb-6'>
                <div>
                  <h3 className='font-bold text-xl'>Subtotal</h3>
                  <p className='text-gray-600'>Taxes will be calculated at checkout</p>
                </div>
                <div className='font-bold text-xl'>${subtotal}</div>
              </div>
              <Link href='/order/payment'>
                <a className='font-bold rounded-sm bg-primary text-white px-3 py-3 text-center w-full block opacity-100 hover:opacity-90 transition transition-opacity md:ml-auto md:w-72'>
                  Proceed to Payment
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
