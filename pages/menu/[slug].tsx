import type { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MenuCard from '../../components/MenuCard';
import { v1 as uuid } from 'uuid';
import Drink from '../../public/drink.svg';
import { sampleDrinks } from '../../data/sampledrinks';
import client from '../../sanityClient';
import sanityClient from '../../sanityClient';
import groq from 'groq';
import { useNextSanityImage } from 'next-sanity-image';
import Link from 'next/link';
import { HiArrowNarrowLeft as LeftArrow } from 'react-icons/hi';

const MenuDetail: NextPage = (props: any) => {
  const detail = props.data;
  const imageProps = useNextSanityImage(sanityClient, detail.image, {
    enableBlurUp: true
  });

  return (
    <div className='page-content wrapper'>
      <Link href='/menu'>
        <a className='border border-gray-400 mb-3 inline-flex items-center p-2'>
          <LeftArrow /> <span>Go Back</span>
        </a>
      </Link>
      <p>Category: {detail.category}</p>
      <h1 className='page-title'>{detail.name}</h1>
      {detail.description && <p>{detail.description}</p>}
      <p>
        <sup>$</sup>
        {detail.price}
      </p>
      <Image {...imageProps} width={400} height={400} layout='fixed' alt={detail.name} />
      <button type='button'>Add To Order</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await sanityClient.fetch(groq`
    *[_type=='drink' && slug.current == '${context.query.slug}'] {
      name, price, image, description,
      "category": category->categoryname
    }[0]
  `);

  return {
    props: {
      data
    }
  };
};

export default MenuDetail;
