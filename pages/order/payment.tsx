import { useContext, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { OrderItem } from '../../types/OrderItem';
import CartContext from '../../state/cartContext';
import OrderSummaryItem from '../../components/OrderSummaryItem';

import styles from './payment.module.css';
import { BiErrorCircle } from 'react-icons/bi';

interface IFormData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  address1: string;
  address2: string;
  city: string;
  zipcode: string;
}

// validation
const schema = yup.object().shape({
  firstName: yup.string().trim().required('First name is a required field'),
  lastName: yup.string().trim().required('Last name is a required field'),
  emailAddress: yup.string().trim().required('Email is a required field').email('Please enter a valid email'),
  address1: yup.string().trim().required('Address 1 is a required field'),
  city: yup.string().trim().required('City is a required field'),
  zipcode: yup.string().trim().required('Zip Code is a required field')
});

const Payment: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormData>({
    resolver: yupResolver(schema)
  });
  const [paymentError, setPaymentError] = useState<null | string>(null);
  const { cart } = useContext(CartContext);
  const { items: orderItems } = cart;
  const serviceFee: number = 0.1;
  const orderSubtotal = cart.subtotal.toFixed(2);
  const orderTotal = useMemo(() => (cart.subtotal + cart.subtotal * serviceFee).toFixed(2), [cart.subtotal]);

  function processOrder(customerData: IFormData) {
    const orderData = {
      total: orderTotal,
      items: orderItems
    };

    const paymentData = {
      ...customerData,
      ...orderData
    };

    fetch('/api/order', {
      body: JSON.stringify(paymentData),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res: any) => res.json())
      .then((res: any) => {
        if (!res.isSuccess) {
          setPaymentError(res.errors);
          return;
        }
        setPaymentError(null);
        // on succesfull order, we want to reset cart
        // TODO: create and call clear cart method in cartContext
        // TODO: create order confirmation page
        router.push('/menu');
      })
      .catch((err) => {
        console.error(err.message);
        setPaymentError('Sorry, we are not able to process your request, please try again');
      });
  }

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
      <div className="page-content wrapper">
        <form onSubmit={handleSubmit(processOrder)}>
          <div className="grid md:grid-cols-2 md:gap-12">
            <div>
              {/* Contact Info block */}
              <div className={styles.block}>
                <h3 className="text-xl mb-7 font-bold">Your Information</h3>
                <div className="grid gap-6 sm:grid-cols-2 mb-6">
                  <div className={styles.fieldBlock}>
                    <label htmlFor="firstname" className={styles.label}>
                      First Name
                    </label>
                    <input type="text" id="firstname" className={`${styles.field} ${errors.firstName ? styles.fielderror : ''}`} {...register('firstName')} />
                    {errors.firstName && <div className={styles.errorMessage}>{errors.firstName.message}</div>}
                  </div>
                  <div className={styles.fieldBlock}>
                    <label htmlFor="lastname" className={styles.label}>
                      Last Name
                    </label>
                    <input type="text" id="lastname" className={`${styles.field} ${errors.lastName ? styles.fielderror : ''}`} {...register('lastName')} />
                    {errors.lastName && <div className={styles.errorMessage}>{errors.lastName.message}</div>}
                  </div>
                </div>
                <div className="grid grid-cols-1">
                  <div className={styles.fieldBlock}>
                    <label htmlFor="email" className={styles.label}>
                      Email address
                    </label>
                    <input type="email" id="email" className={`${styles.field} ${errors.emailAddress ? styles.fielderror : ''}`} {...register('emailAddress')} />
                    {errors.emailAddress && <div className={styles.errorMessage}>{errors.emailAddress.message}</div>}
                  </div>
                </div>
              </div>

              <div className={styles.block}>
                <h3 className="text-xl mb-7 font-bold">Your Delivery Address</h3>
                <div className="grid grid-cols-1 mb-6">
                  <div className={styles.fieldBlock}>
                    <label htmlFor="delivery_address" className={styles.label}>
                      Address
                    </label>
                    <input type="text" id="delivery_address" className={`${styles.field} ${errors.address1 ? styles.fielderror : ''}`} {...register('address1')} />
                    {errors.address1 && <div className={styles.errorMessage}>{errors.address1.message}</div>}
                  </div>
                </div>
                <div className="grid grid-cols-1 mb-6">
                  <div className={styles.fieldBlock}>
                    <label htmlFor="delivery_address2" className={styles.label}>
                      Address 2
                    </label>
                    <input type="text" id="delivery_address2" name="delivery_address2" className={`${styles.field} ${errors.address2 ? styles.fielderror : ''}`} />
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 mb-6">
                  <div className={styles.fieldBlock}>
                    <label htmlFor="delivery_city" className={styles.label}>
                      City
                    </label>
                    <input type="text" id="delivery_city" className={`${styles.field} ${errors.city ? styles.fielderror : ''}`} {...register('city')} />
                    {errors.city && <div className={styles.errorMessage}>{errors.city.message}</div>}
                  </div>
                  <div className={styles.fieldBlock}>
                    <label htmlFor="delivery_zip" className={styles.label}>
                      Zip Code
                    </label>
                    <input type="text" id="delivery_zip" className={`${styles.field} ${errors.zipcode ? styles.fielderror : ''}`} {...register('zipcode')} />
                    {errors.zipcode && <div className={styles.errorMessage}>{errors.zipcode.message}</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* summary block */}
            <div>
              <h3 className="text-xl mb-7 font-bold">Order summary</h3>
              <div className={styles.summaryBlock}>
                {orderItems.map((item: OrderItem) => (
                  <OrderSummaryItem
                    key={item.id}
                    item={item}
                    removeFromOrder={() => {
                      // TODO: remove from cart
                    }}
                  />
                ))}
                <div className="p-6">
                  <div className="flex justify-between py-3">
                    Subtotal <span>${orderSubtotal}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    Service Fee <span>{(serviceFee * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between font-bold border-t borer-gray-300 text-lg py-4">
                    Total <span>${orderTotal}</span>
                  </div>
                </div>

                {paymentError && (
                  <div className="p-4 bg-red-200 text-center mb-4 text-red-900 flex items-center text-sm border-l-4 border-red-800">
                    <span className="mr-2 text-xl">
                      <BiErrorCircle />
                    </span>
                    <span>{paymentError}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 p-6">
                  <button type="submit" className="bg-primarydark text-white text-center py-3 px-12 w-full">
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
