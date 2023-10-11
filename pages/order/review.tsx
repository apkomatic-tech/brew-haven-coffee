import React, { useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import CartContext from '../../state/cartContext';
import OrderLineItem from '../../components/OrderLineItem';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './reviewOrder.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import setPageTitle from '../../utils/setPageTitle.utils';

const Order: NextPage = () => {
  const { cart, isCartLoading } = useContext(CartContext);
  const { items: orderItems, subtotal } = cart;

  if (isCartLoading) {
    return (
      <div>
        <Head>
          <title>{setPageTitle('Order Review')}</title>
        </Head>
        <div className="page-content mx-auto max-w-4xl px-8 md:px-2 text-left">
          <SkeletonTheme baseColor="rgb(241 245 249)" duration={1.1}>
            <div className="grid gap-2 mb-4 md:grid-flow-col">
              <div className="col-span-1">
                <Skeleton height={167} width={167} />
              </div>
              <div className="col-span-11">
                <Skeleton height={30} className="mb-4" />
                <Skeleton height={50} />
              </div>
            </div>
            <div className="grid gap-2 mb-4 md:grid-flow-col">
              <div className="col-span-1">
                <Skeleton height={167} width={167} />
              </div>
              <div className="col-span-11">
                <Skeleton height={30} className="mb-4" />
                <Skeleton height={50} />
              </div>
            </div>
            <div className="grid gap-2 mb-4 md:grid-flow-col">
              <div className="col-span-1">
                <Skeleton height={167} width={167} />
              </div>
              <div className="col-span-11">
                <Skeleton height={30} className="mb-4" />
                <Skeleton height={50} />
              </div>
            </div>
          </SkeletonTheme>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Brew Haven Coffee | Review Your Order</title>
      </Head>
      <div className="page-content mx-auto max-w-4xl px-8 md:px-2 text-left">
        <h1 className="text-2xl font-bold text-center mb-6 pb-6 border-b border-gray-200">Review Your Order</h1>
        {orderItems.length === 0 && (
          <div className={styles.emptyOrder}>
            Your order contains no items.
            <Link href="/menu" passHref>
              <a className="dgcf-button block max-w-xs mx-auto mt-4">Explore Menu</a>
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
              <div className="flex justify-between items-center mb-6 p-6 bg-slate-50">
                <div>
                  <h3 className="font-bold text-xl">Subtotal</h3>
                </div>
                <div className="font-bold text-xl">${subtotal.toFixed(2)}</div>
              </div>
              <Link href="/order/payment">
                <a className="dgcf-button w-full block transition md:ml-auto md:w-72">Proceed to Payment</a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
