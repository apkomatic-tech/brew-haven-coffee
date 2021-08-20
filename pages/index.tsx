import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import HeroImage from '../public/hero.svg';
import Wave from '../public/wave.svg';

const Home: NextPage = () => {
  return (
    <>
      <div className='pt-12 pb-18 px-8 md:pt-32'>
        <div className='container mx-auto max-w-full lg:max-w-7xl'>
          <div className='flex relative'>
            <div>
              <motion.h1
                initial={{
                  y: -10
                }}
                animate={{
                  y: 0
                }}
                className='text-4xl font-bold mb-12'>
                Start your day <br /> with a delicious cup of Doge coffee.
              </motion.h1>
              <Link href='/menu' passHref>
                <motion.a
                  initial={{
                    y: 10,
                    opacity: 0
                  }}
                  animate={{
                    y: 0,
                    opacity: 1
                  }}
                  transition={{
                    delay: 0.2
                  }}
                  className='py-4 px-12 font-bold rounded-md bg-primary text-white inline-block'>
                  See Our Menu
                </motion.a>
              </Link>
            </div>
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.25
              }}
              className='hidden transform sm:block sm:w-72 sm:h-72 sm:ml-14 md:w-auto md:h-auto md:max-w-lg md:block md:static md:-translate-y-28'>
              <Image src={HeroImage} alt='' width={500} height={500} />
            </motion.div>
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
