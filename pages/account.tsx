import type { NextPage } from 'next';
import router from 'next/router';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import AuthContext from '../state/authContext';
import { CartService } from '../service/cart.service';
import { Order } from '../types/Order';
import OrderHistoryItem from '../components/account/OrderHistoryItem';

const Account: NextPage = () => {
  const { authUser, signOut } = useContext(AuthContext);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!authUser) {
      router.push('/login');
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
        {authUser && (
          <h1 className="text-2xl font-bold">
            <span>{`Welcome, ${authUser.displayName || authUser.email}!`}</span>
            <button type="button" className="ml-2 underline text-red-700 text-base" onClick={() => signOut()}>
              Logout
            </button>
          </h1>
        )}

        {/* order history */}
        <div className="mt-8">
          <h2 className="font-bold text-3xl mb-2">Order History</h2>
          <p>These are orders you placed.</p>
          {/* show skeleton when loading order history */}
          {loadingOrders && (
            <SkeletonTheme baseColor="rgb(241 245 249)" duration={1.1}>
              <Skeleton height={100} count={1} className="mt-12 mb-6" />
              <div className="grid gap-4 grid-flow-col-dense mb-4 pb-4">
                <div className="col-span-1">
                  <Skeleton height={150} width={150} />
                </div>
                <div className="col-span-11">
                  <Skeleton height={25} count={2} className="my-2" />
                </div>
              </div>
              <Skeleton height={100} count={1} className="mt-12 mb-6" />
              <div className="grid gap-4 grid-flow-col-dense mb-4 pb-4">
                <div className="col-span-1">
                  <Skeleton height={150} width={150} />
                </div>
                <div className="col-span-11">
                  <Skeleton height={25} count={2} className="my-2" />
                </div>
              </div>
              <Skeleton height={100} count={1} className="mt-12 mb-6" />
              <div className="grid gap-4 grid-flow-col-dense mb-4 pb-4">
                <div className="col-span-1">
                  <Skeleton height={150} width={150} />
                </div>
                <div className="col-span-11">
                  <Skeleton height={25} count={2} className="my-2" />
                </div>
              </div>
            </SkeletonTheme>
          )}
          {!loadingOrders && orders.length === 0 && <p className="my-4 p-4 bg-gray-100">You haven&apos;t placed any orders yet.</p>}
          {!loadingOrders &&
            orders.length > 0 &&
            orders.map((orderItem) => {
              return <OrderHistoryItem key={orderItem.id} order={orderItem} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Account;
