export interface Destination {
  id: string;
  name: string;
  startingPriceSGD: number;
  country: string;
  region: string;
  tagline: string;
  bestSeason: string;
  quickFacts: string[];
  heroImage: string;
  thumbnailImage: string;
  curatedTag: string;
  temperature: string;
  currency: string;
}

export interface ItineraryStep {
  time: string;
  activity: string;
  detail: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  summary: string;
  steps: ItineraryStep[];
}

export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  priceSGD: number;
  availability: string;
  destinationName: string;
  badge: string;
  rating: number;
  reviewCount: number;
  image: string;
  highlights: string[];
  facilities: string[];
  inclusions: string[];
  itinerary: ItineraryDay[];
  cancellationPolicy: string;
}

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  ratingScore: number;
  reviewCount: number;
  reviewSentiment: string;
  pricePerNightSGD: number;
  location: string;
  facilities: string[];
  roomType: string;
  availability: string;
  image: string;
}

export interface Activity {
  id: string;
  title: string;
  category: 'Adventure' | 'Culture' | 'Food' | 'Family' | 'Nature' | 'Luxury';
  destinationName: string;
  duration: string;
  priceSGD: number;
  rating: number;
  reviewCount: number;
  image: string;
  highlights: string[];
}

export interface VisaService {
  id: string;
  country: string;
  flag: string;
  processingTime: string;
  visaFeesSGD: number;
  entryType: string;
  validity: string;
  successRate: string;
  requiredDocuments: string[];
  applicationProcess: string[];
}

export interface AirportTransfer {
  id: string;
  vehicleType: string;
  category: string;
  destinationName: string;
  capacityPassengers: number;
  capacityLuggage: number;
  priceSGD: number;
  image: string;
  pickupInfo: string;
  features: string[];
}

export interface CustomerReview {
  id: string;
  rating: number;
  comment: string;
  authorName: string;
  authorCity: string;
  authorCountry: string;
  travelerType: string;
  packageTitle: string;
  avatarUrl: string;
  verifiedBooking: boolean;
  date: string;
}

export interface TravelGuide {
  id: string;
  title: string;
  destinationName: string;
  readTime: string;
  author: string;
  heroImage: string;
  tag: string;
  excerpt: string;
  keyTakeaway: string;
}

export interface RestaurantRec {
  name: string;
  cuisine: string;
  highlight: string;
}

export interface ShoppingRec {
  district: string;
  vibe: string;
  specialty: string;
}

export interface NightlifeRec {
  venue: string;
  type: string;
  specialty: string;
}

export interface AttractionRec {
  name: string;
  tip: string;
}

export interface HiddenGemRec {
  name: string;
  desc: string;
}

export interface CityRecommendations {
  restaurants: RestaurantRec[];
  shopping: ShoppingRec[];
  nightlife: NightlifeRec[];
  attractions: AttractionRec[];
  hiddenGems: HiddenGemRec[];
}

export interface CancellationRule {
  tier: string;
  condition: string;
  fee: string;
}

export interface BookingPolicies {
  cancellationRules: CancellationRule[];
  bookingConditions: string[];
  refundProcess: string[];
}

export interface InsurancePlan {
  id: string;
  name: string;
  tagline: string;
  priceSGD: number;
  popular?: boolean;
  medicalCoverageSGD: string;
  tripCancellationSGD: string;
  baggageDelaySGD: string;
  adventureSports: string;
  features: string[];
}

export interface Promotion {
  id: string;
  title: string;
  badge: string;
  discountCode: string;
  discountPercent: number;
  applicableDestinations: string[];
  heroImage: string;
  description: string;
  countdownDays: number;
  minSpendSGD: number;
}

export interface MasterTripNestData {
  brand: {
    name: string;
    tagline: string;
    description: string;
    type: string;
    singaporeLicense: string;
    hotline: string;
    supportEmail: string;
    address: string;
  };
  destinations: Destination[];
  tourPackages: TourPackage[];
  hotels: Hotel[];
  activities: Activity[];
  visaServices: VisaService[];
  airportTransfers: AirportTransfer[];
  customerReviews: CustomerReview[];
  travelGuides: TravelGuide[];
  localRecommendations: Record<string, CityRecommendations>;
  bookingPolicies: BookingPolicies;
  insurancePlans: InsurancePlan[];
  promotions: Promotion[];
}

export interface SearchState {
  destination: string;
  dates: string;
  travelers: number;
  budget: number;
  tripType: string;
}
