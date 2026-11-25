
import type { Metadata } from 'next';
import { GeistSans, GeistMono } from 'geist/font';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';
import { UsageProvider } from '@/context/UsageContext';
import AuthGatingOverlay from '@/components/auth/AuthGatingOverlay';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'BoohitōAI - Your Intelligent Partner',
  description: 'Explore the portfolio and navigate with AI assistance from BoohitōAI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <FirebaseClientProvider>
          <UsageProvider>
            {children}
            <AuthGatingOverlay />
            <Toaster />
          </UsageProvider>
        </FirebaseClientProvider>
        <Script 
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js" 
          strategy="lazyOnload" 
          type="module"
        />
      </body>
    </html>
  );
}
