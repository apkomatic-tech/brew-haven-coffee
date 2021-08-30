import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Blob from '../public/yellow-blob.svg';

const About: NextPage = () => {
  return (
    <>
      <div className='page-content wrapper'>
        <h1 className='page-title mb-24 relative z-10'>Your Order</h1>
      </div>
    </>
  );
};

export default About;
