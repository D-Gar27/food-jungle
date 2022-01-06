import Link from 'next/link';
import Head from 'next/head';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>404 | Food Jungle</title>
        <meta name="description" content="Food Jungle" />
      </Head>
      <main className="w-screen bg-red-600">
        <div className="w-full _navbar flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-6">
            <h1 className="text-[4rem] font-bold tracking-wider text-center text-yellow-500">
              404
            </h1>
            <h3>Page not found</h3>
          </div>
          <Link href={'/'} passHref>
            <a className="py-1 px-6 border-2 border-white rounded-md duration-200 ease-out transition-all hover:bg-white hover:bg-opacity-25">
              Home
            </a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
