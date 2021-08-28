import type { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MenuCard from '../../components/MenuCard';
import { v1 as uuid } from 'uuid';
import Drink from '../../public/drink.svg';
import { sampleDrinks } from '../../data/sampledrinks';
import client from '../../sanityClient';

const MenuDetail: NextPage = (props) => {
  const router = useRouter();
  const {
    query: { slug }
  } = router;
  return (
    <div className='page-content wrapper'>
      <h1 className='page-title'>Menu Item - {slug}</h1>
      <button type='button'>Add To Order</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('ctx params', context.params);
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return {
    props: {
      data
    }
  };
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   // client.fetch()
//   const data = await fetch('https://jsonplaceholder.typicode.com/posts');

//   return {
//     props: {
//       data
//     }
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [
//       {
//         params: {}
//       }
//     ],
//     fallback: 'blocking'
//   };
// };

export default MenuDetail;
