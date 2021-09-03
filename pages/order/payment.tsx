import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import CartContext from '../../state/cartContext';

const Payment: NextPage = () => {
  const router = useRouter();
  const ctx = useContext(CartContext);
  const [deliveryOption, setDeliveryOption] = useState('delivery'); // or pickup

  const deliveryBoxClass = 'relative border border-gray-400 rounded-md p-6 text-left';

  useEffect(() => {
    if (!ctx?.items.length) {
      router.push('/menu');
    }
  }, [ctx?.items]);

  return (
    <>
      <Head>
        <title>Doge Coffee | Payment</title>
      </Head>
      <div className='page-content wrapper'>
        <form>
          {/* Contact Info block */}
          <div className='pb-10 mb-10 border-b border-gray-200'>
            <h3 className='text-xl mb-7 font-bold'>Your Information</h3>
            <div className='grid gap-6 sm:grid-cols-2 mb-6'>
              <div>
                <label htmlFor='firstname' className='inline-block mb-2 cursor-pointer font-bold'>
                  First Name
                </label>
                <input
                  type='text'
                  id='firstname'
                  name='firstname'
                  className='p-2 leading-tight border shadow-sm drop-shadow-sm border-gray-400 bg-white text-black block w-full rounded-md focus:outline-black'
                />
              </div>
              <div>
                <label htmlFor='lastname' className='inline-block mb-2 cursor-pointer font-bold'>
                  Last Name
                </label>
                <input
                  type='text'
                  id='lastname'
                  name='lastname'
                  className='p-2 leading-tight border shadow-sm drop-shadow-sm border-gray-400 bg-white text-black block w-full rounded-md focus:outline-black'
                />
              </div>
            </div>
            <div className='grid grid-cols-1'>
              <div>
                <label htmlFor='email' className='inline-block mb-2 cursor-pointer font-bold'>
                  Email address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='p-2 leading-tight border shadow-sm drop-shadow-sm border-gray-400 bg-white text-black block w-full rounded-md focus:outline-black'
                />
              </div>
            </div>
          </div>
          <div className='pb-10 mb-10 border-b border-gray-200'>
            <h3 className='text-xl mb-7 font-bold'>Delivery or Pick up?</h3>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <button onClick={() => setDeliveryOption('delivery')} type='button' className={`${deliveryBoxClass}${deliveryOption === 'delivery' ? ' border-primarydark' : ''}`}>
                <p className={`mb-1 ${deliveryOption === 'delivery' ? 'text-primarydark' : 'text-black'}`}>Deliver</p>
                <p className='text-sm'>Service charge: $2.99</p>
                {deliveryOption === 'delivery' && (
                  <div className='text-primarydark absolute top-2 right-2 text-2xl'>
                    <HiCheckCircle />
                  </div>
                )}
              </button>
              <button onClick={() => setDeliveryOption('pickup')} type='button' className={`${deliveryBoxClass}${deliveryOption === 'pickup' ? ' border-primarydark' : ''}`}>
                <p className={`mb-1 ${deliveryOption === 'pickup' ? 'text-primarydark' : 'text-black'}`}>Pick up</p>
                {deliveryOption === 'pickup' && (
                  <div className='text-primarydark absolute top-2 right-2 text-2xl'>
                    <HiCheckCircle />
                  </div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Payment;
