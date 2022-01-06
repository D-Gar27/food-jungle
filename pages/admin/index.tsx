import Sidebar from '../../componentsAdmin/Sidebar';

const Home = () => {
  return (
    <main className="relative w-full grid grid-cols-12 _navbar">
      <Sidebar />
      <section className="_navbar w-full col-span-10"></section>
    </main>
  );
};

export default Home;
