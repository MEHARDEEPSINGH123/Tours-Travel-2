'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  Quote,
  X,
  Compass,
} from 'lucide-react';
import { TravelGuide } from '@/types';

interface TravelGuidesProps {
  guides: TravelGuide[];
}

export default function TravelGuidesSection({ guides }: TravelGuidesProps) {
  const [activeGuide, setActiveGuide] = useState<TravelGuide | null>(null);

  const heroGuide = guides[0];
  const supportingGuides = guides.slice(1, 5);

  return (
    <section id="guides" className="py-24 px-4 md:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-100">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              Section 10 • Editorial Dispatches
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
              The TripNest Journal: <br />
              <span className="text-rose-600">Immersive Storytelling</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl font-light">
              Destination narratives, architectural profiles, and gastronomic dissertations penned by seasoned cultural explorers.
            </p>
          </div>

          <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            Quarterly Print & Digital Edition
          </div>
        </div>

        {/* Magazine Feature: Large Hero Story */}
        {heroGuide && (
          <div className="grid lg:grid-cols-12 gap-8 items-center p-8 md:p-12 rounded-3xl bg-slate-950 text-white shadow-2xl border border-slate-800">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider">
                  Cover Story
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {heroGuide.tag}
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" /> {heroGuide.readTime}
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-3xl md:text-5xl text-white leading-tight">
                {heroGuide.title}
              </h3>

              <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed">
                {heroGuide.excerpt}
              </p>

              {/* Editorial Key Takeaway Box */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <p className="text-xs md:text-sm text-slate-300 italic font-light">
                  "{heroGuide.keyTakeaway}"
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-rose-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {heroGuide.author}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Dispatched from {heroGuide.destinationName}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveGuide(heroGuide)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-950 hover:bg-rose-500 hover:text-white font-bold text-xs transition-all cursor-pointer"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('${heroGuide.heroImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>
          </div>
        )}

        {/* Supporting Magazine Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportingGuides.map((guide, idx) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setActiveGuide(guide)}
              className="group p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-white hover:shadow-xl hover:border-rose-200 transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-4"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-200">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${guide.heroImage}')` }}
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-950/70 text-white text-[10px] font-semibold">
                    {guide.tag}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>{guide.destinationName}</span>
                  <span>•</span>
                  <span>{guide.readTime}</span>
                </div>

                <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2">
                  {guide.title}
                </h4>

                <p className="text-xs text-slate-600 font-light line-clamp-3">
                  {guide.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-600 group-hover:translate-x-1 transition-transform">
                <span>Explore Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Guide Reader Modal */}
      <AnimatePresence>
        {activeGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative border border-slate-200"
            >
              <button
                onClick={() => setActiveGuide(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  {activeGuide.tag} • {activeGuide.readTime}
                </span>
                <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">
                  {activeGuide.title}
                </h3>
                <div className="text-xs text-slate-500">
                  By {activeGuide.author}
                </div>
              </div>

              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${activeGuide.heroImage}')` }}
                />
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-light">
                <p>{activeGuide.excerpt}</p>
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 text-rose-950 font-normal italic">
                  "{activeGuide.keyTakeaway}"
                </div>
                <p>
                  At TripNest Singapore, our destination dispatches are updated monthly to ensure our private itineraries capture newly opened boutique spaces, changing reservation guidelines, and seasonal micro-climates.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveGuide(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-rose-600 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
