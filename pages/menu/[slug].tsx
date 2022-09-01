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
import ProductDetail from '../../components/detail/ProductDetail';

const MenuDetail: NextPage = (props: any) => {
  const product = props.data;

  return (
    <>
      <Head>
        <title>Doge Coffee | Menu - {product.name}</title>
      </Head>
      <div className="page-content container px-4 mx-auto max-w-full lg:max-w-5xl">
        {/* Breacrumbs */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <a className="text-2xl mr-2" aria-label="Home">
              <HomeIcon />
            </a>
          </Link>
          <span className="mr-2">/</span>
          <Link href="/menu">
            <a className="mr-2 font-bold hover:underline focus:underline">Menu</a>
          </Link>
          <span className="mr-2">/</span>
          <span className="text-gray-600 mr-2">{product.category}</span>
          <span className="mr-2">/</span>
          <span className="text-gray-600">{product.name}</span>
        </div>
        <ProductDetail product={product} />
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
