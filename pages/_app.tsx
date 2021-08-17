import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout title='Home'>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
