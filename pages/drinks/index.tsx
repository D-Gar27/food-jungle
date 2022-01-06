import axios from 'axios';
import { motion } from 'framer-motion';
import Drink from '../../components/Drink';

import { GetStaticProps } from 'next';
import Head from 'next/head';

interface DrinksProps {
  drinks: [
    {
      _id: string;
      name: string;
      img: string;
      slogan: string;
      desc: string;
      price: number;
      slug: string;
    }
  ];
}

const Drinks = (props: DrinksProps) => {
  const { drinks } = props;
  return (
    <>
      <Head>
        <title>Foods | Food Jungle</title>
        <meta name="description" content="Food from Food Jungle" />
      </Head>
      <main className="w-full _navbar bg-red-600">
        <section className="w-full h-full wide__container mx-auto">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 75,
                duration: 0.5,
              },
            }}
            className="text-center text-yellow-500 text-[2rem] lg:text-[2.25rem] font-semibold mt-6"
          >
            Drinks
            <section className="w-full h-full lg:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-20 mx-auto py-10 gap-12 lg:mt-0">
              {drinks.map((drink) => (
                <Drink
                  key={drink._id}
                  name={drink.name}
                  price={drink.price}
                  img={drink.img}
                />
              ))}
            </section>
          </motion.h1>
        </section>
      </main>
    </>
  );
};

export default Drinks;

export const getStaticProps: GetStaticProps = async () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const res = await axios.get(`${url}/drinks`);
  const data = await res.data;
  return {
    props: {
      drinks: data,
    },
  };
};
