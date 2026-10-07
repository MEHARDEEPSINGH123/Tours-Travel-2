'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ShieldCheck, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    category: 'Trust & Licensing',
    question: 'Is TripNest Singapore officially licensed by the Singapore Tourism Board?',
    answer:
      'Yes. TripNest Singapore operates under Travel Agent License TA-038291-SIN issued by the Singapore Tourism Board (STB). All client funds and bookings are safeguarded under Singapore trust accounting standards and comply fully with consumer protection frameworks.',
  },
  {
    category: 'Currency & Pricing',
    question: 'Are prices quoted in Singapore Dollars (SGD) with all taxes included?',
    answer:
      'Every price across our marketplace is strictly transparent and quoted in Singapore Dollars (SGD). Statutory 9% GST, airport surcharges, hotel service fees, and local tourist taxes are already included. You will never encounter unexpected checkout conversion markups.',
  },
  {
    category: 'Flight & Partners',
    question: 'Do you arrange Singapore Airlines flights and priority seating?',
    answer:
      'Yes. Through our premium aviation partnerships with Singapore Airlines (SIA), ANA, Emirates, and Qatar Airways, our concierge coordinates group airfare blocks, KrisFlyer frequent flyer mile accruals, and coordinated flight schedules tailored to each itinerary.',
  },
  {
    category: 'Cancellation & Peace of Mind',
    question: 'How flexible is the cancellation and rescheduling policy?',
    answer:
      'Our Signature Packages feature free 100% money-back cancellation up to 7 days before departure. For unexpected schedule changes, you enjoy one complimentary date shift up to 48 hours prior to travel without penalty.',
  },
  {
    category: 'Concierge & Support',
    question: 'How do I reach the TripNest Concierge during my international trip?',
    answer:
      'Upon booking, you are assigned a dedicated Singapore-based WhatsApp travel butler available 24/7. Whether you need an impromptu Michelin restaurant reservation, emergency clinic recommendation, or flight reschedule, our average reply time is under 90 seconds.',
  },
  {
    category: 'Visas & Documentation',
    question: 'Can TripNest assist with visas for countries like Japan, South Korea, or Schengen?',
    answer:
      'Absolutely. Our in-house consular documentation team conducts an exhaustive document pre-check within 2 hours, ensures photo compliance, and manages embassy submission for quick approvals with a 99.8% track record.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="support" className="py-24 px-4 md:px-8 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
            Clear Answers for <br />
            <span className="text-rose-600">Discerning Travelers</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-light max-w-xl mx-auto">
            Everything you need to know about our Singapore guarantees, payments, cancellations, and overseas concierge care.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-50 border-rose-200 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                      {faq.category}
                    </span>
                    <h3 className="font-heading font-bold text-base md:text-lg text-slate-900">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`p-2 rounded-full transition-transform duration-300 ${
                      isOpen
                        ? 'bg-rose-600 text-white rotate-180'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-xs md:text-sm text-slate-600 font-light leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
