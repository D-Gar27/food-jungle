import Image from 'next/image';
import { useRouter } from 'next/router';
import Categories from './category';

const PopularData = [
  {
    img: '/images/mpburger.png',
    name: 'Chicken Tender Burger',
  },
  {
    img: '/images/mppizza.png',
    name: 'Ranch Pizza',
  },
  {
    img: '/images/mpsandwich.png',
    name: 'Submarine Sandwich',
  },
];

const MostPopular = () => {
  const router = useRouter();
  return (
    <section className="w-screen bg-yellow-500 h-screen pt-6 grid grid-rows-3 items-center">
      <h1 className="text-red-600 text-[2rem] font-semibold lg:text-[3rem] text-center pt-6">
        Popular Ones
      </h1>
      <div className="flex w-full items-center h-max overflow-auto px-14 lg:px-0 lg:flex-wrap gap-24 lg:justify-around lg:gap-0">
        {PopularData.map((popular, i) => {
          const slug = popular.name.split(' ').join('-').toLowerCase();
          return (
            <div
              onClick={() => router.push({ pathname: '/foods/' + slug })}
              key={i}
              className="flex flex-col gap-8 justify-center items-center cursor-pointer"
            >
              <div className="relative w-[10rem] h-[10rem] hover:scale-110 duration-200 ease-out transition-all">
                <Image
                  src={popular.img}
                  alt={popular.img}
                  layout="fill"
                  objectFit="contain"
                  className="drop-shadow-xl"
                />
              </div>
              <p className="font-bold text-xl text-center">{popular.name}</p>
            </div>
          );
        })}
      </div>
      <Categories />
    </section>
  );
};

export default MostPopular;
