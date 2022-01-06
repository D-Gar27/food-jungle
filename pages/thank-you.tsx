import Head from 'next/head';

const ThankYou = () => {
  return (
    <>
      <Head>
        <title>Thank You</title>
        <meta name="description" content="Check Out" />
      </Head>
      <main className="w-screen bg-red-600">
        <div className="w-full _navbar flex flex-col items-center justify-center gap-4 px-4">
          <h1 className="text-[2rem] md:text-[3rem] text-center text-yellow-500">
            Your food bag is on the way. Thanks for choosing us
          </h1>
        </div>
      </main>
    </>
  );
};

export default ThankYou;
