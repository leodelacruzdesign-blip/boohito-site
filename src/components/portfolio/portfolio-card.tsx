'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CaseUpper, Zap, Video, Presentation as PresentationIcon, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  type: 'Case Study' | 'Project' | 'Video' | 'Presentation' | 'E-Learning Module: Strategic Design';
  tags: string[];
  link: string;
}

interface PortfolioCardProps {
  item: PortfolioItem;
}

const typeIconMap = {
  'Case Study': <CaseUpper className="mr-2 h-4 w-4" />,
  'Project': <Zap className="mr-2 h-4 w-4" />,
  'Video': <Video className="mr-2 h-4 w-4" />,
  'Presentation': <PresentationIcon className="mr-2 h-4 w-4" />,
  'E-Learning Module: Strategic Design': <BookOpen className="mr-2 h-4 w-4" />,
};

export default function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border-border/70 group">
      <CardHeader className="p-0 relative">
        <div className="aspect-video w-full bg-black">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            style={{ objectFit: 'contain' }}
            data-ai-hint={item.imageHint}
            className="rounded-t-lg"
          />
        </div>
         <Badge variant="default" className="absolute top-3 right-3 bg-primary/90 text-primary-foreground flex items-center">
          {typeIconMap[item.type]}
          {item.type}
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="text-xl font-semibold mb-2 leading-tight text-primary">{item.title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 h-[3.75rem]">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-transform group-hover:scale-105">
          <Link href={item.link} aria-label={`View ${item.title}`}>
            View {item.type.includes('Case Study') || item.type.includes('Project') ? 'Detail' : 'Module'} 
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
