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

  return <div>{statusMessage && <p>{statusMessage}</p>}</div>;
};

const OrderConfirmationPage = () => {
  const { clientSecret } = useContext(PaymentContext);
  const [paymentIntentSecret, setPaymentIntentSecret] = useState('');
  useEffect(() => {
    const secret = new URLSearchParams(window.location.search).get('payment_intent_secret');
    setPaymentIntentSecret(secret || '');
  }, []);
  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret
        }}>
        {' '}
        <OrderConfirmationMessage paymentIntentSecret={paymentIntentSecret} />
      </Elements>
      {/* {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret
          }}>
            
          </Elements>
      )} */}
    </div>
  );
};

export default OrderConfirmationPage;
