import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CaseStudyCardProps {
  item: {
    id: string;
    ungated_teaser: {
      title: string;
      industry: string;
      fukuro_key_metric_teaser: {
        metric: string;
        label: string;
      }
    };
    gated_content_data: {
      design_assets: {
        case_study_hero_image: string;
      }
    }
  };
}

export default function CaseStudyCard({ item }: CaseStudyCardProps) {
  const imageUrl = item.gated_content_data.design_assets.case_study_hero_image;
  const imageHint = 'community health';

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 rounded-lg border-border/70 group">
      <CardHeader className="p-0 relative">
        <div className="aspect-video w-full">
          <Image
            src={imageUrl}
            alt={item.ungated_teaser.title}
            fill
            className="object-cover rounded-t-lg"
            data-ai-hint={imageHint}
          />
        </div>
        <Badge variant="secondary" className="absolute top-3 right-3 flex items-center text-xs">
          {item.ungated_teaser.industry}
        </Badge>
         <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent" />
      </CardHeader>
      <CardContent className="flex-grow p-6 z-10">
        <CardTitle className="text-xl font-semibold mb-3 leading-tight text-foreground">{item.ungated_teaser.title}</CardTitle>
        <div className="flex items-end text-primary">
            <span className="text-5xl font-bold tracking-tighter">{item.ungated_teaser.fukuro_key_metric_teaser.metric}</span>
            <p className="text-sm font-medium ml-2 mb-1 w-24 leading-tight">{item.ungated_teaser.fukuro_key_metric_teaser.label}</p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 z-10 mt-auto">
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-transform group-hover:scale-105">
          <Link href={`/portfolio/${item.id}`}>
            Unlock Full Strategic Blueprint
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
