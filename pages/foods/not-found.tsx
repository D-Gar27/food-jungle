import Link from 'next/link';

const NotFound = () => {
  return (
    <main className="w-screen bg-red-600">
      <div className="w-full _navbar flex flex-col items-center justify-center gap-6">
        <h1 className="text-[2rem] text-center text-yellow-500">
          Sorry, we dot&apos;t have food with that name
        </h1>
        <Link href={'/foods'} passHref>
          <a className="py-1 px-6 border-2 border-white rounded-md duration-200 ease-out transition-all hover:bg-white hover:bg-opacity-25">
            Back to foods section
          </a>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
