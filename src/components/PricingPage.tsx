import React, { useState } from 'react';
import {
  Check,
  Minus,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

interface PricingPageProps {
  currency: 'PKR' | 'EUR' | 'USD';
  onChangeCurrency: (curr: 'PKR' | 'EUR' | 'USD') => void;
  onNavigateContact: (prefillSubject?: string) => void;
}

interface PricingPlan {
  id: 'basic' | 'professional' | 'enterprise';
  name: string;
  kicker: string;
  popular?: boolean;
  description: string;
  monthlyPricePkr: number;
  yearlyPricePkr: number; // per month billed annually
  unitLabel: string;
  ctaLabel: string;
  features: string[];
  benefits: string[];
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    kicker: '01 · ESSENTIAL SANCTUARY PASS',
    description:
      'Designed for individual travelers and short-stay commuters seeking immaculate 3-star double accommodation on Old Nangor Road.',
    monthlyPricePkr: 14730,
    yearlyPricePkr: 11780,
    unitLabel: 'per night / flexible pass',
    ctaLabel: 'Get Started',
    features: [
      '1 Double Bed Immaculate En-Suite Room',
      'High-Speed Fiber Wi-Fi throughout property',
      'Complimentary Gated On-Site Parking (7 Old Nangor Rd)',
      'Standard Check-in (3:00 PM) & Check-out (11:00 AM)',
      'Access to Shared Guest Kitchen & Espresso Bar',
      'Free Cancellation up to 48 hours prior to arrival',
    ],
    benefits: [
      'Lowest verified nightly rate in Clondalkin',
      'Direct access to Bus Routes 13 & 68 and Red Cow Luas',
    ],
  },
  {
    id: 'professional',
    name: 'Professional Plan',
    kicker: '02 · MOST POPULAR · EXECUTIVE RESIDENCY',
    popular: true,
    description:
      'Tailored for frequent business patrons, executive teams, and extended Dublin stays requiring wellness access, dining credits, and priority room selection.',
    monthlyPricePkr: 28500,
    yearlyPricePkr: 22800,
    unitLabel: 'per night / executive tier',
    ctaLabel: 'Choose Plan',
    features: [
      'Courtyard-Facing Deluxe Double or Twin Sanctuary Suite',
      'Full Access to Heated Indoor Pool & Fitness Center',
      'Daily Breakfast & Evening Restaurant Dining Credit',
      'Priority Early Check-in (12:00 PM) & Late Check-out (2:00 PM)',
      'Dedicated High-Acoustic Workspace & Private Meeting Alcove',
      'Complimentary Dublin Airport (DUB) or Heuston Station Shuttle',
      'Flexible Same-Day Cancellation & Date Modification',
    ],
    benefits: [
      'Save 20% on multi-night and annual corporate retainers',
      'Dedicated 24/7 WhatsApp & Reception Concierge Line',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    kicker: '03 · FULL WING & MARQUEE PAVILION BUYOUT',
    description:
      'Bespoke multi-room residency, private marquee banquet hosting, and full-wing corporate buyouts with dedicated culinary, security, and chauffeur teams.',
    monthlyPricePkr: 95000,
    yearlyPricePkr: 76000,
    unitLabel: 'per event / multi-suite block',
    ctaLabel: 'Contact Sales',
    features: [
      'Reserved Multi-Room Wing (Up to 12 Double Suites)',
      'Private Marquee & Banquet Pavilion Access (Up to 180 Guests)',
      'Bespoke Executive Catering & Private Chef Service',
      'Dedicated Chauffeur Fleet (Dublin Airport & Weston Executive EIWT)',
      'Custom Security Perimeter & Mutual NDA Guest Registry',
      'Full Audio-Visual & High-Density Fiber Event Infrastructure',
      'Dedicated Account Director & Consolidated Corporate Billing',
    ],
    benefits: [
      'Tailored for diplomatic delegations, weddings, and corporate offsites',
      'Custom SLA and bespoke architectural staging',
    ],
  },
];

interface ComparisonRow {
  category: string;
  feature: string;
  basic: string | boolean;
  professional: string | boolean;
  enterprise: string | boolean;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    category: 'Accommodations',
    feature: 'Room Classification',
    basic: 'Standard Double En-Suite',
    professional: 'Deluxe Courtyard Sanctuary',
    enterprise: 'Multi-Suite Wing Buyout',
  },
  {
    category: 'Accommodations',
    feature: 'Check-In / Check-Out Window',
    basic: '3:00 PM / 11:00 AM',
    professional: '12:00 PM / 2:00 PM Priority',
    enterprise: '24-Hour Flexible Arrival',
  },
  {
    category: 'Amenities & Wellness',
    feature: 'High-Speed Fiber Wi-Fi & Free Parking',
    basic: true,
    professional: true,
    enterprise: true,
  },
  {
    category: 'Amenities & Wellness',
    feature: 'Heated Indoor Pool & Fitness Center',
    basic: 'Optional Day Pass',
    professional: true,
    enterprise: 'Private Reserved Hours',
  },
  {
    category: 'Amenities & Wellness',
    feature: 'Restaurant & Daily Dining Credit',
    basic: false,
    professional: 'Included Daily for 2 Guests',
    enterprise: 'Private Chef & Banquet Catering',
  },
  {
    category: 'Events & Logistics',
    feature: 'Dublin Airport (DUB) Chauffeur Transfer',
    basic: false,
    professional: 'Included Round-Trip',
    enterprise: 'Dedicated Executive Fleet',
  },
  {
    category: 'Events & Logistics',
    feature: 'Marquee & Conference Pavilion Hosting',
    basic: false,
    professional: 'Boardroom Access (12 Pax)',
    enterprise: 'Full Marquee Pavilion (180 Pax)',
  },
  {
    category: 'Billing & Flexibility',
    feature: 'Free Cancellation Policy',
    basic: 'Up to 48 Hours Prior',
    professional: 'Same-Day Flexible',
    enterprise: 'Custom Contract SLA',
  },
];

const PRICING_FAQS = [
  {
    question: 'How does the Monthly vs. Yearly Corporate Retainer toggle work?',
    answer:
      'Selecting the Yearly Retainer billing mode locks in a 20% preferred rate reduction across all room nights, corporate guest passes, and marquee bookings at Ashemere Lodge (7 Old Nangor Road, Dublin) for 12 months.',
  },
  {
    question: 'Are taxes, high-speed Wi-Fi, and on-site parking included in all plans?',
    answer:
      'Yes. Every plan—including the Basic Plan at PKR 14,730—includes complimentary high-speed Wi-Fi throughout the lodge and gated off-street parking at our Fairview / Clondalkin premises.',
  },
  {
    question: 'Can we upgrade from a Basic or Professional stay to an Enterprise Marquee event?',
    answer:
      'Yes. Our reception and events desk (+353 85 137 5847) can credit your existing room reservation toward a multi-suite wing block or private marquee banquet booking at any time.',
  },
  {
    question: 'What is the cancellation policy for Free Cancellation plans?',
    answer:
      'Basic Plan reservations may be cancelled free of charge up to 48 hours before the 3:00 PM check-in window. Professional Plan patrons enjoy same-day cancellation flexibility without penalty.',
  },
  {
    question: 'What payment methods and currencies are supported?',
    answer:
      'You can view and settle rates in PKR, EUR (€), or USD ($). Corporate and Enterprise accounts also support direct SEPA / SWIFT invoice settlement.',
  },
];

export const PricingPage: React.FC<PricingPageProps> = ({
  currency,
  onChangeCurrency,
  onNavigateContact,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
  const [selectedPlanModal, setSelectedPlanModal] = useState<PricingPlan | null>(null);
  const [patronName, setPatronName] = useState('');
  const [patronEmail, setPatronEmail] = useState('');
  const [patronCompany, setPatronCompany] = useState('');
  const [confirmedPlanCode, setConfirmedPlanCode] = useState('');

  const formatAmount = (pkrAmount: number) => {
    if (currency === 'PKR') {
      return `PKR ${pkrAmount.toLocaleString()}`;
    }
    if (currency === 'EUR') {
      const eur = Math.round(pkrAmount * 0.0033);
      return `€${eur.toLocaleString()}`;
    }
    const usd = Math.round(pkrAmount * 0.0036);
    return `$${usd.toLocaleString()}`;
  };

  const handlePlanSelection = (plan: PricingPlan) => {
    if (plan.id === 'enterprise') {
      onNavigateContact(`Enterprise Plan & Marquee Inquiry (${plan.name})`);
      return;
    }
    setSelectedPlanModal(plan);
    setConfirmedPlanCode('');
  };

  const handleConfirmPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patronName.trim() || !patronEmail.trim()) return;
    setConfirmedPlanCode(`PLN-${Math.floor(10000 + Math.random() * 90000)}`);
  };

  return (
    <div className="bg-[#0F0F0F] text-[#FFFFFF]">
      {/* =====================================================================
          PRICING HERO & MONTHLY / YEARLY TOGGLE
         ===================================================================== */}
      <section className="pt-14 md:pt-20 pb-16 border-b border-white/[0.08]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 type-label-sm text-[#9E9E9E] mb-5">
                <span className="text-[#F2B36B]">DEDICATED PRICING FOLIO</span>
                <span aria-hidden="true">·</span>
                <span>ASHEMERE LODGE DUBLIN</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tech">TRANSPARENT TARIFFS</span>
              </div>

              <h1 className="type-headline-display text-[#FFFFFF] mb-6">
                Sanctuary Tariffs &amp; Corporate Retainers.
              </h1>

              <p className="type-body-lg text-[#CFCFCF]">
                Select an accommodation and hospitality tier calibrated to your stay in Dublin.
                Switch between standard flexible nightly tariffs and annual preferred retainers with
                20% savings.
              </p>
            </div>

            {/* Interactive Controls: Billing Cycle Toggle + Currency Selector */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4 shrink-0">
              {/* Monthly / Yearly Toggle */}
              <div
                className="flex items-center border border-white/[0.12] bg-[#141414] p-1"
                role="group"
                aria-label="Billing Cycle Toggle"
              >
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-5 py-2.5 type-label-sm flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'border border-[#F2B36B] bg-[#181818] text-[#FFFFFF]'
                      : 'text-[#9E9E9E] hover:text-[#FFFFFF]'
                  }`}
                >
                  {billingCycle === 'monthly' && (
                    <span className="w-[3px] h-[3px] bg-[#F2B36B] shrink-0" />
                  )}
                  <span>Monthly / Standard Rate</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-5 py-2.5 type-label-sm flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    billingCycle === 'yearly'
                      ? 'border border-[#F2B36B] bg-[#181818] text-[#FFFFFF]'
                      : 'text-[#9E9E9E] hover:text-[#FFFFFF]'
                  }`}
                >
                  {billingCycle === 'yearly' && (
                    <span className="w-[3px] h-[3px] bg-[#F2B36B] shrink-0" />
                  )}
                  <span>Yearly Retainer · Save 20%</span>
                </button>
              </div>

              {/* Currency Switcher */}
              <div className="flex items-center gap-2">
                <span className="type-label-sm text-[#9E9E9E]">DISPLAY CURRENCY:</span>
                {(['PKR', 'EUR', 'USD'] as const).map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => onChangeCurrency(curr)}
                    className={`px-3 py-1.5 type-label-sm font-mono-tech transition-colors cursor-pointer ${
                      currency === curr
                        ? 'border border-[#F2B36B] text-[#FFFFFF] bg-[#181818]'
                        : 'border border-white/[0.08] text-[#9E9E9E] hover:text-[#FFFFFF]'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3 PRICING PLANS IN ARCHITECTURAL CARDS
         ===================================================================== */}
      <section className="py-20 md:py-28 border-b border-white/[0.08]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_PLANS.map((plan) => {
              const activePrice =
                billingCycle === 'monthly' ? plan.monthlyPricePkr : plan.yearlyPricePkr;

              return (
                <article
                  key={plan.id}
                  className={`flex flex-col justify-between p-8 md:p-10 transition-transform duration-200 hover:-translate-y-1 ${
                    plan.popular
                      ? 'glass-shell-elevated border-[#F2B36B] relative'
                      : 'glass-surface border-white/[0.08]'
                  }`}
                >
                  <div>
                    {/* Top Plan Kicker & Most Popular Indicator */}
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/[0.08] mb-6">
                      <span className="type-label-sm text-[#F2B36B] font-mono-tech">
                        {plan.kicker}
                      </span>
                      {plan.popular && (
                        <span className="type-label-sm text-[#0F0F0F] bg-[#F2B36B] px-2.5 py-1 font-medium whitespace-nowrap shrink-0">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <h2 className="type-headline-md text-[#FFFFFF] mb-3">{plan.name}</h2>
                    <p className="type-body-sm text-[#CFCFCF] mb-8 min-h-[66px]">
                      {plan.description}
                    </p>

                    {/* Price Readout */}
                    <div className="p-6 bg-[#0F0F0F] border border-white/[0.08] mb-8">
                      <div className="type-label-sm text-[#9E9E9E] mb-1">
                        {billingCycle === 'yearly'
                          ? 'ANNUAL RETAINER RATE (20% OFF)'
                          : 'STANDARD FLEXIBLE TARIFF'}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl md:text-5xl font-light text-[#FFFFFF] font-mono-tech tabular-nums">
                          {formatAmount(activePrice)}
                        </span>
                      </div>
                      <div className="type-label-sm text-[#F2B36B] mt-2 font-mono-tech">
                        {plan.unitLabel}
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="mb-8">
                      <div className="type-label-md text-[#FFFFFF] mb-4">
                        Included Capabilities &amp; Privileges
                      </div>
                      <ul className="space-y-3">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-3 type-body-sm text-[#CFCFCF]">
                            <Check className="w-4 h-4 text-[#F2B36B] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Benefits */}
                    <div className="pt-4 border-t border-white/[0.06] mb-8">
                      <div className="type-label-sm text-[#9E9E9E] mb-2">KEY PATRON BENEFIT</div>
                      {plan.benefits.map((benefit) => (
                        <p key={benefit} className="type-body-sm text-[#FFFFFF] mb-1">
                          · {benefit}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Action Button: Get Started / Choose Plan / Contact Sales */}
                  <button
                    type="button"
                    onClick={() => handlePlanSelection(plan)}
                    className={`w-full py-4 px-6 type-label-md font-medium flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                      plan.popular ? 'btn-primary-amber' : 'btn-ghost-obsidian'
                    }`}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          COMPREHENSIVE PLAN COMPARISON TABLE
         ===================================================================== */}
      <section className="py-20 md:py-28 border-b border-white/[0.08]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="mb-12">
            <div className="flex items-center gap-2 type-label-sm text-[#F2B36B] mb-3">
              <span>02. ARCHITECTURAL SPECIFICATION MATRIX</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#9E9E9E]">SIDE-BY-SIDE PLAN COMPARISON</span>
            </div>
            <h2 className="type-headline-lg text-[#FFFFFF]">
              Compare All Sanctuary Plans.
            </h2>
          </div>

          <div className="overflow-x-auto border border-white/[0.08] bg-[#141414]">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#0F0F0F]">
                  <th className="p-5 type-label-md text-[#9E9E9E] w-1/3">
                    Specification / Capability
                  </th>
                  <th className="p-5 type-label-md text-[#FFFFFF] font-mono-tech">
                    01. Basic Plan
                    <div className="text-[#9E9E9E] font-normal mt-1">
                      {formatAmount(
                        billingCycle === 'monthly'
                          ? PRICING_PLANS[0].monthlyPricePkr
                          : PRICING_PLANS[0].yearlyPricePkr
                      )}
                    </div>
                  </th>
                  <th className="p-5 type-label-md text-[#F2B36B] font-mono-tech bg-[#181818]">
                    02. Professional Plan
                    <div className="text-[#FFFFFF] font-normal mt-1">
                      {formatAmount(
                        billingCycle === 'monthly'
                          ? PRICING_PLANS[1].monthlyPricePkr
                          : PRICING_PLANS[1].yearlyPricePkr
                      )}
                    </div>
                  </th>
                  <th className="p-5 type-label-md text-[#FFFFFF] font-mono-tech">
                    03. Enterprise Plan
                    <div className="text-[#9E9E9E] font-normal mt-1">
                      {formatAmount(
                        billingCycle === 'monthly'
                          ? PRICING_PLANS[2].monthlyPricePkr
                          : PRICING_PLANS[2].yearlyPricePkr
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="hover:bg-[#181818]/50 transition-colors">
                    <td className="p-5">
                      <div className="type-label-sm text-[#9E9E9E] mb-0.5">{row.category}</div>
                      <div className="type-body-sm text-[#FFFFFF] font-normal">{row.feature}</div>
                    </td>
                    <td className="p-5 type-body-sm text-[#CFCFCF] font-mono-tech">
                      {typeof row.basic === 'boolean' ? (
                        row.basic ? (
                          <Check className="w-4 h-4 text-[#F2B36B]" />
                        ) : (
                          <Minus className="w-4 h-4 text-white/25" />
                        )
                      ) : (
                        row.basic
                      )}
                    </td>
                    <td className="p-5 type-body-sm text-[#FFFFFF] font-mono-tech bg-[#181818]/40">
                      {typeof row.professional === 'boolean' ? (
                        row.professional ? (
                          <Check className="w-4 h-4 text-[#F2B36B]" />
                        ) : (
                          <Minus className="w-4 h-4 text-white/25" />
                        )
                      ) : (
                        row.professional
                      )}
                    </td>
                    <td className="p-5 type-body-sm text-[#CFCFCF] font-mono-tech">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? (
                          <Check className="w-4 h-4 text-[#F2B36B]" />
                        ) : (
                          <Minus className="w-4 h-4 text-white/25" />
                        )
                      ) : (
                        row.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FREQUENTLY ASKED QUESTIONS (FAQ) SECTION
         ===================================================================== */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 type-label-sm text-[#F2B36B] mb-3">
                <span>03. TARIFF &amp; POLICY CLARIFICATION</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#9E9E9E]">FAQ</span>
              </div>
              <h2 className="type-headline-lg text-[#FFFFFF] mb-4">
                Frequently Asked Questions.
              </h2>
              <p className="type-body-md text-[#CFCFCF] mb-8">
                Everything you need to know about nightly reservations, corporate retainers,
                marquee buyouts, and cancellation terms at Ashemere Lodge.
              </p>

              <div className="p-6 glass-surface">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#F2B36B]" />
                  <span className="type-label-md text-[#FFFFFF]">
                    Bespoke Family Office or Group Quote?
                  </span>
                </div>
                <p className="type-body-sm text-[#9E9E9E] mb-5">
                  Our reservation desk at 7 Old Nangor Road prepares custom multi-room and event
                  proposals within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigateContact('Custom Group / Corporate Tariff Quote')}
                  className="btn-ghost-obsidian px-5 py-3 type-label-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Contact Sales Desk</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F2B36B]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-white/[0.08] border border-white/[0.08] bg-[#141414]">
              {PRICING_FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={faq.question} className="p-6 md:p-8">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="type-headline-sm text-[#FFFFFF] font-normal">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#F2B36B] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#9E9E9E] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="type-body-md text-[#CFCFCF] mt-4 pt-4 border-t border-white/[0.06]">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          PLAN RESERVATION / CHECKOUT MODAL
         ===================================================================== */}
      {selectedPlanModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-xl glass-shell-elevated p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <div>
                <span className="type-label-sm text-[#F2B36B]">
                  {selectedPlanModal.kicker}
                </span>
                <h3 className="type-headline-md text-[#FFFFFF] mt-1">
                  Activate {selectedPlanModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPlanModal(null)}
                className="btn-ghost-obsidian p-2 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {confirmedPlanCode ? (
              <div className="space-y-6">
                <div className="p-6 bg-[#141414] border border-[#F2B36B]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="type-label-sm text-[#F2B36B] font-mono-tech">
                      PLAN CONFIRMED · REF {confirmedPlanCode}
                    </span>
                    <Sparkles className="w-4 h-4 text-[#F2B36B]" />
                  </div>
                  <p className="type-body-md text-[#FFFFFF] mb-2">
                    Thank you, <strong className="font-normal">{patronName}</strong>. Your{' '}
                    {selectedPlanModal.name} ({billingCycle.toUpperCase()}) dossier has been
                    issued to <span className="text-[#F2B36B]">{patronEmail}</span>.
                  </p>
                  <p className="type-label-sm text-[#9E9E9E] font-mono-tech">
                    RATE LOCKED:{' '}
                    {formatAmount(
                      billingCycle === 'monthly'
                        ? selectedPlanModal.monthlyPricePkr
                        : selectedPlanModal.yearlyPricePkr
                    )}{' '}
                    · ASHEMERE LODGE DUBLIN
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPlanModal(null)}
                  className="btn-primary-amber w-full py-3.5 type-label-md font-medium cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmPlanSubmit} className="space-y-5">
                <div className="p-4 bg-[#141414] border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <div className="type-body-md text-[#FFFFFF]">{selectedPlanModal.name}</div>
                    <div className="type-label-sm text-[#9E9E9E]">
                      Billing Mode: {billingCycle === 'yearly' ? 'Yearly Retainer (Save 20%)' : 'Standard Flexible'}
                    </div>
                  </div>
                  <div className="font-mono-tech text-xl text-[#F2B36B]">
                    {formatAmount(
                      billingCycle === 'monthly'
                        ? selectedPlanModal.monthlyPricePkr
                        : selectedPlanModal.yearlyPricePkr
                    )}
                  </div>
                </div>

                <div>
                  <label className="block type-label-md text-[#9E9E9E] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={patronName}
                    onChange={(e) => setPatronName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-[#141414] border border-white/10 px-4 py-3 type-body-md text-[#FFFFFF] focus:border-[#F2B36B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block type-label-md text-[#9E9E9E] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={patronEmail}
                    onChange={(e) => setPatronEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-[#141414] border border-white/10 px-4 py-3 type-body-md text-[#FFFFFF] focus:border-[#F2B36B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block type-label-md text-[#9E9E9E] mb-2">
                    Organization / Family Office (Optional)
                  </label>
                  <input
                    type="text"
                    value={patronCompany}
                    onChange={(e) => setPatronCompany(e.target.value)}
                    placeholder="Company or group name"
                    className="w-full bg-[#141414] border border-white/10 px-4 py-3 type-body-md text-[#FFFFFF] focus:border-[#F2B36B] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="btn-primary-amber flex-1 py-3.5 type-label-md font-medium cursor-pointer"
                  >
                    {selectedPlanModal.ctaLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlanModal(null)}
                    className="btn-ghost-obsidian px-5 py-3.5 type-label-md cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
