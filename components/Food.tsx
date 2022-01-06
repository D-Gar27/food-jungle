import Image from 'next/image';
import Link from 'next/link';

type FoodProps = {
  name: string;
  img: string;
  price: number;
};

const Food = (props: FoodProps) => {
  const { img, name, price } = props;
  const slug = name.split(' ').join('-').toLowerCase();
  return (
    <Link href={{ pathname: '/foods/' + slug }} passHref>
      <div className="w-full mx-auto px-4 lg:px-0">
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 border-2 border-red-600 hover:border-yellow-500 duration-200 ease-out transition-all cursor-pointer p-3 rounded-md">
          <div className="relative lg:w-[10rem] lg:h-[10rem] w-[7rem] h-[7rem]">
            <Image src={img} alt={name} layout="fill" objectFit="contain" />
          </div>
          <p className="text-yellow-500 text-sm lg:text-xl">{price}$</p>
          <h3 className="text-yellow-500 text-xl lg:text-2xl">{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Food;
