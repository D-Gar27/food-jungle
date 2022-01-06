import Link from 'next/link';

const Categories = () => {
  return (
    <section className="w-full h-max flex flex-row items-center justify-around bg-yellow-500">
      <div>
        <Link href={'/foods'}>
          <a className="lg:text-[2.25rem] text-xl cate-btns text-red-600 font-semibold">
            FOODS
          </a>
        </Link>
      </div>
      <div>
        <Link href={'/foods'}>
          <a className="lg:text-[2.25rem] text-xl cate-btns text-red-600 font-semibold">
            DRINKS
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Categories;
