import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Elements } from '@stripe/react-stripe-js';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import CartContext from '../../state/cartContext';
import AuthContext from '../../state/authContext';
import { stripePromise } from '../../utils/stripe.utils';
import PaymentForm from '../../components/payment/PaymentForm';

import 'react-loading-skeleton/dist/skeleton.css';
import { Order } from '@stripe/stripe-js';
import { OrderItem } from '../../types/OrderItem';

const Payment = () => {
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const { authUser } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState('');
  const orderPlaced = useRef(false);

  useEffect(() => {
    async function getStripeClientSecret(items: OrderItem[]) {
      const paymentIntent = await fetch('/api/payment-intent', {
        body: JSON.stringify({ items, customer: authUser?.displayName }),
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json());

      return paymentIntent.clientSecret;
    }

    if (clientSecret || cart.items.length === 0) return;
    getStripeClientSecret(cart.items).then((secret) => {
      setClientSecret(secret);
    });
  }, [clientSecret, cart.items]);

  return (
    <>
      <Head>
        <title>Doge Coffee | Payment</title>
      </Head>
      <div className="page-content wrapper">
        {!clientSecret && (
          <SkeletonTheme baseColor="rgb(241 245 249)" duration={1.1}>
            <div className="grid gap-6 md:grid-flow-col-dense">
              <div>
                <Skeleton height={100} className="mb-4" />
                <Skeleton height={100} className="mb-4" />
                <Skeleton height={100} />
              </div>
              <Skeleton height={400} />
            </div>
          </SkeletonTheme>
        )}
        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret
            }}>
            <PaymentForm
              handleSuccessfulPayment={(paymentIntentSecret) => {
                if (!paymentIntentSecret) return;
                orderPlaced.current = true;
                router.replace('/order/confirmation', {
                  query: {
                    payment_intent_secret: paymentIntentSecret
                  }
                });
              }}
            />
          </Elements>
        )}
      </div>
    </>
  );
};

export default Payment;
