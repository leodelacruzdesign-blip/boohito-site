
'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-border/40 py-8 bg-black/30">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear || ''} BoohitōAI. All rights reserved.</p>
      </div>
    </footer>
  );
}
