import React from 'react';
import ai from "../img/download.jpg"
import ed from "../img/education.jpg"
import si from "../img/self-improvement.jpg"


const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <a href="/" className="text-3xl font-bold text-indigo-600">Insight</a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/signin" className="text-gray-700 hover:text-indigo-600">Sign In</a>
              <a href="/signup" className="text-gray-700 hover:text-indigo-600">Sign Up</a>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Insight</h1>
          <p className="text-lg mb-8">Discover and share amazing blogs to build a strong community of readers and content-writers</p>
          <a href="/signup" className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-md shadow-md font-medium hover:bg-gray-100">
            Get Started
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Explore Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative bg-white p-6 rounded-lg shadow-md overflow-hidden">
              {/* <img className="absolute inset-0 w-full h-full object-cover opacity-25" src="https://via.placeholder.com/400" alt="Technology" /> */}
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2">Technology</h3>
                <p className="text-gray-700 mb-4">Stay updated with the latest in technology. From AI to gadgets, we've got you covered.</p>
                <a href="/category/technology" className="text-indigo-600 hover:text-indigo-800 font-medium">Explore Technology</a>
              </div>
            </div>
            <div className="relative bg-white p-6 rounded-lg shadow-md overflow-hidden">
              {/* <img className="absolute inset-0 w-full h-full object-cover opacity-25" src="https://via.placeholder.com/400" alt="Education" /> */}
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2">Education</h3>
                <p className="text-gray-700 mb-4">Insights on modern education, learning techniques, and academic success stories.</p>
                <a href="/category/education" className="text-indigo-600 hover:text-indigo-800 font-medium">Explore Education</a>
              </div>
            </div>
            <div className="relative bg-white p-6 rounded-lg shadow-md overflow-hidden">
              {/* <img className="absolute inset-0 w-full h-full object-cover opacity-25" src="https://via.placeholder.com/400" alt="Self-Growth" /> */}
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2">Self-Growth</h3>
                <p className="text-gray-700 mb-4">Tips and stories to help you grow personally and professionally. Unlock your potential.</p>
                <a href="/category/self-growth" className="text-indigo-600 hover:text-indigo-800 font-medium">Explore Self-Growth</a>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">A Lot More</h3>
            <p className="text-gray-700 mb-4">Explore a variety of other exciting topics and discover new interests.</p>
            {/* <a href="/categories" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md shadow-md font-medium hover:bg-indigo-700">
              Discover More Topics
            </a> */}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Trending Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
              <img className="w-full h-40 object-cover mb-4 rounded" src={ai} alt="Article 1" />
              <h3 className="text-xl font-semibold mb-2">The Future of AI: Trends and Predictions</h3>
              <p className="text-gray-700 mb-4">Explore the latest advancements in AI and what the future holds for this technology.</p>
              {/* <a href="/article/future-of-ai" className="text-indigo-600 hover:text-indigo-800 font-medium">Read More</a> */}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
              <img className="w-full h-40 object-cover mb-4 rounded" src={ed} alt="Article 2" />
              <h3 className="text-xl font-semibold mb-2">Modern Education: Techniques for Effective Learning</h3>
              <p className="text-gray-700 mb-4">Learn about innovative education techniques that are transforming the way we learn.</p>
              {/* <a href="/article/modern-education" className="text-indigo-600 hover:text-indigo-800 font-medium">Read More</a> */}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
              <img className="w-full h-40 object-cover mb-4 rounded" src={si} alt="Article 3" />
              <h3 className="text-xl font-semibold mb-2">Self-Growth Hacks: Achieve Your Personal Best</h3>
              <p className="text-gray-700 mb-4">Discover practical self-growth hacks to help you reach your personal and professional goals.</p>
              {/* <a href="/article/self-growth-hacks" className="text-indigo-600 hover:text-indigo-800 font-medium">Read More</a> */}
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-gray-700 mb-8">Sign up today and start sharing your stories with a wide audience.</p>
          {/* <a href="/signup" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md shadow-md font-medium hover:bg-indigo-700">
            Sign Up Now
          </a> */}
        </section>
      </main>

      <footer className="bg-white py-6 shadow-inner">
        <div className="max-w-7xl mx-auto text-center text-gray-700">
          <p>&copy; 2024 Insight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
