import type { NextPage } from 'next';
import router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import React, { useContext, useEffect } from 'react';
import AuthContext from '../../state/authContext';
import AuthForm from '../../components/AuthForm';

const Login: NextPage = () => {
  const authCtx = useContext(AuthContext);
  const { authUser, authError, signIn } = authCtx;

  useEffect(() => {
    if (authUser?.email) {
      router.push('/account/settings');
    }
  }, [authUser]);

  return (
    <>
      <Head>
        <title>Doge Coffee | Login</title>
      </Head>
      <div className="page-content wrapper-narrow">
        <h1 className="sm:text-center text-2xl font-bold mb-4">Sign In</h1>
        <AuthForm
          actionType="login"
          submitButtonText="Sign In"
          authError={authError}
          handleFormSubmit={(userdata) => {
            signIn(userdata);
          }}
        />

        <div className="mt-6 text-center">
          Don&apos;t have an account yet?{' '}
          <Link href="/account/create">
            <a className="text-primary">Create Account</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
