import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PortfolioSection from '@/components/portfolio/portfolio-section';

export const metadata: Metadata = {
  title: 'Portfolio - BoohitōAI',
  description: 'Explore the projects, case studies, videos, and presentations by BoohitōAI.',
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <section id="portfolio-content" className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <PortfolioSection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
