import React, { useContext, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import CartContext from '../../state/cartContext';
import OrderLineItem from '../../components/OrderLineItem';

import styles from './reviewOrder.module.css';

const Order: NextPage = () => {
  const { state } = useContext(CartContext);
  const { items: orderItems, subtotal } = state;

  return (
    <div>
      <Head>
        <title>Doge Coffee | Review Your Order</title>
      </Head>
      <div className="page-content mx-auto max-w-4xl px-8 md:px-2 text-left">
        <h1 className="text-2xl font-bold text-center mb-6 pb-6 border-b border-gray-200">Review Your Order</h1>
        {orderItems.length === 0 && (
          <div className={styles.emptyOrder}>
            Your order contains no items.
            <Link href="/menu" passHref>
              <a className="bg-primary text-white p-2 block max-w-xs mx-auto mt-4">Explore Menu</a>
            </Link>
          </div>
        )}
        {orderItems.length > 0 && (
          <div className="text-left">
            <div className="mb-6">
              {orderItems.map((item) => (
                <OrderLineItem key={item.id} {...item} />
              ))}
            </div>
            <div className="mb-24 pt-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-xl">Subtotal</h3>
                  <p className="text-gray-600">Taxes will be calculated at checkout</p>
                </div>
                <div className="font-bold text-xl">${subtotal}</div>
              </div>
              <Link href="/order/payment">
                <a className="font-bold rounded-sm bg-primary text-white px-3 py-3 text-center w-full block opacity-100 hover:opacity-90 transition transition-opacity md:ml-auto md:w-72">
                  Proceed to Payment
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
