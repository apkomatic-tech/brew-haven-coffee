import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenu as MenuIcon, HiX as CloseMenuIcon } from 'react-icons/hi';

import Logo from '../public/logo.svg';
import Cup from '../public/cup-outlined.svg';
import HeaderCartLogin from './HeaderCartLogin';
import AuthContext from '../state/authContext';

function NavBar() {
  const { pathname } = useRouter();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { authUser } = useContext(AuthContext);
  return (
    <div className="flex p-4 items-center">
      <Link href="/" passHref>
        <a className="mr-auto">
          <h1 className="font-bold text-xl md:text-2xl flex items-center gap-4" aria-label="Brew Haven Coffee">
            <span className="hidden sm:inline-block">Brew Haven Coffee Co.</span>
          </h1>
        </a>
      </Link>
      {/* ====== DESKTOP nav ====== */}
      <div className="hidden md:flex">
        <nav className="hidden sm:grid grid-flow-col-dense gap-4 text-gray-700 font-bold items-center">
          <Link href="/">
            <a className={`hover:text-primary ${pathname === '/' ? 'text-primarydark' : ''}`}>Home</a>
          </Link>
          <Link href="/about">
            <a className={`hover:text-primary ${pathname === '/about' ? 'text-primarydark' : ''}`}>About</a>
          </Link>
          <Link href="/menu" passHref>
            <a className="text-black border-2 py-1 px-5 flex leading-none items-center hover:opacity-80 duration-200 border-secondary bg-secondary rounded-md">
              <span className="inline-block mr-2">Menu</span> <Image src={Cup} alt="" width={30} height={30} />
            </a>
          </Link>
        </nav>
        <HeaderCartLogin />
      </div>
      {/* ====== MOBILE nav ====== */}
      <div className="flex md:hidden">
        <HeaderCartLogin />
        <nav className="flex grid-flow-col-dense gap-4 text-gray-700 font-bold items-center">
          <Link href="/menu">
            <a className="text-black border-2 py-1 px-5 flex leading-none items-center hover:opacity-80 duration-200 bg-secondary border-secondary ml-6 rounded-md">
              <span className="inline-block mr-2">Menu</span> <Image src={Cup} alt="" width={30} height={30} />
            </a>
          </Link>
          <button type="button" className="text-2xl" onClick={() => setShowMobileNav(true)}>
            <MenuIcon />
          </button>
        </nav>
      </div>
      <AnimatePresence>
        {showMobileNav && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.25
              }}
              className="bg-black pt-20 text-lg font-bold fixed h-full top-0 right-0 shadow-lg drop-shadow-lg text-white z-20"
              style={{ width: '50vw' }}>
              <nav className="relative z-10">
                <button
                  type="button"
                  className="leading-none text-4xl absolute"
                  style={{
                    top: '-55px',
                    right: '20px'
                  }}
                  onClick={() => setShowMobileNav(false)}>
                  <CloseMenuIcon />
                </button>
                <Link href="/">
                  <a
                    onClick={() => setShowMobileNav(false)}
                    className={`text-center block px-1 py-4 hover:bg-primary transition-colors duration-150 ${pathname === '/' ? 'bg-primary' : ''}`}>
                    Home
                  </a>
                </Link>
                <Link href="/menu">
                  <a
                    onClick={() => setShowMobileNav(false)}
                    className={`text-center block px-1 py-4 hover:bg-primary transition-colors duration-150 ${pathname === '/menu' ? 'bg-primary' : ''}`}>
                    Menu
                  </a>
                </Link>
                <Link href={authUser ? '/account/settings' : '/account/login'}>
                  <a
                    onClick={() => setShowMobileNav(false)}
                    className={`text-center block px-1 py-4 hover:bg-primary transition-colors duration-150 ${pathname === '/account/login' ? 'bg-primary' : ''}`}>
                    Account
                  </a>
                </Link>
                <Link href="/about">
                  <a
                    onClick={() => setShowMobileNav(false)}
                    className={`text-center block px-1 py-4 hover:bg-primary transition-colors duration-150 ${pathname === '/about' ? 'bg-primary' : ''}`}>
                    About
                  </a>
                </Link>
              </nav>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.25
              }}
              className="fixed w-full h-full top-0 left-0 z-10"
              style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
              onClick={() => setShowMobileNav(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavBar;
