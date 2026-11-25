import Link from 'next/link';
import { Home } from 'lucide-react';

const BoohitoAiTextLogo = () => {
  const svgViewBoxWidth = 160; 
  const svgViewBoxHeight = 28; 
  const fontSize = 22; 
  const yPosition = svgViewBoxHeight / 2;

  return (
    <svg
      className="h-7" // h-7 is 1.75rem (28px). Width will be scaled based on viewBox.
      viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BoohitōAI Logo" 
    >
      <style>
        {`
          .fukuroai-logo-text {
            font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
            font-weight: 800; /* Extra-Bold */
            font-size: ${fontSize}px;
            dominant-baseline: middle;
            text-anchor: left;
          }
        `}
      </style>
      <text className="fukuroai-logo-text" x="0" y={yPosition}>
        <tspan fill="hsl(var(--accent))">Boohitō</tspan>
        <tspan fill="#D498FF">AI</tspan>
      </text>
    </svg>
  );
};

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center" aria-label="BoohitōAI Home">
          <BoohitoAiTextLogo />
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors" aria-label="Home">
            <Home className="h-5 w-5" />
          </Link>
          <Link href="/portfolio" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Solutions
          </Link>
          <Link href="/bio" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Bio
          </Link>
        </nav>
      </div>
    </header>
  );
}
