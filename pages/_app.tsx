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
import PaymentProvider from '../state/paymentContext';

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
  return (
    <AuthContextProvider>
      <CartProvider>
        <PaymentProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PaymentProvider>
      </CartProvider>
    </AuthContextProvider>
  );
}
export default MyApp;
