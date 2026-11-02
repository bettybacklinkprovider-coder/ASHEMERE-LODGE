export interface RateOption {
  id: string;
  provider: string;
  badge?: string;
  roomType: string;
  perks: string[];
  pricePkr: number;
  freeCancellation: boolean;
  ctaLabel: string;
  isFeatured: boolean;
}

export interface PhotoAsset {
  id: string;
  title: string;
  category:
    | 'Latest'
    | 'Videos'
    | 'Rooms'
    | 'Exterior'
    | 'Kitchen'
    | 'From visitors'
    | 'By owner'
    | 'Street View & 360°';
  timestamp: string;
  contributor: string;
  imageUrl: string;
  aspectSpan?: string;
  is360?: boolean;
  isVideo?: boolean;
  videoUrl?: string;
}

export interface GuestReview {
  id: string;
  author: string;
  source: 'Google' | 'Tripadvisor';
  rating: number;
  maxRating: number;
  dateLabel: string;
  stayType: string;
  comment: string;
  roomNote?: string;
}

export interface NearbyHotel {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  perk: string;
  distance: string;
  pricePkr: number;
  neighborhood: string;
  imageUrl: string;
}

export const ASHEMERE_PROPERTY = {
  name: 'Ashemere Lodge',
  rating: 2.4,
  reviewCount: 80,
  starClassification: '3-star hotel',
  address: '7 Old Nangor Road, Fairview, Dublin, Ireland',
  neighborhood: 'Clondalkin',
  phone: '+353 85 137 5847',
  plusCode: '8HCR+JX Dublin, Ireland',
  coordinates: '53°19′18″N · 06°23′42″W',
  checkInTime: '3:00 PM',
  checkOutTime: '11:00 AM',
  locationScore: 3.2,
  locationVerdict: 'Good for visitors',
  locationBasis: 'Based on sightseeing, recreation, and getting around',
  tripadvisorScore: '1.8/5',
  tripadvisorCount: 11,
};

export const RATE_OPTIONS: RateOption[] = [
  {
    id: 'agoda-sponsored',
    provider: 'Agoda',
    badge: 'Sponsored',
    roomType: '1 double bed · Standard Double Sanctuary',
    perks: ['1 double bed', 'Express check-in', 'Free Wi-Fi'],
    pricePkr: 14730,
    freeCancellation: true,
    ctaLabel: 'See all rooms',
    isFeatured: true,
  },
  {
    id: 'booking-featured',
    provider: 'Booking.com',
    badge: 'Featured option',
    roomType: 'Double Room · Courtyard Aspect',
    perks: ['Free Wi-Fi', 'Free cancellation until Nov 6', 'Pay at property'],
    pricePkr: 14730,
    freeCancellation: true,
    ctaLabel: 'See rooms',
    isFeatured: true,
  },
  {
    id: 'booking-all',
    provider: 'Booking.com',
    roomType: 'Standard Double or Twin Room',
    perks: ['Free Wi-Fi', 'Free parking'],
    pricePkr: 14730,
    freeCancellation: true,
    ctaLabel: 'See rooms',
    isFeatured: false,
  },
  {
    id: 'bluepillow-all',
    provider: 'Bluepillow.com',
    roomType: 'Cozy Double Bedroom · Immaculate En-Suite',
    perks: ['Lowest nightly rate', 'Wi-Fi included'],
    pricePkr: 14698,
    freeCancellation: false,
    ctaLabel: 'See rooms',
    isFeatured: false,
  },
  {
    id: 'direct-more',
    provider: 'More prices · Direct Desk',
    roomType: 'Flexible 3-Star Lodge Suite',
    perks: ['Free Wi-Fi', 'Free parking', 'Late check-out request'],
    pricePkr: 14711,
    freeCancellation: true,
    ctaLabel: 'See all rooms',
    isFeatured: false,
  },
];

export const PHOTO_ASSETS: PhotoAsset[] = [
  {
    id: 'photo-exterior-twilight',
    title: 'Twilight Exterior & Reflections · Old Nangor Road',
    category: 'Exterior',
    timestamp: '6 days ago',
    contributor: 'By owner',
    imageUrl: '/src/assets/images/hero_woodland_pavilion_1793608842744.jpg',
    aspectSpan: 'lg:col-span-7',
  },
  {
    id: 'photo-latest-courtyard',
    title: 'Immaculate Bedroom & Hearth Lounge',
    category: 'Latest',
    timestamp: '6 days ago',
    contributor: 'From visitors',
    imageUrl: '/src/assets/images/estate_courtyard_atrium_1793608845251.jpg',
    aspectSpan: 'lg:col-span-5',
  },
  {
    id: 'photo-rooms-double',
    title: '1 Double Bed Sanctuary Room & En-Suite',
    category: 'Rooms',
    timestamp: '2 weeks ago',
    contributor: 'By owner',
    imageUrl: '/src/assets/images/estate_alpine_monolith_1793608844586.jpg',
    aspectSpan: 'lg:col-span-4',
  },
  {
    id: 'photo-kitchen-dining',
    title: 'Shared Kitchen & Morning Espresso Bar',
    category: 'Kitchen',
    timestamp: '1 month ago',
    contributor: 'From visitors',
    imageUrl: '/src/assets/images/estate_cantilever_cliff_1793608843805.jpg',
    aspectSpan: 'lg:col-span-4',
  },
  {
    id: 'photo-streetview-360',
    title: '8HCR+JX Clondalkin · Street View & 360° Panorama',
    category: 'Street View & 360°',
    timestamp: 'Updated Nov 2026',
    contributor: 'Street View & 360°',
    imageUrl: '/src/assets/images/hero_woodland_pavilion_1793608842744.jpg',
    aspectSpan: 'lg:col-span-4',
    is360: true,
  },
  {
    id: 'photo-video-walkthrough',
    title: 'Twilight Architectural Estate & Pool Walkthrough Reel (00:15)',
    category: 'Videos',
    timestamp: 'Latest · Just added',
    contributor: 'By owner',
    imageUrl: '/src/assets/images/hero_woodland_pavilion_1793608842744.jpg',
    videoUrl: '/assets/aistudio/BACKGROUND_05d101d4.mp4',
    aspectSpan: 'lg:col-span-6',
    isVideo: true,
  },
  {
    id: 'photo-visitor-upload',
    title: 'Evening View Toward Clondalkin Approach',
    category: 'From visitors',
    timestamp: '3 months ago',
    contributor: 'kieranb315',
    imageUrl: '/src/assets/images/estate_alpine_monolith_1793608844586.jpg',
    aspectSpan: 'lg:col-span-6',
  },
];

export const HOTEL_AMENITIES = [
  {
    id: 'wifi',
    label: 'Wi-Fi',
    status: 'Included · High-Speed Fiber',
    detail: 'Complimentary throughout all guest bedrooms and common areas',
  },
  {
    id: 'parking',
    label: 'Free parking',
    status: 'Included · On-Site Gated Lot',
    detail: 'Direct off-street parking at 7 Old Nangor Road',
  },
  {
    id: 'pool',
    label: 'Pool',
    status: 'Heated Indoor Basin',
    detail: 'Reserved hours for registered guests (7:00 AM – 9:00 PM)',
  },
  {
    id: 'kid-friendly',
    label: 'Kid-friendly',
    status: 'Family Accommodations',
    detail: 'Extra bedding and family room configurations available upon request',
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    status: 'Dining & Kitchen Access',
    detail: 'Evening dining service and guest kitchen facilities',
  },
  {
    id: 'fitness',
    label: 'Fitness center',
    status: 'Cardio & Weights Studio',
    detail: 'Ground-floor wellness room open daily to lodge residents',
  },
];

export const LOCATION_HIGHLIGHTS = {
  thingsToDo: [
    {
      name: 'Corkagh Park & Fishery Sanctuary',
      distance: '1.1 mi · 4 min drive',
      rating: '4.6 (2,140)',
      note: '290-acre parkland with walled gardens, lakes, and woodland trails',
    },
    {
      name: 'Clondalkin Round Tower & Visitor Centre',
      distance: '0.7 mi · 12 min walk',
      rating: '4.7 (890)',
      note: '8th-century monastic stone tower and heritage exhibition garden',
    },
    {
      name: 'Grand Canal Way Lock 12 Promenade',
      distance: '0.9 mi · 15 min walk',
      rating: '4.5 (410)',
      note: 'Scenic twilight waterside walking and cycling corridor into Dublin',
    },
  ],
  transit: [
    {
      name: 'Red Cow Luas Tram Interchange (Red Line)',
      distance: '1.8 mi · 7 min drive',
      rating: 'Direct to Dublin City Centre',
      note: '24-hour park-and-ride tram and regional coach terminal',
    },
    {
      name: 'Park West & Cherry Orchard Rail Station',
      distance: '1.6 mi · 6 min drive',
      rating: 'Commuter Rail to Heuston',
      note: '11-minute rail transit to Dublin Heuston Station',
    },
    {
      name: 'Old Nangor Road Bus Corridor (Routes 13 & 68)',
      distance: '120 m · 2 min walk',
      rating: 'Every 15 mins',
      note: 'Direct bus stop outside 7 Old Nangor Road',
    },
  ],
  airports: [
    {
      name: 'Dublin International Airport (DUB)',
      distance: '14.8 mi · 22 min via M50',
      rating: 'Primary International Hub',
      note: 'Direct M50 motorway access via Junction 9 (Red Cow)',
    },
    {
      name: 'Weston Executive Airport (EIWT)',
      distance: '5.4 mi · 12 min drive',
      rating: 'General & Private Aviation',
      note: 'Executive charter and helicopter apron in Lucan/Celbridge',
    },
  ],
};

export const NEARBY_HOTELS: NearbyHotel[] = [
  {
    id: 'tallaght-cross',
    name: 'Tallaght Cross Hotel',
    rating: 4.5,
    reviewCount: 347,
    perk: 'Free Wi-Fi',
    distance: '2.6 mi away',
    pricePkr: 34900,
    neighborhood: 'Tallaght, Dublin 24',
    imageUrl: '/src/assets/images/estate_cantilever_cliff_1793608843805.jpg',
  },
  {
    id: 'maldron-newlands',
    name: 'Maldron Hotel Newlands Cross',
    rating: 4.2,
    reviewCount: 1280,
    perk: 'Free Wi-Fi · Free parking',
    distance: '0.8 mi away',
    pricePkr: 31200,
    neighborhood: 'Clondalkin, Dublin 22',
    imageUrl: '/src/assets/images/estate_alpine_monolith_1793608844586.jpg',
  },
  {
    id: 'louis-fitzgerald',
    name: 'The Louis Fitzgerald Hotel',
    rating: 4.3,
    reviewCount: 1640,
    perk: 'Free Wi-Fi · Restaurant',
    distance: '1.2 mi away',
    pricePkr: 36500,
    neighborhood: 'Newlands Cross, Dublin',
    imageUrl: '/src/assets/images/estate_courtyard_atrium_1793608845251.jpg',
  },
];

export const RATING_DISTRIBUTION = [
  { stars: 5, count: 14, percentage: 18 },
  { stars: 4, count: 9, percentage: 11 },
  { stars: 3, count: 11, percentage: 14 },
  { stars: 2, count: 12, percentage: 15 },
  { stars: 1, count: 34, percentage: 42 },
];

export const INITIAL_REVIEWS: GuestReview[] = [
  {
    id: 'rev-kieranb315',
    author: 'kieranb315',
    source: 'Tripadvisor',
    rating: 4,
    maxRating: 5,
    dateLabel: 'a year ago',
    stayType: '11 reviews on Tripadvisor · Verified Stay',
    comment:
      'What can I say, I loved my stay here. It was cozy yes, a few things that need to fix but bedroom and toilet were immaculate and staff were friendly.',
    roomNote: '1 double bed · Immaculate bedroom and toilet',
  },
  {
    id: 'rev-dublin-commuter',
    author: 'Declan O’Sullivan',
    source: 'Google',
    rating: 3,
    maxRating: 5,
    dateLabel: '2 months ago',
    stayType: 'Solo Traveler · 2-Night Stay',
    comment:
      'Very convenient location on Old Nangor Road in Clondalkin with free parking right outside and reliable Wi-Fi. Check-in at 3:00 PM was straightforward and the staff were welcoming.',
    roomNote: 'Standard Double · Quiet rear courtyard aspect',
  },
  {
    id: 'rev-maeve-k',
    author: 'Maeve Kavanagh',
    source: 'Google',
    rating: 2,
    maxRating: 5,
    dateLabel: '4 months ago',
    stayType: 'Business Transit · 1-Night Stay',
    comment:
      'Basic 3-star lodge accommodation close to Corkagh Park and the M50 interchange. Bedroom linens were clean and price (~PKR 14,700) is much lower than central Dublin hotels, though hallway fixtures need updating.',
    roomNote: 'Booked via Bluepillow.com',
  },
];
