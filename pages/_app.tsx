import { Router } from 'next/router';
import type { AppProps } from 'next/app';
import NProgress from 'nprogress';
import { Provider } from 'react-redux';

import { store } from '../app/store';
import Layout from '../components/Layout';
import { CartProvider } from '../state/cartContext';
import { AuthContextProvider } from '../state/authContext';

import '../styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/nprogress-custom.css';
import Page from '../components/Page';

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
    <Provider store={store}>
      <AuthContextProvider>
        <CartProvider>
          <Page>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Page>
        </CartProvider>
      </AuthContextProvider>
    </Provider>
  );
}
export default MyApp;
