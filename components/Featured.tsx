import Image from 'next/image';

type FeaturedProps = {
  img: string;
  slogan: string;
  name: string;
  off: string;
  index: number;
};

const Featured = (props: FeaturedProps) => {
  return (
    <div
      className={`flex w-screen flex-col lg:flex-row items-center justify-center tall:gap-20 gap-8 lg:gap-0 lg:justify-evenly __top ${
        props.index % 1 ? 'flex-col-reverse lg:flex-row-reverse' : ''
      }`}
    >
      <div className="relative w-[17rem] h-[17rem] lg:w-[25rem] lg:h-[25rem] xl:w-[30rem] xl:h-[30rem]">
        <Image src={props.img} alt="pizza" layout="fill" objectFit="contain" />
      </div>
      <div className="text-center flex flex-col gap-8">
        <h3 className="lg:text-3xl text-xl font-semibold">{props.slogan}</h3>
        <h1 className="lg:text-[5rem] text-5xl font-semibold">{props.name}</h1>
        <h3 className="lg:text-3xl text-xl font-semibold text-yellow-500">
          {props.off}
        </h3>
      </div>
    </div>
  );
};

export default Featured;
