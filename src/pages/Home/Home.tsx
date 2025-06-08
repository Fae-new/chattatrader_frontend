import { useState, useEffect } from 'react';
import LandingNav from '../../reuseables/LandingNav';
import { Hero } from '../../reuseables/hero';
import { About } from '../../reuseables/About';
import { HowItWorks } from '../../reuseables/HowItWorks';
import { Cta } from '../../reuseables/Cta';
import Banner from '../../reuseables/Banner';
import { Pricing } from '../../reuseables/Pricing';
import { Services } from '../../reuseables/Services';
import { Features } from '../../reuseables/Features';
import { FAQ } from '../../reuseables/FAQ';
import Footer from '../../reuseables/Footer';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent SSR mismatch

  return (
    <div className='min-h-screen bg-[#060b1a]'>
      <LandingNav />
      <div className='md:pr-[50px] md:pl-[50px]'>
        <Hero />
        <About />
        <HowItWorks />
      </div>
      <Cta />
      <Banner />
      <div className='md:pr-[50px] md:pl-[50px]'>
        <Pricing />
        <Services />
        <Features />
      </div>
      <FAQ />
      <Footer />
    </div>
  );
}
