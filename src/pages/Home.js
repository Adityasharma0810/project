import React from 'react';
import Hero from '../components/Hero';
// import About from '../components/About'; // Removed to avoid About content on Home page
import Services from '../components/Services';
import Contact from '../components/Contact';
import LatestUpdates from '../components/LatestUpdates';
import FeaturedEvents from '../components/FeaturedEvents';
import JoinUs from '../components/JoinUs';

function Home() {
  return (
    <>
      <Hero />
      <main>
        {/* <About /> Removed to avoid About content on Home page */}
        <LatestUpdates />
        <FeaturedEvents />
        <JoinUs />
        <Services />
        <Contact />
      </main>
    </>
  );
}

export default Home;
