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
      <div className="pt-24 pb-18 px-2 md:pt-32 flex md:items-center">
        <div
          className="container mx-auto max-w-full lg:max-w-7xl"
          style={{
            minHeight: 400
          }}>
          <h1 className="font-bold text-3xl md:text-center md:text-5xl mb-5">
            Enjoy a delicious cup of <span className="text-primary">Doge Coffee</span>.
          </h1>
          <p className="text-xl mb-10 md:text-center">
            Whether you want to start your day with a cup of coffee <br /> or you need a little &quot;pick me up&quot;, we got you!
          </p>
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
              className="py-4 px-12 block w-full font-bold rounded-md bg-primary text-white text-center md:mx-auto md:w-80 md:text-xl">
              Start your Order
            </motion.a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
