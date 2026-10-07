'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  Clock,
  Tag,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Promotion } from '@/types';

interface PromotionsProps {
  promotions: Promotion[];
  onClaimPromotion: (promo: Promotion) => void;
}

export default function PromotionsSection({
  promotions,
  onClaimPromotion,
}: PromotionsProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Live dynamic countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="promotions" className="py-24 px-4 md:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-100">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
              Section 14 • Seasonal Flash Deals
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
              Exclusive Privileges & <br />
              <span className="text-rose-600">Limited-Time Flash Sales</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl font-light">
              Time-sensitive promotional vouchers negotiated directly with luxury resort collections and aviation partners.
            </p>
          </div>

          {/* Dynamic Global Countdown Box */}
          <div className="p-4 rounded-3xl bg-slate-950 text-white shadow-xl flex items-center gap-4">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4 animate-spin" />
              <span>Offer Ends:</span>
            </div>
            <div className="flex items-center gap-2 text-center">
              <div className="px-2.5 py-1 rounded-xl bg-white/10 font-mono font-bold text-sm text-white">
                {String(timeLeft.days).padStart(2, '0')}d
              </div>
              <span className="text-slate-500">:</span>
              <div className="px-2.5 py-1 rounded-xl bg-white/10 font-mono font-bold text-sm text-white">
                {String(timeLeft.hours).padStart(2, '0')}h
              </div>
              <span className="text-slate-500">:</span>
              <div className="px-2.5 py-1 rounded-xl bg-white/10 font-mono font-bold text-sm text-white">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </div>
              <span className="text-slate-500">:</span>
              <div className="px-2.5 py-1 rounded-xl bg-white/10 font-mono font-bold text-sm text-amber-400">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </div>
            </div>
          </div>
        </div>

        {/* 3 Large Promotion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((promo, idx) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                    style={{ backgroundImage: `url('${promo.heroImage}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                      {promo.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium">
                    Valid for: {promo.applicableDestinations.join(', ')}
                  </div>
                </div>

                {/* Promo Details */}
                <div className="p-6 space-y-4">
                  <h3 className="font-heading font-bold text-xl text-slate-900 leading-snug">
                    {promo.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {promo.description}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Promo Voucher Code
                      </span>
                      <span className="font-mono font-bold text-sm text-blue-600">
                        {promo.discountCode}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(promo.discountCode)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      title="Copy promo code"
                    >
                      {copiedCode === promo.discountCode ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onClaimPromotion(promo)}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Claim {promo.discountPercent}% Discount</span>
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
