import json
import random

# Load original dataset
with open('tripnest_singapore_full_dataset.json', 'r', encoding='utf-8') as f:
    base_data = json.load(f)

# Destination metadata mapping
DEST_META = {
    "Singapore": {
        "country": "Singapore",
        "region": "Southeast Asia",
        "tagline": "The Lion City: Where Futuristic Architecture Meets Tropical Splendor",
        "bestSeason": "Nov – Apr (Dry & Breezy)",
        "quickFacts": ["3 Changi Airport Terminals with Skytrain", "English & Mandarin Widely Spoken", "World's Safest Metro & Street Food"],
        "heroImage": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1506351421178-63788970ee5b?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Urban Wonder",
        "temperature": "30°C",
        "currency": "SGD ($)"
    },
    "Bali": {
        "country": "Indonesia",
        "region": "Southeast Asia",
        "tagline": "Island of the Gods: Emerald Terraces, Sacred Temples & Coastal Luxury",
        "bestSeason": "Apr – Oct (Dry Sunny Season)",
        "quickFacts": ["Direct 2.5h flight from Singapore", "Visa on Arrival for 90+ Countries", "Luxury Private Pool Villas from SGD 180"],
        "heroImage": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Tropical Sanctuary",
        "temperature": "28°C",
        "currency": "IDR (Rp)"
    },
    "Tokyo": {
        "country": "Japan",
        "region": "East Asia",
        "tagline": "Hyper-Modern Metropolis: Neon Skylines, Ancient Shrines & Michelin Mastery",
        "bestSeason": "Mar – May & Oct – Nov",
        "quickFacts": ["Direct 6.5h flight via SQ/ANA", "World's Most Michelin-Starred City", "Shinkansen High Speed Rail Access"],
        "heroImage": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Culinary & Tech Hub",
        "temperature": "18°C",
        "currency": "JPY (¥)"
    },
    "Seoul": {
        "country": "South Korea",
        "region": "East Asia",
        "tagline": "Dynamic Energy: K-Wave Glamour, Royal Palaces & Night Market Feasts",
        "bestSeason": "Sep – Nov (Autumn Foliage)",
        "quickFacts": ["Direct 6h flight from Changi", "24-Hour Cafe & Street Food Culture", "K-ETA Easy Electronic Travel Auth"],
        "heroImage": "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1546874177-9e664107314e?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Cultural Vanguard",
        "temperature": "16°C",
        "currency": "KRW (₩)"
    },
    "Bangkok": {
        "country": "Thailand",
        "region": "Southeast Asia",
        "tagline": "Sensory Tapestry: Chao Phraya Riverside Grandeur & Street Gourmet Paradise",
        "bestSeason": "Nov – Feb (Cool & Pleasant)",
        "quickFacts": ["Quick 2h flight from Singapore", "Visa-Free for ASEAN & EU Passports", "World-renowned Luxury Spas & Rooftops"],
        "heroImage": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1563492065599-3580f7752ed8?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Gourmet Capital",
        "temperature": "31°C",
        "currency": "THB (฿)"
    },
    "Phuket": {
        "country": "Thailand",
        "region": "Southeast Asia",
        "tagline": "Andaman Jewel: Aquamarine Lagoons, Catamaran Cruises & Clifftop Resorts",
        "bestSeason": "Dec – Apr (Calm Turquoise Seas)",
        "quickFacts": ["1h 45m direct flight from SIN", "Private island speedboats available", "UNESCO City of Gastronomy"],
        "heroImage": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Tropical Luxury",
        "temperature": "29°C",
        "currency": "THB (฿)"
    },
    "Dubai": {
        "country": "United Arab Emirates",
        "region": "Middle East",
        "tagline": "Ultra-Luxury Oasis: Golden Dunes, Architectural Wonders & High Octane Living",
        "bestSeason": "Nov – Mar (Balmy Warm Days)",
        "quickFacts": ["Direct 7h Emirates/SQ flights", "Tax-Free Luxury Shopping Destination", "Desert Glamping & Supercar Rentals"],
        "heroImage": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Opulent Marvel",
        "temperature": "26°C",
        "currency": "AED (د.إ)"
    },
    "Maldives": {
        "country": "Maldives",
        "region": "South Asia",
        "tagline": "Unrivalled Serenity: Overwater Bungalows, Coral Atolls & Bioluminescent Bays",
        "bestSeason": "Dec – Apr (Dry & Crystal Clear)",
        "quickFacts": ["4.5h direct flight from Changi", "Seaplane Transfers Included in Resorts", "30-Day Free Visa for All Nationalities"],
        "heroImage": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Honeymoon Paradise",
        "temperature": "29°C",
        "currency": "USD / MVR"
    },
    "Sydney": {
        "country": "Australia",
        "region": "Oceania",
        "tagline": "Harbour Splendor: Golden Surf Coasts, Opera House Sunsets & Coastal Escapes",
        "bestSeason": "Oct – Apr (Southern Hemisphere Summer)",
        "quickFacts": ["Direct 7.5h flight overnight", "Convenient Australian ETA app", "Iconic Coastal Cliff Walks & Wineries"],
        "heroImage": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Harbour Lifestyle",
        "temperature": "24°C",
        "currency": "AUD (A$)"
    },
    "Melbourne": {
        "country": "Australia",
        "region": "Oceania",
        "tagline": "Cultural & Coffee Epicenter: Laneway Art, Great Ocean Road & Vineyard Valley",
        "bestSeason": "Nov – Mar",
        "quickFacts": ["7.5h direct flight from SIN", "World's Best Specialty Coffee Capital", "Yarra Valley Wine Tastings"],
        "heroImage": "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1545044846-351ba102b6d5?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Art & Espresso",
        "temperature": "22°C",
        "currency": "AUD (A$)"
    },
    "Paris": {
        "country": "France",
        "region": "Europe",
        "tagline": "City of Lights: Haussmannian Elegance, Haute Couture & Seine River Romances",
        "bestSeason": "May – Sep",
        "quickFacts": ["Direct 13h flight with SQ & Air France", "Schengen Visa Accepted", "Over 40,000 Art Pieces at Louvre & Orsay"],
        "heroImage": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Haute Elegance",
        "temperature": "19°C",
        "currency": "EUR (€)"
    },
    "London": {
        "country": "United Kingdom",
        "region": "Europe",
        "tagline": "Timeless Cosmopolis: Royal Heritage, West End Drama & Historic Pub Culture",
        "bestSeason": "May – Oct",
        "quickFacts": ["Direct 13.5h flight from SIN", "UK ETA / Visa Free for Singaporeans", "World Class Museums with Free Admission"],
        "heroImage": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Heritage & Arts",
        "temperature": "17°C",
        "currency": "GBP (£)"
    },
    "Rome": {
        "country": "Italy",
        "region": "Europe",
        "tagline": "The Eternal City: Colosseum Legends, Baroque Fountains & Trastevere Evenings",
        "bestSeason": "Apr – Jun & Sep – Oct",
        "quickFacts": ["Direct seasonal flights from SIN", "Vatican City & Sistine Chapel Privileges", "Trattoria Pasta & Espresso Heritage"],
        "heroImage": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Living Antiquity",
        "temperature": "23°C",
        "currency": "EUR (€)"
    },
    "Zurich": {
        "country": "Switzerland",
        "region": "Europe",
        "tagline": "Alpine Prestige: Pristine Glaciers, Swiss Alps Express & Lakefront Luxury",
        "bestSeason": "Jun – Aug (Alpine) or Dec – Mar (Ski)",
        "quickFacts": ["Direct 12.5h flight via Swiss/SQ", "Swiss Travel Pass Unlimited Trains", "Pristine Lake & Mountain Air Quality"],
        "heroImage": "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Alpine Serenity",
        "temperature": "14°C",
        "currency": "CHF (Fr)"
    },
    "Istanbul": {
        "country": "Turkey",
        "region": "Europe/Asia",
        "tagline": "Crossroads of Continents: Bosphorus Sunsets, Byzantine Domes & Grand Bazaar",
        "bestSeason": "Apr – May & Sep – Nov",
        "quickFacts": ["Direct 10.5h flight via Turkish Airlines", "Spans Two Continents Simultaneously", "World-renowned Hammam & Turkish Cuisine"],
        "heroImage": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Historic Crossroads",
        "temperature": "21°C",
        "currency": "TRY (₺)"
    },
    "Osaka": {
        "country": "Japan",
        "region": "East Asia",
        "tagline": "The Nation's Kitchen: Dotonbori Neon, Street Takoyaki & Castle Grandeur",
        "bestSeason": "Mar – May & Oct – Dec",
        "quickFacts": ["Direct 6.5h flight from SIN", "Kuromon Market Gourmet Seafood", "Universal Studios Japan VIP Access"],
        "heroImage": "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Street Food Realm",
        "temperature": "19°C",
        "currency": "JPY (¥)"
    },
    "Kyoto": {
        "country": "Japan",
        "region": "East Asia",
        "tagline": "Spiritual Grace: Thousand-Year Zen Gardens, Bamboo Groves & Geisha Heritage",
        "bestSeason": "Apr (Cherry Blossom) & Nov (Maple Foliage)",
        "quickFacts": ["15 mins Shinkansen from Shin-Osaka", "1,600+ Buddhist Temples & Shrines", "Private Tea Ceremonies & Kaiseki Dinners"],
        "heroImage": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Zen & Heritage",
        "temperature": "17°C",
        "currency": "JPY (¥)"
    },
    "Busan": {
        "country": "South Korea",
        "region": "East Asia",
        "tagline": "Coastal Dynamic: Haeundae Beaches, Jagalchi Seafood & Clifftop Temples",
        "bestSeason": "May – Jun & Sep – Oct",
        "quickFacts": ["Direct flights or 2.5h KTX train from Seoul", "Famous Haedong Yonggungsa Seaside Temple", "Luxury Marina Yacht Charters"],
        "heroImage": "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Seaside Energy",
        "temperature": "20°C",
        "currency": "KRW (₩)"
    },
    "Hong Kong": {
        "country": "Hong Kong SAR",
        "region": "East Asia",
        "tagline": "Vertical Wonder: Victoria Peak Panoramas, Dim Sum Institutions & Star Ferry",
        "bestSeason": "Oct – Dec (Crisp & Clear Skies)",
        "quickFacts": ["3.5h direct flight from Changi", "Iconic Victoria Harbour Skyline", "Michelin-starred Dim Sum & Rooftop Bars"],
        "heroImage": "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Skyline & Harbour",
        "temperature": "22°C",
        "currency": "HKD (HK$)"
    },
    "Taipei": {
        "country": "Taiwan",
        "region": "East Asia",
        "tagline": "Warmth & Flavor: Taipei 101 Panoramas, Jiufen Teahouses & Night Market Magic",
        "bestSeason": "Oct – Dec & Mar – May",
        "quickFacts": ["Direct 4.5h flight from Singapore", "World-renowned Shilin & Raohe Markets", "Convenient High-Speed Rail & MRT"],
        "heroImage": "https://images.unsplash.com/photo-1470004914216-3077857a64e5?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1508247967583-7d982ea01526?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Warm Hospitality",
        "temperature": "23°C",
        "currency": "TWD (NT$)"
    }
}

# Enrich destinations
enriched_destinations = []
for dest in base_data["destinations"]:
    name = dest["name"]
    meta = DEST_META.get(name, {
        "country": name,
        "region": "International",
        "tagline": f"Discover the magic and beauty of {name}",
        "bestSeason": "All Year Round",
        "quickFacts": ["Direct connecting flights from Singapore", "Guided private concierge available", "Instant booking confirmation"],
        "heroImage": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80",
        "thumbnailImage": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
        "curatedTag": "Featured Gem",
        "temperature": "24°C",
        "currency": "SGD"
    })
    enriched_destinations.append({
        **dest,
        **meta
    })

# Curated Package Highlights & Inclusions bank
PACKAGE_THEMES = [
    {
        "badge": "Signature Luxury",
        "highlights": ["Private VIP Airport Fast-track & Mercedes Chauffeur", "Stays at Handpicked 5-Star Heritage Properties", "Exclusive Chef's Table 7-Course Degustation", "Private Licensed Historian & Fast-Pass Access"],
        "facilities": ["Complimentary High-speed Mobile Wi-Fi", "24/7 Dedicated WhatsApp Travel Butler", "Complimentary Photography Session (30 Retouched Photos)", "Comprehensive Emergency Medical Insurance Included"],
        "inclusions": ["5-Star Luxury Accommodations with Daily Champagne Breakfast", "Private Luxury Chauffeur Transfers & Sightseeing", "All Attraction Entry Passes with Skip-The-Line VIP Privileges", "English/Mandarin Certified Private Tour Guide", "Taxes, Tolls & Resort Gratuities Included"]
    },
    {
        "badge": "Family Escapes",
        "highlights": ["Kid-Friendly Experiential Workshops & Wildlife Safaris", "Connected Family Suites in Premier Family Resorts", "Private Private Van with Child Safety Seats", "Flexible Pace with Afternoon Leisure Blocks"],
        "facilities": ["Child Seat & Stroller Loan Service", "Complimentary Baby Cots & Welcome Activity Kits", "24/7 Family Assistance Concierge", "Priority Theme Park & Aquarium Access"],
        "inclusions": ["Family Suite Accommodations with Daily Buffet Breakfast", "Private Spacious MPV Transport with Friendly Chauffeur", "VIP Family Passes to Top 3 Theme Parks & Attractions", "Interactive Cultural Cooking or Craft Workshop", "Complimentary Ice Creams & Local Refreshments Daily"]
    },
    {
        "badge": "Active Discovery",
        "highlights": ["Sunrise Summit Treks & Hidden Waterfall Expeditions", "Curated Off-the-Beaten-Path Eco Adventures", "Scenic Helicopter or Hot Air Balloon Flight Experience", "Local Village Farm-to-Table Gastronomy"],
        "facilities": ["High-Spec Outdoor Gear & Trekking Poles Provided", "First Aid Certified Wilderness Specialist", "Hydration Packs & Nutritious Trail Provisions", "GoPro Rental with Memory Card Retained"],
        "inclusions": ["Boutique Eco-Lodge or Clifftop Accommodations", "Private 4x4 or Luxury Cruiser Transportation", "All National Park Permits & Adventure Fees", "Certified Adventure Guide & Safety Crew", "Daily Breakfast & Hearty Adventure Lunches"]
    },
    {
        "badge": "Cultural Immersion",
        "highlights": ["Private Access to Sacred Temples & Palaces at Dawn", "Exclusive Tea Ceremony or Artisan Craft Masterclass", "Behind-the-Scenes Guided Culinary Market Tour", "Evening Traditional Performance with Front-Row Seating"],
        "facilities": ["Whisper Audio Guide Headsets for Crisp Audio", "Bilingual Cultural Scholar Guides", "Complimentary Traditional Attire Rental for Photos", "Express Check-in & Luggage Forwarding"],
        "inclusions": ["Centrally Located Boutique Heritage Hotels", "Private Air-Conditioned Executive Chauffeur", "Curated Local Tasting Feasts & Michelin Bib Gourmand Meals", "Special Temple Donations & Exclusive Access Fees", "Souvenir Artisan Keepsake Gift Box"]
    }
]

PACKAGE_IMAGES = [
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
]

# Enrich packages with itineraries and rich metadata
enriched_packages = []
for idx, pkg in enumerate(base_data["tourPackages"]):
    # Extract destination from title
    dest_name = pkg["title"].split(" ")[0]
    theme = PACKAGE_THEMES[idx % len(PACKAGE_THEMES)]
    
    # Generate interactive day-by-day itinerary
    duration_str = pkg["duration"]
    num_days = int(duration_str.split(" ")[0]) if duration_str.split(" ")[0].isdigit() else 4
    
    itinerary_days = []
    sample_day_templates = [
        {"title": f"VIP Arrival & {dest_name} Sunset Welcome", "desc": "Changi flight arrival, private VIP airport greeting, private limousine check-in at luxury partner hotel, and welcome sunset cocktail on the skyline terrace."},
        {"title": f"Historic Landmarks & Private Scholar Tour", "desc": f"Skip-the-line private access to {dest_name}'s premier heritage monuments, guided by a licensed historian, followed by a Michelin-guide curated lunch."},
        {"title": f"Hidden Gems & Local Culinary Immersion", "desc": f"Explore secret artisan quarters of {dest_name}, private tea or coffee tasting session, and an authentic gourmet street food safari with local culinary masters."},
        {"title": f"Scenic Nature & Panorama Exploration", "desc": f"Morning private excursion to iconic natural wonders around {dest_name}, coastal or mountain panoramic viewpoints, and afternoon spa relaxation."},
        {"title": f"Cultural Arts & Craftsmanship Masterclass", "desc": f"Hands-on workshop with a master artisan, private gallery or museum viewing, and an intimate 5-course dinner paired with local wines."},
        {"title": f"Coastal Cruise & Island Discovery", "desc": f"Private catamaran charter exploring scenic bays, pristine waters, snorkeling reef adventure, and freshly grilled seafood on board."},
        {"title": f"Luxury Shopping & Leisure Discovery", "desc": f"Personal stylist assisted shopping experience in luxury flagship avenues, afternoon high tea, and rooftop lounge nightlife."},
        {"title": f"Highland Retreat & Botanical Wonder", "desc": f"Day retreat into cooler mountain elevations, visiting lush tea estates or botanical gardens with private chauffeur at leisure."},
        {"title": f"Farewell Masterpiece & Departure", "desc": f"Morning relaxation and late check-out privileges, souvenir artisan tasting hamper presentation, and private executive transfer to the international airport."}
    ]
    
    for d in range(1, num_days + 1):
        day_t = sample_day_templates[(d - 1) % len(sample_day_templates)]
        itinerary_days.append({
            "day": d,
            "title": f"Day {d}: {day_t['title']}",
            "summary": day_t["desc"],
            "steps": [
                {"time": "09:00 AM", "activity": "Morning Breakfast & Private Pick-up", "detail": "Sumptuous hotel buffet & personal chauffeur arrival at hotel lobby."},
                {"time": "11:30 AM", "activity": f"Curated {dest_name} Highlight Tour", "detail": day_t["desc"][:80] + "..."},
                {"time": "02:00 PM", "activity": "Michelin Recommended Gastronomy", "detail": "Reserved VIP dining at handpicked local dining establishments."},
                {"time": "05:30 PM", "activity": "Golden Hour Sunset Experience", "detail": "Panoramic viewpoints, photography stop, and evening cocktail reception."}
            ]
        })

    enriched_packages.append({
        **pkg,
        "destinationName": dest_name,
        "badge": theme["badge"],
        "rating": round(4.8 + (idx % 3) * 0.08, 2),
        "reviewCount": 120 + (idx * 7) % 380,
        "image": PACKAGE_IMAGES[idx % len(PACKAGE_IMAGES)],
        "highlights": theme["highlights"],
        "facilities": theme["facilities"],
        "inclusions": theme["inclusions"],
        "itinerary": itinerary_days,
        "cancellationPolicy": "Free cancellation up to 7 days before departure. 100% money-back guarantee."
    })

# Curated Hotel metadata
HOTEL_PRESTIGE_NAMES = [
    "The Ritz-Carlton Reserve & Spa", "Marina Bay Grand Horizon", "Aman Serenity Sanctuary", "Four Seasons Clifftop Villas",
    "Capella Heritage Heritage Estate", "Bulgari Luxury Ocean Resort", "Mandarin Oriental Executive Suites",
    "Park Hyatt Panoramic Tower", "St. Regis Presidential Retreat", "Banyan Tree Rainforest Haven",
    "Rosewood Royal Waterfront", "The Peninsula Landmark Palace", "W Hotel Marvel Suites", "InterContinental Grand Luxe",
    "Waldorf Astoria Sky Penthouse", "Six Senses Eco Sanctuary", "JW Marriott Horizon Club", "Shangri-La Valley Resort",
    "Conrad Executive Haven", "The Langham Timeless Splendor"
]

HOTEL_LOCATIONS = [
    "Marina Bay District", "Seminyak Beachfront", "Ginza Luxury Avenue", "Gangnam Boulevard", "Chao Phraya Riverside",
    "Surin Beach Cliff", "Downtown Burj Boulevard", "North Malé Atoll", "Circular Quay Harbour", "Southbank Riverfront",
    "Champs-Élysées 8th Arr.", "Mayfair Westminster", "Spanish Steps Historic Quarter", "Lake Zurich Promenade",
    "Bosphorus Strait Waterway", "Umeda Sky Quarter", "Gion Historic Lane", "Haeundae Beach Marina", "Victoria Harbourfront",
    "Xinyi District Taipei 101"
]

HOTEL_IMAGES = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80"
]

HOTEL_FACILITIES_POOL = [
    ["Rooftop Infinity Pool", "Michelin-Star Restaurant", "24/7 Butler Concierge", "Full Hydrotherapy Spa", "Airport Limousine Service", "Panoramic Skyline Lounge"],
    ["Private Beach Access", "Overwater Cabanas", "Vitality Pool & Onsen", "Champagne Breakfast Included", "PADI Diving Facility", "Tennis Court"],
    ["Executive Club Lounge", "Soundproof Panoramic Suites", "Heated Indoor Lap Pool", "Technogym Fitness Pavilion", "Valet Parking", "Meeting Boardroom"],
    ["Traditional Zen Courtyard", "Thermal Spring Onsen", "Fine Kaiseki In-Suite Dining", "Tea Sommelier Experience", "Bespoke Silk Robes", "Japanese Garden View"]
]

enriched_hotels = []
for idx, hot in enumerate(base_data["hotels"]):
    name_prefix = HOTEL_PRESTIGE_NAMES[idx % len(HOTEL_PRESTIGE_NAMES)]
    loc = HOTEL_LOCATIONS[idx % len(HOTEL_LOCATIONS)]
    fac = HOTEL_FACILITIES_POOL[idx % len(HOTEL_FACILITIES_POOL)]
    # Give realistic star ratings (3 to 5 stars for premium marketplace)
    computed_stars = 4 if hot["stars"] < 3 else (5 if hot["stars"] >= 4 else 3)
    enriched_hotels.append({
        "id": hot["id"],
        "name": f"{name_prefix} {loc.split(' ')[0]}",
        "stars": computed_stars,
        "ratingScore": round(4.6 + (idx % 4) * 0.1, 1),
        "reviewCount": 85 + (idx * 11) % 450,
        "reviewSentiment": "Exceptional" if idx % 2 == 0 else "Superb",
        "pricePerNightSGD": hot["pricePerNightSGD"] + 150 + (idx % 5) * 45,
        "location": loc,
        "facilities": fac,
        "roomType": "Deluxe King Skyline Suite" if idx % 2 == 0 else "Premier Panoramic Ocean Villa",
        "availability": "Instant Confirmation" if idx % 3 != 0 else "Only 2 Rooms Left",
        "image": HOTEL_IMAGES[idx % len(HOTEL_IMAGES)]
    })

# Curated Activities
ACTIVITY_CATEGORIES = ["Adventure", "Culture", "Food", "Family", "Nature", "Luxury"]
ACTIVITY_NAMES = [
    ("Sunrise Hot Air Balloon Flight with Champagne", "Adventure", "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=1000&q=80"),
    ("Secret Street Food & Michelin Hawker Tour", "Food", "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"),
    ("Private Bamboo Forest Tea Ceremony & Zen Meditation", "Culture", "https://images.unsplash.com/photo-1545044846-351ba102b6d5?auto=format&fit=crop&w=1000&q=80"),
    ("Private Luxury Catamaran Island Hopping & Snorkel", "Luxury", "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"),
    ("Interactive Wildlife Night Safari & Tram Tour", "Family", "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80"),
    ("Volcanic Crater Trek & Natural Hot Springs", "Nature", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"),
    ("Royal Palace & Sacred Temples Fast-Track Access", "Culture", "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80"),
    ("Hands-On Master Chef Cooking Class & Organic Farm", "Food", "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=1000&q=80"),
    ("Helicopter Scenic Flight over Skyline & Harbours", "Luxury", "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80"),
    ("Sea Turtle Sanctuary & Coral Reef Restoration Dive", "Nature", "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80"),
    ("Desert 4x4 Dune Bashing & Starlit Luxury Bedouin Dinner", "Adventure", "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&w=1000&q=80"),
    ("Universal Studios VIP Experience with Guide", "Family", "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80")
]

enriched_activities = []
for idx, act in enumerate(base_data["activities"]):
    item = ACTIVITY_NAMES[idx % len(ACTIVITY_NAMES)]
    dest = enriched_destinations[idx % len(enriched_destinations)]["name"]
    enriched_activities.append({
        "id": act["id"],
        "title": f"{item[0]} ({dest})",
        "category": item[1],
        "destinationName": dest,
        "duration": f"{(idx % 5) + 3} Hours",
        "priceSGD": 89 + (idx % 7) * 35,
        "rating": round(4.85 + (idx % 3) * 0.05, 2),
        "reviewCount": 94 + (idx * 13) % 520,
        "image": item[2],
        "highlights": [
            "Includes private pickup and return transfers",
            "Small boutique group or private option available",
            "Certified English-speaking professional host",
            "All entrance fees & equipment provided"
        ]
    })

# Curated Visa Services
VISA_COUNTRIES_DATA = [
    {"country": "Japan", "flag": "🇯🇵", "processingTime": "3 – 5 Business Days", "fee": 85, "type": "eVisa / Single & Multiple Entry", "validity": "Up to 3 Years", "docs": ["Valid Passport (min 6 months)", "Flight Itinerary Confirmed", "Recent Passport Photo", "Bank Statement (Last 3 Months)"]},
    {"country": "South Korea", "flag": "🇰🇷", "processingTime": "24 – 48 Hours", "fee": 45, "type": "K-ETA Electronic Authorization", "validity": "3 Years Multiple", "docs": ["Passport Bio Page", "Valid Email Address", "Digital Portrait Photo", "Accommodation Address in Korea"]},
    {"country": "Schengen Area (France/Swiss/Italy)", "flag": "🇪🇺", "processingTime": "7 – 12 Business Days", "fee": 160, "type": "Schengen Tourist Visa", "validity": "90 Days within 180 Days", "docs": ["Passport with 2 Blank Pages", "Travel Insurance (€30,000 min)", "Flight & Hotel Bookings", "Proof of Employment / Payslips"]},
    {"country": "United Kingdom", "flag": "🇬🇧", "processingTime": "5 – 10 Business Days", "fee": 195, "type": "Standard Visitor Visa / UK ETA", "validity": "6 Months to 2 Years", "docs": ["Passport", "Financial Solvency Proof", "Travel Itinerary", "Accommodation Proof"]},
    {"country": "Australia", "flag": "🇦🇺", "processingTime": "Instant to 48 Hours", "fee": 55, "type": "Subclass 601 ETA Electronic", "validity": "12 Months (3-Month stays)", "docs": ["Passport Bio Page", "Australian ETA Mobile Scan", "Selfie Verification"]},
    {"country": "United States", "flag": "🇺🇸", "processingTime": "24 Hours (ESTA) / 10 Days (B1/B2)", "fee": 95, "type": "ESTA / B1-B2 Non-Immigrant", "validity": "2 Years (ESTA) / 10 Years", "docs": ["Valid Passport", "DS-160 Form", "Employment Verification", "Travel Plan"]},
    {"country": "China", "flag": "🇨🇳", "processingTime": "4 – 6 Business Days", "fee": 120, "type": "L Tourist Visa (Single/Double)", "validity": "30 – 90 Days", "docs": ["Original Passport", "Roundtrip Air Ticket", "Hotel Booking Confirmation", "Visa Application Form"]},
    {"country": "United Arab Emirates", "flag": "🇦🇪", "processingTime": "2 – 3 Business Days", "fee": 110, "type": "Tourist eVisa (30/60 Days)", "validity": "60 Days from Issue", "docs": ["Passport Color Scan", "Passport Photograph with White Background", "Confirmed Return Ticket"]},
    {"country": "Indonesia (Bali)", "flag": "🇮🇩", "processingTime": "Instant Online", "fee": 50, "type": "Electronic Visa on Arrival (e-VOA)", "validity": "30 Days (Extendable)", "docs": ["Passport min 6 months validity", "Return Flight Out of Indonesia", "Digital Payment"]},
    {"country": "Thailand", "flag": "🇹🇭", "processingTime": "Instant / 2 Days", "fee": 40, "type": "Digital Entry & Visa Exemption", "validity": "30 – 60 Days", "docs": ["Passport Scan", "Confirmed Onward Travel", "Proof of Accommodation"]}
]

enriched_visas = []
for idx, vis in enumerate(base_data["visaServices"]):
    v_data = VISA_COUNTRIES_DATA[idx % len(VISA_COUNTRIES_DATA)]
    enriched_visas.append({
        "id": vis["id"],
        "country": v_data["country"],
        "flag": v_data["flag"],
        "processingTime": v_data["processingTime"],
        "visaFeesSGD": v_data["fee"] + (idx % 3) * 5,
        "entryType": v_data["type"],
        "validity": v_data["validity"],
        "successRate": "99.8%",
        "requiredDocuments": v_data["docs"],
        "applicationProcess": [
            "Submit online application form & upload documents",
            "TripNest immigration specialist reviews & verifies accuracy within 2 hours",
            "Direct submission to embassy/government consular portal",
            "Receive approved official eVisa PDF via email & WhatsApp"
        ]
    })

# Airport Transfers
TRANSFER_MODELS = [
    {"type": "Mercedes-Benz E-Class Executive", "passengers": 3, "luggage": 3, "price": 85, "image": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"},
    {"type": "Toyota Alphard / Vellfire VIP MPV", "passengers": 5, "luggage": 5, "price": 120, "image": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80"},
    {"type": "Tesla Model Y Performance Green Fleet", "passengers": 3, "luggage": 3, "price": 95, "image": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80"},
    {"type": "Mercedes-Benz S-Class Ultra Luxury", "passengers": 3, "luggage": 2, "price": 190, "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80"},
    {"type": "Mercedes Sprinter VIP Minibus", "passengers": 12, "luggage": 12, "price": 240, "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"}
]

enriched_transfers = []
for idx, trf in enumerate(base_data["airportTransfers"]):
    model = TRANSFER_MODELS[idx % len(TRANSFER_MODELS)]
    dest = enriched_destinations[idx % len(enriched_destinations)]["name"]
    enriched_transfers.append({
        "id": trf["id"],
        "vehicleType": model["type"],
        "category": "Private Transfer",
        "destinationName": dest,
        "capacityPassengers": model["passengers"],
        "capacityLuggage": model["luggage"],
        "priceSGD": model["price"] + (idx % 4) * 10,
        "image": model["image"],
        "pickupInfo": f"Changi / {dest} International Airport: Dedicated terminal meet & greet with personalized iPad name banner. 60-minute complimentary flight delay waiting time included.",
        "features": [
            "Complimentary Flight Radar tracking",
            "Chilled San Pellegrino / Evian water & cold towels",
            "High-speed onboard 5G Wi-Fi & device chargers",
            "Child safety seats available upon reservation",
            "All road tolls, airport surcharges & parking inclusive"
        ]
    })

# Customer Reviews
REVIEW_AUTHORS = [
    {"name": "Sarah Lin-Tan", "city": "Singapore", "country": "Singapore", "type": "Family Vacation (4 pax)", "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80", "trip": "Tokyo Cherry Blossom Explorer", "quote": "TripNest handled every detail flawlessly. The private tea ceremony in Kyoto and having our bullet train seats booked together with kids was seamless. Truly a 7-star concierge experience!"},
    {"name": "David Henderson", "city": "Sydney", "country": "Australia", "type": "Luxury Couple Getaway", "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", "trip": "Maldives Overwater Sanctuary", "quote": "From our private seaplane transfer to sunset champagne dolphin cruising, TripNest delivered what no typical booking portal can. Their WhatsApp assistant responded within 90 seconds whenever we needed dinner reservations."},
    {"name": "Claire & Marcus Wong", "city": "Hong Kong", "country": "Hong Kong", "type": "Honeymoon Escape", "avatar": "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=400&q=80", "trip": "Bali Clifftop Villa & Culture", "quote": "We booked the Bali Signature Package. The private pool villa in Uluwatu was breathtaking, and having our own private chauffeur throughout made us feel like royalty without the exorbitant price tag."},
    {"name": "Julian Moreau", "city": "Paris", "country": "France", "type": "Solo Cultural Traveler", "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80", "trip": "Singapore Urban Explorer", "quote": "As someone visiting Southeast Asia for the first time, TripNest's curated guide and fast-track attraction access allowed me to experience the real Singapore without queueing for hours under the sun."},
    {"name": "Dr. Priya Nair", "city": "Kuala Lumpur", "country": "Malaysia", "type": "Executive Retreat", "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80", "trip": "Seoul K-Wave & Culinary Tour", "quote": "Exceptional curation. The private market tour in Seoul led by a professional chef was the highlight of our year. TripNest Singapore sets the golden standard for Asian travel marketplaces."},
    {"name": "Benjamin & Sophie Clark", "city": "London", "country": "United Kingdom", "type": "Active Duo Discovery", "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80", "trip": "Zurich Alpine & Glaciers", "quote": "The Swiss rail passes and scenic panorama train bookings were all linked into our TripNest mobile dashboard. Transparent pricing in SGD with zero hidden conversion fees."}
]

enriched_reviews = []
for idx, rev in enumerate(base_data["customerReviews"]):
    author = REVIEW_AUTHORS[idx % len(REVIEW_AUTHORS)]
    enriched_reviews.append({
        "id": rev["id"],
        "rating": 5,
        "comment": author["quote"],
        "authorName": author["name"],
        "authorCity": author["city"],
        "authorCountry": author["country"],
        "travelerType": author["type"],
        "packageTitle": author["trip"],
        "avatarUrl": author["avatar"],
        "verifiedBooking": True,
        "date": f"October {2026 if idx % 2 == 0 else 2025}"
    })

# Travel Guides (Editorial Magazine Style)
GUIDE_TOPICS = [
    {
        "title": "The Connoisseur's Guide to Singapore: Michelin Hawkers to Sky Villas",
        "destinationName": "Singapore",
        "readTime": "6 min read",
        "author": "Evelyn Chen, Senior Travel Editor",
        "heroImage": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
        "tag": "Gastronomy & Architecture",
        "excerpt": "How the Little Red Dot redefined 21st-century urban living through biophilic architecture, world-record infinity pools, and a heritage food culture recognized by UNESCO.",
        "keyTakeaway": "Explore Chinatown Complex early morning for legendary Claypot rice, followed by evening gin degustation at ATLAS Bar."
    },
    {
        "title": "Kyoto Unveiled: The Art of Quiet Ryokans & Hidden Moss Gardens",
        "destinationName": "Kyoto",
        "readTime": "8 min read",
        "author": "Kenji Takahashi, Cultural Anthropologist",
        "heroImage": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
        "tag": "Spiritual Retreat",
        "excerpt": "Beyond the crowded gates of Fushimi Inari lies an ancient city of quiet tea rituals, cypress onsens, and cedar-scented temples that awaken the spirit.",
        "keyTakeaway": "Stay in a traditional machiya in Gion to hear the morning temple bells before tourist footfall begins."
    },
    {
        "title": "The Clifftop Architecture of Bali: Uluwatu to Nusa Lembongan",
        "destinationName": "Bali",
        "readTime": "7 min read",
        "author": "Maya Sastrowardoyo, Architectural Historian",
        "heroImage": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
        "tag": "Tropical Design",
        "excerpt": "A visual odyssey into sustainable bamboo pavilions, clifftop infinity pools cantilevered over the Indian Ocean, and sacred Balinese temple aesthetics.",
        "keyTakeaway": "Charter a private catamaran at dawn from Sanur to snorkel with manta rays around Nusa Penida."
    },
    {
        "title": "Seoul by Night: The Neon Alleys, Han River Picnics & K-Culinary Revolution",
        "destinationName": "Seoul",
        "readTime": "5 min read",
        "author": "Min-ho Park, Lifestyle Journalist",
        "heroImage": "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=80",
        "tag": "Urban Culture",
        "excerpt": "Why Seoul is Asia's most energetic capital after dark — from subterranean speakeasies in Euljiro to midnight Han River ramen and high-fashion pop-ups in Seongsu.",
        "keyTakeaway": "Rent an e-bike along Yeouido Park at dusk for the most dazzling views of the Han River bridges."
    },
    {
        "title": "Swiss Alpine Horizons: Riding the Glacier Express in Luxury Class",
        "destinationName": "Zurich",
        "readTime": "9 min read",
        "author": "Beatrix von Bern, Alpine Expeditionist",
        "heroImage": "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=1200&q=80",
        "tag": "Scenic Railways",
        "excerpt": "An in-depth guide to traversing snow-capped passes, dramatic viaducts, and pristine mountain villages with a private window into the Swiss Alps.",
        "keyTakeaway": "Book the Excellence Class seat months in advance for 5-course regional wine pairings at 2,000m altitude."
    }
]

enriched_guides = []
for idx, gui in enumerate(base_data["travelGuides"]):
    top = GUIDE_TOPICS[idx % len(GUIDE_TOPICS)]
    enriched_guides.append({
        "id": gui["id"],
        "title": f"{top['title']} (Vol. {(idx // len(GUIDE_TOPICS)) + 1})",
        "destinationName": top["destinationName"],
        "readTime": top["readTime"],
        "author": top["author"],
        "heroImage": top["heroImage"],
        "tag": top["tag"],
        "excerpt": top["excerpt"],
        "keyTakeaway": top["keyTakeaway"]
    })

# Local Recommendations (Comprehensive City Guides)
LOCAL_RECOMMENDATIONS = {
    "Singapore": {
        "restaurants": [
            {"name": "Odette (National Gallery)", "cuisine": "Modern French 3-Star Michelin", "highlight": "Artisanal culinary poetry in a sunlit historic gallery setting."},
            {"name": "Burnt Ends (Dempsey Hill)", "cuisine": "Modern Australian Wood-Fired", "highlight": "World Top 50 restaurant famous for gourmet barbecue & sanger burgers."},
            {"name": "Maxwell Food Centre - Tian Tian", "cuisine": "Heritage Hainanese Chicken Rice", "highlight": "Fragrant ginger chicken rice celebrated by Anthony Bourdain."}
        ],
        "shopping": [
            {"district": "Orchard Road Luxury Belt", "vibe": "ION Orchard & Paragon Flagships", "specialty": "Haute couture boutiques & private salon lounges."},
            {"district": "Haji Lane & Kampong Glam", "vibe": "Indie Shophouses & Artisans", "specialty": "Custom fragrances, handcrafted leather, and local indie brands."}
        ],
        "nightlife": [
            {"venue": "1-Altitude Coast & Smoke & Mirrors", "type": "Panoramic Rooftop Bar", "specialty": "Craft botanic cocktails with front-row view of Marina Bay light show."},
            {"venue": "ATLAS Bar (Parkview Square)", "type": "Grand Art Deco Lobby & Gin Tower", "specialty": "Houses over 1,000 rare gins in a stunning Gatsby-esque hall."}
        ],
        "attractions": [
            {"name": "Gardens by the Bay Supertree Grove", "tip": "Visit at 7:45 PM for the synchronized Garden Rhapsody sound & light show."},
            {"name": "Mandai Rainforest Lumina & Night Safari", "tip": "Pre-book the priority tram to explore nocturnal animal habitats up close."}
        ],
        "hiddenGems": [
            {"name": "Gillman Barracks Contemporary Arts", "desc": "Colonial military barracks transformed into world-class art pavilions and craft bistros."},
            {"name": "Keppel Bay Boardwalk & Marina", "desc": "Stroll past superyachts at sunset followed by fresh seafood by the harbor."}
        ]
    },
    "Bali": {
        "restaurants": [
            {"name": "Locavore NXT (Ubud)", "cuisine": "Modern Indonesian Hyper-Local", "highlight": "Visionary 16-course culinary journey celebrating indigenous ingredients."},
            {"name": "Kubu at Mandapa (Ayung River)", "cuisine": "Mediterranean Fine Dining", "highlight": "Private bamboo dining cocoons whispering along the rushing jungle river."}
        ],
        "shopping": [
            {"district": "Seminyak Oberoi Street", "vibe": "Bohemian Resort Chic", "specialty": "Linen collections, bespoke silver jewelry & curated home decor."},
            {"district": "Ubud Traditional Art Market", "vibe": "Heritage Handcrafts", "specialty": "Handwoven rattan bags, batik silks, and teakwood carvings."}
        ],
        "nightlife": [
            {"venue": "Savaya Bali (Uluwatu Clifftop)", "type": "World-Class Day/Night Club", "specialty": "Suspended crystal cube bar 100 meters above crashing surf."},
            {"venue": "The Lawn Canggu", "type": "Beachside Sunset Lounge", "specialty": "Chilled oceanfront daybeds with organic coconut cocktails."}
        ],
        "attractions": [
            {"name": "Tanah Lot Sea Temple", "tip": "Witness low-tide sunset ceremonies when the sacred rock is bathed in golden light."},
            {"name": "Tegallalang Sacred Rice Terraces", "tip": "Arrive at 6:30 AM before crowds to catch the sun filtering through morning palm mist."}
        ],
        "hiddenGems": [
            {"name": "Sidemen Valley", "desc": "Undiscovered emerald valleys resembling ancient Bali without the tourist buses."},
            {"name": "Tirta Gangga Water Palace at Dawn", "desc": "Step on ancient stepping stones surrounded by giant golden koi fish."}
        ]
    },
    "Tokyo": {
        "restaurants": [
            {"name": "Sukiyabashi Jiro & Sushi Yoshitake", "cuisine": "3-Star Edomae Sushi", "highlight": "Mastery of aged wild tuna and seasoned warm sushi rice."},
            {"name": "Ginza Ukai-Tei", "cuisine": "Michelin Teppanyaki", "highlight": "Sizzling A5 Wagyu beef prepared in a centuries-old merchant hall."}
        ],
        "shopping": [
            {"district": "Ginza Chuo-Dori", "vibe": "World's Premier Luxury Row", "specialty": "Hermes, Chanel, and Ginza Six architectural megastores."},
            {"district": "Omotesando & Cat Street", "vibe": "Architectural Design & Streetwear", "specialty": "Japanese streetwear, cult sneakers & avant-garde studios."}
        ],
        "nightlife": [
            {"venue": "New York Bar (Park Hyatt Tokyo)", "type": "High-Floor Jazz Lounge", "specialty": "Live Manhattan jazz with boundless 52nd-floor night skyline."},
            {"venue": "Bar Benfiddich (Shinjuku)", "type": "Farm-to-Glass Alchemy Bar", "specialty": "Cocktails blended with homegrown botanicals & absinthes."}
        ],
        "attractions": [
            {"name": "teamLab Planets TOKYO", "tip": "Wear easily rolled-up pants as you wade through knee-deep digital water projections."},
            {"name": "Meiji Jingu Shrine Sanctuary", "tip": "Walk through the towering cedar forest early in the morning for peaceful contemplation."}
        ],
        "hiddenGems": [
            {"name": "Yanaka Old Town", "desc": "Edo-period surviving neighborhood with quiet alleys, cat shrines, and nostalgic candy shops."},
            {"name": "Daikanyama T-Site", "desc": "Award-winning bookstore complex amidst serene garden cafes and boutique galleries."}
        ]
    }
}

# Booking Policies & Cancellation Rules
BOOKING_POLICIES = {
    "cancellationRules": [
        {"tier": "100% Full Refund", "condition": "Cancellation requested up to 7 days before departure date.", "fee": "SGD 0 (Free of charge)"},
        {"tier": "75% Partial Refund", "condition": "Cancellation requested between 3 to 6 days prior to trip start.", "fee": "25% processing fee"},
        {"tier": "Flexible Rescheduling", "condition": "Date modification up to 48 hours before departure.", "fee": "Free 1x date shift included"},
        {"tier": "Emergency Protection", "condition": "Medical, passport, or flight disruption cancellations.", "fee": "100% trip credit guarantee with medical note"}
    ],
    "bookingConditions": [
        "All rates displayed are transparently in Singapore Dollars (SGD) with all local GST and statutory hotel taxes included.",
        "Instant confirmation e-Vouchers are issued within 60 seconds with offline mobile wallet compatibility.",
        "Zero foreign transaction surcharge when booking with Singapore-issued credit cards (DBS, OCBC, UOB, HSBC, Citibank).",
        "24/7 emergency traveler concierge accessible via Singapore hotline & WhatsApp direct dispatch."
    ],
    "refundProcess": [
        "Step 1: Submit cancellation request via TripNest Manage Booking portal or WhatsApp Concierge.",
        "Step 2: Instant automated verification within 15 minutes.",
        "Step 3: Funds processed back to your original payment card within 3 to 5 business days."
    ]
}

# Travel Insurance Tiers
INSURANCE_PLANS = [
    {
        "id": "INS001",
        "name": "Silver Voyager",
        "tagline": "Essential coverage for short leisure escapes",
        "priceSGD": 39,
        "medicalCoverageSGD": "Up to $300,000",
        "tripCancellationSGD": "Up to $3,500",
        "baggageDelaySGD": "Up to $1,000",
        "adventureSports": "Basic Scuba & Trekking (<2,000m)",
        "features": [
            "24/7 Global SOS Emergency Helpline",
            "Emergency Medical Evacuation & Repatriation",
            "Lost Travel Documents & Passport Replacement",
            "Flight Delay Compensation ($150 per 6h delay)",
            "Instant WhatsApp Claim Filing"
        ]
    },
    {
        "id": "INS002",
        "name": "Gold Imperial (Most Popular)",
        "tagline": "Comprehensive worry-free protection for international journeys",
        "priceSGD": 69,
        "popular": True,
        "medicalCoverageSGD": "Up to $1,000,000",
        "tripCancellationSGD": "Up to $12,000",
        "baggageDelaySGD": "Up to $2,500",
        "adventureSports": "Included (Diving up to 30m, Skiing, Treks <4,000m)",
        "features": [
            "Unlimited Medical Evacuation via Private Air Ambulance",
            "Full Trip Cancellation for Any Documented Medical Cause",
            "Electronics & Laptop Damage Coverage up to $2,000",
            "Rental Car Excess Coverage up to $1,500",
            "Direct Cashless Hospital Admission in 150+ Countries",
            "2-Hour Fast-Track Reimbursement for Approved Claims"
        ]
    },
    {
        "id": "INS003",
        "name": "Platinum Concierge Elite",
        "tagline": "Maximum limit coverage tailored for luxury and family tours",
        "priceSGD": 119,
        "medicalCoverageSGD": "Unlimited Worldwide",
        "tripCancellationSGD": "Up to $30,000",
        "baggageDelaySGD": "Up to $5,000",
        "adventureSports": "All Extreme & Heli-Activities Included",
        "features": [
            "Cancel for Any Work or Family Reason Rider (80% Cash Back)",
            "Bespoke Private Medical Specialist Second Opinion",
            "Golf Equipment & Luxury Valuables Coverage",
            "Pet Care Delay Boarding Compensation",
            "VIP Airport Lounge Access Pass for any 2h+ Flight Delay",
            "Personalized Claims Advocate Assigned Directly to You"
        ]
    }
]

# Active Promotions & Flash Sales with live countdown timestamps
ACTIVE_PROMOTIONS = [
    {
        "id": "PROMO_SAKURA",
        "title": "Sakura Season Luxury Preview",
        "badge": "Early Bird 25% Off",
        "discountCode": "SAKURA25",
        "discountPercent": 25,
        "applicableDestinations": ["Tokyo", "Kyoto", "Osaka"],
        "heroImage": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
        "description": "Unlock 25% off private Kyoto ryokan stays, Shinkansen passes, and private cherry blossom picnic charters for the upcoming spring season.",
        "countdownDays": 4,
        "minSpendSGD": 1200
    },
    {
        "id": "PROMO_VILLAS",
        "title": "Private Island & Clifftop Villa Flash Sale",
        "badge": "Flash Sale - 30% Off",
        "discountCode": "ISLAND30",
        "discountPercent": 30,
        "applicableDestinations": ["Bali", "Maldives", "Phuket"],
        "heroImage": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
        "description": "Complimentary floating breakfast, private catamaran transfer, and 30% off selected 5-star private pool villas when booking this week.",
        "countdownDays": 2,
        "minSpendSGD": 1500
    },
    {
        "id": "PROMO_FAMILY",
        "title": "School Holiday Grand Explorer",
        "badge": "Kids Stay & Tour Free",
        "discountCode": "KIDSFLYFREE",
        "discountPercent": 20,
        "applicableDestinations": ["Singapore", "Sydney", "Seoul", "Hong Kong"],
        "heroImage": "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80",
        "description": "Complimentary theme park VIP tickets for children under 12 and 20% off all private family multi-day holiday packages.",
        "countdownDays": 6,
        "minSpendSGD": 2000
    }
]

# Assemble final master dataset
master_dataset = {
    "brand": {
        "name": "TripNest Singapore",
        "tagline": "The Premier Singapore Travel & Tours Marketplace",
        "description": "Curating exceptional travel experiences across Asia, Europe, and beyond. Backed by 24/7 Singapore-based concierge, transparent SGD pricing, and best-in-class travel protection.",
        "type": "Travel & Tours Marketplace",
        "singaporeLicense": "TA-038291-SIN",
        "hotline": "+65 6800 9888",
        "supportEmail": "concierge@tripnest.sg",
        "address": "Level 38, Marina Bay Financial Centre Tower 1, Singapore 018981"
    },
    "destinations": enriched_destinations,
    "tourPackages": enriched_packages,
    "hotels": enriched_hotels,
    "activities": enriched_activities,
    "visaServices": enriched_visas,
    "airportTransfers": enriched_transfers,
    "customerReviews": enriched_reviews,
    "travelGuides": enriched_guides,
    "localRecommendations": LOCAL_RECOMMENDATIONS,
    "bookingPolicies": BOOKING_POLICIES,
    "insurancePlans": INSURANCE_PLANS,
    "promotions": ACTIVE_PROMOTIONS
}

with open('data/tripnest_enriched.json', 'w', encoding='utf-8') as f:
    json.dump(master_dataset, f, indent=2, ensure_ascii=False)

print("Enriched dataset generated successfully!")
print(f"Destinations: {len(master_dataset['destinations'])}")
print(f"Tour Packages: {len(master_dataset['tourPackages'])}")
print(f"Hotels: {len(master_dataset['hotels'])}")
print(f"Activities: {len(master_dataset['activities'])}")
print(f"Visa Services: {len(master_dataset['visaServices'])}")
print(f"Transfers: {len(master_dataset['airportTransfers'])}")
print(f"Reviews: {len(master_dataset['customerReviews'])}")
print(f"Guides: {len(master_dataset['travelGuides'])}")
print(f"Insurance Plans: {len(master_dataset['insurancePlans'])}")
print(f"Promotions: {len(master_dataset['promotions'])}")
