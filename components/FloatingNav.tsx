'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Briefcase,
  Hotel as HotelIcon,
  Sparkles,
  BookOpen,
  FileCheck2,
  Headphones,
  Menu,
  X,
  PhoneCall,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'packages', label: 'Packages', icon: Briefcase },
  { id: 'hotels', label: 'Hotels', icon: HotelIcon },
  { id: 'experiences', label: 'Experiences', icon: Sparkles },
  { id: 'guides', label: 'Guides', icon: BookOpen },
  { id: 'visas', label: 'Visas', icon: FileCheck2 },
  { id: 'support', label: 'Support', icon: Headphones },
];

export default function FloatingNav({
  onOpenBookingModal,
}: {
  onOpenBookingModal?: () => void;
}) {
  const [activeSection, setActiveSection] = useState('explore');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if past hero threshold
      setIsScrolled(currentScrollY > 80);

      // Auto-hide when scrolling down fast, show when scrolling up
      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 8) {
          setIsVisible(false);
        } else if (lastScrollY - currentScrollY > 8) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);

      // Active section detection
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex items-center justify-between gap-2 md:gap-4 px-3.5 py-2.5 md:px-5 md:py-3 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'glass-nav bg-white/90 backdrop-blur-2xl shadow-xl shadow-slate-900/8 border border-slate-200/80'
              : 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-900/5 border border-white/60'
          } max-w-6xl w-full mx-auto`}
        >
          {/* Brand Identity */}
          <button
            onClick={() => scrollToSection('explore')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-slate-950 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-4.5 h-4.5 text-rose-500 animate-[spin_20s_linear_infinite]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-base md:text-lg tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors">
                  TripNest
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                  SG
                </span>
              </div>
              <span className="text-[10px] text-slate-700 font-medium hidden sm:inline leading-none">
                Singapore Marketplace
              </span>
            </div>
          </button>

          {/* Desktop Floating Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/80 border border-slate-200/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    isActive ? 'text-slate-950 font-semibold' : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBubble"
                      className="absolute inset-0 rounded-full bg-white shadow-sm border border-slate-200/60"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-rose-600' : 'text-slate-500'}`} />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/60 text-slate-700 text-xs font-semibold">
              <span>SGD ($)</span>
            </div>

            <button
              onClick={onOpenBookingModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 md:px-4 md:py-2 rounded-full bg-slate-950 hover:bg-rose-600 text-white text-xs font-semibold shadow-md shadow-slate-950/15 hover:shadow-rose-500/25 transition-all duration-300 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Plan My Trip</span>
              <span className="sm:hidden">Plan</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden p-5 rounded-3xl glass-nav bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs text-slate-500">
                <span className="font-medium">Direct Navigation</span>
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> STB Licensed TA-038291
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl text-xs font-medium text-left transition-all ${
                        isActive
                          ? 'bg-rose-50 text-rose-600 border border-rose-200/60 font-semibold'
                          : 'bg-slate-50/80 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
                <a
                  href="tel:+6568009888"
                  className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-rose-600"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                  <span>+65 6800 9888</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookingModal?.();
                  }}
                  className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline"
                >
                  <span>Custom Trip Planner</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
