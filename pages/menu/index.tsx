import groq from 'groq';
import type { GetStaticProps, NextPage } from 'next';
import client from '../../client';
import MenuCard from '../../components/MenuCard';
import { sampleDrinks } from '../../data/sampledrinks';
const Menu: NextPage = (props: any) => {
  const drinks = props.data;
  console.log(drinks);

  return (
    <div className='page-content wrapper'>
      <h1 className='page-title'>Menu</h1>
      {drinks.map((item: any) => {
        const { _id, name, image } = item;
        const menuItem = {
          id: _id,
          title: name,
          image
        };
        return <MenuCard key={_id} {...menuItem} />;
      })}

      {/* <h2 className='font-bold mb-4 text-xl'>Cold Brews</h2> */}
      {/* <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 mb-12'>
        {sampleDrinks.coldbrew.map((drink) => {
          return <MenuCard key={drink.id} {...drink} />;
        })}
      </div>
      <h2 className='font-bold mb-4 text-xl'>Hot Coffee</h2>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3'>
        {sampleDrinks.hotcoffee.map((drink) => {
          return <MenuCard key={drink.id} {...drink} />;
        })}
      </div> */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.fetch(groq`
    *[_type == 'drink']
  `);

  return {
    props: {
      data
    }
  };
};

export default Menu;
