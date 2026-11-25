import PortfolioCard, { type PortfolioItem } from './portfolio-card';
import { Layers } from 'lucide-react';
import caresFoodAccessData from '@/data/portfolio/cares-food-access.json';
import CaseStudyCard from './case-study-card';

const portfolioItems: PortfolioItem[] = [
  {
    id: '7',
    title: 'Throw Caster®',
    description: 'A minimalist 3D showcase for professional slip-casting mold systems. This project leverages harmonic contrast and ultra-gloss material shaders to demonstrate the evolution of a digital "seed" into a finished, physical product.',
    imageUrl: '/images/TC_Labs.jpg',
    imageHint: '3D mold system',
    type: 'Project',
    tags: ['3D', 'Slip-casting', 'Shaders', 'Design'],
    link: 'https://studio--studio-71031585-aa88e.us-central1.hosted.app',
  },
  {
    id: '4',
    title: 'The Future of AI in Web Design',
    description: 'Presentation slides from a recent tech conference discussing upcoming AI trends in web development and user interface design.',
    imageUrl: '/images/future_ai.JPEG',
    imageHint: 'presentation slide',
    type: 'Presentation',
    tags: ['AI', 'Web Design', 'Future Tech'],
    link: '/portfolio/ai-in-web-design',
  },
  {
    id: '1',
    title: 'AI-Powered Customer Service Bot',
    description: 'A comprehensive case study on developing an AI bot that improved customer satisfaction by 30% and reduced response times significantly.',
    imageUrl: '/images/chat_bot.jpeg',
    imageHint: 'AI bot interface',
    type: 'Case Study',
    tags: ['AI', 'NLP', 'Customer Service'],
    link: '/portfolio/ai-customer-service-bot',
  },
];

export default function PortfolioSection() {
  return (
    <div className="w-full">
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center justify-center bg-primary/10 text-primary p-3 rounded-full mb-4">
            <Layers className="h-8 w-8" />
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Our Creations
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          Discover our innovative projects, insightful case studies, engaging videos, and informative presentations that showcase our expertise.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        <CaseStudyCard item={caresFoodAccessData as any} />
        {portfolioItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
