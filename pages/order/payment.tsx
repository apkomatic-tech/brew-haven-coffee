import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import sanityClient from '../../sanityClient';
import CartContext from '../../state/cartContext';
import { OrderItem } from '../../types/OrderItem';

import styles from './payment.module.css';

function OrderSummaryItem(props: OrderItem) {
  const image = useNextSanityImage(sanityClient, props.image);
  return (
    <div className='p-6 flex border-b border-gray-300'>
      <div className='w-24 h-24 mr-8'>
        <Image {...image} alt={props.title} />
      </div>
      <div className='flex-grow'>
        <div className='font-bold'>{props.title}</div>
        <div className='font-bold mt-10'>${props.price.toFixed(2)}</div>
      </div>
    </div>
  );
}

const Payment: NextPage = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(CartContext);
  const { items: orderItems } = state;
  const serviceFee = 5;

  useEffect(() => {
    if (!orderItems.length) {
      router.push('/menu');
    }
  }, [orderItems.length, router]);

  return (
    <>
      <Head>
        <title>Doge Coffee | Payment</title>
      </Head>
      <div className='page-content wrapper'>
        <form>
          <div className='grid md:grid-cols-2 md:gap-12'>
            <div>
              {/* Contact Info block */}
              <div className={styles.block}>
                <h3 className='text-xl mb-7 font-bold'>Your Information</h3>
                <div className='grid gap-6 sm:grid-cols-2 mb-6'>
                  <div>
                    <label htmlFor='firstname' className={styles.label}>
                      First Name
                    </label>
                    <input type='text' id='firstname' name='firstname' className={styles.field} />
                  </div>
                  <div>
                    <label htmlFor='lastname' className={styles.label}>
                      Last Name
                    </label>
                    <input type='text' id='lastname' name='lastname' className={styles.field} />
                  </div>
                </div>
                <div className='grid grid-cols-1'>
                  <div>
                    <label htmlFor='email' className={styles.label}>
                      Email address
                    </label>
                    <input type='email' id='email' name='email' className={styles.field} />
                  </div>
                </div>
              </div>

              <div className={styles.block}>
                <h3 className='text-xl mb-7 font-bold'>Your Delivery Address</h3>
                <div className='grid grid-cols-1 mb-6'>
                  <div>
                    <label htmlFor='delivery_address' className={styles.label}>
                      Address
                    </label>
                    <input type='text' id='delivery_address' name='delivery_address' className={styles.field} />
                  </div>
                </div>
                <div className='grid grid-cols-1 mb-6'>
                  <div>
                    <label htmlFor='delivery_address2' className={styles.label}>
                      Address 2
                    </label>
                    <input type='text' id='delivery_address2' name='delivery_address2' className={styles.field} />
                  </div>
                </div>
                <div className='grid gap-6 sm:grid-cols-2 mb-6'>
                  <div>
                    <label htmlFor='delivery_city' className={styles.label}>
                      City
                    </label>
                    <input type='text' id='delivery_city' name='delivery_city' className={styles.field} />
                  </div>
                  <div>
                    <label htmlFor='delivery_zip' className={styles.label}>
                      Zip Code
                    </label>
                    <input type='text' id='delivery_zip' name='delivery_zip' className={styles.field} />
                  </div>
                </div>
              </div>
            </div>

            {/* summary block */}
            <div>
              <h3 className='text-xl mb-7 font-bold'>Order summary</h3>
              <div className={styles.summaryBlock}>
                {orderItems.map((item: OrderItem) => (
                  <OrderSummaryItem key={item.id} {...item} />
                ))}
                <div className='p-6'>
                  <div className='flex justify-between py-3'>
                    Subtotal <span>${state.subtotal}</span>
                  </div>
                  <div className='flex justify-between py-3'>
                    Service Fee <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between font-bold border-t borer-gray-300 text-lg py-4'>
                    Total <span>${state.subtotal + serviceFee}</span>
                  </div>
                </div>
                <div className='border-t border-gray-300 p-6'>
                  <button type='submit' className='bg-primarydark text-white text-center py-3 px-12 w-full'>
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Payment;
