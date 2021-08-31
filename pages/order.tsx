import type { NextPage } from 'next';
import { useNextSanityImage } from 'next-sanity-image';
import Head from 'next/head';
import Image from 'next/image';
import { useContext } from 'react';
import sanityClient from '../sanityClient';
import CartContext from '../state/cartContext';
import { OrderItem } from '../types/OrderItem';

function LineItem(item: OrderItem) {
  const { id, title, image, quantity } = item;
  const imageProps = useNextSanityImage(sanityClient, image);

  return (
    <div>
      {title}
      qty: {quantity}
      <Image {...imageProps} alt={title} />
    </div>
  );
}

const About: NextPage = () => {
  const ctx = useContext(CartContext);
  console.log(ctx);

  return (
    <>
      <Head>
        <title>Doge Coffee | Order</title>
      </Head>
      <div className='page-content wrapper'>
        <h1 className='page-title mb-24 relative z-10'>Your Order</h1>
        {ctx?.items.length > 0 ? ctx?.items.map((item) => <LineItem key={item.id} {...item} />) : <p>Your order is empty.</p>}
      </div>
    </>
  );
};

export default About;
