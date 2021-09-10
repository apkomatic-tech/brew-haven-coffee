import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { CartProvider } from '../state/cartContext';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/index.css';

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
