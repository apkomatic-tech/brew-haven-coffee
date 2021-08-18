import Link from 'next/link';
import React from 'react';
import { HiMenu as MenuIcon, HiOutlineShoppingCart as ShoppingCartIcon, HiOutlineUser as UserIcon } from 'react-icons/hi';

function HeaderCartLogin() {
  return (
    <div className='grid grid-flow-col-dense gap-2 items-center text-3xl ml-2 md:ml-6 lg:ml-16'>
      <Link href='/login'>
        <a>
          <UserIcon />
        </a>
      </Link>
      <Link href='/order'>
        <a className='relative'>
          <span
            className='absolute cart-count-badge text-sm w-5 h-5 bg-primarydark text-white text-center leading-none rounded-full p-1'
            style={{
              top: '-.4rem',
              right: '-.4rem'
            }}>
            1
          </span>
          <ShoppingCartIcon />
        </a>
      </Link>
    </div>
  );
}

export default HeaderCartLogin;
