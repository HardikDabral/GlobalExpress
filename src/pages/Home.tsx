import { Suspense, lazy } from 'react';
import { HeroSection } from '@/components/HeroSection';

// Lazy load components for better performance
const PopularDestination = lazy(() => import('@/components/PopularDestination'));
const OurServices = lazy(() => import('@/components/OurServices'));
const Testimonials = lazy(() => import('@/components/Testimonials'));

// Loading component
const ComponentLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest"></div>
  </div>
);

export default function Home() {
  return (
    <>
      {/* Hero Section - Load immediately */}
      <HeroSection />

      {/* Lazy loaded components with Suspense */}
      <Suspense fallback={<ComponentLoader />}>
        <PopularDestination />
      </Suspense>

      <Suspense fallback={<ComponentLoader />}>
        <OurServices />
      </Suspense>

      <Suspense fallback={<ComponentLoader />}>
        <Testimonials />
      </Suspense>
    </>
  );
}