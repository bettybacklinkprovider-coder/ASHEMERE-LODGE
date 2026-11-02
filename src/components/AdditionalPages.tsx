import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  ArrowUpRight,
  Check,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Users,
  FileText,
  History,
} from 'lucide-react';
import { ASHEMERE_PROPERTY, INITIAL_REVIEWS } from '../data/ashemereLodge';
import { ESTATES, MONOGRAPH_TESTIMONIALS } from '../data/estates';
import { SpatialPlanViewer } from './SpatialPlanViewer';
import { ResilientImage } from './ResilientImage';

/* ============================================================================
   DEDICATED ABOUT PAGE (Preserves both Ashemere Lodge Dublin & Obsidian Sanctuary Monograph)
   ============================================================================ */
interface AboutPageProps {
  onNavigateContact: (prefill?: string) => void;
  onNavigateServices: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateContact,
  onNavigateServices,
}) => {
  const [selectedEstateId, setSelectedEstateId] = useState<string>(ESTATES[0].id);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const activeEstate = ESTATES.find((e) => e.id === selectedEstateId) || ESTATES[0];

  return (
    <div className="bg-[#0F0F0F] text-[#FFFFFF]">
      {/* About Hero */}
      <section className="pt-14 md:pt-20 pb-20 border-b border-white/[0.08]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 type-label-sm text-[#F2B36B] mb-4">
                <span>ARCHITECTURAL HERITAGE &amp; HOSPITALITY</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#9E9E9E]">8HCR+JX DUBLIN</span>
              </div>
              <h1 className="type-headline-display text-[#FFFFFF] mb-6">
                Quiet Luxury at 7 Old Nangor Road.
              </h1>
              <p className="type-body-lg text-[#CFCFCF] mb-6">
                Ashemere Lodge bridges approachable 3-star Dublin hospitality with the nocturnal
                composure of the Obsidian Sanctuary architectural monograph. Situated in Fairview /
                Clondalkin, we serve business travelers, marquee event hosts, and architectural
                connoisseurs.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
                <div>
                  <div className="type-label-sm text-[#9E9E9E] mb-1">Check-in / Out</div>
                  <div className="type-body-md text-[#FFFFFF] font-mono-tech">
                    3:00 PM / 11:00 AM
                  </div>
                </div>
                <div>
                  <div className="type-label-sm text-[#9E9E9E] mb-1">Clondalkin Score</div>
                  <div className="type-body-md text-[#F2B36B] font-mono-tech">
                    3.2 · Good for Visitors
                  </div>
                </div>
                <div>
                  <div className="type-label-sm text-[#9E9E9E] mb-1">Direct Desk</div>
                  <div className="type-body-md text-[#FFFFFF] font-mono-tech">
                    {ASHEMERE_PROPERTY.phone}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 h-[380px] md:h-[440px] border border-white/[0.08] overflow-hidden bg-[#141414]">
              <ResilientImage
                src="/src/assets/images/estate_courtyard_atrium_1793608845251.jpg"
                alt="Ashemere Lodge Obsidian Sanctuary Interior Courtyard"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Preserved Interactive Architectural CAD Plan & Global Sanctuary Archive */}
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <div className="type-label-sm text-[#F2B36B] mb-2">
                OBSIDIAN SANCTUARY ARCHITECTURAL ARCHIVE
              </div>
              <h2 className="type-headline-lg text-[#FFFFFF]">
                Interactive Spatial Plan &amp; Monograph Estates.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {ESTATES.map((estate) => {
                const active = estate.id === activeEstate.id;
                return (
                  <button
                    key={estate.id}
                    type="button"
                    onClick={() => setSelectedEstateId(estate.id)}
                    className={`px-3.5 py-2 type-label-sm flex items-center gap-2 transition-colors cursor-pointer ${
                      active
                        ? 'border border-[#F2B36B] bg-[#181818] text-[#FFFFFF]'
                        : 'border border-white/[0.08] text-[#9E9E9E] hover:text-[#FFFFFF]'
                    }`}
                  >
                    {active && <span className="w-[3px] h-[3px] bg-[#F2B36B] shrink-0" />}
                    <span className="font-mono-tech text-[#F2B36B]">{estate.index}</span>
                    <span>{estate.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <SpatialPlanViewer
            key={activeEstate.id}
            estate={activeEstate}
            unitSystem={unitSystem}
            onToggleUnit={setUnitSystem}
            onRequestViewing={(_id, roomName) =>
              onNavigateContact(`Spatial Plan Inquiry: ${activeEstate.title} — ${roomName || ''}`)
            }
          />

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
            <p className="type-body-sm text-[#9E9E9E]">
              Explore our complete Dublin hospitality services or schedule a private twilight
              viewing.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onNavigateServices}
                className="btn-ghost-obsidian px-5 py-3 type-label-md cursor-pointer"
              >
                Explore Services
              </button>
              <button
                type="button"
                onClick={() => onNavigateContact('About Page Inquiry')}
                className="btn-primary-amber px-6 py-3 type-label-md font-medium cursor-pointer"
              >
                Contact Reception
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ============================================================================
   DEDICATED CONTACT PAGE
   ============================================================================ */
interface ContactPageProps {
  initialSubject?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialSubject = '' }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<'room' | 'marquee' | 'corporate'>('room');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');
  const [requireWhatsappReply, setRequireWhatsappReply] = useState(true);
  const [submittedRef, setSubmittedRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;
    setSubmittedRef(`CNT-${Math.floor(10000 + Math.random() * 90000)}`);
  };

  const whatsappHref = `https://wa.me/353851375847?text=${encodeURIComponent(
    `Hello Ashemere Lodge Dublin, I am inquiring regarding: ${subject || 'Room & Marquee Booking'}`
  )}`;

  return (
    <div className="bg-[#0F0F0F] text-[#FFFFFF] py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left 5 Columns: Direct Property Contact Ledger */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 type-label-sm text-[#F2B36B] mb-3">
                <span>DIRECT RECEPTION &amp; EVENTS DESK</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#9E9E9E]">24/7 CONCIERGE</span>
              </div>
              <h1 className="type-headline-display text-[#FFFFFF] mb-4">
                Contact Us.
              </h1>
              <p className="type-body-md text-[#CFCFCF]">
                Reach our front desk at 7 Old Nangor Road for immediate room reservations,
                corporate rate locks, or marquee wedding &amp; banquet consultations.
              </p>
            </div>

            <div className="glass-surface divide-y divide-white/[0.08]">
              <div className="p-6 flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#F2B36B] shrink-0 mt-1" />
                <div>
                  <div className="type-label-md text-[#9E9E9E] mb-1">Property Address</div>
                  <div className="type-body-md text-[#FFFFFF]">
                    {ASHEMERE_PROPERTY.address}
                  </div>
                  <div className="type-label-sm text-[#F2B36B] font-mono-tech mt-1">
                    Plus Code: {ASHEMERE_PROPERTY.plusCode} · Neighborhood: {ASHEMERE_PROPERTY.neighborhood}
                  </div>
                </div>
              </div>

              <div className="p-6 flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#F2B36B] shrink-0 mt-1" />
                <div>
                  <div className="type-label-md text-[#9E9E9E] mb-1">
                    Telephone &amp; WhatsApp Desk
                  </div>
                  <a
                    href="tel:+353851375847"
                    className="type-body-lg text-[#FFFFFF] hover:text-[#F2B36B] font-mono-tech"
                  >
                    {ASHEMERE_PROPERTY.phone}
                  </a>
                  <div className="mt-3">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost-obsidian px-4 py-2 type-label-sm inline-flex items-center gap-2"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#F2B36B]" />
                      <span>Chat on WhatsApp Now</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#F2B36B] shrink-0 mt-1" />
                <div>
                  <div className="type-label-md text-[#9E9E9E] mb-1">
                    Check-In &amp; Check-Out Schedule
                  </div>
                  <div className="type-body-md text-[#FFFFFF] font-mono-tech">
                    Check-in: {ASHEMERE_PROPERTY.checkInTime} · Check-out:{' '}
                    {ASHEMERE_PROPERTY.checkOutTime}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Interactive Contact & Marquee Inquiry Form */}
          <div className="lg:col-span-7 glass-shell-elevated p-8 md:p-12">
            {submittedRef ? (
              <div className="space-y-6 py-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <span className="type-label-sm text-[#F2B36B] font-mono-tech">
                      INQUIRY LOGGED · REF {submittedRef}
                    </span>
                    <h2 className="type-headline-md text-[#FFFFFF] mt-1">
                      Message Received by Ashemere Lodge Desk
                    </h2>
                  </div>
                  <Sparkles className="w-6 h-6 text-[#F2B36B]" />
                </div>
                <p className="type-body-md text-[#CFCFCF]">
                  Thank you, <strong className="text-[#FFFFFF] font-normal">{fullName}</strong>. Our
                  coordinator at 7 Old Nangor Road will respond to{' '}
                  <span className="text-[#F2B36B]">{email}</span> within 60 minutes.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmittedRef('')}
                    className="btn-ghost-obsidian px-6 py-3 type-label-md cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-amber px-6 py-3 type-label-md font-medium inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Continue on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="pb-4 border-b border-white/[0.08]">
                  <span className="type-label-sm text-[#F2B36B]">
                    DIRECT RESERVATION &amp; EVENT CHANNEL
                  </span>
                  <h2 className="type-headline-md text-[#FFFFFF] mt-1">
                    Send an Inquiry or Request a Callback
                  </h2>
                </div>

                {/* Custom 14px Concentric Square Radios */}
                <div>
                  <span className="block type-label-md text-[#9E9E9E] mb-3">
                    Inquiry Department
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(
                      [
                        { id: 'room', label: 'Room Reservation', sub: 'From PKR 14,698' },
                        { id: 'marquee', label: 'Marquee & Banquet', sub: 'Up to 180 Guests' },
                        { id: 'corporate', label: 'Corporate Retainer', sub: 'Annual 20% Off' },
                      ] as const
                    ).map((opt) => {
                      const active = inquiryType === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setInquiryType(opt.id)}
                          className={`p-4 text-left border flex items-start gap-3 cursor-pointer ${
                            active
                              ? 'bg-[#181818] border-[#F2B36B]'
                              : 'bg-[#141414] border-white/10 hover:border-white/25'
                          }`}
                        >
                          <span
                            className={`mt-1 w-[14px] h-[14px] shrink-0 flex items-center justify-center border ${
                              active ? 'border-[#F2B36B]' : 'border-white/30'
                            }`}
                          >
                            {active && <span className="w-[6px] h-[6px] bg-[#F2B36B]" />}
                          </span>
                          <div>
                            <div className="type-body-sm text-[#FFFFFF] font-normal">
                              {opt.label}
                            </div>
                            <div className="type-label-sm text-[#9E9E9E]">{opt.sub}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block type-label-md text-[#9E9E9E] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-[#141414] border border-white/10 px-4 py-3 type-body-md text-[#FFFFFF] focus:border-[#F2B36B] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block type-label-md text-[#9E9E9E] mb-2">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+353 85 137 5847"
                      className="w-full bg-[#141414] border border-white/10 px-4 py-3 type-body-md text-[#FFFFFF] focus:border-[#F2B36B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block type-label-md text-[#9E9E9E] mb-2">
                      Subject / Preferred Dates
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Sun, Nov 8 – Mon, Nov 9 Double Room"
                      className="w-full bg-[#141414] border border-white/10 px-4 py-3 type-body-md text-[#FFFFFF] focus:border-[#F2B36B] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block type-label-md text-[#9E9E9E] mb-2">
                    Message &amp; Special Requests
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify room count, marquee guest capacity, or airport transfer timing..."
                    className="w-full bg-[#141414] border border-white/10 p-4 type-body-md text-[#FFFFFF] focus:border-[#F2B36B] focus:outline-none"
                  />
                </div>

                {/* Custom 14px Square Checkbox */}
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={requireWhatsappReply}
                  onClick={() => setRequireWhatsappReply(!requireWhatsappReply)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <span
                    className={`w-[14px] h-[14px] flex items-center justify-center border ${
                      requireWhatsappReply
                        ? 'bg-[#0F0F0F] border-[#F2B36B]'
                        : 'border-white/25'
                    }`}
                  >
                    {requireWhatsappReply && <Check className="w-3 h-3 text-[#F2B36B]" />}
                  </span>
                  <span className="type-body-sm text-[#CFCFCF]">
                    Send instant booking confirmation &amp; location pin via WhatsApp
                  </span>
                </button>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    className="btn-primary-amber flex-1 py-4 px-6 type-label-md font-medium flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Inquiry</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost-obsidian py-4 px-6 type-label-md flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#F2B36B]" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   DOCS, CUSTOMERS, BLOG & CHANGELOG DEDICATED PAGE VIEW
   ============================================================================ */
interface PortalSubPageProps {
  activeSubTab: 'docs' | 'customers' | 'blog' | 'changelog';
  onChangeSubTab: (tab: 'docs' | 'customers' | 'blog' | 'changelog') => void;
  onNavigatePricing: () => void;
}

export const PortalResourcesPage: React.FC<PortalSubPageProps> = ({
  activeSubTab,
  onChangeSubTab,
  onNavigatePricing,
}) => {
  return (
    <div className="bg-[#0F0F0F] text-[#FFFFFF] py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/[0.08] mb-12">
          <div>
            <div className="type-label-sm text-[#F2B36B] mb-3">
              PATRON KNOWLEDGE BASE &amp; ARCHIVE
            </div>
            <h1 className="type-headline-display text-[#FFFFFF]">
              {activeSubTab === 'docs' && 'Documentation & Guest Protocols.'}
              {activeSubTab === 'customers' && 'Customer Stories & Patron Reviews.'}
              {activeSubTab === 'blog' && 'Architectural & Dublin Dispatch.'}
              {activeSubTab === 'changelog' && 'Property & Platform Changelog.'}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'docs', label: 'Docs', icon: BookOpen },
                { id: 'customers', label: 'Customers', icon: Users },
                { id: 'blog', label: 'Blog', icon: FileText },
                { id: 'changelog', label: 'Changelog', icon: History },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const active = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onChangeSubTab(tab.id)}
                  className={`px-4 py-2.5 type-label-sm flex items-center gap-2 cursor-pointer ${
                    active
                      ? 'border border-[#F2B36B] bg-[#181818] text-[#FFFFFF]'
                      : 'border border-white/[0.08] text-[#9E9E9E] hover:text-[#FFFFFF]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#F2B36B]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {activeSubTab === 'docs' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="glass-surface p-8">
              <div className="type-label-sm text-[#F2B36B] mb-2">01 · ARRIVAL PROTOCOL</div>
              <h2 className="type-headline-md text-[#FFFFFF] mb-3">
                Check-In, Parking &amp; Plus Code Navigation
              </h2>
              <p className="type-body-sm text-[#CFCFCF] mb-4">
                Standard check-in opens at 3:00 PM daily; check-out is at 11:00 AM. Enter Plus Code
                8HCR+JX Dublin into your navigation system to arrive directly at our gated parking
                court on 7 Old Nangor Road.
              </p>
              <div className="type-label-sm text-[#9E9E9E] font-mono-tech">
                RECEPTION: +353 85 137 5847
              </div>
            </article>

            <article className="glass-surface p-8">
              <div className="type-label-sm text-[#F2B36B] mb-2">02 · OTA PRICE MATCHING</div>
              <h2 className="type-headline-md text-[#FFFFFF] mb-3">
                Agoda, Booking.com &amp; Bluepillow Parity
              </h2>
              <p className="type-body-sm text-[#CFCFCF] mb-4">
                Our reservation engine tracks live rates across Agoda (PKR 14,730), Booking.com
                (PKR 14,730), and Bluepillow.com (PKR 14,698), ensuring direct corporate patrons
                receive parity or 20% annual retainer discounts.
              </p>
              <button
                type="button"
                onClick={onNavigatePricing}
                className="type-label-sm text-[#F2B36B] hover:underline"
              >
                Inspect Pricing Matrix →
              </button>
            </article>

            <article className="glass-surface p-8">
              <div className="type-label-sm text-[#F2B36B] mb-2">03 · MARQUEE SPECIFICATIONS</div>
              <h2 className="type-headline-md text-[#FFFFFF] mb-3">
                Event Rigging, Catering &amp; Acoustic Limits
              </h2>
              <p className="type-body-sm text-[#CFCFCF] mb-4">
                The Grand Marquee Pavilion accommodates up to 180 seated banquet guests with STC 64
                perimeter acoustic attenuation and dedicated 3-phase power distribution.
              </p>
              <div className="type-label-sm text-[#9E9E9E] font-mono-tech">
                FLOOR AREA: 420 SQ M
              </div>
            </article>
          </div>
        )}

        {activeSubTab === 'customers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INITIAL_REVIEWS.map((rev) => (
              <blockquote key={rev.id} className="glass-surface p-8">
                <div className="type-label-sm text-[#F2B36B] mb-3">
                  {rev.source.toUpperCase()} VERIFIED STAY · {rev.stayType}
                </div>
                <p className="font-display text-xl font-light text-[#FFFFFF] mb-6">
                  “{rev.comment}”
                </p>
                <footer className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <span className="type-body-sm text-[#FFFFFF] font-mono-tech">{rev.author}</span>
                  <span className="type-label-sm text-[#9E9E9E]">{rev.dateLabel}</span>
                </footer>
              </blockquote>
            ))}
            {MONOGRAPH_TESTIMONIALS.map((item) => (
              <blockquote key={item.author} className="glass-surface p-8">
                <div className="type-label-sm text-[#F2B36B] mb-3">{item.metric}</div>
                <p className="font-display text-xl font-light text-[#FFFFFF] mb-6">
                  “{item.quote}”
                </p>
                <footer className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <div>
                    <div className="type-body-sm text-[#FFFFFF]">{item.author}</div>
                    <div className="type-label-sm text-[#9E9E9E]">{item.organization}</div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#F2B36B]" />
                </footer>
              </blockquote>
            ))}
          </div>
        )}

        {activeSubTab === 'blog' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="glass-surface p-8">
              <div className="type-label-sm text-[#F2B36B] mb-2">
                NOVEMBER 2026 · ARCHITECTURAL DISPATCH
              </div>
              <h2 className="type-headline-md text-[#FFFFFF] mb-3">
                Designing Acoustic Stillness Along West Dublin’s Old Nangor Corridor
              </h2>
              <p className="type-body-md text-[#CFCFCF]">
                How triple-laminated glazing and nocturnal 2200K lighting create a restorative
                sanctuary minutes from Corkagh Park and the Red Cow interchange.
              </p>
            </article>
            <article className="glass-surface p-8">
              <div className="type-label-sm text-[#F2B36B] mb-2">
                OCTOBER 2026 · HOSPITALITY GUIDE
              </div>
              <h2 className="type-headline-md text-[#FFFFFF] mb-3">
                A Visitor’s Monograph to Clondalkin’s 8th-Century Round Tower &amp; Grand Canal
              </h2>
              <p className="type-body-md text-[#CFCFCF]">
                Exploring the walking trails, historic monastic masonry, and parkland surrounding
                Ashemere Lodge.
              </p>
            </article>
          </div>
        )}

        {activeSubTab === 'changelog' && (
          <div className="border border-white/[0.08] bg-[#141414] divide-y divide-white/[0.08]">
            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="type-label-sm text-[#F2B36B] font-mono-tech mb-1">
                  NOVEMBER 2026 · RELEASE 4.2
                </div>
                <h3 className="type-headline-md text-[#FFFFFF]">
                  Dedicated Pricing &amp; Hospitality Services Pages Added
                </h3>
                <p className="type-body-sm text-[#CFCFCF] mt-1">
                  Launched Monthly/Yearly Corporate Retainer pricing tiers, side-by-side plan
                  comparison table, and 6-pillar Hotel &amp; Marquee Services directory.
                </p>
              </div>
              <span className="type-label-sm text-[#9E9E9E] font-mono-tech shrink-0">
                VERIFIED LIVE
              </span>
            </div>
            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="type-label-sm text-[#F2B36B] font-mono-tech mb-1">
                  OCTOBER 2026 · RELEASE 4.1
                </div>
                <h3 className="type-headline-md text-[#FFFFFF]">
                  Multi-Provider Rate Parity &amp; 360° Street View Integration
                </h3>
                <p className="type-body-sm text-[#CFCFCF] mt-1">
                  Integrated live rate comparison for Agoda, Booking.com, and Bluepillow.com
                  alongside 8HCR+JX Clondalkin vector mapping.
                </p>
              </div>
              <span className="type-label-sm text-[#9E9E9E] font-mono-tech shrink-0">
                ARCHIVED
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
