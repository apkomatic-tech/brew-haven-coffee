import groq from 'groq';
import type { GetStaticProps, NextPage } from 'next';
import client from '../../sanityClient';
import MenuCard from '../../components/MenuCard';
import Head from 'next/head';

const Menu: NextPage = (props: any) => {
  const drinks = props.data;
  const coldDrinks = drinks.filter((drink: any) => drink.category.match(/cold/i));
  const hotDrinks = drinks.filter((drink: any) => drink.category.match(/hot/i));

  function renderDrinks(drinks: any[]) {
    return drinks.map((item: any) => {
      const { _id, name, image, price } = item;
      const drinkData = {
        id: _id,
        title: name,
        image,
        slug: item.slug.current,
        price
      };
      return <MenuCard key={_id} {...drinkData} />;
    });
  }

  return (
    <>
      <Head>
        <title>Doge Coffee | Menu</title>
      </Head>
      <div className='page-content wrapper'>
        <h1 className='page-title'>Menu</h1>

        {coldDrinks.length > 0 && (
          <>
            <h2 className='font-bold mb-6 text-xl'>Cold Brews</h2>
            <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 mb-12'>{renderDrinks(coldDrinks)}</div>
          </>
        )}
        {hotDrinks.length > 0 && (
          <>
            <h2 className='font-bold mb-6 text-xl'>Hot Coffee</h2>
            <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 mb-12'>{renderDrinks(hotDrinks)}</div>
          </>
        )}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.fetch(groq`
    *[_type == 'drink'] {
      name, price, image, slug, 
      "category": category->categoryname
    }
  `);

  return {
    revalidate: 10,
    props: {
      data
    }
  };
};

export default Menu;
