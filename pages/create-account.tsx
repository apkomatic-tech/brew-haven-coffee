import type { NextPage } from 'next';
import router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import AuthContext from '../state/authContext';

function combineClasses(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const EMAIL_REGX = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gm;

type LoginForm = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const authCtx = useContext(AuthContext);
  const {
    state: { user, error: authError }
  } = authCtx;
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm<LoginForm>();
  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log(data);
    authCtx.createUser(data);
  };

  useEffect(() => {
    if (authCtx.state.user.accessToken) {
      router.push('/account');
    }
  }, [authCtx]);

  console.log(formErrors);

  return (
    <>
      <Head>
        <title>Doge Coffee | Create Account</title>
      </Head>
      <div className='page-content wrapper-narrow'>
        <h1 className='text-center text-2xl font-bold mb-8'>Create your account</h1>
        {authError && <div className='font-bold text-red-700 text-center mb-4 mx-auto'>{authError}</div>}
        <form className='block mx-auto max-w-sm' onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='mb-3'>
            <label htmlFor='email' className='mb-1 font-bold inline-block text-sm text-gray-600 cursor-pointer'>
              Email Address
            </label>
            <input
              {...register('email', { required: true, pattern: EMAIL_REGX })}
              id='email'
              type='email'
              autoComplete='false'
              className={combineClasses('rounded-md border border-gray-400 bg-white block w-full p-2', Boolean(formErrors.email) ? 'border-red-700' : false)}
            />
            {formErrors.email?.type === 'required' && <div className='font-bold text-sm text-red-700'>Email is required.</div>}
            {formErrors.email?.type === 'pattern' && <div className='font-bold text-sm text-red-700'>Incorrect email.</div>}
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='mb-1 font-bold inline-block text-sm text-gray-600 cursor-pointer'>
              Password
            </label>
            <input
              {...register('password', { required: true, minLength: 6 })}
              id='password'
              type='password'
              className={combineClasses('rounded-md border border-gray-400 bg-white block w-full p-2', Boolean(formErrors.password) ? 'border-red-700' : false)}
            />
            {formErrors.password?.type === 'required' && <div className='font-bold text-sm text-red-700'>Password is required.</div>}
            {formErrors.password?.type === 'minLength' && <div className='font-bold text-sm text-red-700'>Password must contain at least 6 characters.</div>}
          </div>
          <button type='submit' className='block w-full bg-primarydark text-white p-2 rounded-md'>
            Create Account
          </button>
          <div className='mt-6 text-center'>
            Already have an account?{' '}
            <Link href='/login'>
              <a className='text-primary'>Login</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
