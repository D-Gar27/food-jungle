import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { reset } from '../redux/foodBag';

interface Values {
  name: string;
  phone: string;
  address: string;
}

const Checkout = () => {
  const router = useRouter();
  const [values, setValues] = useState<Values>({
    name: '',
    phone: '',
    address: '',
  });
  const dispatch = useDispatch();
  const [cartID, setCartID] = useState<string | null>('');
  const [status, setStatus] = useState({ success: false, msg: '' });
  useEffect(() => {
    setCartID(localStorage.getItem('cartID'));
  }, []);
  const handlePayment = async (e: any) => {
    e.preventDefault();
    if (!cartID) {
      setStatus({ success: false, msg: 'Cart is empty' });
      return;
    }
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/finals`, {
        ...values,
        cartID,
      });
      localStorage.removeItem('cartID');
      dispatch(reset);
      router.push('/thank-you');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>Check Out | Food Jungle</title>
        <meta name="description" content="Check Out" />
      </Head>
      <main className="_navbar bg-red-600  ">
        <div className="w-full __top wide__container mx-auto flex flex-col justify-center items-center px-4">
          <form
            onSubmit={handlePayment}
            className="w-full max-w-[30rem] flex gap-4 flex-col mx-auto bg-yellow-500 p-6 rounded-md shadow-md"
          >
            <input
              type="text"
              required
              name="name"
              placeholder="Name"
              className="h-9 text-black pl-2 rounded-md"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <input
              type="text"
              required
              name="phone"
              placeholder="Phone Number"
              className="h-9 text-black pl-2 rounded-md"
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
            <input
              type="text"
              required
              name="address"
              placeholder="Address to deliver"
              className="h-9 text-black pl-2 rounded-md"
              value={values.address}
              onChange={(e) =>
                setValues({ ...values, address: e.target.value })
              }
            />

            <p className="font-semibold tracking-wide">
              Order ID: <span>{cartID}</span>
            </p>
            <button
              type="submit"
              className="pt-1 parent-btn pb-[0.3rem] mt-3 px-4 border-2 border-white rounded-md hover:bg-white hover:bg-opacity-20 duration-200 ease-out transition-all relative font-semibold"
            >
              Finish{' '}
              <span className="absolute top-1/2 child-icon -translate-y-1/2 right-1/3 duration-200 ease-out transition-all">
                <HiArrowNarrowRight />
              </span>
            </button>
            {!status.success && (
              <p className="font-semibold text-red-600">{status.msg}</p>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default Checkout;
