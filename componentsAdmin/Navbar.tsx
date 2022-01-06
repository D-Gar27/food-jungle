import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('x_2');
    router.reload();
  };
  return (
    <nav className="w-screen h-16 bg-red-600 fixed top-0 left-0 z-50">
      <div className="wide__container h-full mx-auto px-4">
        {' '}
        <div className="w-full flex items-center justify-between h-full">
          <Link href={'/admin'} passHref>
            <a className="cursor-pointer font-bold text-xl sm:text-2xl drop-shadow-lg flex flex-col items-start gap-[3px] tracking-widest text-white">
              Admin
            </a>
          </Link>
          <div className="items-center gap-4 sm:gap-6 flex">
            <button onClick={handleLogout}>log out</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
