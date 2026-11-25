
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface UsageContextType {
  promptCount: number;
  incrementPrompts: () => void;
  hasLeftLanding: boolean;
  setHasLeftLanding: (val: boolean) => void;
  isGated: boolean;
}

const UsageContext = createContext<UsageContextType | undefined>(undefined);

export function UsageProvider({ children }: { children: React.ReactNode }) {
  const [promptCount, setPromptCount] = useState(0);
  const [hasLeftLanding, setHasLeftLanding] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user has left the landing page (root)
    if (pathname !== '/') {
      setHasLeftLanding(true);
    }
  }, [pathname]);

  const incrementPrompts = () => setPromptCount((prev) => prev + 1);

  // Gating rule: Left landing AND 3+ prompts submitted
  const isGated = hasLeftLanding && promptCount >= 3;

  return (
    <UsageContext.Provider value={{ promptCount, incrementPrompts, hasLeftLanding, setHasLeftLanding, isGated }}>
      {children}
    </UsageContext.Provider>
  );
}

export function useUsage() {
  const context = useContext(UsageContext);
  if (!context) throw new Error('useUsage must be used within UsageProvider');
  return context;
}
