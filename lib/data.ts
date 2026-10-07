import enrichedData from '@/data/tripnest_enriched.json';
import { MasterTripNestData, TourPackage, Hotel, Activity, Destination } from '@/types';

export const masterData = enrichedData as unknown as MasterTripNestData;

export const brandInfo = masterData.brand;
export const allDestinations = masterData.destinations;
export const allPackages = masterData.tourPackages;
export const allHotels = masterData.hotels;
export const allActivities = masterData.activities;
export const allVisaServices = masterData.visaServices;
export const allTransfers = masterData.airportTransfers;
export const allReviews = masterData.customerReviews;
export const allGuides = masterData.travelGuides;
export const localRecommendations = masterData.localRecommendations;
export const bookingPolicies = masterData.bookingPolicies;
export const insurancePlans = masterData.insurancePlans;
export const activePromotions = masterData.promotions;

// Filter helpers
export function getTrendingDestinations(limit = 8): Destination[] {
  return allDestinations.slice(0, limit);
}

export function filterPackages(filters: {
  destination?: string;
  maxPrice?: number;
  badge?: string;
  duration?: string;
}): TourPackage[] {
  return allPackages.filter((pkg) => {
    if (filters.destination && filters.destination !== 'All' && !pkg.destinationName.toLowerCase().includes(filters.destination.toLowerCase()) && !pkg.title.toLowerCase().includes(filters.destination.toLowerCase())) {
      return false;
    }
    if (filters.maxPrice && pkg.priceSGD > filters.maxPrice) {
      return false;
    }
    if (filters.badge && filters.badge !== 'All' && pkg.badge !== filters.badge) {
      return false;
    }
    if (filters.duration && filters.duration !== 'All' && !pkg.duration.includes(filters.duration)) {
      return false;
    }
    return true;
  });
}

export function filterHotels(filters: {
  destination?: string;
  minStars?: number;
  maxPrice?: number;
}): Hotel[] {
  return allHotels.filter((hotel) => {
    if (filters.destination && filters.destination !== 'All' && !hotel.location.toLowerCase().includes(filters.destination.toLowerCase())) {
      return false;
    }
    if (filters.minStars && hotel.stars < filters.minStars) {
      return false;
    }
    if (filters.maxPrice && hotel.pricePerNightSGD > filters.maxPrice) {
      return false;
    }
    return true;
  });
}

export function filterActivities(category?: string): Activity[] {
  if (!category || category === 'All') return allActivities;
  return allActivities.filter((act) => act.category.toLowerCase() === category.toLowerCase());
}
