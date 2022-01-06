import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/foodBag.js';

interface DataType {
  drink: {
    _id: string;
    name: string;
    img: string;
    slogan: string;
    desc: string;
    price: number;
    slug: string;
  };
}

const DrinkProduct = ({ drink }: DataType) => {
  const { name, img, slogan, price, _id } = drink;
  const [amount, setAmount] = useState<number>(1);

  const handleAmount = (math: 'plus' | 'minus') => {
    if (math === 'plus') {
      setAmount((prev) => prev + 1);
    }
    if (math === 'minus' && amount !== 1) {
      setAmount((prev) => prev - 1);
    }
  };
  const dispatch = useDispatch();

  const handleAdd = (e: any) => {
    e.preventDefault();

    const data = { name, price, img, amount, _id };
    dispatch(addToCart({ data }));
  };
  return (
    <>
      <Head>
        <title>{name} | Food Jungle</title>
        <meta name="description" content="Food from Food Jungle" />
      </Head>
      <main className="w-full bg-red-600">
        <div className="w-full _navbar flex flex-col lg:flex-row items-center justify-center tall:gap-6 lg:gap-0 lg:justify-evenly">
          <section>
            <div className="relative lg:w-[27rem] lg:h-[27rem] w-[15rem] h-[15rem]">
              <Image src={img} alt={name} layout="fill" objectFit="contain" />
            </div>
          </section>
          <section className="flex flex-col items-center lg:items-start justify-center gap-4 lg:gap-6">
            <h1 className="text-yellow-500 text-[1.5rem] lg:text-[2.25rem] font-bold">
              {name}
            </h1>
            <p className="font-sembold text-base lg:text-lg text-center lg:text-left">
              {slogan}
            </p>
            <div className="flex items-center justify-center gap-4">
              <AiOutlineMinusCircle
                onClick={() => handleAmount('minus')}
                className="font-semibold text-yellow-500 text-xl cursor-pointer"
              />
              <span className="font-bold text-xl">{amount}</span>
              <AiOutlinePlusCircle
                onClick={() => handleAmount('plus')}
                className="font-semibold text-yellow-500 text-xl cursor-pointer"
              />
            </div>
            <h3>
              <span className="font-bold text-3xl">{price}</span> $
            </h3>
            <button
              onClick={handleAdd}
              className="text-yellow-500 font-semibold tracking-wide py-1 px-4 border-2 border-yellow-500 rounded-md hover:bg-yellow-500 hover:bg-opacity-20 duration-200 ease-out transition-all"
            >
              Add to my food bag
            </button>
          </section>
        </div>
      </main>
    </>
  );
};

export default DrinkProduct;

const url = process.env.NEXT_PUBLIC_API_URL;

export const getStaticPaths = async () => {
  const res = await axios.get(`${url}/drinks`);
  const data: {
    _id: string;
    name: string;
    img: string;
    slogan: string;
    desc: string;
    price: number;
    slug: string;
  }[] = await res.data;
  const paths = data.map((d) => {
    return {
      params: {
        drinkSlug: d.slug,
      },
    };
  });
  return {
    paths,
    fallback: 'blocking',
  };
};

type ParamsProps = {
  params: { drinkSlug: string };
};

export const getStaticProps = async (props: ParamsProps) => {
  const slug = props.params.drinkSlug;
  const { data } = await axios.get(`${url}/drinks/${slug}`);
  if (!data) {
    return {
      redirect: {
        destination: '/drinks/not-found',
        permanent: false,
      },
    };
  }
  return {
    props: { drink: data },
    revalidate: 30,
  };
};
