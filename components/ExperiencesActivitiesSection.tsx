'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Compass,
  Utensils,
  Landmark,
  Heart,
  Trees,
  Clock,
  Star,
  ArrowRight,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { Activity } from '@/types';

interface ExperiencesActivitiesProps {
  activities: Activity[];
  onBookActivity: (activity: Activity) => void;
}

export default function ExperiencesActivitiesSection({
  activities,
  onBookActivity,
}: ExperiencesActivitiesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { label: 'All', icon: Sparkles },
    { label: 'Adventure', icon: Compass },
    { label: 'Culture', icon: Landmark },
    { label: 'Food', icon: Utensils },
    { label: 'Family', icon: Heart },
    { label: 'Nature', icon: Trees },
    { label: 'Luxury', icon: Sparkles },
  ];

  const filtered = activities.filter((act) => {
    if (selectedCategory === 'All') return true;
    return act.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const featured = filtered[0] || activities[0];
  const listItems = filtered.slice(1, 7);

  return (
    <section id="experiences" className="py-24 px-4 md:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-100">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              Section 06 • Experiences & Activities
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
              Extraordinary Moments & <br />
              <span className="text-rose-600">Local Immersion</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl font-light">
              Skip-the-line VIP privileges, private masterclasses, and off-grid expeditions guided by certified regional specialists.
            </p>
          </div>

          {/* Editorial Category Navigation */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 overflow-x-auto scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Large Editorial Layout: Featured Spotlight Card */}
        {featured && (
          <motion.div
            key={featured.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-slate-950 text-white overflow-hidden shadow-2xl border border-slate-800 grid lg:grid-cols-12"
          >
            {/* Visual Column */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${featured.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950" />
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-semibold uppercase tracking-wider">
                  Featured {featured.category} Spotlight
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 border border-white/10 text-xs font-semibold">
                  ★ {featured.rating} ({featured.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Editorial Content Column */}
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>{featured.destinationName}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featured.duration}</span>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-2xl md:text-3xl text-white leading-tight">
                  {featured.title}
                </h3>

                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  Immerse yourself in a private, tailor-made experience with door-to-door luxury transport, skip-the-line privileges, and top-rated local hosts.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Experience Highlights
                  </span>
                  {featured.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Booking Trigger */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Price per Guest
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-slate-400 font-semibold">SGD</span>
                    <span className="font-heading font-extrabold text-3xl text-white">
                      ${featured.priceSGD}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onBookActivity(featured)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Book Experience</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Supporting Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {listItems.map((act, idx) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${act.image}')` }}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[11px] font-semibold">
                    {act.category}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{act.rating}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-rose-600" />
                    <span>{act.destinationName}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{act.duration}</span>
                  </div>

                  <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2">
                    {act.title}
                  </h4>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">From</span>
                  <div className="font-heading font-bold text-lg text-slate-900">
                    SGD ${act.priceSGD}
                  </div>
                </div>

                <button
                  onClick={() => onBookActivity(act)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reserve
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
