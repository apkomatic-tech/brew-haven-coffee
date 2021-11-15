import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import AuthContext from '../state/authContext';

const Account: NextPage = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (!authCtx.state.user.accessToken) {
      router.push('/login');
    }
  }, [authCtx.state.user.accessToken, router]);

  return (
    <>
      <Head>
        <title>Doge Coffee | User Dashboard</title>
      </Head>
      <div className='page-content wrapper-narrow'>
        <h1 className='text-lg font-bold text-center'>Hello, {authCtx.state.user.email}!</h1>
        <div className='text-center mt-4'>
          <button type='button' className='p-2 leading-none bg-red-600 text-white' onClick={() => authCtx.signOutUser()}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;
