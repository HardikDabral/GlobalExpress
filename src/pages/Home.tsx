import { HeroSection } from '@/components/HeroSection';
import PopularDestination from '@/components/PopularDestination';
import OurServices from '@/components/OurServices';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Popular Destinations */}
      <PopularDestination />

      {/* Our Services */}
      <OurServices />

      {/* Testimonials */}
      <Testimonials />
    </>
  );
}