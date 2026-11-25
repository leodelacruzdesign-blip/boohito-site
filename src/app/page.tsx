
"use client";

import dynamic from 'next/dynamic';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Skeleton } from '@/components/ui/skeleton';

const HeroAiSection = dynamic(() => import('@/components/mascot/hero-ai-section'), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto px-4 max-w-6xl">
       <Skeleton className="h-[450px] w-full" />
    </div>
  ),
});


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        {/* Combined Hero and AI Navigation Section */}
        <section id="hero-ai-section" className="relative isolate py-12 md:py-16 lg:py-20 overflow-hidden">
          {/* Background Gradient */}
          <div 
            aria-hidden="true" 
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/30 to-transparent -z-10"
          ></div>

          <div className="container mx-auto px-4 max-w-6xl">
            <HeroAiSection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
