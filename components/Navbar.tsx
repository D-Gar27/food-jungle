import Link from 'next/link';

import { HiMenuAlt3 } from 'react-icons/hi';
import { MdLunchDining, MdLocalPhone } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

type State = {
  cart: {
    itemsAmount: number;
  };
};

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<true | false>(false);
  const variants = {
    open: {
      translateX: 0,
      transition: { type: 'spring', stiffness: 75, duration: 0.5 },
    },
    close: {
      translateX: '100vw',
      transition: { type: 'spring', stiffness: 75, duration: 0.5 },
    },
  };
  const router = useRouter();

  const itemsAmount = useSelector((state: State) => state.cart.itemsAmount);

  return (
    <nav className="w-screen h-16 bg-red-600 fixed top-0 left-0 z-50">
      <div className="wide__container h-full mx-auto px-4">
        <div className="w-full flex items-center justify-between h-full">
          <motion.p
            initial={{ x: -50, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 75,
                duration: 0.5,
              },
            }}
            className="hidden lg:flex flex-col justify-center items-start text-xl"
          >
            Order now{' '}
            <span className="text-xs flex items-center gap-1">
              <MdLocalPhone />
              01 322 5392
            </span>
          </motion.p>
          <motion.div
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
          >
            <Link href={'/'}>
              <a className="cursor-pointer font-bold text-xl sm:text-2xl drop-shadow-lg flex flex-col items-start gap-[3px] wavy tracking-widest text-white">
                Food Jungle
              </a>
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 75,
                duration: 0.5,
              },
            }}
            className="flex items-center gap-6 justify-center"
          >
            <div className="items-center hidden sm:flex gap-6">
              <Link href={'/foods'}>
                <a className="cursor-pointer font-semibold text-base nav-links">
                  Foods
                </a>
              </Link>
              <Link href={'/drinks'}>
                <a className="cursor-pointer font-semibold text-base nav-links">
                  Drinks
                </a>
              </Link>
            </div>
            <Link href={'/'}>
              <a className="cursor-pointer font-bold text-lg drop-shadow-lg relative">
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center absolute -top-2 -right-2 z-10">
                  <span className="text-xs">{itemsAmount}</span>
                </div>
                <Link href={'/food-bag'} passHref>
                  <a>
                    <MdLunchDining
                      className="text-xl nav-links"
                      onClick={() => router.push('/food-bag')}
                    />
                  </a>
                </Link>
              </a>
            </Link>
            <HiMenuAlt3
              onClick={() => setOpenMenu(true)}
              className="text-2xl sm:hidden nav-links hover:translate-y-0"
            />
          </motion.div>
        </div>
      </div>
      <motion.section
        variants={variants}
        animate={openMenu ? 'open' : 'close'}
        className="w-[75vw] slidebar h-screen bg-neutral-900 bg-opacity-90 fixed sm:hidden bottom-0 right-0"
      >
        <AiOutlineCloseCircle
          onClick={() => setOpenMenu(false)}
          className="text-2xl text-red-600 font-bold absolute right-4 top-4"
        />
        <div className="flex flex-col items-start pl-4 h-full justify-start mt-16 pr-4">
          <Link href={'/foods'}>
            <a className="text-lg hover:text-yellow-600 duration-200 ease-out py-2 transition-all text-white w-full border-b-2 border-b-white hover:border-b-yellow-600 mt-4">
              Foods
            </a>
          </Link>
          <Link href={'/drinks'}>
            <a className="text-lg hover:text-yellow-600 duration-200 ease-out py-2 transition-all text-white w-full border-b-2 border-b-white hover:border-b-yellow-600 mt-4">
              Drinks
            </a>
          </Link>
          <Link href={'/food-bag'}>
            <a className="text-lg hover:text-yellow-600 duration-200 ease-out py-2 transition-all text-white w-full border-b-2 border-b-white hover:border-b-yellow-600 mt-4">
              Food Bag
            </a>
          </Link>
          <div className="text-yellow-500 mt-16 italic wavy tracking-widest">
            <p>Order now</p>
            <p className="text-sm"> 01 322 5392</p>
          </div>
        </div>
      </motion.section>
    </nav>
  );
};

export default Navbar;
