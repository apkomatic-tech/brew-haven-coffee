import { useContext, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Elements } from '@stripe/react-stripe-js';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { stripePromise } from '../../utils/stripe.utils';
import PaymentForm from '../../components/payment/PaymentForm';

import 'react-loading-skeleton/dist/skeleton.css';
import { PaymentContext } from '../../state/paymentContext';

const Payment = () => {
  const router = useRouter();
  const orderPlaced = useRef(false);
  const { clientSecret } = useContext(PaymentContext);

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
