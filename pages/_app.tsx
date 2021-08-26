import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { CartProvider } from '../state/cartContext';

import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout title='Home'>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
export default MyApp;
