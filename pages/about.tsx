import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Blob from '../public/yellow-blob.svg';
import setPageTitle from '../utils/setPageTitle.utils';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>{setPageTitle('About')}</title>
      </Head>
      <div className="page-content wrapper-narrow">
        <h1 className="page-title mb-24 relative z-10">
          About Doge Coffee
          <div className="bg-primary mt-1 h-1 w-16 rounded-sm"></div>
          <div
            className="absolute transform -translate-y-10 -translate-x-2 top-0 left-0 w-25 h-25"
            style={{
              zIndex: -1
            }}>
            <Image src={Blob} alt="" />
          </div>
        </h1>
        <h2 className="font-bold mb-3 text-xl">We are here to provide best coffee drinks in the world</h2>
        <p className="text-gray-600 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid aperiam corporis cum dolorem dolores ducimus ea enim eum ex id illo laborum libero minus modi nam,
          obcaecati officia optio quasi quos rerum sapiente sequi sit, tempore unde, veniam voluptate! A, aliquam dicta doloremque dolores eveniet fuga magni maxime omnis.
        </p>
        <h2 className="font-bold mb-3 text-xl">Our Story</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut corporis fuga minima modi molestiae nostrum provident reiciendis sit soluta tempore? Accusantium architecto
          at aut consequatur culpa ea eligendi error esse eveniet excepturi expedita explicabo fuga id ipsam labore laudantium magnam magni maxime nihil non optio quae quibusdam
          quis quo rem repellat reprehenderit, sed sint sunt suscipit tempore temporibus tenetur totam. Accusamus ad adipisci architecto dignissimos eveniet in iste magni maiores
          optio similique. Aut, est fugiat.
        </p>
      </div>
    </>
  );
};

export default About;
