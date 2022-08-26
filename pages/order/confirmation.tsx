import { Elements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { stripePromise } from '../../utils/stripe.utils';

enum StatusMessage {
  SUCCESS = 'Payment succeeded',
  PROCESSING = 'Your payment is processing',
  FAIL = 'Your payment was not successful, please try again',
  UNKNOWN = 'Something went wrong'
}

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
          setStatusMessage(StatusMessage.SUCCESS);
          break;
        case 'processing':
          setStatusMessage(StatusMessage.PROCESSING);
          break;
        case 'requires_payment_method':
          setStatusMessage(StatusMessage.FAIL);
          break;
        default:
          setStatusMessage(StatusMessage.UNKNOWN);
          break;
      }
    }

    if (!stripe) return;

    if (!paymentIntentSecret) {
      return;
    }

    getPaymentIntent(paymentIntentSecret);
  }, [stripe, paymentIntentSecret]);

  if (loading) return <p>Loading...</p>;

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
          <p className="text-red-600 font-bold bg-red-100 p-4">{StatusMessage.UNKNOWN}</p>
        </>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
