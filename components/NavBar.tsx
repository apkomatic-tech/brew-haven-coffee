import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiMenu as MenuIcon, HiOutlineShoppingCart as ShoppingCartIcon, HiOutlineUser as UserIcon } from 'react-icons/hi';

import Logo from '../public/logo.svg';
import Cup from '../public/cup-outlined.svg';
import HeaderCartLogin from './HeaderCartLogin';
import { useState } from 'react';

function NavBar() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <div className='flex p-4 items-center'>
      <Link href='/' passHref>
        <a className='mr-auto'>
          <h1 className='font-bold text-2xl flex items-center text-primary'>
            <Image src={Logo} alt='Doge Coffee' />
            <span className='inline-block ml-4'>Doge Coffee</span>
          </h1>
        </a>
      </Link>
      {/* ====== DESKTOP nav ====== */}
      <div className='hidden md:flex'>
        <nav className='hidden sm:grid grid-flow-col-dense gap-4 text-gray-700 font-bold items-center'>
          <Link href='/'>
            <a className='hover:text-primary'>Home</a>
          </Link>
          <Link href='/about'>
            <a className='hover:text-primary'>About</a>
          </Link>
          <Link href='/menu'>
            <a className='bg-secondary text-black py-1 px-4 flex leading-none items-center hover:opacity-80 duration-200'>
              <span className='inline-block mr-2'>Menu</span> <Image src={Cup} alt='' width={30} height={30} />
            </a>
          </Link>
        </nav>
        <HeaderCartLogin />
      </div>
      {/* ====== MOBILE nav ====== */}
      <div className='flex md:hidden'>
        <HeaderCartLogin />
        <nav className='flex grid-flow-col-dense gap-4 text-gray-700 font-bold items-center'>
          <Link href='/menu'>
            <a className='bg-secondary text-black py-2 px-4 ml-6 flex items-center hover:opacity-80 duration-200'>
              <span className='inline-block mr-2'>Menu</span> <Image src={Cup} alt='' width={30} height={30} />
            </a>
          </Link>
          <button type='button' className='text-2xl' onClick={() => setShowMobileNav(true)}>
            <MenuIcon />
          </button>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
