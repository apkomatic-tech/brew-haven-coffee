import type { NextPage, GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import Image, { ImageProps } from 'next/image';
import { useRouter } from 'next/router';
import groq from 'groq';
import { useNextSanityImage } from 'next-sanity-image';
import Link from 'next/link';
import { HiOutlineHome as HomeIcon } from 'react-icons/hi';

import sanityClient from '../../sanityClient';
import Head from 'next/head';
import { useContext } from 'react';
import CartContext from '../../state/cartContext';
import Price from '../../components/shared/Price';
import AuthContext from '../../state/authContext';

const MenuDetail: NextPage = (props: any) => {
  const router = useRouter();
  const detail = props.data;
  const imageProps = useNextSanityImage(sanityClient, detail.image)! as ImageProps;
  const { addToCart } = useContext(CartContext);
  const { authUser } = useContext(AuthContext);

  const handleAddToOrder = (): void => {
    const orderItem = { ...detail, title: detail.name, quantity: 1 };
    const addToCartFn = addToCart!;
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
            <h1 className="text-xl sm:text-3xl font-bold mb-6 flex justify-between">
              <span>{detail.name}</span>
              <Price priceValue={detail.price} />
            </h1>
            {/* <p className="text-3xl mb-8 font-bold items-center bg-secondaryOpaque inline-flex text-black py-1 px-4  rounded-sm">
              
            </p> */}
            {detail.description && (
              <div className="py-6 border-b border-t border-slate-200">
                <h3 className="text-lg font-bold mb-2">Description</h3>
                <p className="text-gray-600">{detail.description}</p>
              </div>
            )}
            {/* only show add to order if user is logged in  */}
            {!authUser && (
              <p className="text-amber-700 text-sm font-bold bg-amber-100 border-l-[16px] border-amber-800 pl-6 py-4 pr-4 text-left rounded-sm">
                Only logged in customers can add to order at this time. Please <Link href="/account/login"><a className="underline text-black">Login</a></Link>
              </p>
            )}
            {authUser && (
              <div className="flex mt-6 items-end">
                {/* Add To Order */}
                <button className="dgcf-button min-w-[200px] w-full sm:w-[50%]" type="button" onClick={handleAddToOrder}>
                  Add To Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
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
