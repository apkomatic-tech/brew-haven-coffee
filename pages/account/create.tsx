import type { NextPage } from 'next';
import router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import AuthContext from '../../state/authContext';
import AuthForm from '../../components/AuthForm';

const Login: NextPage = () => {
  const authCtx = useContext(AuthContext);
  const { authUser, authError } = authCtx;

  useEffect(() => {
    if (authUser?.email) {
      router.push('/account/settings');
    }
  }, [authUser]);

  return (
    <>
      <Head>
        <title>Doge Coffee | Create Account</title>
      </Head>
      <div className="page-content wrapper-narrow">
        <h1 className="sm:text-center text-2xl font-bold mb-4">Create Account</h1>
        <AuthForm
          actionType="create"
          submitButtonText="Create Account"
          authError={authError}
          handleFormSubmit={(userData) => {
            authCtx.createUser(userData);
          }}
        />
        <div className="mt-6 text-center">
          Already have an account?{' '}
          <Link href="/account/login">
            <a className="text-primary">Login</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
