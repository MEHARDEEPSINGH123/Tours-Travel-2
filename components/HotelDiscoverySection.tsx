'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Hotel as HotelIcon,
  Star,
  MapPin,
  CheckCircle2,
  Sparkles,
  Wifi,
  Coffee,
  Waves,
  ShieldCheck,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { Hotel } from '@/types';

interface HotelDiscoveryProps {
  hotels: Hotel[];
  onBookHotel: (hotel: Hotel) => void;
}

export default function HotelDiscoverySection({
  hotels,
  onBookHotel,
}: HotelDiscoveryProps) {
  const [starFilter, setStarFilter] = useState<number | 'All'>('All');
  const [locationSearch, setLocationSearch] = useState('');

  const filteredHotels = hotels.filter((h) => {
    if (starFilter !== 'All' && h.stars !== starFilter) return false;
    if (
      locationSearch &&
      !h.location.toLowerCase().includes(locationSearch.toLowerCase()) &&
      !h.name.toLowerCase().includes(locationSearch.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <section id="hotels" className="py-24 px-4 md:px-8 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
              <HotelIcon className="w-3.5 h-3.5" />
              Section 05 • Premium Accommodations
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
              Curated Luxury & <br />
              <span className="text-rose-600">5-Star Stays</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl font-light">
              Hand-selected luxury hotels and private villas vetted for privacy, world-class gastronomy, and impeccable concierge standards.
            </p>
          </div>

          {/* Hotel Filter Pills */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <button
                onClick={() => setStarFilter('All')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  starFilter === 'All'
                    ? 'bg-slate-950 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Stars
              </button>
              <button
                onClick={() => setStarFilter(5)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  starFilter === 5
                    ? 'bg-slate-950 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>5-Star Luxe</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </button>
              <button
                onClick={() => setStarFilter(4)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  starFilter === 4
                    ? 'bg-slate-950 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>4-Star Premier</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.slice(0, 9).map((hotel, idx) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className="group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-400 flex flex-col justify-between"
            >
              <div>
                {/* Hotel Image & Overlay */}
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('${hotel.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 border border-white/10 text-xs font-semibold">
                      {Array.from({ length: hotel.stars }).map((_, s) => (
                        <Star key={s} className="w-3 h-3 fill-amber-300" />
                      ))}
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-bold shadow-sm">
                      {hotel.availability}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1 text-slate-200 font-medium truncate max-w-[200px]">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">{hotel.location}</span>
                    </div>

                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-600/90 text-white font-bold text-xs backdrop-blur-md">
                      <span>★ {hotel.ratingScore}</span>
                      <span className="font-normal text-[10px] text-rose-100">
                        ({hotel.reviewSentiment})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hotel Body */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-xl text-slate-900 leading-snug group-hover:text-rose-600 transition-colors">
                      {hotel.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {hotel.roomType}
                    </p>
                  </div>

                  {/* Facilities Grid */}
                  <div className="space-y-2 pt-1 border-t border-slate-100">
                    <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
                      Signature Facilities & Amenities
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.facilities.slice(0, 4).map((fac, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium"
                        >
                          {fac}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 space-y-3">
                <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Nightly Rate
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-slate-600 font-semibold">SGD</span>
                      <span className="font-heading font-extrabold text-2xl text-slate-950">
                        ${hotel.pricePerNightSGD.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">/ night</span>
                    </div>
                  </div>

                  <span className="text-[11px] text-emerald-600 font-semibold">
                    Free Cancellation
                  </span>
                </div>

                <button
                  onClick={() => onBookHotel(hotel)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-md hover:shadow-rose-600/25 cursor-pointer active:scale-95"
                >
                  <span>Reserve Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
