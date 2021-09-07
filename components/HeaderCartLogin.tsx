import Link from 'next/link';
import React from 'react';
import { useContext } from 'react';
import { HiOutlineShoppingCart as ShoppingCartIcon, HiOutlineUser as UserIcon } from 'react-icons/hi';
import CartContext from '../state/cartContext';

function HeaderCartLogin() {
  const {
    state: { count: orderCount }
  } = useContext(CartContext);

  return (
    <div className='grid grid-flow-col-dense gap-2 items-center text-2xl ml-2 md:ml-6 md:text-3xl lg:ml-16'>
      <Link href='/login'>
        <a>
          <UserIcon />
        </a>
      </Link>
      <Link href='/order/review'>
        <a className='relative'>
          {orderCount > 0 && (
            <span className='cart-count-badge -top-2 -right-2 absolute text-sm w-5 h-5 md:w-6 md:h-6 bg-primarydark text-white text-center leading-none rounded-full p-1'>
              {orderCount}
            </span>
          )}
          <ShoppingCartIcon />
        </a>
      </Link>
    </div>
  );
}

export default HeaderCartLogin;
