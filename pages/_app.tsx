import { Router } from 'next/router';
import type { AppProps } from 'next/app';
import NProgress from 'nprogress';

import Layout from '../components/Layout';
import { CartProvider } from '../state/cartContext';
import { AuthContextProvider } from '../state/authContext';
import { Elements } from '@stripe/react-stripe-js';

import '../styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/nprogress-custom.css';
import { stripePromise } from '../utils/stripe.utils';
import { useEffect, useState } from 'react';

NProgress.configure({
  showSpinner: false
});
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.remove();
});

// const analytics = getAnalytics(app);

function MyApp({ Component, pageProps }: AppProps) {
  const [clientSecret, setClientSecret] = useState('');
  async function getStripeClientSecret() {
    const paymentIntent = await fetch('/api/payment-intent', {
      body: JSON.stringify({ amount: 5000 }),
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json());

    const { clientSecret } = paymentIntent;
    return clientSecret;
  }

  useEffect(() => {
    getStripeClientSecret().then((secret) => {
      console.log('clientSecret', secret);
      setClientSecret(secret);
    });
  }, []);

  /* 
    TODO: create PaymentProvider to wrap app,
    but below cart provider to get subtotal from cart
  */

  return (
    <AuthContextProvider>
      <CartProvider>
        <Layout>
          {clientSecret && (
            <Elements
              options={{
                clientSecret
              }}
              stripe={stripePromise}>
              <Component {...pageProps} />
            </Elements>
          )}
        </Layout>
      </CartProvider>
    </AuthContextProvider>
  );
}
export default MyApp;
