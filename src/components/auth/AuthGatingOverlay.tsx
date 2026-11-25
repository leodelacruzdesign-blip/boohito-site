
'use client';

import React, { useEffect, useState } from 'react';
import { useUsage } from '@/context/UsageContext';
import { useUser, useFirestore, useAuth } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Lock } from 'lucide-react';
import { syncHubSpotUser } from '@/ai/flows/sync-hubspot-flow';
import { useRouter } from 'next/navigation';

interface AuthGatingOverlayProps {
  forcedOpen?: boolean;
}

export default function AuthGatingOverlay({ forcedOpen = false }: AuthGatingOverlayProps) {
  const { isGated, promptCount } = useUsage();
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const [isSyncing, setIsSyncing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user && db && user.email) {
      const userRef = doc(db, 'users', user.uid);
      
      setDoc(userRef, {
        email: user.email,
        usage_count: promptCount,
        last_updated: new Date().toISOString()
      }, { merge: true });

      setIsSyncing(true);
      syncHubSpotUser({ email: user.email, usageCount: promptCount })
        .then((res) => {
          if (res.success && res.hubspotId) {
            setDoc(userRef, { hubspot_id: res.hubspotId }, { merge: true });
          }
        })
        .finally(() => setIsSyncing(false));
    }
  }, [user, db, promptCount]);

  const handleSignIn = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Authentication intercept failed:', error);
    }
  };

  const handleClose = () => {
    router.push('/portfolio');
  };

  if (!isMounted || authLoading) return null;
  
  const shouldShow = forcedOpen || (isGated && !user);
  if (!shouldShow || user) return null;

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md bg-card border-accent/20 shadow-2xl">
        <DialogHeader className="items-center text-center">
          <div className="bg-accent/10 p-3 rounded-full mb-4">
            <Lock className="h-8 w-8 text-accent" />
          </div>
          <DialogTitle className="text-2xl font-bold text-white">Want a Deeper Look?</DialogTitle>
          <DialogDescription className="text-muted-foreground text-lg">
            Sign in with Google to unlock full strategic case studies and my complete bio.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button 
            onClick={handleSignIn} 
            className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-semibold shadow-lg shadow-accent/20"
          >
            Continue with Google
          </Button>

          <Button 
            variant="ghost" 
            onClick={handleClose}
            className="w-full text-muted-foreground hover:text-white"
          >
            Back to main portfolio
          </Button>

          <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
            Quick 1-click access • Free & secure
          </p>
        </div>
        {isSyncing && (
          <div className="flex items-center justify-center gap-2 text-sm text-accent animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            Synchronizing MCP Pipeline...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
