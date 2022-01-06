import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addAmount, reduceAmount } from '../redux/foodBag.js';

type STATE = {
  cart: {
    items: {
      name: string;
      price: number;
      img: string;
      amount: number;
      _id: string;
    }[];
    itemsAmount: 0;
    itemsTotal: 0;
  };
};

const Foodbag = () => {
  const router = useRouter();
  const data = useSelector((state: STATE) => state);
  const [cartID, setCartID] = useState<string | null>('');
  useEffect(() => {
    const id = localStorage.getItem('cartID');
    setCartID(id);
  }, []);
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/orders/${cartID}`);
      localStorage.removeItem('cartID');
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>Food Bag | Food Jungle</title>
        <meta name="description" content="food bag" />
      </Head>
      <main className="_navbar bg-red-600  ">
        <div className="w-full __top h-full px-8 grid grid-cols-1 lg:grid-cols-3 items-center wide__container mx-auto">
          <section className="lg:col-span-2 w-full min-h-full flex flex-col items-start justify-start lg:justify-center pt gap-6 lg:gap-12 lg:px-12 lg:pt-0 pt-16">
            {data.cart.items.length > 0 ? (
              data.cart.items.map((item) => (
                <Item
                  key={item._id}
                  img={item.img}
                  price={item.price}
                  name={item.name}
                  amount={item.amount}
                  id={item._id}
                />
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-center text-yellow-500 font-semibold text-[1.5rem]">
                  You food bag is empty{' '}
                </p>
              </div>
            )}
          </section>
          <section className="w-full h-[10rem] md:h-[13rem] shadow-md lg:my-auto my-8 rounded-md bg-yellow-500 flex flex-col lg:gap-2 p-6">
            <div className="w-full flex items-center justify-between">
              <h3 className="md:text-lg font-semibold ">Subtotal</h3>
              <h3 className="md:text-lg font-semibold ">
                {data.cart.itemsTotal}$
              </h3>
            </div>
            <div className="w-full flex items-center justify-between">
              <h3 className="md:text-lg font-semibold ">Discount</h3>
              <h3 className="md:text-lg font-semibold ">0$</h3>
            </div>
            <div className="w-full flex items-center justify-between">
              <h3 className="md:text-lg font-semibold ">Total</h3>
              <h3 className="md:text-lg font-semibold ">
                {data.cart.itemsTotal}$
              </h3>
            </div>
            <div className="flex items-center justify-around">
              <button
                onClick={() => router.push({ pathname: '/check-out' })}
                className="pt-1 pb-[0.3rem] mt-3 px-4 border-2 border-white rounded-md hover:bg-white hover:bg-opacity-20 duration-200 ease-out transition-all"
              >
                Check out
              </button>
              {cartID && (
                <button
                  onClick={handleDelete}
                  className="pt-1 pb-[0.3rem] mt-3 px-4 border-2 border-red-500 rounded-md hover:bg-red-500 hover:bg-opacity-20 duration-200 ease-out transition-all text-red-500"
                >
                  Clear Cart
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Foodbag;

type ItemProps = {
  img: string;
  price: number;
  name: string;
  amount: number;
  id: string;
};

const Item = (props: ItemProps) => {
  const [amount, setAmount] = useState<number>(props.amount);
  const dispath = useDispatch();
  const handleAmount = (math: 'plus' | 'minus') => {
    if (math === 'plus') {
      dispath(addAmount({ props }));
      setAmount(amount + 1);
    }
    if (math === 'minus' && amount !== 1) {
      dispath(reduceAmount({ props }));

      setAmount(amount - 1);
    }
  };

  const removeHandler = () => {
    dispath(
      removeFromCart({ id: props.id, amount: props.amount, price: props.price })
    );
  };
  return (
    <div className="w-full flex flex-col lg:gap-0 gap-6 lg:flex-row items-center justify-between">
      <div className="w-[5rem] h-[5rem] sm:w-[7rem] sm:h-[7rem] relative">
        <Image
          src={props.img}
          alt={props.name}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="flex w-full items-center justify-between lg:flex-1 lg:pl-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-white font-semibold lg:text-2xl">{props.name}</h1>
          <p className="text-white font-semibold lg:text-lg">{props.price}$</p>
        </div>
        <div className="flex flex-col items-center">
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
          <button onClick={() => removeHandler()} className="text-yellow-500">
            remove
          </button>
        </div>
      </div>
    </div>
  );
};
