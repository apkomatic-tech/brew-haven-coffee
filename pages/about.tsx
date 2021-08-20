import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../components/Container';
import Blob from '../public/yellow-blob.svg';

const About: NextPage = () => {
  return (
    <>
      <Container>
        <h1 className='relative text-2xl font-bold mb-24 z-10'>
          About Doge Coffee
          <div className='bg-primary mt-1 h-1 w-16 rounded-sm'></div>
          <div
            className='absolute transform -translate-y-10 -translate-x-2 top-0 left-0 w-25 h-25'
            style={{
              zIndex: -1
            }}>
            <Image src={Blob} alt='' />
          </div>
        </h1>
        <h2 className='font-bold mb-3 text-xl'>We are here to provide best coffee drinks in the world</h2>
        <p className='text-gray-600 mb-8'>
          But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound
          the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is
          pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or
          pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.
          To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a
          man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with
          righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire.
        </p>
        <h2 className='font-bold mb-3 text-xl'>Our Story</h2>
        <p className='text-gray-600'>
          But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound
          the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is
          pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or
          pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.
          To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a
          man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with
          righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire.
        </p>
      </Container>
    </>
  );
};

export default About;
