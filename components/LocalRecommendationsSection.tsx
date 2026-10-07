'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Utensils,
  ShoppingBag,
  Moon,
  Sparkles,
  MapPin,
  Eye,
  Star,
  Bookmark,
  Check,
} from 'lucide-react';
import { CityRecommendations } from '@/types';

interface LocalRecommendationsProps {
  recommendations: Record<string, CityRecommendations>;
}

export default function LocalRecommendationsSection({
  recommendations,
}: LocalRecommendationsProps) {
  const cityKeys = Object.keys(recommendations);
  const [selectedCity, setSelectedCity] = useState(cityKeys[0] || 'Singapore');
  const [activeTab, setActiveTab] = useState<
    'restaurants' | 'shopping' | 'nightlife' | 'attractions' | 'hiddenGems'
  >('restaurants');

  const cityData = recommendations[selectedCity] || recommendations['Singapore'];

  const tabs = [
    { id: 'restaurants', label: 'Restaurants & Dining', icon: Utensils },
    { id: 'shopping', label: 'Shopping & Boutiques', icon: ShoppingBag },
    { id: 'nightlife', label: 'Nightlife & Rooftops', icon: Moon },
    { id: 'attractions', label: 'Must-See Attractions', icon: Star },
    { id: 'hiddenGems', label: 'Hidden Gems', icon: Eye },
  ];

  return (
    <section id="recommendations" className="py-24 px-4 md:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-100">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Section 08 • Concierge Curations
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
              Local Recommendations & <br />
              <span className="text-rose-600">Insider Black Book</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl font-light">
              Direct recommendations from our Singapore travel concierges, resident sommeliers, and cultural tastemakers.
            </p>
          </div>

          {/* City Selector Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 overflow-x-auto scrollbar-none">
            {cityKeys.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCity === city
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === 'restaurants' && (
              <motion.div
                key="restaurants"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {cityData.restaurants.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-rose-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-[11px] font-bold">
                        {item.cuisine}
                      </span>
                      <Utensils className="w-4 h-4 text-slate-400" />
                    </div>
                    <h4 className="font-heading font-bold text-lg text-slate-900">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {item.highlight}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'shopping' && (
              <motion.div
                key="shopping"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {cityData.shopping.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-rose-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {item.vibe}
                      </span>
                      <ShoppingBag className="w-4 h-4 text-rose-600" />
                    </div>
                    <h4 className="font-heading font-bold text-xl text-slate-900">
                      {item.district}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-800">Specialty:</strong> {item.specialty}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'nightlife' && (
              <motion.div
                key="nightlife"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {cityData.nightlife.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-white/10 text-amber-300 text-[11px] font-semibold">
                        {item.type}
                      </span>
                      <Moon className="w-4 h-4 text-rose-400" />
                    </div>
                    <h4 className="font-heading font-bold text-xl text-white">
                      {item.venue}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {item.specialty}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'attractions' && (
              <motion.div
                key="attractions"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {cityData.attractions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-rose-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-600">
                      <Star className="w-4 h-4 fill-rose-600" />
                      <span>Premier Landmark</span>
                    </div>
                    <h4 className="font-heading font-bold text-xl text-slate-900">
                      {item.name}
                    </h4>
                    <div className="p-3 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs text-rose-900">
                      <strong>Insider Tip:</strong> {item.tip}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'hiddenGems' && (
              <motion.div
                key="hiddenGems"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {cityData.hiddenGems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-gradient-to-br from-slate-50 to-rose-50/30 border border-slate-200 hover:shadow-xl transition-all duration-300 space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                      <Eye className="w-4 h-4" />
                      <span>Secret Spot / Off-the-Radar</span>
                    </div>
                    <h4 className="font-heading font-bold text-xl text-slate-900">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
