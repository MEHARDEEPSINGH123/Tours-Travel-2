'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Check,
  Headphones,
  Sparkles,
  Plane,
  HeartPulse,
  Luggage,
  CalendarX,
  ArrowRight,
} from 'lucide-react';
import { InsurancePlan } from '@/types';

interface TravelInsuranceProps {
  insurancePlans: InsurancePlan[];
  onSelectPlan?: (plan: InsurancePlan) => void;
}

export default function TravelInsuranceSection({
  insurancePlans,
  onSelectPlan,
}: TravelInsuranceProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    insurancePlans.find((p) => p.popular)?.id || insurancePlans[1]?.id
  );

  return (
    <section id="insurance" className="py-24 px-4 md:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-100">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Section 13 • Travel Protection & Safety
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
              Comprehensive Travel Insurance <br />
              <span className="text-rose-600">& 24/7 Global SOS</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl font-light">
              Underwritten by premier global insurers with direct cashless hospital admission in 150+ countries and instant digital claim filing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-100">
            <Headphones className="w-4 h-4" />
            <span>24/7 Singapore Emergency Assistance Desk</span>
          </div>
        </div>

        {/* 3-Tier Insurance Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {insurancePlans.map((plan, idx) => {
            const isSelected = selectedPlanId === plan.id;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-slate-950 text-white shadow-2xl border-2 border-rose-500 scale-105 z-10'
                    : 'bg-slate-50 text-slate-900 border border-slate-200 shadow-md hover:bg-white hover:shadow-xl'
                }`}
              >
                {/* Popular Ribbon */}
                {plan.popular && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      Recommended by 88% of Travelers
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Tier Title & Price */}
                  <div className="space-y-2 border-b pb-6 border-slate-200/40">
                    <h3 className="font-heading font-extrabold text-2xl">
                      {plan.name}
                    </h3>
                    <p
                      className={`text-xs ${
                        plan.popular ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {plan.tagline}
                    </p>

                    <div className="pt-4 flex items-baseline gap-1">
                      <span className="text-xs font-semibold">SGD</span>
                      <span className="font-heading font-extrabold text-4xl">
                        ${plan.priceSGD}
                      </span>
                      <span
                        className={`text-xs ${
                          plan.popular ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        / trip
                      </span>
                    </div>
                  </div>

                  {/* Core Coverage Metrics */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-medium">
                        <HeartPulse className="w-4 h-4 text-rose-500 shrink-0" />
                        Medical Evac & Hospital
                      </span>
                      <span className="font-bold">{plan.medicalCoverageSGD}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-medium">
                        <CalendarX className="w-4 h-4 text-amber-500 shrink-0" />
                        Trip Cancellation
                      </span>
                      <span className="font-bold">{plan.tripCancellationSGD}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Luggage className="w-4 h-4 text-rose-500 shrink-0" />
                        Baggage Delay / Loss
                      </span>
                      <span className="font-bold">{plan.baggageDelaySGD}</span>
                    </div>
                  </div>

                  {/* Feature Inclusions Checklist */}
                  <div className="pt-4 border-t border-slate-200/40 space-y-2.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider block ${
                        plan.popular ? 'text-rose-300' : 'text-slate-400'
                      }`}
                    >
                      Included Benefits & Perks
                    </span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            plan.popular ? 'text-emerald-400' : 'text-rose-600'
                          }`}
                        />
                        <span
                          className={
                            plan.popular ? 'text-slate-200' : 'text-slate-700'
                          }
                        >
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Selection Action */}
                <div className="pt-8">
                  <button
                    onClick={() => {
                      setSelectedPlanId(plan.id);
                      onSelectPlan?.(plan);
                    }}
                    className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                        : isSelected
                        ? 'bg-slate-900 text-white'
                        : 'bg-white hover:bg-slate-200 text-slate-900 border border-slate-200'
                    }`}
                  >
                    <span>{isSelected ? '✓ Plan Selected' : 'Choose This Plan'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
