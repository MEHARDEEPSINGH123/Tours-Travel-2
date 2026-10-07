'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Plane,
  Briefcase,
  Hotel as HotelIcon,
  Sparkles,
  FileCheck2,
  Car,
  BookOpen,
  ShieldCheck,
  PhoneCall,
  Menu,
  X,
  ChevronRight,
  ShieldAlert,
  Star,
  CalendarCheck,
} from 'lucide-react';

interface NavCategory {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navCategories: NavCategory[] = [
  { id: 'packages', label: 'Tours & Packages', sublabel: '150+ Curated', icon: Briefcase },
  { id: 'hotels', label: 'Luxury Stays', sublabel: '5-Star Hotels', icon: HotelIcon },
  { id: 'experiences', label: 'Experiences', sublabel: 'Local Immersion', icon: Sparkles },
  { id: 'visas', label: 'Visa Services', sublabel: 'Fast-Track eVisa', icon: FileCheck2 },
  { id: 'transfers', label: 'Airport Transfers', sublabel: 'Changi VIP Fleet', icon: Car },
  { id: 'guides', label: 'Travel Guides', sublabel: 'Editorial Stories', icon: BookOpen },
  { id: 'policies', label: 'Policies', sublabel: '100% Refunds', icon: ShieldCheck },
];

export default function MainNavbar({
  onOpenBookingModal,
}: {
  onOpenBookingModal?: () => void;
}) {
  const [activeTab, setActiveTab] = useState('packages');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      // Active section detection
      const scrollPos = window.scrollY + 220;
      for (let i = navCategories.length - 1; i >= 0; i--) {
        const sec = document.getElementById(navCategories[i].id);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveTab(navCategories[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full z-50 transition-all duration-300">
      {/* 1. TOP UTILITY BAR ("Stuff above navbar" - MakeMyTrip style) */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 1, height: 'auto' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full bg-slate-950/95 text-slate-300 text-xs border-b border-slate-800/80 px-4 md:px-8 py-2 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
              {/* Left Credentials */}
              <div className="flex items-center gap-3 text-[11px] font-medium">
                <span className="flex items-center gap-1.5 text-white font-semibold">
                  <span className="text-sm">🇸🇬</span> Singapore Marketplace
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="hidden sm:inline text-slate-300">
                  STB License TA-038291-SIN
                </span>
                <span className="text-slate-600 hidden md:inline">•</span>
                <span className="hidden md:inline text-blue-400 font-medium">
                  Changi Airport Transit Partner
                </span>
              </div>

              {/* Right Utility Actions */}
              <div className="flex items-center gap-4 text-[11px]">
                <a
                  href="tel:+6568009888"
                  className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                  <span>24/7 Hotline: +65 6800 9888</span>
                </a>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 text-white font-semibold">
                  <span>SGD ($)</span>
                </div>

                <button
                  onClick={onOpenBookingModal}
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>My Bookings</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN 3D TACTILE STICKY NAVBAR */}
      <header
        className={`sticky top-0 sm:top-2 inset-x-0 z-50 px-3 md:px-6 transition-all duration-300 ${
          isScrolled ? 'pt-2' : 'pt-2'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto rounded-2xl md:rounded-3xl transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-2xl shadow-[0_20px_45px_-10px_rgba(15,23,42,0.18),0_0_0_1px_rgba(226,232,240,0.9)] p-2 md:p-2.5'
              : 'nav-3d-panel p-2.5 md:p-3.5 border border-slate-200/90'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Brand Logo & Monogram */}
            <a
              href="#explore"
              className="flex items-center gap-2.5 group cursor-pointer shrink-0 pl-1"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center text-white shadow-md shadow-slate-900/20 group-hover:scale-105 transition-transform duration-300 border border-slate-700/50">
                <Compass className="w-5 h-5 text-blue-400 animate-[spin_20s_linear_infinite]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-lg md:text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    TripNest
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-blue-600 text-white shadow-sm">
                    SG
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium tracking-tight hidden sm:inline leading-none">
                  Singapore Marketplace
                </span>
              </div>
            </a>

            {/* MakeMyTrip-Style 3D Category Tabs (Desktop) */}
            <nav className="hidden xl:flex items-center gap-1 p-1 rounded-2xl bg-slate-100/80 border border-slate-200/60 shadow-inner">
              {navCategories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => scrollToSection(cat.id)}
                    className={`nav-3d-pill flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer select-none transition-all ${
                      isActive
                        ? 'nav-3d-pill-active'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-white/90'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200/80 text-slate-600 group-hover:text-blue-600'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col text-left leading-none">
                      <span className="font-bold">{cat.label}</span>
                      <span
                        className={`text-[9px] font-normal mt-0.5 ${
                          isActive ? 'text-blue-100' : 'text-slate-400'
                        }`}
                      >
                        {cat.sublabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Medium Screen Category Bar */}
            <nav className="hidden md:flex xl:hidden items-center gap-1 p-1 rounded-2xl bg-slate-100/80 border border-slate-200/60">
              {navCategories.slice(0, 5).map((cat) => {
                const Icon = cat.icon;
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => scrollToSection(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Cluster: 3D Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenBookingModal}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Plan My Trip</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile 3D Categories Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-50 md:hidden p-5 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs text-slate-500">
                <span className="font-bold text-slate-900">MakeMyTrip Style Quick Categories</span>
                <span className="text-[11px] font-medium text-blue-600">
                  🇸🇬 STB Licensed TA-038291
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {navCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => scrollToSection(cat.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl text-xs font-semibold text-left transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                      <div className="leading-tight">
                        <div>{cat.label}</div>
                        <div
                          className={`text-[9px] ${
                            isActive ? 'text-blue-100' : 'text-slate-400'
                          }`}
                        >
                          {cat.sublabel}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href="tel:+6568009888"
                  className="flex items-center gap-1.5 font-bold text-slate-800"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                  <span>+65 6800 9888</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookingModal?.();
                  }}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Custom Trip Planner →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
