'use client';

import { useState } from 'react';
import FloatingNav from '@/components/FloatingNav';
import HeroSearchSection from '@/components/HeroSearchSection';
import TrendingDestinationsSection from '@/components/TrendingDestinationsSection';
import FeaturedPackagesSection from '@/components/FeaturedPackagesSection';
import HotelDiscoverySection from '@/components/HotelDiscoverySection';
import ExperiencesActivitiesSection from '@/components/ExperiencesActivitiesSection';
import VisaServicesSection from '@/components/VisaServicesSection';
import LocalRecommendationsSection from '@/components/LocalRecommendationsSection';
import AirportTransfersSection from '@/components/AirportTransfersSection';
import TravelGuidesSection from '@/components/TravelGuidesSection';
import CustomerReviewsSection from '@/components/CustomerReviewsSection';
import BookingPoliciesSection from '@/components/BookingPoliciesSection';
import TravelInsuranceSection from '@/components/TravelInsuranceSection';
import PromotionsSection from '@/components/PromotionsSection';
import FaqSection from '@/components/FaqSection';
import FooterSection from '@/components/FooterSection';
import BookingModal from '@/components/BookingModal';

import {
  allDestinations,
  allPackages,
  allHotels,
  allActivities,
  allVisaServices,
  allTransfers,
  allReviews,
  allGuides,
  localRecommendations,
  bookingPolicies,
  insurancePlans,
  activePromotions,
} from '@/lib/data';
import {
  TourPackage,
  Hotel,
  Activity,
  AirportTransfer,
  VisaService,
  Promotion,
} from '@/types';

export default function HomePage() {
  // Modal & Selected Item State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedTransfer, setSelectedTransfer] = useState<AirportTransfer | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<VisaService | null>(null);
  const [activePromo, setActivePromo] = useState<Promotion | null>(null);

  // Cross-component destination filter state
  const [selectedDestFilter, setSelectedDestFilter] = useState('All');

  // Handlers for Opening Booking Modal for different products
  const handleOpenGeneralBooking = () => {
    setSelectedPackage(null);
    setSelectedHotel(null);
    setSelectedActivity(null);
    setSelectedTransfer(null);
    setSelectedVisa(null);
    setIsBookingModalOpen(true);
  };

  const handleBookPackage = (pkg: TourPackage) => {
    setSelectedPackage(pkg);
    setSelectedHotel(null);
    setSelectedActivity(null);
    setSelectedTransfer(null);
    setSelectedVisa(null);
    setIsBookingModalOpen(true);
  };

  const handleBookHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setSelectedPackage(null);
    setSelectedActivity(null);
    setSelectedTransfer(null);
    setSelectedVisa(null);
    setIsBookingModalOpen(true);
  };

  const handleBookActivity = (act: Activity) => {
    setSelectedActivity(act);
    setSelectedPackage(null);
    setSelectedHotel(null);
    setSelectedTransfer(null);
    setSelectedVisa(null);
    setIsBookingModalOpen(true);
  };

  const handleBookTransfer = (transfer: AirportTransfer) => {
    setSelectedTransfer(transfer);
    setSelectedPackage(null);
    setSelectedHotel(null);
    setSelectedActivity(null);
    setSelectedVisa(null);
    setIsBookingModalOpen(true);
  };

  const handleApplyVisa = (visa: VisaService) => {
    setSelectedVisa(visa);
    setSelectedPackage(null);
    setSelectedHotel(null);
    setSelectedActivity(null);
    setSelectedTransfer(null);
    setIsBookingModalOpen(true);
  };

  const handleClaimPromotion = (promo: Promotion) => {
    setActivePromo(promo);
    setSelectedPackage(null);
    setSelectedHotel(null);
    setSelectedActivity(null);
    setSelectedTransfer(null);
    setSelectedVisa(null);
    setIsBookingModalOpen(true);
  };

  // Search handler from Hero Console
  const handleHeroSearch = (params: {
    destination: string;
    dates: string;
    travelers: number;
    budget: number;
    tripType: string;
  }) => {
    setSelectedDestFilter(params.destination);
  };

  const handleDestinationSelect = (destName: string) => {
    setSelectedDestFilter(destName);
    const elem = document.getElementById('packages');
    if (elem) {
      const yOffset = -80;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] relative flex flex-col">
      {/* Floating Smart Navigation */}
      <FloatingNav onOpenBookingModal={handleOpenGeneralBooking} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero & Section 1: Smart Search Experience */}
        <HeroSearchSection
          destinations={allDestinations}
          onSearch={handleHeroSearch}
          onOpenBookingModal={handleOpenGeneralBooking}
        />

        {/* Section 2: Trending Destinations */}
        <TrendingDestinationsSection
          destinations={allDestinations}
          onSelectDestination={handleDestinationSelect}
        />

        {/* Section 3 & 4: Featured Packages & Interactive Itineraries */}
        <FeaturedPackagesSection
          packages={allPackages}
          selectedDestFilter={selectedDestFilter}
          onSelectDestFilter={setSelectedDestFilter}
          onOpenBookingModal={handleBookPackage}
        />

        {/* Section 5: Hotel Discovery */}
        <HotelDiscoverySection
          hotels={allHotels}
          onBookHotel={handleBookHotel}
        />

        {/* Section 6: Experiences & Activities */}
        <ExperiencesActivitiesSection
          activities={allActivities}
          onBookActivity={handleBookActivity}
        />

        {/* Section 7: Visa Services */}
        <VisaServicesSection
          visas={allVisaServices}
          onApplyVisa={handleApplyVisa}
        />

        {/* Section 8: Local Recommendations */}
        <LocalRecommendationsSection
          recommendations={localRecommendations}
        />

        {/* Section 9: Airport Transfers */}
        <AirportTransfersSection
          transfers={allTransfers}
          onBookTransfer={handleBookTransfer}
        />

        {/* Section 10: Travel Guides */}
        <TravelGuidesSection
          guides={allGuides}
        />

        {/* Section 11: Customer Reviews */}
        <CustomerReviewsSection
          reviews={allReviews}
        />

        {/* Section 12: Booking Policies */}
        <BookingPoliciesSection
          policies={bookingPolicies}
          onOpenBookingModal={handleOpenGeneralBooking}
        />

        {/* Section 13: Travel Insurance */}
        <TravelInsuranceSection
          insurancePlans={insurancePlans}
          onSelectPlan={() => handleOpenGeneralBooking()}
        />

        {/* Section 14: Promotions */}
        <PromotionsSection
          promotions={activePromotions}
          onClaimPromotion={handleClaimPromotion}
        />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer Section */}
      <FooterSection />

      {/* Unified Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedPackage={selectedPackage}
        selectedHotel={selectedHotel}
        selectedActivity={selectedActivity}
        selectedTransfer={selectedTransfer}
        selectedVisa={selectedVisa}
        initialPromo={activePromo}
      />
    </div>
  );
}
