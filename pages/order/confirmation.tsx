import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import { PaymentContext } from '../../state/paymentContext';
import { stripePromise } from '../../utils/stripe.utils';

const OrderConfirmationMessage = ({ paymentIntentSecret }: { paymentIntentSecret: string }) => {
  const stripe = useStripe();
  // const elements = useElements();
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    async function getPaymentIntent(secret: string) {
      const response = await stripe?.retrievePaymentIntent(secret);

      setLoading(false);

      switch (response?.paymentIntent?.status) {
        case 'succeeded':
          setStatusMessage('Payment succeeded!');
          break;
        case 'processing':
          setStatusMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setStatusMessage('Your payment was not successful, please try again.');
          break;
        default:
          setStatusMessage('Something went wrong.');
          break;
      }
    }

    if (!stripe) return;

    if (!paymentIntentSecret) {
      return;
    }

    getPaymentIntent(paymentIntentSecret);
  }, [stripe, paymentIntentSecret]);

  return <p className="p-4 font-bold bg-slate-100">{statusMessage || ''}</p>;
};

const OrderConfirmationPage = () => {
  const [paymentIntentSecret, setPaymentIntentSecret] = useState('');
  useEffect(() => {
    const secret = new URLSearchParams(window.location.search).get('payment_intent_secret') || '';
    setPaymentIntentSecret(secret);
  }, []);
  return (
    <div className="page-content wrapper">
      {paymentIntentSecret ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentSecret
          }}>
          {' '}
          <h1 className="font-bold text-3xl mb-4">Payment Status</h1>
          <OrderConfirmationMessage paymentIntentSecret={paymentIntentSecret} />
        </Elements>
      ) : (
        <>
          <h1 className="font-bold text-3xl mb-4">Payment Status</h1>
          <p className="text-red-600 font-bold bg-red-100 p-4">Error: Missing Payment Information</p>
        </>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
