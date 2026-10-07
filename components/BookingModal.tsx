'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Users,
  Tag,
  Lock,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  User,
  Download,
  Percent,
} from 'lucide-react';
import {
  TourPackage,
  Hotel,
  Activity,
  AirportTransfer,
  VisaService,
  Promotion,
} from '@/types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: TourPackage | null;
  selectedHotel?: Hotel | null;
  selectedActivity?: Activity | null;
  selectedTransfer?: AirportTransfer | null;
  selectedVisa?: VisaService | null;
  initialPromo?: Promotion | null;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedPackage,
  selectedHotel,
  selectedActivity,
  selectedTransfer,
  selectedVisa,
  initialPromo,
}: BookingModalProps) {
  const [step, setStep] = useState<'details' | 'confirmed'>('details');

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [travelDate, setTravelDate] = useState('2026-11-15');
  const [specialRequests, setSpecialRequests] = useState('');
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [promoCode, setPromoCode] = useState(initialPromo?.discountCode || '');
  const [promoDiscount, setPromoDiscount] = useState(
    initialPromo?.discountPercent || 0
  );
  const [promoApplied, setPromoApplied] = useState(!!initialPromo);

  // Derived Title & Base Price
  let title = 'Custom Journey Curation';
  let badge = 'Bespoke Experience';
  let basePrice = 1499;

  if (selectedPackage) {
    title = selectedPackage.title;
    badge = selectedPackage.badge;
    basePrice = selectedPackage.priceSGD;
  } else if (selectedHotel) {
    title = `${selectedHotel.name} (3 Nights)`;
    badge = `${selectedHotel.stars}-Star Hotel`;
    basePrice = selectedHotel.pricePerNightSGD * 3;
  } else if (selectedActivity) {
    title = selectedActivity.title;
    badge = selectedActivity.category;
    basePrice = selectedActivity.priceSGD;
  } else if (selectedTransfer) {
    title = `${selectedTransfer.vehicleType} Airport Transfer`;
    badge = selectedTransfer.category;
    basePrice = selectedTransfer.priceSGD;
  } else if (selectedVisa) {
    title = `${selectedVisa.country} Fast-Track Visa`;
    badge = selectedVisa.entryType;
    basePrice = selectedVisa.visaFeesSGD;
  }

  // Calculate Final Price
  const effectiveGuests = selectedTransfer ? 1 : guests;
  const insuranceFee = includeInsurance ? 69 * guests : 0;
  const rawTotal = basePrice * effectiveGuests + insuranceFee;
  const discountAmount = promoApplied
    ? Math.round((rawTotal * promoDiscount) / 100)
    : 0;
  const finalTotal = Math.max(0, rawTotal - discountAmount);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'SAKURA25') {
      setPromoDiscount(25);
      setPromoApplied(true);
    } else if (code === 'ISLAND30') {
      setPromoDiscount(30);
      setPromoApplied(true);
    } else if (code === 'KIDSFLYFREE') {
      setPromoDiscount(20);
      setPromoApplied(true);
    } else {
      alert('Invalid promotional voucher code. Try SAKURA25 or ISLAND30');
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert('Please fill in your name and email address.');
      return;
    }
    setStep('confirmed');
  };

  const resetAndClose = () => {
    setStep('details');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative"
      >
        {/* STICKY HEADER - ALWAYS 100% VISIBLE */}
        <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base md:text-lg text-white leading-tight">
                {step === 'details'
                  ? 'Secure Booking Reservation'
                  : 'Booking Confirmed!'}
              </h3>
              <p className="text-[11px] text-slate-400">
                TripNest Singapore • Official Reservation Concierge (TA-038291)
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        {step === 'details' ? (
          <form
            onSubmit={handleConfirmBooking}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* SCROLLABLE INTERIOR CONTENT */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5">
              {/* Top Selected Experience Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-rose-50/40 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-100 text-rose-700">
                      {badge}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Singapore Protection Inclusive
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-base md:text-lg text-slate-900">
                    {title}
                  </h4>
                  <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Free 100% money-back cancellation up to 7 days before departure
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                    Rate
                  </span>
                  <span className="font-heading font-extrabold text-xl text-slate-950">
                    SGD ${basePrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {selectedTransfer ? 'per vehicle' : 'per guest'}
                  </span>
                </div>
              </div>

              {/* 2-Column Responsive Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Left Column (7 cols): Dates, Guests, Traveler Details */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Dates & Travelers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-rose-600" />
                        <span>Departure Date</span>
                      </label>
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-rose-600" />
                        <span>Travelers</span>
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-rose-500 cursor-pointer"
                      >
                        <option value={1}>1 Solo Guest</option>
                        <option value={2}>2 Guests (Couple / Pair)</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests (Family)</option>
                        <option value={6}>6 Guests (Group)</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Lead Traveler Information
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Full Legal Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rachel Tan"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="rachel.tan@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+65 9123 4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Special Requests
                        </label>
                        <input
                          type="text"
                          placeholder="Honeymoon, dietary, child seat"
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (5 cols): Insurance, Promo, Price Box */}
                <div className="lg:col-span-5 space-y-3.5">
                  {/* Insurance Add-on */}
                  <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="insuranceCheckModal"
                      checked={includeInsurance}
                      onChange={(e) => setIncludeInsurance(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded accent-rose-600 cursor-pointer shrink-0"
                    />
                    <label
                      htmlFor="insuranceCheckModal"
                      className="text-xs text-slate-800 cursor-pointer leading-tight"
                    >
                      <span className="font-bold block">
                        Add Gold Imperial Insurance (SGD $69/pax)
                      </span>
                      <span className="text-[11px] text-slate-600 block mt-0.5">
                        $1,000,000 emergency medical cover, air evac & baggage loss.
                      </span>
                    </label>
                  </div>

                  {/* Promo Code Input */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Promo Code (SAKURA25)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold uppercase text-slate-800 focus:outline-none focus:border-rose-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {promoApplied && (
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Voucher applied: {promoDiscount}% off entire total!</span>
                      </div>
                    )}
                  </div>

                  {/* Summary Breakdown Card */}
                  <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>
                        Base Total ({selectedTransfer ? 'Private Fleet' : `${guests} Guests`})
                      </span>
                      <span>SGD ${(basePrice * effectiveGuests).toLocaleString()}</span>
                    </div>

                    {includeInsurance && (
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Insurance ({guests} Guests)</span>
                        <span>SGD ${insuranceFee.toLocaleString()}</span>
                      </div>
                    )}

                    {promoApplied && (
                      <div className="flex items-center justify-between text-emerald-400 font-semibold">
                        <span>Voucher Discount</span>
                        <span>- SGD ${discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between font-bold">
                      <span className="text-slate-300">Net Payable</span>
                      <span className="text-base text-white">
                        SGD ${finalTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STICKY FOOTER - ALWAYS 100% VISIBLE */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                  Total Payable:
                </span>
                <span className="font-heading font-extrabold text-2xl text-slate-900">
                  SGD ${finalTotal.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  (GST & All Taxes Inclusive)
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Confirm & Lock In Experience</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-8 md:p-12 text-center space-y-6 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Reservation Confirmed
              </span>
              <h4 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">
                Welcome Aboard, {fullName}!
              </h4>
              <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto font-light leading-relaxed">
                Your official TripNest Singapore booking voucher has been generated and dispatched to{' '}
                <strong className="text-slate-900 font-semibold">{email}</strong>.
              </p>
            </div>

            {/* Confirmation Ticket Badge */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-400 font-medium">Booking Reference</span>
                <span className="font-mono font-bold text-rose-600">
                  TN-SG-849204
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Departure Date</span>
                <span className="font-semibold text-slate-900">{travelDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Party Size</span>
                <span className="font-semibold text-slate-900">{guests} Guests</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Total Paid (SGD)</span>
                <span className="font-bold text-slate-900">${finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={resetAndClose}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-950 hover:bg-rose-600 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Return to Marketplace
              </button>
              <button
                onClick={() => alert('e-Voucher PDF download simulated. Offline copy saved.')}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-rose-600" />
                <span>Save Offline e-Voucher</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
