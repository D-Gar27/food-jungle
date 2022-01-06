import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="bg-yellow-400 __top col-span-2 flex flex-col items-center px-6 pt-6 shadow-lg">
      {' '}
      <div className="w-full flex flex-col gap-5">
        <Link href="/admin" passHref>
          <a className="text-white text-xl hover:bg-red-500 duration-200 ease-out transition-all hover:bg-opacity-30 pl-2 py-1 rounded-md">
            Foods
          </a>
        </Link>
        <Link href="/admin/drinks" passHref>
          <a className="text-white text-xl hover:bg-red-500 duration-200 ease-out transition-all hover:bg-opacity-30 pl-2 py-1 rounded-md">
            Drinks
          </a>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
