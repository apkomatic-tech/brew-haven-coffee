import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import CartContext from '../../state/cartContext';

import styles from './payment.module.css';

const Payment: NextPage = () => {
  const router = useRouter();
  const { state } = useContext(CartContext);
  const { items: orderItems } = state;

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
        </form>
      </div>
    </>
  );
};

export default Payment;
