import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkAdmin } from '../redux/userSlice.js';

interface Values {
  username: string;
  id: string;
  password: string;
}

const Signin = () => {
  const [values, setValues] = useState<Values>({
    username: '',
    id: '',
    password: '',
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/${values.id}`,
        values
      );
      dispatch(checkAdmin(res.data));
      router.push('/admin');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>Sign In | Food Jungle</title>
        <meta name="description" content="sign in" />
      </Head>
      <main className="w-screen h-screen bg-red-600 flex justify-center items-center px-4 lg:px-0">
        <div className="w-full h-max p-6 max-w-[30rem] mx-auto bg-yellow-500 rounded-md">
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-8 items-center"
          >
            <input
              type="text"
              required
              placeholder="Admin Name"
              value={values.username}
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              className="w-full max-w-[20rem] mx-auto h-[2.5rem] pl-2 rounded-md text-black"
            />
            <input
              type="password"
              required
              placeholder="ID"
              value={values.id}
              onChange={(e) => setValues({ ...values, id: e.target.value })}
              className="w-full max-w-[20rem] mx-auto h-[2.5rem] pl-2 rounded-md text-black"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="w-full max-w-[20rem] mx-auto h-[2.5rem] pl-2 rounded-md text-black"
            />
            <button
              type="submit"
              className="py-1 px-10 rounded-md border-2 hover:bg-white hover:bg-opacity-30 duration-200 ease-out transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Signin;
