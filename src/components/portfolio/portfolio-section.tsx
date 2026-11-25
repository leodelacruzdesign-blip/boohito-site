import PortfolioCard, { type PortfolioItem } from './portfolio-card';
import CaseStudyCard from './case-study-card';
import caresFoodAccessData from '@/data/portfolio/cares-food-access.json';

const portfolioItems: Record<string, PortfolioItem> = {
  futureAi: {
    id: '4',
    title: 'Future of AI in Web Design',
    description: 'Interactive simulation demonstrating Instructional Design mastery. Built using adult learning principles, this AI-narrated course explores Generative UI, 1:1 personalization, and ethical governance.',
    imageUrl: '/images/future_ai.JPEG',
    imageHint: 'e-learning interface',
    type: 'E-Learning Module: Strategic Design',
    tags: ['E-Learning', 'Instructional Design', 'AI Strategy'],
    link: '/portfolio/ai-in-web-design',
  },
  throwCaster: {
    id: '7',
    title: 'Throw Caster®',
    description: 'A minimalist 3D showcase for professional slip-casting mold systems. This project leverages harmonic contrast and ultra-gloss material shaders to demonstrate the evolution of a digital "seed" into a finished, physical product.',
    imageUrl: '/images/TC_Labs.jpg',
    imageHint: '3D mold system',
    type: 'Project',
    tags: ['3D', 'Slip-casting', 'Shaders', 'Design'],
    link: 'https://studio--studio-71031585-aa88e.us-central1.hosted.app',
  },
  cares: {
    id: 'cares-food-access',
    title: 'CARES Platform',
    description: 'Public health social impact project connecting communities with healthy food sources through AI-augmented user discovery and accessible architecture.',
    imageUrl: '/images/cares-banner.png',
    imageHint: 'community health',
    type: 'Case Study',
    tags: ['Public Health', 'Social Impact', 'Accessibility'],
    link: '/portfolio/cares-food-access',
  },
  aiBot: {
    id: '1',
    title: 'AI-Powered Customer Service Bot',
    description: 'A comprehensive case study on developing an AI bot that improved customer satisfaction by 30% and reduced response times significantly using n8n orchestration.',
    imageUrl: '/images/chat_bot.jpeg',
    imageHint: 'AI bot interface',
    type: 'Case Study',
    tags: ['AI', 'NLP', 'Customer Service'],
    link: '/portfolio/ai-customer-service-bot',
  },
  elearningArchitecture: {
    id: 'elearning-architecture',
    title: 'Enterprise Learning Architecture',
    description: 'A high-fidelity 5-Pillar UX framework featuring interactive production stacks, IA tree exploration, and real-time LMS/SCORM telemetry simulation.',
    imageUrl: '/images/Elearnign_img2.jpeg',
    imageHint: 'instructional architecture',
    type: 'Project',
    tags: ['LXD Architecture', 'SCORM', 'Workforce Training'],
    link: '/portfolio/elearning-architecture',
  },
  uxMasterclass: {
    id: 'ux-masterclass',
    title: 'Interactive UX Design Masterclass',
    description: 'An architectural learning engine covering foundations, psychology, and creative workflows. Features interactive labs for journey mapping, Hick\'s Law, and mobile wireframe validation.',
    imageUrl: '/images/wallpaperflare.com_wallpaper (4).jpg',
    imageHint: 'design thinking',
    type: 'E-Learning Module: Strategic Design',
    tags: ['UX Design', 'Psychology', 'Prototyping'],
    link: '/portfolio/ux-masterclass',
  },
};

export default function PortfolioSection() {
  return (
    <div className="w-full">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Featured Blueprints
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          Explore strategic solutions across Instructional Design, AI Automation, and High-Fidelity 3D Strategy.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-12 max-w-5xl mx-auto">
        {/* 1. E-Learning Module */}
        <PortfolioCard item={portfolioItems.futureAi} />
        
        {/* 2. Project (Throw Caster) */}
        <PortfolioCard item={portfolioItems.throwCaster} />
        
        {/* 3. Public Health (Cares) */}
        <CaseStudyCard item={caresFoodAccessData as any} />
        
        {/* 4. Case Study AI Bot */}
        <PortfolioCard item={portfolioItems.aiBot} />

        {/* 5. Enterprise eLearning Architecture (Strategic Bridge) */}
        <PortfolioCard item={portfolioItems.elearningArchitecture} />

        {/* 6. UX Masterclass (Capstone) */}
        <PortfolioCard item={portfolioItems.uxMasterclass} />
      </div>
    </div>
  );
}
