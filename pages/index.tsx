import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import Featured from '../components/Featured';
import MostPopular from '../components/MostPopular';

const FeaturedData = [
  {
    img: '/images/pizza.png',
    slogan: 'Hot And Tasty',
    name: 'Sausage Pizza',
    off: '10% off',
  },
  {
    img: '/images/burger.png',
    slogan: 'Thick And Juicy',
    name: 'Big Beef Burger',
    off: '7% off',
  },
  {
    img: '/images/drink.png',
    slogan: 'Fresh And Creamy',
    name: 'Thai Milk Tea',
    off: '3% off',
  },
];

const Home: NextPage = () => {
  const [index, setIndex] = useState<number>(1);

  const handleFeatured = (dir: 'left' | 'right') => {
    if (dir === 'left') {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (dir === 'right') {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  useEffect(() => {
    if (index < 0) {
      setIndex(2);
    }
    if (index > 2) {
      setIndex(0);
    }
  }, [index]);

  return (
    <main className="m-0 p-0">
      <section className="w-full _navbar bg-red-600 relative">
        <MdArrowBackIos
          onClick={() => handleFeatured('left')}
          className="featured-arrows sm:left-6 left-4 text-[4rem] sm:text-[5rem] hover:text-yellow-500 duration-200 ease-out transition-all"
        />
        <div
          style={{ transform: `translateX(${-100 * index}vw)` }}
          className={`flex items-center w-[300vw] overflow-x-scroll ease-out duration-500 transition-all `}
        >
          {FeaturedData.map((p, i) => (
            <Featured
              key={i}
              img={p.img}
              slogan={p.slogan}
              name={p.name}
              off={p.off}
              index={index}
            />
          ))}
        </div>
        <MdArrowForwardIos
          onClick={() => handleFeatured('right')}
          className="featured-arrows rsm:ight-6 right-4 text-[4rem] sm:text-[5rem] hover:text-yellow-500 duration-200 ease-out transition-all"
        />
      </section>
      <MostPopular />
    </main>
  );
};

export default Home;
