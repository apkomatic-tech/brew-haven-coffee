import Head from 'next/head';

import React from 'react';
import NavBar from './NavBar';
import FacebookIcon from '../public/social-icons/facebook.svg';
import InstagramIcon from '../public/social-icons/instagram.svg';
import TwitterIcon from '../public/social-icons/twitter.svg';
import Image from 'next/image';

interface ILayout {
  children: React.ReactNode | React.ReactNode[];
  title?: string;
}

const Layout: React.FC<ILayout> = ({ title, children }) => {
  const copyrightYear = new Date().getFullYear();
  return (
    <>
      <Head>
        <title>{(title && `${title} | Brew Haven Coffee`) || 'Brew Haven Coffee'}</title>
        <meta name="description" content="Brew Haven Coffee - a website for a fictional coffee company" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="page">
        <header className="bg-mainBgColor">
          <div className="container mx-auto max-w-full lg:max-w-7xl">
            <NavBar />
          </div>
        </header>
        <main>{children}</main>
        <footer className="my-10">
          <div className="container mx-auto max-w-full px-4 lg:max-w-7xl">
            <div className="flex mb-4">
              <a href="https://www.facebook.com" className="mr-3" aria-label="Facebook">
                <Image src={FacebookIcon} width={35} height={35} alt="" />
              </a>
              <a href="https://www.instagram.com" className="mr-3" aria-label="Instagram">
                <Image src={InstagramIcon} width={35} height={35} alt="" />
              </a>
              <a href="https://www.twitter.com" aria-label="Twitter">
                <Image src={TwitterIcon} width={35} height={35} alt="" />
              </a>
            </div>
            <p className="text-gray-600 text-sm">&copy; {copyrightYear} Brew Haven Coffee. All Rights Reserved</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
