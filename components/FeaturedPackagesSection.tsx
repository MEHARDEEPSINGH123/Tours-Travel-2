'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Sparkles,
  CheckCircle2,
  Shield,
  Star,
  ArrowRight,
  Filter,
  Calendar,
  X,
  ChevronDown,
  Navigation,
  MapPin,
  Utensils,
  Camera,
  Check,
} from 'lucide-react';
import { TourPackage, ItineraryDay } from '@/types';

interface FeaturedPackagesProps {
  packages: TourPackage[];
  selectedDestFilter: string;
  onSelectDestFilter: (dest: string) => void;
  onOpenBookingModal: (pkg: TourPackage) => void;
}

export default function FeaturedPackagesSection({
  packages,
  selectedDestFilter,
  onSelectDestFilter,
  onOpenBookingModal,
}: FeaturedPackagesProps) {
  const [selectedBadge, setSelectedBadge] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'rating'>('featured');
  const [activeItineraryPackage, setActiveItineraryPackage] = useState<TourPackage | null>(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // Filter criteria
  const badges = ['All', 'Signature Luxury', 'Family Escapes', 'Active Discovery', 'Cultural Immersion'];
  const durations = ['All', '4 Days', '5 Days', '6 Days', '7 Days', '8 Days', '9 Days'];

  // Filter packages
  const filtered = packages.filter((pkg) => {
    if (selectedDestFilter !== 'All' && pkg.destinationName !== selectedDestFilter) {
      return false;
    }
    if (selectedBadge !== 'All' && pkg.badge !== selectedBadge) {
      return false;
    }
    if (selectedDuration !== 'All' && pkg.duration !== selectedDuration) {
      return false;
    }
    return true;
  });

  // Sort packages
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.priceSGD - b.priceSGD;
    if (sortBy === 'priceDesc') return b.priceSGD - a.priceSGD;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <section id="packages" className="py-24 px-4 md:px-8 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-100">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              Section 03 & 04 • Curated Tour Packages
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
              Bespoke Packages & <br />
              <span className="text-rose-600">Interactive Itineraries</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl font-light">
              Full-service holiday packages backed by Singapore Airlines or tier-1 carriers, private chauffeur mobility, and handpicked boutique properties.
            </p>
          </div>

          {/* Quick Package Stats */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
              <span className="font-semibold text-slate-800">{sorted.length} Available Packages</span>
            </div>
            <div className="hidden sm:block text-slate-400">Fixed SGD Pricing • GST Inclusive</div>
          </div>
        </div>

        {/* Smooth Filtering Controls System */}
        <div className="p-4 md:p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500 tracking-wider">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filter & Refine Packages</span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 shadow-sm cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="rating">Top Rated (4.9+)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Filter 1: Destination */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1.5">
                Destination Filter
              </label>
              <select
                value={selectedDestFilter}
                onChange={(e) => onSelectDestFilter(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 shadow-sm"
              >
                <option value="All">All Destinations (Worldwide)</option>
                {Array.from(new Set(packages.map((p) => p.destinationName))).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 2: Package Theme */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1.5">
                Travel Style / Theme
              </label>
              <select
                value={selectedBadge}
                onChange={(e) => setSelectedBadge(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 shadow-sm"
              >
                {badges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 3: Duration */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1.5">
                Duration Length
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 shadow-sm"
              >
                {durations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.slice(0, 9).map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className="group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-400 flex flex-col justify-between"
            >
              {/* Package Visual & Badges */}
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('${pkg.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white border border-white/20 text-xs font-semibold tracking-wide">
                      {pkg.badge}
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-slate-100 text-[11px] font-semibold backdrop-blur-md border border-white/10">
                      {pkg.availability}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{pkg.duration}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-300 font-semibold bg-slate-950/60 px-2 py-0.5 rounded-full backdrop-blur-md">
                      <Star className="w-3 h-3 fill-amber-300" />
                      <span>{pkg.rating}</span>
                      <span className="text-slate-300 font-normal">({pkg.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
                      {pkg.destinationName} Collection
                    </span>
                    <h3 className="font-heading font-bold text-xl text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                      {pkg.title}
                    </h3>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-1 border-t border-slate-100">
                    <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
                      Curated Tour Highlights
                    </span>
                    <div className="space-y-1.5">
                      {pkg.highlights.slice(0, 2).map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inclusions & Facilities Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-semibold">
                      5-Star Stays
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                      Private Chauffeur
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-semibold">
                      VIP Fast-Track
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-purple-50 text-purple-700 text-[10px] font-semibold">
                      24/7 Butler
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer with Price and Interactive Buttons */}
              <div className="p-6 pt-0 space-y-3">
                <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Total Package Price
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-slate-600 font-semibold">SGD</span>
                      <span className="font-heading font-extrabold text-2xl text-slate-950">
                        ${pkg.priceSGD.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">/ person</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-md">
                    Zero Surcharges
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveItineraryPackage(pkg)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>View Itinerary</span>
                  </button>

                  <button
                    onClick={() => onOpenBookingModal(pkg)}
                    className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Book Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Indicator if needed */}
        {sorted.length > 9 && (
          <div className="text-center pt-4">
            <span className="text-xs text-slate-500 font-medium">
              Showing top 9 of {sorted.length} premium packages for {selectedDestFilter}
            </span>
          </div>
        )}
      </div>

      {/* SECTION 4: INTERACTIVE TIMELINE ITINERARY MODAL / STORYTELLING DRAWER */}
      <AnimatePresence>
        {activeItineraryPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200"
            >
              {/* Modal Header */}
              <div className="p-6 bg-slate-900 text-white flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-[11px] font-semibold text-white">
                      {activeItineraryPackage.badge}
                    </span>
                    <span className="text-xs text-slate-300 font-medium">
                      {activeItineraryPackage.duration} Curated Journey
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    {activeItineraryPackage.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Day-by-Day Timeline Storytelling • Transparent Execution
                  </p>
                </div>

                <button
                  onClick={() => setActiveItineraryPackage(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Day Selector Navigation Pills */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
                {activeItineraryPackage.itinerary.map((dayItem, dIdx) => (
                  <button
                    key={dayItem.day}
                    onClick={() => setActiveDayIndex(dIdx)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeDayIndex === dIdx
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <span>Day {dayItem.day}</span>
                    {activeDayIndex === dIdx && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                  </button>
                ))}
              </div>

              {/* Active Day Storytelling Content with Visual Timeline */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1">
                {activeItineraryPackage.itinerary[activeDayIndex] && (
                  <div>
                    {/* Day Header Banner */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 space-y-2 mb-8">
                      <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
                        <Navigation className="w-4 h-4 text-blue-600" />
                        <span>Interactive Timeline Storytelling</span>
                      </div>
                      <h4 className="font-heading font-bold text-xl text-slate-900">
                        {activeItineraryPackage.itinerary[activeDayIndex].title}
                      </h4>
                      <p className="text-sm text-slate-600 font-light leading-relaxed">
                        {activeItineraryPackage.itinerary[activeDayIndex].summary}
                      </p>
                    </div>

                    {/* Timeline visualization: Day 1 ↓ Arrival ↓ Hotel Check-in ↓ Local Experience ↓ Tour Activities */}
                    <div className="relative pl-6 md:pl-10 space-y-8 before:absolute before:left-3 md:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-blue-200">
                      {activeItineraryPackage.itinerary[activeDayIndex].steps.map((step, sIdx) => (
                        <div key={sIdx} className="relative flex items-start gap-4">
                          {/* Timeline Node Point */}
                          <div className="absolute -left-6 md:-left-10 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 shadow-md">
                            <span className="text-[10px] md:text-xs font-bold">{sIdx + 1}</span>
                          </div>

                          <div className="bg-slate-50 p-4 md:p-5 rounded-2xl border border-slate-200 w-full space-y-1.5 hover:border-blue-300 transition-colors">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-blue-600 px-2 py-0.5 rounded-md bg-blue-100/60">
                                {step.time}
                              </span>
                              <span className="text-[11px] text-slate-400 font-medium">
                                Step {sIdx + 1} of {activeItineraryPackage.itinerary[activeDayIndex].steps.length}
                              </span>
                            </div>

                            <h5 className="font-heading font-bold text-base text-slate-900">
                              {step.activity}
                            </h5>

                            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                              {step.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inclusions & Guarantees breakdown */}
                <div className="pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Package Inclusions
                    </span>
                    <div className="space-y-1.5">
                      {activeItineraryPackage.inclusions.map((inc, iIdx) => (
                        <div key={iIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Facilities & Assurance
                    </span>
                    <div className="space-y-1.5">
                      {activeItineraryPackage.facilities.map((fac, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Shield className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-5 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Total All-Inclusive
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-semibold text-slate-600">SGD</span>
                    <span className="font-heading font-extrabold text-2xl text-slate-950">
                      ${activeItineraryPackage.priceSGD.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveItineraryPackage(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const p = activeItineraryPackage;
                      setActiveItineraryPackage(null);
                      onOpenBookingModal(p);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 cursor-pointer"
                  >
                    Proceed with this Itinerary
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
