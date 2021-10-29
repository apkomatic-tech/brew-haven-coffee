import { Router } from 'next/router';
import type { AppProps } from 'next/app';
import NProgress from 'nprogress';

import Layout from '../components/Layout';
import { CartProvider } from '../state/cartContext';

import '../styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/nprogress-custom.css';

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
export default MyApp;
