'use client';

import {
  Compass,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  Lock,
  ArrowUp,
  Heart,
  Globe,
} from 'lucide-react';

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-12 px-4 md:px-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
                <Compass className="w-5 h-5 text-white animate-[spin_20s_linear_infinite]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
                  TripNest
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30">
                  Singapore
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed max-w-sm">
              The Sovereign Travel Marketplace for Asia & beyond. Providing transparent SGD pricing, curated 5-star itineraries, private chauffeur mobility, and 24/7 dedicated Singapore concierge care.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Singapore Tourism Board Travel Agent License: <strong>TA-038291-SIN</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Level 38, Marina Bay Financial Centre Tower 1, Singapore 018981</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Marketplace */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#explore" className="hover:text-rose-400 transition-colors">
                  Trending Destinations
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-rose-400 transition-colors">
                  Curated Tour Packages
                </a>
              </li>
              <li>
                <a href="#hotels" className="hover:text-rose-400 transition-colors">
                  5-Star Luxury Stays
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-rose-400 transition-colors">
                  Bespoke Experiences
                </a>
              </li>
              <li>
                <a href="#transfers" className="hover:text-rose-400 transition-colors">
                  Airport Fleet Transfers
                </a>
              </li>
              <li>
                <a href="#visas" className="hover:text-rose-400 transition-colors">
                  Fast-Track Visa Services
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links: Assurance */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Trust & Assurance
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#policies" className="hover:text-rose-400 transition-colors">
                  100% Refund Policy
                </a>
              </li>
              <li>
                <a href="#policies" className="hover:text-rose-400 transition-colors">
                  Cancellation Matrix
                </a>
              </li>
              <li>
                <a href="#insurance" className="hover:text-rose-400 transition-colors">
                  Travel Insurance Coverage
                </a>
              </li>
              <li>
                <a href="#recommendations" className="hover:text-rose-400 transition-colors">
                  Local Concierge Guides
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-rose-400 transition-colors">
                  Verified Traveler Reviews
                </a>
              </li>
              <li>
                <a href="#promotions" className="hover:text-rose-400 transition-colors">
                  Flash Sales & Vouchers
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links: Singapore Concierge */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              24/7 Concierge
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <a
                href="tel:+6568009888"
                className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-rose-500 transition-colors text-white"
              >
                <PhoneCall className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Hotline</span>
                  <span className="font-bold text-xs">+65 6800 9888</span>
                </div>
              </a>

              <a
                href="mailto:concierge@tripnest.sg"
                className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-rose-500 transition-colors text-white"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Email Support</span>
                  <span className="font-bold text-xs">concierge@tripnest.sg</span>
                </div>
              </a>

              <div className="text-[11px] text-slate-500 font-light leading-relaxed">
                Operating 24/7 across Singapore, Tokyo, London & Sydney time zones.
              </div>
            </div>
          </div>
        </div>

        {/* Payment Partner & Security Badges */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Accepted Payment Methods:</span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px]">
              PayNow
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px]">
              DBS PayLah!
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px]">
              OCBC / UOB
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px]">
              Visa / MasterCard
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px]">
              Apple Pay
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-rose-600 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TripNest Singapore Pte. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>CaseTrust Protection</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
