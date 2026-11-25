

'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HomeScreenLayout from '@/components/prototype-screens/HomeScreenLayout';
import { Home, Map, Users, User, Settings, Search, Tractor, Utensils, Award, Heart, BookOpen, GraduationCap, Leaf, School } from 'lucide-react';

// Define colors based on Image 1 (Cares Logo) and Image 3 (Palette)
const CARES_COLORS = {
  brown: '#8D5F2D',
  red: '#D62929',
  orange: '#FF8C00',
  green: '#4CAF50',
  primaryBlack: '#000000',
  secondaryWhite: '#FFFFFF',
  tertiaryLightGrey: '#E0E0E0',
  tertiaryLighterGrey: '#F0F0F0'
};


// Assuming you have an Icon component or use a library like lucide-react, react-icons
// For demo purposes, we'll use inline text or simple SVG placeholders for icons.
const Icon = ({ name, className = '' }: { name: string; className?: string }) => {
    // In a real app, you'd have a switch statement or map to render actual SVG icons
    switch (name) {
        case 'home': return <svg className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11v10a1 1 0 001 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h.01"></path></svg>;
        case 'menu': return <svg className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>;
        case 'search': return <svg className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>;
        case 'map': return <svg className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-.553-.894L15 2m-6 5l6-3m0 0l6 3m-6-3v10"></path></svg>;
        case 'group': return <svg className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>;
        case 'user': return <svg className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>;
        case 'settings': return <svg className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.103.064.21.117.32.16z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
        case 'home_icon': return <svg className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11v10a1 1 0 001 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h.01"></path></svg>;
        default: return <span className={className}>[{name}]</span>;
    }
};

const BottomNavBar = () => (
    <div className="flex items-center justify-around p-3 border-t w-full" style={{ borderColor: CARES_COLORS.tertiaryLightGrey }}>
        <Button variant="ghost" size="icon" className="h-auto w-auto p-1 text-gray-700 hover:bg-gray-100 flex flex-col items-center justify-center">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-auto w-auto p-1 text-gray-700 hover:bg-gray-100 flex flex-col items-center justify-center">
            <Map className="h-5 w-5" />
            <span className="text-xs mt-1">Map</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-auto w-auto p-1 text-gray-700 hover:bg-gray-100 flex flex-col items-center justify-center">
            <Users className="h-5 w-5" />
            <span className="text-xs mt-1">Community</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-auto w-auto p-1 text-gray-700 hover:bg-gray-100 flex flex-col items-center justify-center">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-auto w-auto p-1 text-gray-700 hover:bg-gray-100 flex flex-col items-center justify-center">
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">Settings</span>
        </Button>
    </div>
);

const PrototypeScreen = ({ screenData }: { screenData: any }) => {
  const renderContent = () => {
    if (!screenData) {
      return <p>Loading screen...</p>;
    }

    if (screenData.content_type === 'component') {
      switch (screenData.component_details.component) {
        case 'HomeScreenLayout':
          return <HomeScreenLayout headerImage={screenData.component_details.header_image} />;
        case 'MapSimulation':
          return (
            <div className="w-full h-full flex flex-col bg-gray-200">
              <div className="flex-grow relative">
                {/* Mock Map View */}
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                  <p className="text-gray-500 text-lg font-semibold">[Mock Map Area]</p>
                </div>

                {/* F-Shape Content Overlay */}
                <div className="absolute top-0 left-0 p-4 bg-gradient-to-b from-black/50 to-transparent w-full">
                  <div className="max-w-md">
                    <h3 className="text-xl font-bold text-white mb-2 shadow-sm">
                      {screenData.component_details.title}
                    </h3>
                    <p className="text-sm text-white/90 shadow-sm">
                      {screenData.component_details.text}
                    </p>
                  </div>
                </div>

                {/* Minimized Button */}
                <div className="absolute bottom-4 right-4">
                  <Button 
                      className="rounded-full h-12 w-12 p-0 shadow-lg" 
                      style={{ backgroundColor: CARES_COLORS.primaryBlack, color: CARES_COLORS.secondaryWhite }}
                  >
                      <Search className="h-5 w-5" />
                      <span className="sr-only">Search Nearby</span>
                  </Button>
                </div>
              </div>
              <BottomNavBar />
            </div>
          );
        case 'DashboardView':
           const dashboardItems = [
            { icon: Tractor, text: "Gardens" },
            { icon: Utensils, text: "Meals" },
            { icon: Award, text: "Challenges" },
            { icon: Heart, text: "Donations" },
            { icon: BookOpen, text: "Recipes" },
            { icon: GraduationCap, text: "Nutrition" },
            { icon: Leaf, text: "Plant a Tree" },
            { icon: School, text: "Classes" },
          ];
          return (
            <div className="w-full h-full flex flex-col bg-blue-50">
               <div className="flex-grow flex flex-col p-4">
                 <div className="max-w-md">
                    <h3 className="text-xl font-bold mb-2" style={{ color: CARES_COLORS.red }}>
                      {screenData.component_details.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-6">
                      {screenData.component_details.text}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      {dashboardItems.map((item, index) => (
                        <div key={index} className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                          <item.icon className="h-6 w-6 mr-3" style={{color: CARES_COLORS.green}}/>
                          <span className="text-sm text-gray-800 font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
              </div>
              <BottomNavBar />
            </div>
          );
        default:
          return <p>Unknown component: {screenData.component_details.component}</p>;
      }
    }

    if (screenData.content_type === 'text') {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
                <h2 className="text-2xl font-bold mb-4" style={{ color: CARES_COLORS.red }}>
                  {screenData.title}
                </h2>
                <p className="text-base text-gray-700">
                  {screenData.text}
                </p>
            </div>
        )
    }
    
    return <p>Unsupported content type</p>;
  }

  return (
    <div 
      className="relative h-[32rem] flex flex-col items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden"
      style={{
        fontFamily: 'Roboto, sans-serif',
        color: CARES_COLORS.primaryBlack
      }}
    >
      {renderContent()}
    </div>
  );
};

export default PrototypeScreen;

    

    
