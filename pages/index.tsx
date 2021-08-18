import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import HeroImage from '../public/hero.svg';
import Wave from '../public/wave.svg';

const Home: NextPage = () => {
  return (
    <>
      <div className='pt-32 pb-18 px-8'>
        <div className='container mx-auto max-w-full lg:max-w-7xl'>
          <div className='flex'>
            <div>
              <h1 className='text-4xl font-bold mb-12'>
                Start your day <br /> with a delicious cup of Doge coffee.
              </h1>
              <Link href=''>
                <a className='py-4 px-12 font-bold rounded-md bg-primary text-white'>See Our Menu</a>
              </Link>
            </div>
            <div className='hidden ml-14 max-w-md md:max-w-lg md:block transform -translate-y-28'>
              <Image src={HeroImage} alt='' width={500} height={500} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='hidden md:block'>
          <Image src={Wave} alt='' />
        </div>
        <div className='bg-primary mt-16 md:-mt-6 py-12 text-white'>
          <div className='container px-8 mx-auto max-w-full lg:max-w-7xl'>
            <h2 className='text-2xl font-bold mb-4'>Popular Drinks</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
