import React from 'react';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="app font-serif flex flex-col min-h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

const Header: React.FC = () => (
  // <header className="bg-yellow-500">
  //   <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 border-b border-black">
  //     <div className="text-3xl font-bold text-black">
  //       <a href="#">Insight</a>
  //     </div>
  //     <ul className="flex space-x-6 text-lg">
  //       <li><Link to={'/blogs'} className="text-black">Blogs</Link></li>
  //       <li><Link to={'/publish'} className="text-black">Write</Link></li>
  //       {/* <li><a href="#" className="text-black"></a></li> */}
  //       <li><Link to={'/signin'} className="text-black">Sign in</Link></li>
  //       <li><Link to={'/signup'} className="bg-black text-white px-4 py-2 rounded-full">Get started</Link></li>
  //     </ul>
  //   </nav>
  // </header>
  <header className="bg-yellow-500">
  <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 border-b border-black md:px-12 lg:px-24">
    <div className="text-3xl font-bold text-black">
      <a href="#">Insight</a>
    </div>
    <ul className="flex pt-6 ml-5 sm:pl-0 sm:mt-0 space-x-6 text-lg  md:space-x-8 lg:space-x-12">
      <li><Link to={'/blogs'} className=" text-black">Blogs</Link></li>
      <li className="md:block hidden"><Link to={'/publish'} className="text-black">Write</Link></li>
      {/* <li><a href="#" className="text-black"></a></li> */}
      <li><Link to={'/signin'} className="text-black">Sign in</Link></li>
      <li><Link to={'/signup'} className="sm:bg-black sm:text-white px-4 py-2 sm:rounded-full md:px-6 md:py-3 lg:px-8 lg:py-4">Get started</Link></li>
    </ul>
  </nav>
</header>


);

const Main: React.FC = () => (
  <main className="bg-yellow-500 flex-grow">
    <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left px-6 py-20">
      <div className="max-w-xl">
        <h1 className="text-7xl font-bold mb-4">Stay curious.</h1>
        <p className="text-2xl mb-8">Discover stories, thinking, and expertise from writers on any topic.</p>
        <Link to={'/signup'} className="bg-black text-white px-8 py-3 rounded-full text-lg">Start reading</Link>
      </div>
      <div className="mt-10 md:mt-0 md:ml-10">
        <img src="https://imageio.forbes.com/specials-images/imageserve/622787564f26c2250a237581/A-yellow-light-bulb-floating-in-the-air-above-four-white-light-bulbs-resting-on-a/960x0.png?format=png&width=960" alt="Decorative" className="w-full h-auto" />
      </div>
    </section>
  </main>
);

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white py-6 text-center">
    <p> 2023 @Insight</p>
  </footer>
);

export default App;

