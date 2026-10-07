'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Car,
  Users,
  Briefcase,
  CheckCircle2,
  Clock,
  Wifi,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { AirportTransfer } from '@/types';

interface AirportTransfersProps {
  transfers: AirportTransfer[];
  onBookTransfer: (transfer: AirportTransfer) => void;
}

export default function AirportTransfersSection({
  transfers,
  onBookTransfer,
}: AirportTransfersProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<string>(
    transfers[0]?.id || ''
  );

  return (
    <section id="transfers" className="py-24 px-4 md:px-8 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
              <Car className="w-3.5 h-3.5" />
              Section 09 • Changi & International Transfers
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
              Executive Chauffeur & <br />
              <span className="text-rose-600">Airport Limousines</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl font-light">
              Flight radar monitoring, private airside terminal meet & greets, and fixed transparent rates with zero surge pricing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
            <span>Changi Terminals 1, 2, 3 & 4 VIP Fleet</span>
          </div>
        </div>

        {/* Interactive Transfer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transfers.slice(0, 6).map((transfer, idx) => {
            const isSelected = selectedVehicle === transfer.id;
            return (
              <motion.div
                key={transfer.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className={`rounded-3xl bg-white border transition-all duration-300 p-6 flex flex-col justify-between shadow-md hover:shadow-2xl ${
                  isSelected
                    ? 'border-rose-600 ring-2 ring-rose-600/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-4">
                  {/* Vehicle Image */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                      style={{ backgroundImage: `url('${transfer.image}')` }}
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                      {transfer.category}
                    </div>
                  </div>

                  {/* Header & Specs */}
                  <div>
                    <h3 className="font-heading font-bold text-xl text-slate-900">
                      {transfer.vehicleType}
                    </h3>

                    {/* Capacity Indicators */}
                    <div className="flex items-center gap-4 mt-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Users className="w-4 h-4 text-rose-600" />
                        <span>Up to {transfer.capacityPassengers} Guests</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Briefcase className="w-4 h-4 text-rose-600" />
                        <span>{transfer.capacityLuggage} Large Bags</span>
                      </div>
                    </div>
                  </div>

                  {/* Pickup Information Box */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Pickup Protocol
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {transfer.pickupInfo}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-1.5 pt-1">
                    {transfer.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Action */}
                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Fixed Net Fare
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-slate-600 font-bold">SGD</span>
                      <span className="font-heading font-extrabold text-2xl text-slate-900">
                        ${transfer.priceSGD}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedVehicle(transfer.id);
                      onBookTransfer(transfer);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Reserve Fleet</span>
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
