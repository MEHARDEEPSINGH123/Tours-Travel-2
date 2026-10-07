'use client';

import { motion } from 'framer-motion';
import {
  ShieldAlert,
  RotateCcw,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { BookingPolicies } from '@/types';

interface BookingPoliciesProps {
  policies: BookingPolicies;
  onOpenBookingModal?: () => void;
}

export default function BookingPoliciesSection({
  policies,
  onOpenBookingModal,
}: BookingPoliciesProps) {
  return (
    <section id="policies" className="py-24 px-4 md:px-8 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
              <FileCheck className="w-3.5 h-3.5" />
              Section 12 • Transparency & Peace of Mind
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
              Booking Policies, Refunds <br />
              <span className="text-rose-600">& Fair Cancellation Terms</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl font-light">
              Clear, transparent rules written in plain English. No hidden surrender penalties, zero small-print fees.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Singapore CaseTrust / STB Standard Aligned</span>
          </div>
        </div>

        {/* 2-Column Main Policy Breakdown */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Tiered Cancellation Rules Table */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <RotateCcw className="w-5 h-5 text-rose-600" />
              <div>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Cancellation & Refund Matrix
                </h3>
                <p className="text-xs text-slate-500">
                  Instant eligibility calculated automatically in your booking dashboard
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {policies.cancellationRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-rose-50/40 hover:border-rose-200 transition-all"
                >
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      {rule.tier}
                    </span>
                    <p className="text-xs text-slate-700 font-medium">
                      {rule.condition}
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">
                      Fee Incurred
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {rule.fee}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 3-Step Refund Workflow */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                How Our Automated Refund Works
              </span>
              <div className="grid sm:grid-cols-3 gap-3">
                {policies.refundProcess.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1"
                  >
                    <span className="text-[10px] font-extrabold text-rose-600 uppercase">
                      Phase 0{sIdx + 1}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Booking Conditions & Travel Terms */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
                <FileCheck className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Guaranteed Booking Conditions
                  </h3>
                  <p className="text-xs text-slate-400">
                    Mandatory service-level guarantees for all customers
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                {policies.bookingConditions.map((cond, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-3 text-xs text-slate-300 font-light leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{cond}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Singapore Legal Protections</span>
                </div>
                <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                  All transactions are processed through Monetary Authority of Singapore (MAS) licensed payment gateways with 256-bit encryption.
                </p>
              </div>

              <button
                onClick={onOpenBookingModal}
                className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Plan Protected Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
