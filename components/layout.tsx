import Head from 'next/head';
import React, { useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import AdminNavbar from '../componentsAdmin/Navbar';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { storeItemsInCart } from '../redux/foodBag.js';
import { checkAdmin } from '../redux/userSlice.js';

type ChildrenProps = {
  children: JSX.Element;
};

interface Cart {
  order: {
    items: [];
    itemsAmount: 0;
    itemsTotal: 0;
  };
}

type STATE = {
  admin: { admin: boolean };
};

const Layout = ({ children }: ChildrenProps) => {
  const dispatch = useDispatch();
  const admin = useSelector<STATE>((state) => state.admin.admin);

  const { pathname } = useRouter();

  useEffect(() => {
    const cartID: any = localStorage.getItem('cartID');

    const fetchItemsInCart = async () => {
      const res: any = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${localStorage.getItem(
          'cartID'
        )}`
      );

      const data = res.data?.order;
      dispatch(storeItemsInCart(data));
    };

    if (cartID) {
      fetchItemsInCart();
    }
  }, [dispatch]);

  const router = useRouter();

  useEffect(() => {
    const admin: any = localStorage.getItem('x_2');
    if (admin) {
      dispatch(checkAdmin({ admin }));
    }
    if (router.pathname === '/admin' && !admin) {
      router.push('/sign-in');
    }
    if (router.pathname === '/admin/post-drink' && !admin) {
      router.push('/sign-in');
    }
    if (router.pathname === '/admin/post-food' && !admin) {
      router.push('/sign-in');
    }
  }, [router, admin, dispatch]);

  return (
    <>
      <Head>
        <title>Kitchen Jungle</title>
        <meta name="description" content="Food Jungle" />
        <meta name="keywords" content="menu, kitchen, jungle, foods, drinks" />
      </Head>
      <div className="w-screen h-screen overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-white grid-rows-3">
        {pathname === '/admin' ||
        pathname === '/admin/post-food' ||
        pathname === '/admin/post-drink' ? (
          <AdminNavbar />
        ) : (
          <Navbar />
        )}
        <div className="min-h-full in-layout">{children}</div>
        {pathname === '/admin' ||
        pathname === '/admin/post-food' ||
        pathname === '/admin/post-drink' ? (
          ''
        ) : (
          <Footer />
        )}
      </div>
    </>
  );
};

export default Layout;
