import type { NextPage } from 'next';
import router from 'next/router';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import AuthContext from '../../state/authContext';
import { CartService } from '../../service/cart.service';
import { Order } from '../../types/Order';
import OrderHistoryItem from '../../components/account/OrderHistoryItem';
import AccountNav from '../../components/account/AccountNav';

const Account: NextPage = () => {
  const { authUser, signOut } = useContext(AuthContext);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  console.log(authUser);

  useEffect(() => {
    if (!authUser) {
      router.push('/account/login');
      return;
    }

    CartService.getOrdersByUserId(authUser.uid).then((orderData) => {
      setLoadingOrders(false);
      setOrders(orderData);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Doge Coffee | User Dashboard</title>
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

        <button type="button" className="mt-10 px-6 py-2 bg-primary text-white rounded-sm" onClick={() => signOut()}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Account;
