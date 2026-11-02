import React, { useState } from 'react';
import {
  BedDouble,
  Landmark,
  Car,
  Waves,
  Utensils,
  ShieldCheck,
  ArrowUpRight,
  MessageCircle,
  Phone,
  Check,
  X,
} from 'lucide-react';
import { ResilientImage } from './ResilientImage';
import { ASHEMERE_PROPERTY } from '../data/ashemereLodge';

interface ServicesPageProps {
  currency: 'PKR' | 'EUR' | 'USD';
  onNavigateContact: (prefillSubject?: string) => void;
  onNavigatePricing: () => void;
}

export interface HospitalityService {
  id: string;
  index: string;
  title: string;
  category: string;
  shortDescription: string;
  detailedNarrative: string;
  startingPricePkr: number;
  priceUnit: string;
  imageUrl: string;
  highlights: string[];
  specifications: { label: string; value: string }[];
}

const HOSPITALITY_SERVICES: HospitalityService[] = [
  {
    id: 'sanctuary-suites',
    index: '01',
    title: 'Private Sanctuary Double & Executive Suites',
    category: 'ACCOMMODATION · 3-STAR HOTEL',
    shortDescription:
      'Immaculate double bedrooms and courtyard-facing suites engineered for nocturnal stillness, equipped with high-speed fiber Wi-Fi and gated parking.',
    detailedNarrative:
      'Located at 7 Old Nangor Road in Fairview / Clondalkin, our private guest rooms combine crisp linen comfort, immaculate en-suite bathrooms, and acoustic insulation from urban transit corridors.',
    startingPricePkr: 14698,
    priceUnit: 'per night',
    imageUrl: '/src/assets/images/estate_alpine_monolith_1793608844586.jpg',
    highlights: [
      '1 Double Bed or Twin configuration with immaculate en-suite',
      'Complimentary high-speed fiber Wi-Fi & gated off-street parking',
      'Check-in 3:00 PM · Check-out 11:00 AM (Priority extensions available)',
    ],
    specifications: [
      { label: 'Occupancy', value: '1–4 Guests (Kid-Friendly Family Options)' },
      { label: 'Connectivity', value: 'Dedicated Symmetric Fiber Wi-Fi' },
      { label: 'Comparison Providers', value: 'Agoda · Booking.com · Bluepillow.com · Direct' },
    ],
  },
  {
    id: 'marquee-banquet',
    index: '02',
    title: 'Grand Marquee, Wedding & Corporate Pavilion',
    category: 'MARQUEE & EVENTS · UP TO 180 GUESTS',
    shortDescription:
      'Architectural twilight marquee and banquet hall tailored for wedding receptions, diplomatic dinners, and executive conferences in West Dublin.',
    detailedNarrative:
      'Our temperature-controlled glass and timber marquee pavilion transforms private celebrations and corporate galas with warm 2200K chandelier optics, acoustic drapery, and private courtyard arrival.',
    startingPricePkr: 185000,
    priceUnit: 'per marquee event',
    imageUrl: '/src/assets/images/hero_woodland_pavilion_1793608842744.jpg',
    highlights: [
      'Modular seating for 40 to 180 banquet or theater guests',
      'Dedicated bridal & VIP green-room sanctuary suites included',
      'Private gated forecourt parking for up to 65 vehicles',
    ],
    specifications: [
      { label: 'Floor Span', value: '420 SQ M Column-Free Pavilion' },
      { label: 'Audio / Visual', value: '4K Laser Projection & Line-Array Acoustics' },
      { label: 'Catering', value: 'In-House Culinary Brigade & Halal/Bespoke Menus' },
    ],
  },
  {
    id: 'culinary-dining',
    index: '03',
    title: 'Nocturnal Restaurant, Kitchen & Private Catering',
    category: 'DINING & CULINARY · ON-SITE',
    shortDescription:
      'Full-service evening restaurant, curated marquee banquet catering, and 24-hour guest kitchen & espresso bar access.',
    detailedNarrative:
      'Whether hosting a multi-course wedding feast in the marquee or enjoying a quiet evening supper after arriving from Dublin Airport, our culinary team sources seasonal Irish produce and artisan roasts.',
    startingPricePkr: 4200,
    priceUnit: 'per guest tasting menu',
    imageUrl: '/src/assets/images/estate_courtyard_atrium_1793608845251.jpg',
    highlights: [
      'On-site restaurant serving breakfast, twilight dinner, and room service',
      'Guest kitchen access for extended-stay and family patrons',
      'Custom banquet menus for marquee weddings and corporate galas',
    ],
    specifications: [
      { label: 'Service Hours', value: '6:30 AM – 11:00 PM Daily' },
      { label: 'Dietary Protocols', value: 'Halal, Vegetarian & Gluten-Free Certified' },
      { label: 'Private Dining', value: 'Hearth Alcove for up to 18 Guests' },
    ],
  },
  {
    id: 'wellness-pool',
    index: '04',
    title: 'Heated Indoor Pool & Fitness Sanctuary',
    category: 'WELLNESS & RECREATION',
    shortDescription:
      'Calibrated thermal indoor swimming basin and modern cardio/strength studio reserved exclusively for registered lodge guests.',
    detailedNarrative:
      'Unwind after long-haul transit in our heated indoor pool and wellness suite. Designed with low-glare ambient lighting to restore circadian balance.',
    startingPricePkr: 3500,
    priceUnit: 'complimentary on Pro & Enterprise',
    imageUrl: '/src/assets/images/estate_cantilever_cliff_1793608843805.jpg',
    highlights: [
      'Heated indoor lap and relaxation pool (7:00 AM – 9:00 PM)',
      'Full fitness center with free weights and endurance ergometers',
      'Fresh towel, locker, and shower suite provisioning',
    ],
    specifications: [
      { label: 'Water Temperature', value: '29.5°C Constant Thermal Control' },
      { label: 'Access Policy', value: 'Included with Professional & Enterprise Plans' },
      { label: 'Family Hours', value: 'Dedicated Kid-Friendly Sessions Daily' },
    ],
  },
  {
    id: 'chauffeur-transit',
    index: '05',
    title: 'Chauffeur Fleet, Airport & Helipad Logistics',
    category: 'TRANSIT & AVIATION · 8HCR+JX',
    shortDescription:
      'Direct executive transfers connecting 7 Old Nangor Road to Dublin Airport (DUB), Weston Executive Airport (EIWT), and Heuston Rail Station.',
    detailedNarrative:
      'Positioned minutes from M50 Junction 9 and Red Cow Luas, Ashemere Lodge coordinates door-to-door chauffeur arrivals and group coach logistics.',
    startingPricePkr: 12500,
    priceUnit: 'per executive transfer',
    imageUrl: '/src/assets/images/hero_woodland_pavilion_1793608842744.jpg',
    highlights: [
      '22-minute transfer to Dublin International Airport (DUB) via M50',
      '12-minute transfer to Weston Executive Airport (EIWT) for private charters',
      'Complimentary on-site parking for self-driving guests',
    ],
    specifications: [
      { label: 'Plus Code Vector', value: '8HCR+JX Dublin, Ireland' },
      { label: 'Public Transit', value: 'Bus Routes 13 & 68 (120m) · Red Cow Luas (7 min)' },
      { label: 'Fleet Options', value: 'Executive Sedan, MPV & 24-Seat Luxury Coach' },
    ],
  },
  {
    id: 'family-concierge',
    index: '06',
    title: 'Kid-Friendly Family Stays & Clondalkin Tours',
    category: 'FAMILY & RECREATION · 3.2 VISITOR SCORE',
    shortDescription:
      'Tailored family accommodations with interconnected rooms and curated excursions to Corkagh Park, Clondalkin Round Tower, and Grand Canal Way.',
    detailedNarrative:
      'Clondalkin holds a 3.2 "Good for visitors" rating based on sightseeing, recreation, and getting around. Our concierge arranges bicycles, park picnics, and family city passes.',
    startingPricePkr: 19500,
    priceUnit: 'per family suite night',
    imageUrl: '/src/assets/images/estate_alpine_monolith_1793608844586.jpg',
    highlights: [
      'Spacious kid-friendly rooms with extra cots and interconnected doors',
      '4-minute drive to 290-acre Corkagh Park & Fishery Sanctuary',
      '12-minute walk to the 8th-century Clondalkin Round Tower Visitor Centre',
    ],
    specifications: [
      { label: 'Neighborhood Score', value: '3.2 / 5.0 Good for Visitors (Clondalkin)' },
      { label: 'Park Proximity', value: '1.1 mi to Corkagh Demesne' },
      { label: 'Concierge Desk', value: '24/7 Local Sightseeing & Ticket Booking' },
    ],
  },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({
  currency,
  onNavigateContact,
  onNavigatePricing,
}) => {
  const [selectedService, setSelectedService] = useState<HospitalityService | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const formatPrice = (pkrAmount: number) => {
    if (currency === 'PKR') return `PKR ${pkrAmount.toLocaleString()}`;
    if (currency === 'EUR') return `€${Math.round(pkrAmount * 0.0033).toLocaleString()}`;
    return `$${Math.round(pkrAmount * 0.0036).toLocaleString()}`;
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'sanctuary-suites':
        return <BedDouble className="w-5 h-5 text-[#F2B36B]" />;
      case 'marquee-banquet':
        return <Landmark className="w-5 h-5 text-[#F2B36B]" />;
      case 'culinary-dining':
        return <Utensils className="w-5 h-5 text-[#F2B36B]" />;
      case 'wellness-pool':
        return <Waves className="w-5 h-5 text-[#F2B36B]" />;
      case 'chauffeur-transit':
        return <Car className="w-5 h-5 text-[#F2B36B]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#F2B36B]" />;
    }
  };

  const filteredServices =
    categoryFilter === 'ALL'
      ? HOSPITALITY_SERVICES
      : HOSPITALITY_SERVICES.filter((s) => s.id === categoryFilter);

  const whatsappHref = `https://wa.me/353851375847?text=${encodeURIComponent(
    'Hello Ashemere Lodge Dublin, I would like to inquire about your Hotel & Marquee Services.'
  )}`;

  return (
    <div className="bg-[#0F0F0F] text-[#FFFFFF]">
      {/* =====================================================================
          SERVICES PAGE HERO
         ===================================================================== */}
      <section className="pt-14 md:pt-20 pb-16 border-b border-white/[0.08]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 type-label-sm text-[#9E9E9E] mb-5">
                <span className="text-[#F2B36B]">DEDICATED SERVICES PORTFOLIO</span>
                <span aria-hidden="true">·</span>
                <span>HOTEL, MARQUEE &amp; CONCIERGE</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tech">7 OLD NANGOR ROAD, DUBLIN</span>
              </div>

              <h1 className="type-headline-display text-[#FFFFFF] mb-6">
                Bespoke Hospitality, Suites &amp; Marquee Events.
              </h1>

              <p className="type-body-lg text-[#CFCFCF] max-w-3xl">
                From immaculate 3-star double sanctuary rooms to 180-guest architectural marquee
                galas, heated indoor pool wellness, and executive Dublin airport transfers.
              </p>
            </div>

            {/* Direct Contact Us & WhatsApp Concierge Action Pair */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                onClick={() => onNavigateContact('Hotel & Marquee Services Inquiry')}
                className="btn-primary-amber py-4 px-6 type-label-md font-medium flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Us · Reception Desk</span>
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-obsidian py-4 px-6 type-label-md flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#F2B36B]" />
                <span>WhatsApp Concierge ({ASHEMERE_PROPERTY.phone})</span>
              </a>
            </div>
          </div>

          {/* Service Pillar Filter Bar */}
          <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setCategoryFilter('ALL')}
              className={`px-4 py-2 type-label-sm flex items-center gap-2 transition-colors cursor-pointer ${
                categoryFilter === 'ALL'
                  ? 'border border-[#F2B36B] bg-[#181818] text-[#FFFFFF]'
                  : 'border border-white/[0.08] text-[#9E9E9E] hover:text-[#FFFFFF]'
              }`}
            >
              {categoryFilter === 'ALL' && (
                <span className="w-[3px] h-[3px] bg-[#F2B36B] shrink-0" />
              )}
              <span>All Services (06)</span>
            </button>
            {HOSPITALITY_SERVICES.map((s) => {
              const active = categoryFilter === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCategoryFilter(s.id)}
                  className={`px-4 py-2 type-label-sm flex items-center gap-2 transition-colors cursor-pointer ${
                    active
                      ? 'border border-[#F2B36B] bg-[#181818] text-[#FFFFFF]'
                      : 'border border-white/[0.08] text-[#9E9E9E] hover:text-[#FFFFFF]'
                  }`}
                >
                  {active && <span className="w-[3px] h-[3px] bg-[#F2B36B] shrink-0" />}
                  <span>
                    {s.index}. {s.title.split(' ')[0]} {s.title.split(' ')[1]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SERVICES GRID IN ARCHITECTURAL CARDS
         ===================================================================== */}
      <section className="py-20 md:py-28 border-b border-white/[0.08]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="group glass-surface flex flex-col justify-between overflow-hidden transition-transform duration-200 hover:-translate-y-1"
              >
                <div>
                  {/* High-Resolution Image Header */}
                  <div className="relative h-[260px] overflow-hidden bg-[#0F0F0F] border-b border-white/[0.08]">
                    <ResilientImage
                      src={service.imageUrl}
                      alt={service.title}
                      fallbackTitle={service.title}
                      fallbackSubtitle={service.category}
                      className="w-full h-full object-cover estate-image-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-black/30" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="glass-surface px-3 py-1.5 type-label-sm text-[#F2B36B] font-mono-tech">
                        SERVICE {service.index}
                      </span>
                      <span className="glass-surface p-2">{getServiceIcon(service.id)}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="type-label-sm text-[#CFCFCF]">{service.category}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 md:p-8">
                    <h2 className="type-headline-md text-[#FFFFFF] mb-3">{service.title}</h2>
                    <p className="type-body-sm text-[#CFCFCF] mb-6">
                      {service.shortDescription}
                    </p>

                    <ul className="space-y-2.5 border-t border-white/[0.06] pt-4 mb-6">
                      {service.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 type-body-sm text-[#9E9E9E]"
                        >
                          <Check className="w-3.5 h-3.5 text-[#F2B36B] shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer with Price Guidance & Learn More Button */}
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                  <div>
                    <div className="type-label-sm text-[#9E9E9E]">STARTING GUIDANCE</div>
                    <div className="font-mono-tech text-base text-[#FFFFFF] tabular-nums">
                      {formatPrice(service.startingPricePkr)}{' '}
                      <span className="text-xs text-[#9E9E9E]">{service.priceUnit}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="btn-ghost-obsidian px-4 py-2.5 type-label-sm flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#F2B36B]" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          DIRECT CONCIERGE & WHATSAPP CONVERSION BANNER
         ===================================================================== */}
      <section className="py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="glass-shell-elevated p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="type-label-sm text-[#F2B36B] mb-2">
                BESPOKE EVENT &amp; HOSPITALITY DESK · 8HCR+JX DUBLIN
              </div>
              <h2 className="type-headline-lg text-[#FFFFFF] mb-4">
                Planning a Marquee Gala or Multi-Room Stay?
              </h2>
              <p className="type-body-md text-[#CFCFCF]">
                Speak directly with our hospitality coordinator at 7 Old Nangor Road via WhatsApp
                or telephone ({ASHEMERE_PROPERTY.phone}), or compare our structured package tariffs.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap items-center lg:justify-end gap-4">
              <button
                type="button"
                onClick={() => onNavigateContact('Direct Service & Marquee Consultation')}
                className="btn-primary-amber px-6 py-4 type-label-md font-medium flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Us</span>
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-obsidian px-6 py-4 type-label-md flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#F2B36B]" />
                <span>WhatsApp Desk</span>
              </a>

              <button
                type="button"
                onClick={onNavigatePricing}
                className="btn-ghost-obsidian px-5 py-4 type-label-md whitespace-nowrap shrink-0 cursor-pointer"
              >
                View Pricing Plans
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SERVICE "LEARN MORE" SPECIFICATION MODAL
         ===================================================================== */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-2xl glass-shell-elevated overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0F0F0F]">
              <span className="type-label-sm text-[#F2B36B] font-mono-tech">
                SERVICE DOSSIER · {selectedService.index}
              </span>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="btn-ghost-obsidian px-3 py-1.5 type-label-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div>
                <div className="type-label-sm text-[#9E9E9E] mb-1">
                  {selectedService.category}
                </div>
                <h3 className="type-headline-md text-[#FFFFFF] mb-3">
                  {selectedService.title}
                </h3>
                <p className="type-body-md text-[#CFCFCF]">
                  {selectedService.detailedNarrative}
                </p>
              </div>

              <div className="border-t border-b border-white/[0.08] divide-y divide-white/[0.06]">
                {selectedService.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="py-3 flex items-center justify-between gap-4"
                  >
                    <span className="type-label-md text-[#9E9E9E]">{spec.label}</span>
                    <span className="type-body-sm text-[#FFFFFF] font-mono-tech">
                      {spec.value}
                    </span>
                  </div>
                ))}
                <div className="py-3 flex items-center justify-between gap-4">
                  <span className="type-label-md text-[#9E9E9E]">Starting Tariff</span>
                  <span className="type-body-md text-[#F2B36B] font-mono-tech">
                    {formatPrice(selectedService.startingPricePkr)} ({selectedService.priceUnit})
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onNavigateContact(`Reservation Inquiry: ${title}`);
                  }}
                  className="btn-primary-amber flex-1 py-3.5 px-5 type-label-md font-medium flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book / Inquire About This Service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-obsidian py-3.5 px-5 type-label-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#F2B36B]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
