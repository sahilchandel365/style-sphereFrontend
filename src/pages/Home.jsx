import React from 'react';
import Slide from './CarouselContent';
import Cards from './Cards';
import FAQ from './Faq';
import Services from './Services';
import HomeContent from './HomeContent';
const Home = () => {
  // ✅ Example: Check login status from localStorage
  const isLoggedIn = !!localStorage.getItem('token'); // or 'token'

  return (
    <div>
    <HomeContent/>
      <Slide/>
      {isLoggedIn && <Services />} {/* ✅ Only show when logged in */}
       <Cards />
      <FAQ />
    </div>
  );
};

export default Home;
