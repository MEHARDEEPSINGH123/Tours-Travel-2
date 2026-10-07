'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Compass,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  ChevronDown,
} from 'lucide-react';
import { Destination } from '@/types';

interface HeroSearchProps {
  destinations: Destination[];
  onSearch: (params: {
    destination: string;
    dates: string;
    travelers: number;
    budget: number;
    tripType: string;
  }) => void;
  onOpenBookingModal: () => void;
}

export default function HeroSearchSection({
  destinations,
  onSearch,
  onOpenBookingModal,
}: HeroSearchProps) {
  const [selectedDest, setSelectedDest] = useState('All');
  const [travelDates, setTravelDates] = useState('Nov 2026 – Dec 2026');
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState(3500);
  const [tripType, setTripType] = useState('Signature Luxury');

  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [datesDropdownOpen, setDatesDropdownOpen] = useState(false);
  const [travelersDropdownOpen, setTravelersDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const tripTypes = [
    'All Types',
    'Signature Luxury',
    'Family Escapes',
    'Active Discovery',
    'Cultural Immersion',
  ];

  const dateOptions = [
    'Oct 2026 (Autumn Discovery)',
    'Nov 2026 – Dec 2026 (Year-End Festive)',
    'Jan 2027 – Feb 2027 (Lunar New Year)',
    'Mar 2027 – Apr 2027 (Sakura Season)',
    'Flexible Dates (Next 6 Months)',
  ];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSearch({
      destination: selectedDest,
      dates: travelDates,
      travelers,
      budget,
      tripType,
    });
    // Smooth scroll to packages section
    const elem = document.getElementById('packages');
    if (elem) {
      const yOffset = -80;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const quickFilter = (destName: string) => {
    setSelectedDest(destName);
    onSearch({
      destination: destName,
      dates: travelDates,
      travelers,
      budget,
      tripType,
    });
    const elem = document.getElementById('packages');
    if (elem) {
      const yOffset = -80;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="explore"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-4 md:px-8 bg-slate-950 text-white overflow-hidden"
    >
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 scale-105 transform transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506351421178-63788970ee5b?auto=format&fit=crop&w=2000&q=85')",
          }}
        />
        {/* Editorial Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(225,29,72,0.2),rgba(255,255,255,0))]" />
      </div>

      {/* Top Floating Trust Badges */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 md:pt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
          <span className="font-medium text-white">Singapore Tourism Board Licensed TA-038291</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden sm:flex items-center gap-4 text-xs"
        >
          <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            4.96 / 5 Singapore Rating
          </span>
          <span className="text-slate-500">•</span>
          <span className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
            100% Handcrafted Itineraries
          </span>
        </motion.div>
      </div>

      {/* Main Hero Typography & Call-To-Action */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-10 md:py-16 text-center lg:text-left">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-semibold tracking-wider uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              The Sovereign Travel Standard
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.05]"
            >
              YOUR NEXT JOURNEY <br />
              <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                STARTS HERE
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl md:text-2xl text-slate-300 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0"
            >
              Discover curated travel experiences across Asia and beyond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#packages"
                className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm md:text-base shadow-lg shadow-rose-600/30 hover:shadow-rose-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenBookingModal}
                className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm md:text-base backdrop-blur-md border border-white/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Plan My Trip</span>
              </button>
            </motion.div>
          </div>

          {/* Quick Stats Highlight Card */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                  Singapore Marketplace
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live Status
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-heading font-bold text-3xl text-white">150+</div>
                  <div className="text-xs text-slate-400">Vetted Tour Packages</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-3xl text-white">120+</div>
                  <div className="text-xs text-slate-400">5-Star Luxury Hotels</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-3xl text-white">50+</div>
                  <div className="text-xs text-slate-400">Fast Visa Services</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-3xl text-amber-300">24/7</div>
                  <div className="text-xs text-slate-400">WhatsApp Concierge</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SECTION 1: SMART SEARCH EXPERIENCE DOCK */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-20 max-w-7xl mx-auto w-full"
      >
        <div className="p-4 md:p-6 rounded-3xl md:rounded-3xl bg-white text-slate-900 shadow-2xl shadow-slate-950/40 border border-slate-100">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 items-center">
              {/* Field 1: Destination */}
              <div className="relative">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Destination
                </label>
                <div
                  onClick={() => setDestDropdownOpen(!destDropdownOpen)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="font-semibold text-sm text-slate-900 truncate">
                      {selectedDest === 'All' ? 'Any Destination' : selectedDest}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                {destDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 max-h-60 overflow-y-auto rounded-2xl bg-white border border-slate-200 shadow-xl z-50 p-2 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDest('All');
                        setDestDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-100 font-medium text-slate-700"
                    >
                      All Destinations
                    </button>
                    {destinations.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => {
                          setSelectedDest(d.name);
                          setDestDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-rose-50 hover:text-rose-600 font-medium text-slate-800 flex items-center justify-between"
                      >
                        <span>{d.name}</span>
                        <span className="text-[10px] text-slate-400">from SGD {d.startingPriceSGD}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Field 2: Travel Dates */}
              <div className="relative">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Travel Dates
                </label>
                <div
                  onClick={() => setDatesDropdownOpen(!datesDropdownOpen)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Calendar className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="font-semibold text-sm text-slate-900 truncate">
                      {travelDates}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                {datesDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 p-2 space-y-1">
                    {dateOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setTravelDates(opt);
                          setDatesDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-rose-50 hover:text-rose-600 font-medium text-slate-800"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Field 3: Travelers */}
              <div className="relative">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Travelers
                </label>
                <div
                  onClick={() => setTravelersDropdownOpen(!travelersDropdownOpen)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Users className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="font-semibold text-sm text-slate-900 truncate">
                      {travelers === 1 ? '1 Solo Traveler' : `${travelers} Travelers`}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                {travelersDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-52 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 p-3 space-y-2">
                    {[1, 2, 4, 6, 8].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setTravelers(num);
                          setTravelersDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded-xl font-medium transition-colors ${
                          travelers === num
                            ? 'bg-rose-600 text-white font-semibold'
                            : 'hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        {num === 1
                          ? '1 Solo Traveler'
                          : num === 2
                          ? '2 Couple / Duo'
                          : num === 4
                          ? '4 Family (2A + 2C)'
                          : `${num} Group Travelers`}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Field 4: Budget Range */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Max Budget (SGD)
                  </label>
                  <span className="text-xs font-bold text-rose-600">
                    ${budget.toLocaleString()}
                  </span>
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-rose-600 shrink-0" />
                  <input
                    type="range"
                    min="1000"
                    max="5000"
                    step="250"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Field 5: Trip Type & Search Button */}
              <div className="flex flex-col gap-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Trip Type
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <button
                      type="button"
                      onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 cursor-pointer text-left"
                    >
                      <span className="font-semibold text-xs text-slate-900 truncate">
                        {tripType}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {typeDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 p-2 space-y-1">
                        {tripTypes.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              setTripType(t);
                              setTypeDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-rose-50 hover:text-rose-600 font-medium text-slate-800"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center p-3 md:px-5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-md shadow-rose-600/30 active:scale-95 transition-all cursor-pointer"
                    title="Search curated marketplace"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Filter Chips */}
            <div className="flex items-center gap-2 pt-2 overflow-x-auto text-xs pb-1 scrollbar-none">
              <span className="text-slate-400 font-medium shrink-0">Popular:</span>
              {['Tokyo', 'Bali', 'Singapore', 'Maldives', 'Paris', 'Zurich', 'Seoul'].map(
                (city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => quickFilter(city)}
                    className="px-3 py-1 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-medium transition-colors shrink-0 cursor-pointer"
                  >
                    {city}
                  </button>
                )
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
