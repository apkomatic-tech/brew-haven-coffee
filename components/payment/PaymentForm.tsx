import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Link from 'next/link';
import { useState, useContext, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { BiErrorCircle } from 'react-icons/bi';
import { v4 as uuid } from 'uuid';

import AuthContext from '../../state/authContext';
import CartContext from '../../state/cartContext';
import { OrderItem } from '../../types/OrderItem';
import OrderSummaryItem from '../OrderSummaryItem';

// TODO: refactor - create styled componnents instead of importing css module
import styles from '../../pages/order/payment.module.css';
import { CartService } from '../../service/cart.service';
import { ORDER_SERVICE_FEE } from '../../config/cart.config';

interface IFormData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  address1: string;
  address2: string;
  city: string;
  zipcode: string;
}

interface PaymentFormProps {
  handleSuccessfulPayment: (clientSecret?: string, orderId?: string) => void;
}

// validation
const schema = yup.object().shape({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  emailAddress: yup.string().trim().required('Email is required').email('Please enter a valid email'),
  address1: yup.string().trim().required('Address 1 is required'),
  city: yup.string().trim().required('City is required'),
  zipcode: yup.string().trim().required('Zip Code is required')
});

const PaymentForm = ({ handleSuccessfulPayment }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | undefined>('');

  // context
  const { authUser } = useContext(AuthContext);
  const { cart, clearCart } = useContext(CartContext);
  // next router
  // validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      emailAddress: authUser?.email ?? ''
    }
  });

  // derived state
  const { items: orderItems } = cart;
  const orderSubtotal = cart.subtotal.toFixed(2);
  const orderTotal = useMemo(() => (cart.subtotal + cart.subtotal * ORDER_SERVICE_FEE).toFixed(2), [cart.subtotal]);
  const disabledPaymentButton = isProcessingPayment;

  async function processOrder(customerData: IFormData) {
    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    });

    if (!error) {
      const orderData = {
        total: Number(orderTotal),
        items: orderItems
      };

      try {
        const orderId = uuid();
        await CartService.createOrder(orderId, {
          total: Number(orderData.total),
          userId: authUser ? authUser.uid : '',
          items: orderData.items,
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          date: Date.now()
        });

        // reset any payment errors and clear cart
        setPaymentError('');
        clearCart();
        handleSuccessfulPayment(paymentIntent?.client_secret ?? '', orderId);
      } catch (err) {
        console.error('store order unhandled error', { err });
      }
    } else if (error.type === 'card_error' || error.type === 'validation_error') {
      setPaymentError(error.message);
    } else {
      setPaymentError('An unexpected error occurred.');
    }

    setIsProcessingPayment(false);
  }

  return (
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
          <div className="text-right translate-y-6">
            <Link href="/order/review" passHref>
              <a className="link">Edit Order</a>
            </Link>
          </div>
          <h3 className="text-xl mb-7 font-bold">Order summary</h3>
          <div className={styles.summaryBlock}>
            {orderItems.map((item: OrderItem) => (
              <OrderSummaryItem key={item.id} item={item} />
            ))}
            <div className="p-6">
              <div className="flex justify-between py-3">
                Subtotal <span>${orderSubtotal}</span>
              </div>
              <div className="flex justify-between py-3">
                Service Fee <span>{(ORDER_SERVICE_FEE * 100).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between font-bold border-t borer-gray-300 text-lg py-4">
                Total <span>${orderTotal}</span>
              </div>
            </div>
          </div>
          {/* Payment block */}
          <h3 className="text-xl mt-8 mb-7 font-bold">Payment Information</h3>
          <div className="mt-6">
            {paymentError && (
              <div className="p-4 bg-red-200 text-center mb-4 text-red-900 flex items-center text-sm border-l-4 border-red-800">
                <span className="mr-2 text-xl">
                  <BiErrorCircle />
                </span>
                <span>{paymentError}</span>
              </div>
            )}

            <div className="my-6">
              {/* Stripe Payment Form */}
              <PaymentElement />
            </div>

            <div className="border-t border-gray-300 my-6 pt-6">
              <button type="submit" disabled={disabledPaymentButton} className="dgcf-button w-full">
                {isProcessingPayment ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
