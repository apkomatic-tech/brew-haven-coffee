import type { NextPage } from 'next';
import router from 'next/router';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import AuthContext from '../state/authContext';

const Account: NextPage = () => {
  const { authUser, signOut } = useContext(AuthContext);

  useEffect(() => {
    if (!authUser?.email) {
      router.push('/login');
    }
  }, [authUser]);

  return (
    <>
      <Head>
        <title>Doge Coffee | User Dashboard</title>
      </Head>
      <div className='page-content wrapper-narrow'>
        <h1 className='text-lg font-bold text-center'>Hello, {authUser?.email}!</h1>
        <div className='text-center mt-4'>
          <button type='button' className='p-2 leading-none bg-red-600 text-white' onClick={() => signOut()}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;
