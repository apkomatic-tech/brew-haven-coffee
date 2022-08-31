import React, { createContext, useContext, useEffect, useState } from 'react';
import { OrderItem } from '../types/OrderItem';
import AuthContext from './authContext';
import CartContext from './cartContext';

const PaymentContext = createContext<{
  clientSecret?: string;
}>({ clientSecret: '' });

const PaymentProvider = ({ children }: { children: React.ReactNode }) => {
  const { authUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    async function getStripeClientSecret(items: OrderItem[]) {
      const paymentIntent = await fetch('/api/payment-intent', {
        body: JSON.stringify({ items }),
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json());

      return paymentIntent.clientSecret;
    }

    // if (!cart.items || cart.items.length === 0) {
    //   setClientSecret('');
    //   return;
    // }
    getStripeClientSecret(cart.items).then((secret) => {
      setClientSecret(secret);
    });
  }, [cart.items]);

  return <PaymentContext.Provider value={{ clientSecret }}>{children}</PaymentContext.Provider>;
};

export { PaymentContext };
export default PaymentProvider;
