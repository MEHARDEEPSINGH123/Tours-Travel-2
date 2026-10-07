'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Quote,
  Star,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { CustomerReview } from '@/types';

interface CustomerReviewsProps {
  reviews: CustomerReview[];
}

export default function CustomerReviewsSection({
  reviews,
}: CustomerReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredReviews = reviews.slice(0, 6);
  const current = featuredReviews[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredReviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + featuredReviews.length) % featuredReviews.length
    );
  };

  return (
    <section id="reviews" className="py-24 px-4 md:px-8 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              Section 11 • Traveler Stories
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
              Verified Journeys & <br />
              <span className="text-rose-600">Client Accolades</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl font-light">
              Read uncensored testimonials from travelers based in Singapore, Australia, and Hong Kong who entrusted their holiday milestones to TripNest.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-800">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.96 / 5 Over 2,400+ Trips</span>
            </div>

            {/* Custom Carousel Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shadow-sm cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-slate-950 hover:bg-rose-600 text-white transition-colors shadow-md cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Testimonial Story Card (Large Typography & Photo) */}
        {current && (
          <div className="p-8 md:p-14 rounded-3xl bg-white border border-slate-200 shadow-2xl relative overflow-hidden">
            <div className="absolute right-8 top-8 opacity-5 text-slate-900 pointer-events-none">
              <Quote className="w-48 h-48" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-8 items-center"
              >
                {/* Author Visual Column */}
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border-2 border-slate-200/80 shadow-xl bg-slate-100">
                      <img
                        src={current.avatarUrl}
                        alt={current.authorName}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-xl text-slate-900">
                      {current.authorName}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {current.authorCity}, {current.authorCountry}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-[11px] font-semibold border border-rose-200/60">
                      <span>{current.travelerType}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Big Typography Quote Column */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider">
                    <span>Verified Journey</span>
                    <span>•</span>
                    <span className="text-slate-500">{current.packageTitle}</span>
                  </div>

                  <blockquote className="font-heading font-medium text-2xl md:text-3xl lg:text-4xl text-slate-900 leading-snug tracking-tight">
                    "{current.comment}"
                  </blockquote>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Verified TripNest Singapore Traveler ({current.date})</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {featuredReviews.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setCurrentIndex(dotIdx)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            currentIndex === dotIdx
                              ? 'w-6 bg-rose-600'
                              : 'w-2 bg-slate-300 hover:bg-slate-400'
                          }`}
                          aria-label={`Go to slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* 3 Secondary Mini-Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {reviews.slice(6, 9).map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  {rev.date}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-light line-clamp-3">
                "{rev.comment}"
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
                <img
                  src={rev.avatarUrl}
                  alt={rev.authorName}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div className="text-[11px] font-bold text-slate-900">
                  {rev.authorName} <span className="font-normal text-slate-500">({rev.authorCity})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
