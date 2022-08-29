import { useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

enum StatusMessage {
  SUCCESS = 'Payment succeeded',
  PROCESSING = 'Your payment is processing',
  FAIL = 'Your payment was not successful, please try again',
  CANCELLED = 'Your payment was cancelled',
  UNKNOWN = 'Something went wrong'
}

interface PaymentStatusProps {
  paymentIntentKey: string;
}

const PaymentStatus = (props: PaymentStatusProps) => {
  const stripe = useStripe();
  const [paymentStatus, setPaymentStatus] = useState('Loading Payment Status...');

  useEffect(() => {
    async function getPaymentIntent() {
      const res = await stripe?.retrievePaymentIntent(props.paymentIntentKey);

      switch (res?.paymentIntent?.status) {
        case 'succeeded':
          setPaymentStatus(StatusMessage.SUCCESS);
          break;
        case 'processing':
          setPaymentStatus(StatusMessage.FAIL);
          break;
        case 'requires_action':
        case 'requires_capture':
        case 'requires_confirmation':
        case 'requires_payment_method':
          setPaymentStatus(StatusMessage.FAIL);
          break;
        case 'canceled':
          setPaymentStatus(StatusMessage.CANCELLED);
          break;
        default:
          setPaymentStatus(StatusMessage.UNKNOWN);
      }
    }
    if (stripe && props.paymentIntentKey) {
      getPaymentIntent();
    }
  }, [stripe, props.paymentIntentKey]);

  return (
    <div className="bg-gray-50 p-4 mb-4">
      <p className="font-bold">
        <strong className="mr-2">Status:</strong>
        {paymentStatus === StatusMessage.SUCCESS && <span className="p-1 rounded-sm inline-block bg-green-200 text-green-900">{paymentStatus}</span>}
        {paymentStatus === StatusMessage.FAIL && <span className="p-1 rounded-sm inline-block bg-red-100 text-red-900">{paymentStatus}</span>}
      </p>
    </div>
  );
};

export default PaymentStatus;
