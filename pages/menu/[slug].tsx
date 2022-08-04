import type { NextPage, GetStaticProps, GetStaticPropsContext, GetStaticPaths, GetStaticPathsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import groq from 'groq';
import { useNextSanityImage } from 'next-sanity-image';
import Link from 'next/link';
import { HiOutlineHome as HomeIcon } from 'react-icons/hi';
import { AiOutlineWarning as WarningIcon } from 'react-icons/ai';

import sanityClient from '../../sanityClient';
import Head from 'next/head';
import { useContext } from 'react';
import CartContext from '../../state/cartContext';
import Price from '../../components/shared/Price';
import AuthContext from '../../state/authContext';

const MenuDetail: NextPage = (props: any) => {
  const router = useRouter();
  const detail = props.data;
  const imageProps = useNextSanityImage(sanityClient, detail.image)!;
  const { addToCart } = useContext(CartContext);
  const { authUser } = useContext(AuthContext);

  const handleAddToOrder = (): void => {
    const orderItem = { ...detail, title: detail.name, quantity: 1 };
    const addToCartFn = addToCart!;
    // dispatch({ type: 'ADD_ORDER', payload: orderItem });
    addToCartFn(orderItem)!;
    router.push('/order/review');
  };

  return (
    <>
      <Head>
        <title>Doge Coffee | Menu - {detail.name}</title>
      </Head>
      <div className="page-content container px-4 mx-auto max-w-full lg:max-w-5xl">
        {/* Breacrumbs */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <a className="text-2xl mr-2">
              <HomeIcon />
            </a>
          </Link>
          <span className="mr-2">/</span>
          <Link href="/menu">
            <a className="mr-2 font-bold hover:underline focus:underline">Menu</a>
          </Link>
          <span className="mr-2">/</span>
          <span className="text-gray-600">{detail.name}</span>
        </div>
        <div className="grid md:grid-cols-2">
          {/* Product image */}
          <div className="mb-6 md:mb-0 md:max-w-lg md:mr-16">
            <Image objectFit="contain" className="sm:max-w-md" {...imageProps} layout="intrinsic" alt={detail.name} placeholder="blur" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-6">{detail.name}</h1>
            <p className="text-2xl mb-12">
              <Price priceValue={detail.price} />
            </p>
            {detail.description && (
              <>
                <h3 className="text-xl font-bold mb-6">Description</h3>
                <p>{detail.description}</p>
              </>
            )}
            <div className="flex mt-8 items-end">
              {/* Add To Order */}

              <button className="bg-primarydark text-white text-base px-4 py-3 font-bold w-64 rounded-md" type="button" onClick={handleAddToOrder}>
                Add To Order
              </button>

              {/* {authUser ? (
                <button className="bg-primarydark text-white text-base px-4 py-3 font-bold w-64 rounded-md" type="button" onClick={handleAddToOrder}>
                  Add To Order
                </button>
              ) : (
                <div className="p-2 border-2 border-yellow-800 bg-yellow-50 flex items-center">
                  <WarningIcon className="w-6 h-6 text-yellow-800" />
                  <p className="ml-2 text-yellow-800">You need to be signed in to place orders.</p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface Drink {
  name: string;
  slug: {
    current: string;
  };
}

export const getStaticPaths: GetStaticPaths = async (context: GetStaticPathsContext) => {
  const drinks: any[] = await sanityClient.fetch(groq`
    *[_type == 'drink'] {
      name, slug
    }
  `);

  const paths = drinks.map((drink) => ({
    params: {
      slug: drink.slug.current
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const data = await sanityClient.fetch(groq`
    *[_type=='drink' && slug.current == '${context.params?.slug}'] {
      "id": _id, name, price, image, description, 
      "slug": slug.current,
      "category": category->categoryname
    }[0]
  `);

  if (!data) {
    return {
      redirect: {
        destination: '/menu',
        permanent: false
      }
    };
  }

  return {
    props: {
      data
    }
  };
};

export default MenuDetail;
