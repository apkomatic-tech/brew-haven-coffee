import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BiErrorCircle } from 'react-icons/bi';

import AuthContext from '../state/authContext';
import combineClasses from '../utils/combineClasses';

const EMAIL_REGX = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gm;

type LoginForm = {
  email: string;
  password: string;
  name: string;
};
type AuthFormProps = {
  submitButtonText: string;
  authError?: string;
  actionType: 'create' | 'login';
  handleFormSubmit: (userData: { email: string; password: string }) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ submitButtonText, authError, handleFormSubmit, actionType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm<LoginForm>();
  const onSubmit: SubmitHandler<LoginForm> = (data) => handleFormSubmit(data);

  return (
    <>
      <form className="block mx-auto max-w-md mt-4 sm:px-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {authError && (
          <div className="p-4 bg-red-200 text-center mb-4 text-red-900 flex items-center text-sm border-l-4 border-red-800">
            <span className="mr-2 text-xl">
              <BiErrorCircle />
            </span>
            <span>{authError}</span>
          </div>
        )}
        {actionType === 'create' && (
          <div className="mb-3">
            <label htmlFor="email" className="mb-1 font-bold inline-block text-sm text-gray-600 cursor-pointer">
              Name
            </label>
            <input
              {...register('name', { minLength: 2 })}
              id="name"
              type="name"
              autoComplete="false"
              className={combineClasses('rounded-md border border-gray-400 bg-white block w-full p-2', Boolean(formErrors.name) ? 'border-red-700' : false)}
            />
            {formErrors.name?.type === 'minLength' && <div className="font-bold text-sm text-red-700">Name must be at least 2 characters long</div>}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="email" className="mb-1 font-bold inline-block text-sm text-gray-600 cursor-pointer">
            Email Address
          </label>
          <input
            {...register('email', { required: true, pattern: EMAIL_REGX })}
            id="email"
            type="email"
            autoComplete="false"
            className={combineClasses('rounded-md border border-gray-400 bg-white block w-full p-2', Boolean(formErrors.email) ? 'border-red-700' : false)}
          />
          {formErrors.email?.type === 'required' && <div className="font-bold text-sm text-red-700">Email is required.</div>}
          {formErrors.email?.type === 'pattern' && <div className="font-bold text-sm text-red-700">Incorrect email.</div>}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="mb-1 font-bold inline-block text-sm text-gray-600 cursor-pointer">
            Password
          </label>
          <input
            {...register('password', { required: true, minLength: 6 })}
            id="password"
            type="password"
            className={combineClasses('rounded-md border border-gray-400 bg-white block w-full p-2', Boolean(formErrors.password) ? 'border-red-700' : false)}
          />
          {formErrors.password?.type === 'required' && <div className="font-bold text-sm text-red-700">Password is required.</div>}
          {formErrors.password?.type === 'minLength' && <div className="font-bold text-sm text-red-700">Password must contain at least 6 characters.</div>}
        </div>
        <button type="submit" className="block w-full bg-primarydark text-white p-2 rounded-md">
          {submitButtonText}
        </button>
      </form>
    </>
  );
};

export default AuthForm;
