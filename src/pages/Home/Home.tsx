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

  if (!mounted) return null;

  return (
    <div
      className='bg-white'
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <LandingNav />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <main className='space-y-8'>
          <Hero />
          <About />
          <HowItWorks />
        </main>
        <div className='space-y-8'>
          <Cta />
          <Banner />
          <Pricing />
          <Services />
          <Features />
          <FAQ />
        </div>
      </div>
      <Footer />
    </div>
  );
}
