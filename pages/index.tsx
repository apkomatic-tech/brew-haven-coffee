import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Doge Coffee | Home</title>
      </Head>
      <div className="pt-24 pb-18 px-8 md:pt-32 flex items-center">
        <div
          className="container mx-auto max-w-full lg:max-w-7xl"
          style={{
            minHeight: 400
          }}>
          <h1 className="text-center font-bold text-5xl mb-10">
            Start your day <br /> with a delicious cup of Doge coffee.
          </h1>
          <Link href="/menu" passHref>
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
              className="py-4 px-12 font-bold rounded-md bg-primary text-white block mx-auto text-center"
              style={{
                maxWidth: 250
              }}>
              Explore Menu
            </motion.a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
