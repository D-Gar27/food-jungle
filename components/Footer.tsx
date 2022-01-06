import { BsFacebook } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-auto  bg-neutral-800 w-full h-max py-8">
      <div className="w-full wide__container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-center">
        <section>
          <h1 className="wavy text-2xl lg:text-[2rem] tracking-widest">
            Food Jungle
          </h1>
          <p className="text-sm md:text-base mt-3">Best foods in town</p>
          <p className="text-sm md:text-base mt-2 italic text-yellow-500">
            01 322 5392
          </p>
        </section>
        <section className="mt-7 md:mt-0 flex flex-col">
          <h1 className="text-yellow-500 font-semibold text-lg lg:text[1.5rem] lg:text-center">
            Find us
          </h1>
          <div className="w-max lg:mx-auto mt-5 md:mt-0">
            <a className="text-center mt-6 text-sm lg:text-base flex items-center gap-2">
              <BsFacebook />{' '}
              <span className="hover:underline cursor-pointer text-left">
                facebook.com/kitchen.jungle
              </span>
            </a>
            <a className="text-center mt-6 text-sm lg:text-base flex items-center gap-2">
              <FaMapMarkerAlt />{' '}
              <span className="hover:underline cursor-pointer text-left">
                Hmawbi, Yangon, Myanmar
              </span>
            </a>
          </div>
        </section>
        <section className=" flex flex-col mt-5 md:mt-0">
          <h1 className="text-yellow-500 font-semibold text-lg lg:text[1.5rem] lg:text-center">
            Open Hours
          </h1>
          <h4 className="lg:text-center mt-6 text-sm lg:text-base">
            9:00 AM to 8:00 PM
          </h4>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
