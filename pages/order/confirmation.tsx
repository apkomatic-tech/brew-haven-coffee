import { Elements } from '@stripe/react-stripe-js';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import OrderDetails from '../../components/confirmation/OrderDetails';
import PaymentStatus from '../../components/confirmation/PaymentStatus';
import setPageTitle from '../../utils/setPageTitle.utils';
import { stripePromise } from '../../utils/stripe.utils';

const OrderConfirmationPage = () => {
  const [paymentIntentKey, setPaymentIntentKey] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const paymentIntentSecret = new URLSearchParams(window.location.search).get('payment_intent_secret');
    const orderID = new URLSearchParams(window.location.search).get('order');
    setPaymentIntentKey(paymentIntentSecret || '');
    setOrderId(orderID || '');
  }, []);

  return (
    <>
      <Head>
        <title>{setPageTitle('Order Confirmation')}</title>
      </Head>
      <div className="page-content wrapper">
        <h1 className="mb-8 text-4xl font-bold">Order Confirmation</h1>
        {paymentIntentKey && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: paymentIntentKey
            }}>
            <PaymentStatus paymentIntentKey={paymentIntentKey} />
          </Elements>
        )}
        <OrderDetails orderId={orderId} />
      </div>
    </>
  );
};

export default OrderConfirmationPage;
