import type { NextPage } from 'next';
import router from 'next/router';
import Head from 'next/head';
import React, { useContext, useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

import AuthContext from '../../state/authContext';
import AccountNav from '../../components/account/AccountNav';
import setPageTitle from '../../utils/setPageTitle.utils';

const Account: NextPage = () => {
  const { authUser, signOut } = useContext(AuthContext);

  useEffect(() => {
    if (!authUser) {
      router.push('/account/login');
      return;
    }
  }, []);

  return (
    <>
      <Head>
        <title>{setPageTitle('Account Settings')}</title>
      </Head>
      <div className="page-content wrapper max-w-2xl px-4">
        <AccountNav activeTab="settings" />

        <div className="my-8">
          <h1 className="font-bold text-3xl mb-2">Account Settings</h1>
          <p>This your account settings page.</p>
        </div>

        {authUser?.displayName && (
          <div className="px-2 py-4 border-y border-slate-200">
            <span className="text-slate-600">Name:</span> {authUser.displayName}
          </div>
        )}
        {authUser?.email && (
          <div className="px-2 py-4 border-y border-slate-200">
            <span className="text-slate-600">Email:</span> {authUser.email}
          </div>
        )}

        <button type="button" className="dgcf-button mt-10" onClick={() => signOut()}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Account;
