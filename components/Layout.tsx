import Head from 'next/head';

import React from 'react';
import NavBar from './NavBar';
import FacebookIcon from '../public/social-icons/facebook.svg';
import InstagramIcon from '../public/social-icons/instagram.svg';
import TwitterIcon from '../public/social-icons/twitter.svg';
import YouTubeIcon from '../public/social-icons/youtube.svg';
import Image from 'next/image';

type LayoutProps = {
  title?: string;
  children: any;
};

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{(title && `${title} | Doge Coffee`) || 'Doge Coffee'}</title>
        <meta name='description' content='Doge Coffee - a website for a fictional coffee company' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <div className='page'>
        <header className='container mx-auto max-w-full lg:max-w-7xl'>
          <NavBar />
        </header>
        <main>{children}</main>
        <footer className='my-10'>
          <div className='container mx-auto max-w-full px-4 lg:max-w-7xl'>
            <div className='flex mb-4'>
              <a href='#' className='mr-3'>
                <Image src={FacebookIcon} width={35} height={35} alt='' />
              </a>
              <a href='#' className='mr-3'>
                <Image src={InstagramIcon} width={35} height={35} alt='' />
              </a>
              <a href='#' className='mr-3'>
                <Image src={TwitterIcon} width={35} height={35} alt='' />
              </a>
              <a href='#'>
                <Image src={YouTubeIcon} width={35} height={35} alt='' />
              </a>
            </div>
            <p className='text-gray-600 text-sm'>&copy; 2021 Doge Coffee. All Rights Reserved</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
