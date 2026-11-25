
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Home, Menu, Settings, Search, ChevronRight, Leaf, Users, GraduationCap, Heart, Hand, Recycle, BookOpen, Utensils, Tractor, Map, User } from 'lucide-react';

const CARES_COLORS = {
  brown: '#8D5F2D',
  red: '#D62929',
  orange: '#FF8C00',
  green: '#4CAF50',
  primaryBlack: '#000000',
  secondaryWhite: '#FFFFFF',
  tertiaryLightGrey: '#E0E0E0',
  tertiaryLighterGrey: '#F0F0F0',
  darkGreyText: '#333333'
};

const directoryStructure = [
    {
        category: 'Discover Healthy Food Sources',
        icon: Leaf,
        items: [
            { name: 'Community Gardens', icon: Tractor },
            { name: "Farmers' Markets", icon: Utensils },
            { name: 'Local Pantries', icon: Home }
        ],
    },
    {
        category: 'Community Engagement',
        icon: Users,
        items: [
            { name: 'Donations', icon: Heart },
            { name: 'Volunteer', icon: Hand },
            { name: 'Food Rescue', icon: Recycle },
        ],
    },
    {
        category: 'Learn and Grow',
        icon: GraduationCap,
        items: [
            { name: 'Nutrition Education', icon: BookOpen },
            { name: 'Recipe Club', icon: Utensils },
            { name: 'Farm to Community', icon: Tractor },
        ],
    },
];

const settingsStructure = {
    category: 'Profile Settings',
    items: ['Personal Info', 'Dietary Settings', 'Notifications', 'Language', 'Privacy & Security'],
};


const DirectoryMenu = ({ isSearch = false }: { isSearch?: boolean }) => (
    <div className={`p-4 rounded-md shadow-lg bg-white border border-gray-200 ${isSearch ? 'w-full' : 'w-64'}`}>
        <ul className="space-y-4">
            {directoryStructure.map((cat) => (
                <li key={cat.category}>
                    <div className="flex items-center text-sm font-semibold text-gray-500 mb-2">
                        <cat.icon className="h-4 w-4 mr-2" style={{ color: CARES_COLORS.green }} />
                        {cat.category}
                    </div>
                    <ul className="space-y-1 pl-6">
                        {cat.items.map((item) => (
                            <li key={item.name}>
                                <a href="#" className="flex items-center text-sm text-gray-700 hover:text-green-600 transition-colors">
                                    <item.icon className="h-4 w-4 mr-2 text-gray-400" />
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    </div>
);

const SettingsMenu = () => (
     <div className="p-4 rounded-md shadow-lg bg-white border border-gray-200 w-64">
        <div className="flex items-center text-sm font-semibold text-gray-500 mb-2">
            <Settings className="h-4 w-4 mr-2" style={{ color: CARES_COLORS.orange }} />
            {settingsStructure.category}
        </div>
        <ul className="space-y-1 pl-6">
            {settingsStructure.items.map((item) => (
                <li key={item}>
                    <a href="#" className="flex items-center text-sm text-gray-700 hover:text-orange-600 transition-colors">
                        <ChevronRight className="h-3 w-3 mr-2 text-gray-400" />
                        {item}
                    </a>
                </li>
            ))}
        </ul>
    </div>
)

type BottomNavBarProps = {
    onNavigate: (screenId: string) => void;
};

const BottomNavBar = ({ onNavigate }: BottomNavBarProps) => (
    <div className="flex items-center justify-around p-3 border-t w-full" style={{ borderColor: CARES_COLORS.tertiaryLightGrey }}>
        <Button variant="ghost" size="icon" className="h-auto w-auto p-1 text-gray-700 hover:bg-gray-100 flex flex-col items-center justify-center" onClick={() => onNavigate('home')}>
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-auto w-auto p-1 text-gray-700 hover:bg-gray-100 flex flex-col items-center justify-center" onClick={() => onNavigate('map_view')}>
            <Map className="h-5 w-5" />
            <span className="text-xs mt-1">Map</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-auto w-auto p-1 text-gray-700 hover:bg-gray-100 flex flex-col items-center justify-center" onClick={() => onNavigate('dashboard')}>
            <Users className="h-5 w-5" />
            <span className="text-xs mt-1">Community</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-auto w-auto p-1 text-gray-700 hover:bg-gray-100 flex flex-col items-center justify-center" onClick={() => onNavigate('dashboard')}>
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-auto w-auto p-1 text-gray-700 hover:bg-gray-100 flex flex-col items-center justify-center" onClick={() => onNavigate('dashboard')}>
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">Settings</span>
        </Button>
    </div>
);


interface HomeScreenLayoutProps {
  headerImage: string;
  onNavigate: (screenId: string) => void;
}

const HomeScreenLayout: React.FC<HomeScreenLayoutProps> = ({ headerImage, onNavigate }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = () => {
    onNavigate('map_view');
  };

  return (
    <div 
      className="relative w-full h-full flex flex-col overflow-hidden bg-white"
      style={{
        fontFamily: 'Roboto, sans-serif',
        color: CARES_COLORS.darkGreyText
      }}
    >
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: CARES_COLORS.tertiaryLightGrey }}>
        <div className="flex items-center space-x-3">
          {/* Directory Icon */}
           <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-700 hover:bg-gray-100">
                    <Menu />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <DirectoryMenu />
            </PopoverContent>
          </Popover>

          {/* Home Icon */}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-700 hover:bg-gray-100" onClick={() => onNavigate('home')}>
            <Home />
          </Button>

          {/* Settings Icon */}
          <Popover>
            <PopoverTrigger asChild>
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-700 hover:bg-gray-100">
                    <Settings />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <SettingsMenu />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        {/* Container for logo and search bar */}
        <div className="w-full max-w-md flex flex-col items-center gap-px">
            {/* Feature Image */}
            <div className="relative w-full h-[180px] overflow-hidden flex justify-center items-center">
                <Image
                    src="/images/cares-full-logo.png"
                    alt="Cares Healthy Food Access Platform Logo"
                    width={800}
                    height={400}
                    className="object-contain -mt-8"
                    data-ai-hint="company logo"
                    priority
                />
            </div>

            {/* Search Bar Directory */}
            <div className="w-full">
                <Popover open={isSearchFocused} onOpenChange={setIsSearchFocused}>
                    <PopoverTrigger asChild className="w-full">
                         <div className="relative flex items-center">
                            <Input 
                                type="text" 
                                placeholder="Ask me to find something..." 
                                className="w-full pl-4 pr-12 py-2 rounded-md h-12 text-base bg-white text-black placeholder:text-gray-500 border-2 border-gray-300 focus:border-gray-400 focus:ring-gray-400" 
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <Button type="button" size="icon" className="absolute right-2 h-9 w-9 bg-gray-200 hover:bg-gray-300" onClick={handleSearch}>
                                <Search className="h-5 w-5" />
                                <span className="sr-only">Search</span>
                            </Button>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                        <DirectoryMenu isSearch={true} />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
      </div>
      <BottomNavBar onNavigate={onNavigate} />
    </div>
  );
};

export default HomeScreenLayout;
