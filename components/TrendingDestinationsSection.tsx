'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  ArrowRight,
  Sun,
  Calendar,
  CheckCircle2,
  Sparkles,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { Destination } from '@/types';

interface TrendingDestinationsProps {
  destinations: Destination[];
  onSelectDestination: (destName: string) => void;
}

export default function TrendingDestinationsSection({
  destinations,
  onSelectDestination,
}: TrendingDestinationsProps) {
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = [
    'All',
    'Southeast Asia',
    'East Asia',
    'Europe',
    'Oceania',
    'Middle East',
  ];

  const filtered = destinations.filter((d) => {
    if (selectedRegion === 'All') return true;
    return d.region === selectedRegion;
  });

  return (
    <section id="trending" className="py-24 px-4 md:px-8 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              Section 02 • Trending Worldwide
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
              Iconic Horizons & <br />
              <span className="text-rose-600">Cinematic Escapes</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl font-light">
              Carefully vetted destinations favored by discerning Singapore travelers, featuring direct flight connections and seasonal peak conditions.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-x-auto scrollbar-none">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Large Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xl hover:shadow-2xl hover:shadow-slate-900/15 transition-all duration-500 flex flex-col justify-between min-h-[500px]"
            >
              {/* Cinematic Background Image with Zoom on Hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${dest.heroImage}')` }}
              />

              {/* Gradient Vignette for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent" />

              {/* Top Floating Badges */}
              <div className="relative z-10 p-6 flex items-start justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-semibold tracking-wide">
                  {dest.curatedTag}
                </span>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md text-amber-300 border border-white/10 text-xs font-semibold">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>{dest.temperature}</span>
                </div>
              </div>

              {/* Bottom Content Card */}
              <div className="relative z-10 p-6 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-300 text-xs font-semibold uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>
                      {dest.country} • {dest.region}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl md:text-3xl text-white tracking-tight group-hover:text-blue-300 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-slate-300 text-xs font-light line-clamp-2">
                    {dest.tagline}
                  </p>
                </div>

                {/* Best Season */}
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-slate-200">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Best Season To Visit
                    </span>
                    <span className="font-medium text-white">{dest.bestSeason}</span>
                  </div>
                </div>

                {/* Quick Facts Pills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block tracking-wider">
                    Traveler Insights
                  </span>
                  <div className="flex flex-col gap-1">
                    {dest.quickFacts.slice(0, 2).map((fact, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                      Starting From
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-slate-300 font-semibold">SGD</span>
                      <span className="font-heading font-extrabold text-2xl text-white">
                        ${dest.startingPriceSGD.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectDestination(dest.name)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>View Tours</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
