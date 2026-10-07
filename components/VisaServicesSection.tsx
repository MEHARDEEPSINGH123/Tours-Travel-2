'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Search,
  ArrowRight,
  FileText,
  BadgeCheck,
  ChevronDown,
  Info,
} from 'lucide-react';
import { VisaService } from '@/types';

interface VisaServicesProps {
  visas: VisaService[];
  onApplyVisa: (visa: VisaService) => void;
}

export default function VisaServicesSection({
  visas,
  onApplyVisa,
}: VisaServicesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVisa, setSelectedVisa] = useState<VisaService>(visas[0]);

  const filteredVisas = visas.filter((v) =>
    v.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="visas" className="py-24 px-4 md:px-8 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
              <FileCheck2 className="w-3.5 h-3.5" />
              Section 07 • Fast-Track Travel Authorizations
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
              Embassy & eVisa Services <br />
              <span className="text-rose-600">Simplified for You</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl font-light">
              Zero consulate queues. Our licensed Singapore documentation specialists handle document verification, appointment booking, and visa issuance.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search destination country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>
        </div>

        {/* 2-Column Interactive Visa Console */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Country Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
              Select Destination ({filteredVisas.length} Available)
            </span>

            <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
              {filteredVisas.map((v) => {
                const isSelected = selectedVisa?.id === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVisa(v)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-600 shadow-lg shadow-rose-600/20'
                        : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{v.flag}</span>
                      <div>
                        <div className="font-heading font-bold text-sm">
                          {v.country}
                        </div>
                        <div
                          className={`text-[11px] ${
                            isSelected ? 'text-rose-100' : 'text-slate-500'
                          }`}
                        >
                          {v.entryType}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-xs">
                        SGD ${v.visaFeesSGD}
                      </div>
                      <div
                        className={`text-[10px] ${
                          isSelected ? 'text-rose-200' : 'text-slate-400'
                        }`}
                      >
                        {v.processingTime}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Comprehensive Visa Breakdown Card */}
          {selectedVisa && (
            <motion.div
              key={selectedVisa.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl space-y-6"
            >
              {/* Country Overview */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <span className="text-4xl">{selectedVisa.flag}</span>
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">
                      {selectedVisa.country} Visa
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <BadgeCheck className="w-4 h-4 text-emerald-600" />
                      <span>{selectedVisa.successRate} Approval Rate</span>
                      <span>•</span>
                      <span>{selectedVisa.validity}</span>
                    </div>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    All-Inclusive Processing Fee
                  </span>
                  <div className="font-heading font-extrabold text-3xl text-rose-600">
                    SGD ${selectedVisa.visaFeesSGD}
                  </div>
                  <span className="text-[11px] text-slate-500">Includes Embassy & Service Fee</span>
                </div>
              </div>

              {/* Quick Spec Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase">
                    <Clock className="w-3.5 h-3.5 text-rose-600" />
                    <span>Processing Time</span>
                  </div>
                  <div className="font-semibold text-xs text-slate-900 mt-1">
                    {selectedVisa.processingTime}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase">
                    <FileText className="w-3.5 h-3.5 text-rose-600" />
                    <span>Authorization Type</span>
                  </div>
                  <div className="font-semibold text-xs text-slate-900 mt-1 truncate">
                    {selectedVisa.entryType}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="flex items-center gap-1.5 text-emerald-700 text-[10px] font-bold uppercase">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Assurance</span>
                  </div>
                  <div className="font-semibold text-xs text-emerald-900 mt-1">
                    Pre-Check Guaranteed
                  </div>
                </div>
              </div>

              {/* Required Documents */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-rose-600" />
                  Mandatory Required Documents
                </span>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {selectedVisa.requiredDocuments.map((doc, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4-Step Application Process Flow */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-500" />
                  4-Step Seamless Application Flow
                </span>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {selectedVisa.applicationProcess.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1"
                    >
                      <span className="text-[10px] font-extrabold uppercase text-rose-600">
                        Step 0{sIdx + 1}
                      </span>
                      <p className="text-xs text-slate-600">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onApplyVisa(selectedVisa)}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/25 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Apply for {selectedVisa.country} Visa Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
