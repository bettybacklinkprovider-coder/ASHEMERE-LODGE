import React, { useState, useRef } from 'react';
import {
  Compass,
  MapPin,
  Phone,
  Clock,
  Bookmark,
  Share2,
  Navigation,
  Check,
  ArrowUpRight,
  Star,
  Wifi,
  Car,
  Waves,
  Users,
  Utensils,
  Dumbbell,
  Camera,
  Eye,
  Plus,
  Edit3,
  Globe,
  History,
  Tag,
  X,
  Maximize2,
  MessageCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
} from 'lucide-react';
import {
  ASHEMERE_PROPERTY,
  RATE_OPTIONS,
  PHOTO_ASSETS,
  HOTEL_AMENITIES,
  LOCATION_HIGHLIGHTS,
  NEARBY_HOTELS,
  RATING_DISTRIBUTION,
  INITIAL_REVIEWS,
  RateOption,
  PhotoAsset,
  GuestReview,
} from './data/ashemereLodge';
import { ResilientImage } from './components/ResilientImage';
import { PricingPage } from './components/PricingPage';
import { ServicesPage } from './components/ServicesPage';
import { AboutPage, ContactPage, PortalResourcesPage } from './components/AdditionalPages';

export type ActivePage =
  | 'home'
  | 'services'
  | 'pricing'
  | 'about'
  | 'contact'
  | 'docs'
  | 'customers'
  | 'blog'
  | 'changelog';

type PhotoCategoryFilter =
  | 'All'
  | 'Latest'
  | 'Videos'
  | 'Rooms'
  | 'Exterior'
  | 'Kitchen'
  | 'From visitors'
  | 'By owner'
  | 'Street View & 360°';

type CurrencyCode = 'PKR' | 'EUR' | 'USD';

const ATTACHED_BACKGROUND_VIDEO = '/assets/aistudio/BACKGROUND_05d101d4.mp4';

export default function App() {
  // Multi-Page Router State
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [contactPrefillSubject, setContactPrefillSubject] = useState<string>('');

  // Background & Hero Video Controls
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const ambientVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [ambientVideoEnabled, setAmbientVideoEnabled] = useState<boolean>(true);

  // Shared Currency State across Home, Pricing, and Services pages
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');

  // Homepage (Ashemere Lodge) States
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [shareFeedback, setShareFeedback] = useState<string>('');
  const [customMapLabel, setCustomMapLabel] = useState<string>('Dublin West Sanctuary Stop');
  const [isEditingLabel, setIsEditingLabel] = useState<boolean>(false);
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [activeInfoModal, setActiveInfoModal] = useState<
    null | 'suggest-edit' | 'missing-info' | 'add-website' | 'maps-history'
  >(null);
  const [infoSubmissionNotice, setInfoSubmissionNotice] = useState<string>('');

  // Availability & Pricing Filter States on Home
  const [checkInDate, setCheckInDate] = useState<string>('Sun, Nov 8');
  const [checkOutDate, setCheckOutDate] = useState<string>('Mon, Nov 9');
  const [nightsCount, setNightsCount] = useState<number>(1);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [freeCancellationOnly, setFreeCancellationOnly] = useState<boolean>(false);
  const [rateTab, setRateTab] = useState<'featured' | 'all'>('featured');
  const [selectedRateForBooking, setSelectedRateForBooking] = useState<RateOption | null>(null);
  const [bookingGuestName, setBookingGuestName] = useState<string>('');
  const [bookingGuestEmail, setBookingGuestEmail] = useState<string>('');
  const [bookingConfirmedRef, setBookingConfirmedRef] = useState<string>('');

  // Location Summary Sub-Tab
  const [locationTab, setLocationTab] = useState<'thingsToDo' | 'transit' | 'airports'>(
    'thingsToDo'
  );

  // Photos & Videos States
  const [photoFilter, setPhotoFilter] = useState<PhotoCategoryFilter>('All');
  const [photos, setPhotos] = useState<PhotoAsset[]>(PHOTO_ASSETS);
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoAsset | null>(null);
  const [panoramaYaw, setPanoramaYaw] = useState<number>(0);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState<string>('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<PhotoAsset['category']>('From visitors');

  // Similar Hotels & Amenities States
  const [showAllNearbyHotels, setShowAllNearbyHotels] = useState<boolean>(false);
  const [selectedAmenityId, setSelectedAmenityId] = useState<string>('wifi');

  // Reviews States
  const [reviews, setReviews] = useState<GuestReview[]>(INITIAL_REVIEWS);
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState<boolean>(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState<string>('');
  const [newReviewRating, setNewReviewRating] = useState<number>(4);
  const [newReviewComment, setNewReviewComment] = useState<string>('');

  const navigateToPage = (page: ActivePage, prefillSubject?: string) => {
    if (prefillSubject !== undefined) {
      setContactPrefillSubject(prefillSubject);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleHeroVideoPlay = () => {
    const vid = heroVideoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      ambientVideoRef.current?.play().catch(() => {});
      setIsVideoPlaying(true);
    } else {
      vid.pause();
      ambientVideoRef.current?.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleHeroVideoMute = () => {
    const vid = heroVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsVideoMuted(vid.muted);
  };

  // Format currency helper
  const formatPrice = (pkrAmount: number) => {
    const totalPkr = pkrAmount * nightsCount;
    if (currency === 'PKR') {
      return `PKR ${totalPkr.toLocaleString()}`;
    }
    if (currency === 'EUR') {
      const eur = Math.round(totalPkr * 0.0033);
      return `€${eur.toLocaleString()}`;
    }
    const usd = Math.round(totalPkr * 0.0036);
    return `$${usd.toLocaleString()}`;
  };

  const visibleRates = RATE_OPTIONS.filter((option) => {
    if (freeCancellationOnly && !option.freeCancellation) return false;
    if (rateTab === 'featured') return option.isFeatured;
    return true;
  });

  const visiblePhotos =
    photoFilter === 'All'
      ? photos
      : photos.filter(
          (p) => p.category === photoFilter || p.contributor === photoFilter
        );

  const visibleNearbyHotels = showAllNearbyHotels
    ? NEARBY_HOTELS
    : NEARBY_HOTELS.slice(0, 1);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setShareFeedback('Coordinates & Folio Link Copied (8HCR+JX Dublin)');
    setTimeout(() => setShareFeedback(''), 3500);
  };

  const scrollToHomeSection = (id: string) => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim()) return;
    const created: PhotoAsset = {
      id: `visitor-photo-${Date.now()}`,
      title: newPhotoTitle.trim(),
      category: newPhotoCategory,
      timestamp: 'Just now',
      contributor: 'From visitors',
      imageUrl: '/src/assets/images/estate_courtyard_atrium_1793608845251.jpg',
      aspectSpan: 'lg:col-span-4',
    };
    setPhotos([created, ...photos]);
    setNewPhotoTitle('');
    setIsUploadModalOpen(false);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;
    const created: GuestReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      source: 'Google',
      rating: newReviewRating,
      maxRating: 5,
      dateLabel: 'Just now',
      stayType: `Verified Guest · ${guestCount} Guests`,
      comment: newReviewComment.trim(),
      roomNote: '1 double bed · Standard Sanctuary',
    };
    setReviews([created, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setIsWriteReviewOpen(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingGuestName.trim() || !bookingGuestEmail.trim()) return;
    setBookingConfirmedRef(`ASH-${Math.floor(10000 + Math.random() * 90000)}`);
  };

  const getAmenityIcon = (id: string) => {
    switch (id) {
      case 'wifi':
        return <Wifi className="w-4 h-4 text-[#F2B36B]" />;
      case 'parking':
        return <Car className="w-4 h-4 text-[#F2B36B]" />;
      case 'pool':
        return <Waves className="w-4 h-4 text-[#F2B36B]" />;
      case 'kid-friendly':
        return <Users className="w-4 h-4 text-[#F2B36B]" />;
      case 'restaurant':
        return <Utensils className="w-4 h-4 text-[#F2B36B]" />;
      default:
        return <Dumbbell className="w-4 h-4 text-[#F2B36B]" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0F0F0F] text-[#FFFFFF] selection:bg-[#F2B36B]/30 selection:text-[#FFD3A6]">
      {/* =====================================================================
          GLOBAL AMBIENT ARCHITECTURAL BACKGROUND VIDEO LAYER
          Uses the user's attached /assets/aistudio/BACKGROUND_05d101d4.mp4
         ===================================================================== */}
      {ambientVideoEnabled && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <video
            ref={ambientVideoRef}
            src={ATTACHED_BACKGROUND_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-25 scale-105 filter contrast-110"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(15,15,15,0.82) 0%, rgba(15,15,15,0.74) 40%, rgba(15,15,15,0.92) 100%)',
            }}
          />
        </div>
      )}

      <div className="relative z-10">
        {/* =====================================================================
            TOP BAR CONTRACT (Strictly 1 Row, 3 Zones separated by gap-8)
           ===================================================================== */}
        <header className="sticky top-0 z-40 glass-surface border-b border-white/[0.08]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 h-20 flex items-center justify-between gap-8">
            {/* Zone 1: Single text element wordmark */}
            <button
              type="button"
              onClick={() => navigateToPage('home')}
              className="font-display text-xl md:text-2xl font-light tracking-tight text-[#FFFFFF] whitespace-nowrap shrink-0 cursor-pointer text-left"
            >
              ASHEMERE LODGE
            </button>

            {/* Zone 2: 5 concise single-line navigation links */}
            <nav
              aria-label="Primary Website Pages"
              className="hidden md:flex items-center gap-8"
            >
              {(
                [
                  { id: 'home', label: 'Home' },
                  { id: 'services', label: 'Services' },
                  { id: 'pricing', label: 'Pricing' },
                  { id: 'about', label: 'About' },
                  { id: 'contact', label: 'Contact' },
                ] as const
              ).map((navItem) => {
                const isCurrent = activePage === navItem.id;
                return (
                  <button
                    key={navItem.id}
                    type="button"
                    onClick={() => navigateToPage(navItem.id)}
                    className={`type-label-md transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-1 ${
                      isCurrent
                        ? 'text-[#F2B36B] border-b border-[#F2B36B]'
                        : 'text-[#CFCFCF] hover:text-[#F2B36B]'
                    }`}
                  >
                    {navItem.label}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 primary action */}
            <div className="flex items-center shrink-0">
              <button
                type="button"
                onClick={() => navigateToPage('pricing')}
                className="btn-primary-amber px-5 py-3 type-label-md font-medium whitespace-nowrap shrink-0 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </header>

        {/* Secondary Workspace Navigation Bar */}
        <div className="bg-[#141414]/90 backdrop-blur-md border-b border-white/[0.06]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-2.5 flex items-center justify-between gap-4 overflow-x-auto">
            <div className="flex items-center gap-1.5">
              {(
                [
                  { id: 'home', label: 'Home (Lodge Overview)' },
                  { id: 'services', label: 'Services Page' },
                  { id: 'pricing', label: 'Pricing Page' },
                  { id: 'about', label: 'About & CAD Plans' },
                  { id: 'contact', label: 'Contact & WhatsApp' },
                  { id: 'docs', label: 'Docs' },
                  { id: 'customers', label: 'Customers' },
                  { id: 'blog', label: 'Blog' },
                  { id: 'changelog', label: 'Changelog' },
                ] as const
              ).map((item) => {
                const active = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigateToPage(item.id)}
                    className={`px-3 py-1.5 type-label-sm flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'border border-[#F2B36B] bg-[#181818] text-[#FFFFFF]'
                        : 'border border-transparent text-[#9E9E9E] hover:text-[#FFFFFF]'
                    }`}
                  >
                    {active && <span className="w-[3px] h-[3px] bg-[#F2B36B] shrink-0" />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden xl:flex items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setAmbientVideoEnabled(!ambientVideoEnabled)}
                className={`px-3 py-1 type-label-sm flex items-center gap-1.5 border transition-colors cursor-pointer ${
                  ambientVideoEnabled
                    ? 'border-[#F2B36B]/50 text-[#F2B36B] bg-[#181818]'
                    : 'border-white/10 text-[#9E9E9E]'
                }`}
              >
                <Film className="w-3 h-3" />
                <span>Ambient Video: {ambientVideoEnabled ? 'Active' : 'Off'}</span>
              </button>

              <a
                href="https://wa.me/353851375847"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 type-label-sm text-[#F2B36B] hover:underline whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Desk: {ASHEMERE_PROPERTY.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================================
            MULTI-PAGE VIEW ROUTER
           ===================================================================== */}
        {activePage === 'pricing' && (
          <PricingPage
            currency={currency}
            onChangeCurrency={setCurrency}
            onNavigateContact={(subj) => navigateToPage('contact', subj)}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            currency={currency}
            onNavigateContact={(subj) => navigateToPage('contact', subj)}
            onNavigatePricing={() => navigateToPage('pricing')}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onNavigateContact={(subj) => navigateToPage('contact', subj)}
            onNavigateServices={() => navigateToPage('services')}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage initialSubject={contactPrefillSubject} />
        )}

        {(activePage === 'docs' ||
          activePage === 'customers' ||
          activePage === 'blog' ||
          activePage === 'changelog') && (
          <PortalResourcesPage
            activeSubTab={activePage}
            onChangeSubTab={(tab) => navigateToPage(tab)}
            onNavigatePricing={() => navigateToPage('pricing')}
          />
        )}

        {activePage === 'home' && (
          <main>
            {/* =====================================================================
                HERO & OVERVIEW SECTION WITH LIVE ARCHITECTURAL VIDEO SHOWCASE
               ===================================================================== */}
            <section id="overview" className="pt-10 md:pt-16 pb-20 border-b border-white/[0.08]">
              <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                {shareFeedback && (
                  <div className="mb-6 px-5 py-3 glass-shell-elevated border border-[#F2B36B] flex items-center justify-between">
                    <span className="type-label-sm text-[#F2B36B] font-mono-tech">
                      {shareFeedback}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShareFeedback('')}
                      className="text-xs text-[#9E9E9E] hover:text-[#FFFFFF]"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                  {/* Left 5 Columns */}
                  <div className="lg:col-span-5 flex flex-col justify-between py-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 type-label-sm text-[#9E9E9E] mb-6">
                        <span className="text-[#F2B36B] font-mono-tech">
                          {ASHEMERE_PROPERTY.rating} ★ (
                          {ASHEMERE_PROPERTY.reviewCount + (reviews.length - INITIAL_REVIEWS.length)}
                          )
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{ASHEMERE_PROPERTY.starClassification}</span>
                        <span aria-hidden="true">·</span>
                        <span>{ASHEMERE_PROPERTY.neighborhood}, Dublin</span>
                      </div>

                      <h1 className="type-headline-display text-[#FFFFFF] mb-6">
                        Ashemere Lodge.
                      </h1>

                      <p className="type-body-lg text-[#CFCFCF] mb-6">
                        A secluded nocturnal sanctuary situated at{' '}
                        <span className="text-[#FFFFFF]">
                          7 Old Nangor Road, Fairview, Dublin
                        </span>
                        . Offering immaculate private double rooms, illuminated courtyard pools,
                        marquee banquet hosting, and gated on-site parking.
                      </p>

                      {/* Quick Action Toolbar: Directions · Save · Nearby · Share */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
                        <button
                          type="button"
                          onClick={() => scrollToHomeSection('location')}
                          className="btn-ghost-obsidian py-3 px-3.5 type-label-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Navigation className="w-3.5 h-3.5 text-[#F2B36B]" />
                          <span>Directions</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsSaved(!isSaved)}
                          className={`py-3 px-3.5 type-label-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isSaved
                              ? 'bg-[#181818] border border-[#F2B36B] text-[#F2B36B]'
                              : 'btn-ghost-obsidian'
                          }`}
                        >
                          <Bookmark
                            className={`w-3.5 h-3.5 ${
                              isSaved ? 'fill-[#F2B36B] text-[#F2B36B]' : 'text-[#F2B36B]'
                            }`}
                          />
                          <span>{isSaved ? 'Saved' : 'Save'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => scrollToHomeSection('nearby')}
                          className="btn-ghost-obsidian py-3 px-3.5 type-label-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Compass className="w-3.5 h-3.5 text-[#F2B36B]" />
                          <span>Nearby</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleShare}
                          className="btn-ghost-obsidian py-3 px-3.5 type-label-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5 text-[#F2B36B]" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>

                    {/* Primary CTA & Nightly Rate Highlight */}
                    <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="type-label-sm text-[#9E9E9E] mb-1">
                          NIGHTLY COMPARISON RATE ({checkInDate} – {checkOutDate})
                        </div>
                        <div className="font-display text-3xl font-light text-[#F2B36B] font-mono-tech tabular-nums">
                          {formatPrice(14698)}{' '}
                          <span className="type-label-sm text-[#9E9E9E]">
                            / {nightsCount === 1 ? 'NIGHT' : `${nightsCount} NIGHTS`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => navigateToPage('services')}
                          className="btn-ghost-obsidian px-5 py-4 type-label-md whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Our Services
                        </button>
                        <button
                          type="button"
                          onClick={() => scrollToHomeSection('prices')}
                          className="btn-primary-amber px-6 py-4 type-label-md font-medium flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>Compare Prices</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right 7 Columns: Live Architectural Twilight Film (/assets/aistudio/BACKGROUND_05d101d4.mp4) */}
                  <div className="lg:col-span-7 relative group overflow-hidden bg-[#141414] border border-white/[0.08] min-h-[420px] lg:min-h-[560px]">
                    <video
                      ref={heroVideoRef}
                      src={ATTACHED_BACKGROUND_VIDEO}
                      autoPlay
                      loop
                      muted={isVideoMuted}
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-black/35 pointer-events-none" />

                    {/* Top Left Geodetic Plus Code + Live Video Controls */}
                    <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
                      <div className="glass-surface px-4 py-2.5 flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border border-[#F2B36B]/50 flex items-center justify-center">
                          <Compass className="w-3.5 h-3.5 text-[#F2B36B]" />
                        </div>
                        <span className="type-label-sm text-[#FFFFFF] font-mono-tech">
                          {ASHEMERE_PROPERTY.plusCode} · LIVE TWILIGHT REEL
                        </span>
                      </div>

                      {/* Play/Pause & Audio Controls for Attached Video */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={toggleHeroVideoPlay}
                          className="glass-shell-elevated px-3.5 py-2 type-label-sm flex items-center gap-1.5 text-[#FFFFFF] hover:text-[#F2B36B] cursor-pointer"
                          aria-label={isVideoPlaying ? 'Pause background video' : 'Play background video'}
                        >
                          {isVideoPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5 text-[#F2B36B]" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 text-[#F2B36B]" />
                              <span>Play</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={toggleHeroVideoMute}
                          className="glass-shell-elevated px-3.5 py-2 type-label-sm flex items-center gap-1.5 text-[#FFFFFF] hover:text-[#F2B36B] cursor-pointer"
                          aria-label={isVideoMuted ? 'Unmute video audio' : 'Mute video audio'}
                        >
                          {isVideoMuted ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-[#F2B36B]" />
                              <span>Unmute Audio</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-[#F2B36B]" />
                              <span>Sound On</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Bottom Glass Caption Bar */}
                    <div className="absolute bottom-6 left-6 right-6 glass-shell-elevated p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 type-label-sm text-[#CFCFCF] mb-1">
                          <span className="text-[#F2B36B] font-mono-tech">
                            ARCHITECTURAL CINEMA · 00:15
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{ASHEMERE_PROPERTY.address}</span>
                        </div>
                        <h2 className="type-headline-md text-[#FFFFFF]">
                          Nocturnal Sanctuary, Hearth &amp; Illuminated Reflection Basin
                        </h2>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            setLightboxPhoto(
                              photos.find((p) => p.isVideo) || PHOTO_ASSETS[5]
                            )
                          }
                          className="btn-ghost-obsidian px-4 py-2.5 type-label-sm flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-[#F2B36B]" />
                          <span>Fullscreen Video</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => scrollToHomeSection('photos')}
                          className="btn-ghost-obsidian px-4 py-2.5 type-label-sm flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5 text-[#F2B36B]" />
                          <span>Gallery ({photos.length})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full-Width 4-Column Property Telemetry Strip */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/[0.08] bg-[#141414]/85 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
                  <div className="p-6">
                    <div className="flex items-center gap-2 type-label-sm text-[#9E9E9E] mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#F2B36B]" />
                      <span>STREET ADDRESS</span>
                    </div>
                    <div className="type-body-md text-[#FFFFFF] font-normal">
                      {ASHEMERE_PROPERTY.address}
                    </div>
                    <div className="type-label-sm text-[#9E9E9E] mt-1">
                      Neighborhood: {ASHEMERE_PROPERTY.neighborhood}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 type-label-sm text-[#9E9E9E] mb-2">
                      <Phone className="w-3.5 h-3.5 text-[#F2B36B]" />
                      <span>RECEPTION DESK</span>
                    </div>
                    <a
                      href="tel:+353851375847"
                      className="type-body-md text-[#FFFFFF] hover:text-[#F2B36B] font-mono-tech tabular-nums transition-colors"
                    >
                      {ASHEMERE_PROPERTY.phone}
                    </a>
                    <div className="type-label-sm text-[#9E9E9E] mt-1 font-mono-tech">
                      Plus Code: {ASHEMERE_PROPERTY.plusCode}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 type-label-sm text-[#9E9E9E] mb-2">
                      <Clock className="w-3.5 h-3.5 text-[#F2B36B]" />
                      <span>ARRIVAL &amp; DEPARTURE</span>
                    </div>
                    <div className="type-body-md text-[#FFFFFF] font-mono-tech tabular-nums">
                      Check-in: {ASHEMERE_PROPERTY.checkInTime}
                    </div>
                    <div className="type-label-sm text-[#9E9E9E] mt-1 font-mono-tech tabular-nums">
                      Check-out: {ASHEMERE_PROPERTY.checkOutTime}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 type-label-sm text-[#9E9E9E] mb-2">
                      <Compass className="w-3.5 h-3.5 text-[#F2B36B]" />
                      <span>LOCATION SUMMARY</span>
                    </div>
                    <div className="type-body-md text-[#F2B36B] font-mono-tech tabular-nums">
                      {ASHEMERE_PROPERTY.locationScore} / 5.0 · {ASHEMERE_PROPERTY.locationVerdict}
                    </div>
                    <div className="type-label-sm text-[#9E9E9E] mt-1">
                      Sightseeing, recreation &amp; transit
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================================
                CHECK AVAILABILITY & COMPARE PRICES (#prices)
               ===================================================================== */}
            <section id="prices" className="py-24 border-b border-white/[0.08]">
              <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                  <div>
                    <div className="flex items-center gap-2 type-label-sm text-[#F2B36B] mb-3">
                      <span>01. CHECK AVAILABILITY</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#9E9E9E]">COMPARE OTA &amp; DIRECT RATES</span>
                    </div>
                    <h2 className="type-headline-lg text-[#FFFFFF]">
                      Compare Prices &amp; Room Options.
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => navigateToPage('pricing')}
                      className="btn-ghost-obsidian px-4 py-2 type-label-sm text-[#F2B36B] cursor-pointer"
                    >
                      Open Full Pricing Plans Page →
                    </button>
                    {(['PKR', 'EUR', 'USD'] as const).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setCurrency(curr)}
                        className={`px-3.5 py-2 type-label-sm font-mono-tech flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          currency === curr
                            ? 'border border-[#F2B36B] text-[#FFFFFF] bg-[#181818]'
                            : 'border border-white/[0.08] text-[#9E9E9E] hover:text-[#FFFFFF]'
                        }`}
                      >
                        {currency === curr && (
                          <span className="w-[3px] h-[3px] bg-[#F2B36B] shrink-0" />
                        )}
                        <span>{curr}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Booking & Filter Control Bar */}
                <div className="glass-shell-elevated p-6 md:p-8 mb-10">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                    <div className="md:col-span-3">
                      <label
                        htmlFor="checkin-select"
                        className="block type-label-md text-[#9E9E9E] mb-2"
                      >
                        Check-in Date
                      </label>
                      <select
                        id="checkin-select"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full bg-[#141414] border border-white/10 px-4 py-3 type-body-md text-[#FFFFFF] font-mono-tech focus:border-[#F2B36B] focus:outline-none"
                      >
                        <option value="Sun, Nov 8">Sun, Nov 8</option>
                        <option value="Mon, Nov 9">Mon, Nov 9</option>
                        <option value="Tue, Nov 10">Tue, Nov 10</option>
                        <option value="Fri, Nov 13">Fri, Nov 13</option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label
                        htmlFor="checkout-select"
                        className="block type-label-md text-[#9E9E9E] mb-2"
                      >
                        Check-out Date
                      </label>
                      <select
                        id="checkout-select"
                        value={checkOutDate}
                        onChange={(e) => {
                          setCheckOutDate(e.target.value);
                          if (e.target.value === 'Tue, Nov 10') setNightsCount(2);
                          else if (e.target.value === 'Wed, Nov 11') setNightsCount(3);
                          else setNightsCount(1);
                        }}
                        className="w-full bg-[#141414] border border-white/10 px-4 py-3 type-body-md text-[#FFFFFF] font-mono-tech focus:border-[#F2B36B] focus:outline-none"
                      >
                        <option value="Mon, Nov 9">Mon, Nov 9 (1 Night)</option>
                        <option value="Tue, Nov 10">Tue, Nov 10 (2 Nights)</option>
                        <option value="Wed, Nov 11">Wed, Nov 11 (3 Nights)</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="guests-select"
                        className="block type-label-md text-[#9E9E9E] mb-2"
                      >
                        Guests
                      </label>
                      <div className="flex items-center border border-white/10 bg-[#141414]">
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          className="px-3.5 py-3 text-[#9E9E9E] hover:text-[#F2B36B] font-mono-tech cursor-pointer"
                          aria-label="Decrease guests"
                        >
                          −
                        </button>
                        <span
                          id="guests-select"
                          className="flex-1 text-center type-body-md text-[#FFFFFF] font-mono-tech tabular-nums"
                        >
                          {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.min(6, guestCount + 1))}
                          className="px-3.5 py-3 text-[#9E9E9E] hover:text-[#F2B36B] font-mono-tech cursor-pointer"
                          aria-label="Increase guests"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-4 pb-2">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={freeCancellationOnly}
                        onClick={() => setFreeCancellationOnly(!freeCancellationOnly)}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <span
                          className={`w-[14px] h-[14px] shrink-0 flex items-center justify-center border transition-colors ${
                            freeCancellationOnly
                              ? 'bg-[#0F0F0F] border-[#F2B36B]'
                              : 'bg-transparent border-white/25 group-hover:border-white/50'
                          }`}
                        >
                          {freeCancellationOnly && (
                            <Check className="w-3 h-3 text-[#F2B36B] stroke-[2.5]" />
                          )}
                        </span>
                        <span className="type-label-md text-[#FFFFFF]">
                          Free cancellation only
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setRateTab('featured')}
                        className={`px-4 py-2 type-label-sm flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          rateTab === 'featured'
                            ? 'border border-[#F2B36B] text-[#FFFFFF] bg-[#181818]'
                            : 'border border-white/[0.08] text-[#9E9E9E] hover:text-[#FFFFFF]'
                        }`}
                      >
                        {rateTab === 'featured' && (
                          <span className="w-[3px] h-[3px] bg-[#F2B36B] shrink-0" />
                        )}
                        <span>Featured options (Sponsored)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRateTab('all')}
                        className={`px-4 py-2 type-label-sm flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          rateTab === 'all'
                            ? 'border border-[#F2B36B] text-[#FFFFFF] bg-[#181818]'
                            : 'border border-white/[0.08] text-[#9E9E9E] hover:text-[#FFFFFF]'
                        }`}
                      >
                        {rateTab === 'all' && (
                          <span className="w-[3px] h-[3px] bg-[#F2B36B] shrink-0" />
                        )}
                        <span>All options ({RATE_OPTIONS.length})</span>
                      </button>
                    </div>

                    <span className="type-label-sm text-[#9E9E9E] font-mono-tech">
                      SHOWING RATES FOR {checkInDate.toUpperCase()} — {checkOutDate.toUpperCase()} ·{' '}
                      {guestCount} GUESTS
                    </span>
                  </div>
                </div>

                {/* Tabular Rate Comparison Rows */}
                <div className="border border-white/[0.08] bg-[#141414]/90 divide-y divide-white/[0.08]">
                  {visibleRates.map((option) => (
                    <div
                      key={option.id}
                      className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[#181818]/80 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="type-headline-md text-[#FFFFFF]">{option.provider}</h3>
                          {option.badge && (
                            <>
                              <span className="text-white/20" aria-hidden="true">
                                ·
                              </span>
                              <span className="type-label-sm text-[#F2B36B]">{option.badge}</span>
                            </>
                          )}
                        </div>

                        <p className="type-body-md text-[#CFCFCF]">{option.roomType}</p>

                        <div className="flex flex-wrap items-center gap-2 type-label-sm text-[#9E9E9E]">
                          {option.perks.map((perk, idx) => (
                            <React.Fragment key={perk}>
                              {idx > 0 && <span aria-hidden="true">·</span>}
                              <span className={perk.includes('Free') ? 'text-[#CFCFCF]' : ''}>
                                {perk}
                              </span>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-row lg:flex-col sm:flex-row items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
                        <div className="text-left sm:text-right">
                          <div className="font-display text-3xl font-light text-[#FFFFFF] font-mono-tech tabular-nums">
                            {formatPrice(option.pricePkr)}
                          </div>
                          <div className="type-label-sm text-[#9E9E9E] font-mono-tech">
                            {option.freeCancellation ? 'FREE CANCELLATION' : 'NON-REFUNDABLE RATE'}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRateForBooking(option);
                            setBookingConfirmedRef('');
                          }}
                          className="btn-primary-amber px-6 py-3.5 type-label-md font-medium flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>{option.ctaLabel}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {rateTab === 'featured' && (
                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setRateTab('all')}
                      className="btn-ghost-obsidian px-8 py-3.5 type-label-md cursor-pointer"
                    >
                      More prices from {formatPrice(14698)} · View all {RATE_OPTIONS.length} options
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* =====================================================================
                PHOTOS & VIDEOS GALLERY (#photos)
               ===================================================================== */}
            <section id="photos" className="py-24 border-b border-white/[0.08]">
              <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                  <div>
                    <div className="flex items-center gap-2 type-label-sm text-[#F2B36B] mb-3">
                      <span>02. VISUAL ARCHIVE</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#9E9E9E]">LATEST 6 DAYS AGO</span>
                    </div>
                    <h2 className="type-headline-lg text-[#FFFFFF]">
                      Photos &amp; Videos.
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(true)}
                    className="btn-ghost-obsidian px-5 py-3 type-label-md flex items-center gap-2 self-start lg:self-auto whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#F2B36B]" />
                    <span>Add photos &amp; videos</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-12" role="tablist">
                  {(
                    [
                      'All',
                      'Latest',
                      'Videos',
                      'Rooms',
                      'Exterior',
                      'Kitchen',
                      'From visitors',
                      'By owner',
                      'Street View & 360°',
                    ] as const
                  ).map((cat) => {
                    const active = photoFilter === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setPhotoFilter(cat)}
                        className={`px-3.5 py-2 type-label-sm flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'border border-[#F2B36B] text-[#FFFFFF] bg-[#181818]'
                            : 'border border-white/[0.08] text-[#9E9E9E] hover:text-[#FFFFFF]'
                        }`}
                      >
                        {active && <span className="w-[3px] h-[3px] bg-[#F2B36B] shrink-0" />}
                        <span>{cat === 'Latest' ? 'Latest · 6 days ago' : cat}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {visiblePhotos.map((item) => (
                    <article
                      key={item.id}
                      onClick={() => setLightboxPhoto(item)}
                      className={`${
                        visiblePhotos.length === 1
                          ? 'lg:col-span-12'
                          : item.aspectSpan || 'lg:col-span-4'
                      } group relative h-[320px] md:h-[380px] bg-[#141414] border border-white/[0.08] overflow-hidden cursor-pointer`}
                    >
                      {item.videoUrl ? (
                        <video
                          src={item.videoUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover estate-image-zoom"
                        />
                      ) : (
                        <ResilientImage
                          src={item.imageUrl}
                          alt={item.title}
                          fallbackTitle={item.title}
                          fallbackSubtitle={item.category}
                          className="w-full h-full object-cover estate-image-zoom"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-black/30" />

                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                        <div className="glass-surface px-3 py-1.5 flex items-center gap-2 type-label-sm text-[#FFFFFF]">
                          <span className="text-[#F2B36B]">{item.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#CFCFCF]">{item.timestamp}</span>
                        </div>

                        <div className="glass-surface p-2 text-[#FFFFFF] group-hover:text-[#F2B36B] transition-colors">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 glass-surface p-4 flex items-center justify-between gap-4">
                        <div>
                          <div className="type-label-sm text-[#9E9E9E] mb-0.5">
                            {item.contributor}
                          </div>
                          <h3 className="type-body-md text-[#FFFFFF] font-normal">{item.title}</h3>
                        </div>
                        {item.is360 && (
                          <span className="type-label-sm text-[#F2B36B] font-mono-tech shrink-0">
                            360° PANORAMA
                          </span>
                        )}
                        {item.isVideo && (
                          <span className="type-label-sm text-[#F2B36B] font-mono-tech shrink-0 flex items-center gap-1">
                            <Play className="w-3 h-3 fill-[#F2B36B]" />
                            <span>HD VIDEO</span>
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* =====================================================================
                ABOUT, HOTEL DETAILS, LOCATION SUMMARY & NEARBY HOTELS (#about & #location)
               ===================================================================== */}
            <section id="about" className="py-24 border-b border-white/[0.08]">
              <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  {/* Left 5 Columns */}
                  <div className="lg:col-span-5 space-y-10">
                    <div>
                      <div className="flex items-center gap-2 type-label-sm text-[#F2B36B] mb-3">
                        <span>03. HOTEL DETAILS &amp; DIRECTORY</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#9E9E9E]">3-STAR HOTEL</span>
                      </div>
                      <h2 className="type-headline-lg text-[#FFFFFF] mb-4">
                        Amenities &amp; Property Specifications.
                      </h2>
                      <p className="type-body-md text-[#CFCFCF]">
                        Inspect verified amenities and property coordinates for Ashemere Lodge on
                        Old Nangor Road.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {HOTEL_AMENITIES.map((amenity) => {
                        const isSelected = selectedAmenityId === amenity.id;
                        return (
                          <button
                            key={amenity.id}
                            type="button"
                            onClick={() => setSelectedAmenityId(amenity.id)}
                            className={`p-4 text-left border transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#181818] border-[#F2B36B]'
                                : 'bg-[#141414] border-white/[0.08] hover:border-white/25'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              {getAmenityIcon(amenity.id)}
                              {isSelected && <span className="w-1.5 h-1.5 bg-[#F2B36B]" />}
                            </div>
                            <div className="type-body-sm text-[#FFFFFF] font-normal">
                              {amenity.label}
                            </div>
                            <div className="type-label-sm text-[#9E9E9E] mt-0.5 truncate">
                              {amenity.status}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {HOTEL_AMENITIES.find((a) => a.id === selectedAmenityId) && (
                      <div className="p-5 bg-[#141414] border border-white/[0.08]">
                        <div className="type-label-sm text-[#F2B36B] mb-1">
                          AMENITY SPECIFICATION ·{' '}
                          {HOTEL_AMENITIES.find((a) => a.id === selectedAmenityId)?.label}
                        </div>
                        <p className="type-body-sm text-[#CFCFCF]">
                          {HOTEL_AMENITIES.find((a) => a.id === selectedAmenityId)?.detail}
                        </p>
                      </div>
                    )}

                    <div className="glass-surface p-6">
                      <div className="type-label-md text-[#F2B36B] pb-3 border-b border-white/[0.08] mb-2">
                        Official Property Ledger
                      </div>
                      <div className="divide-y divide-white/[0.06]">
                        <div className="py-3 flex items-baseline justify-between gap-4">
                          <span className="type-label-md text-[#9E9E9E]">Address</span>
                          <span className="type-body-sm text-[#FFFFFF] text-right">
                            {ASHEMERE_PROPERTY.address}
                          </span>
                        </div>
                        <div className="py-3 flex items-baseline justify-between gap-4">
                          <span className="type-label-md text-[#9E9E9E]">Telephone</span>
                          <span className="type-body-sm text-[#FFFFFF] font-mono-tech tabular-nums text-right">
                            {ASHEMERE_PROPERTY.phone}
                          </span>
                        </div>
                        <div className="py-3 flex items-baseline justify-between gap-4">
                          <span className="type-label-md text-[#9E9E9E]">Plus Code</span>
                          <span className="type-body-sm text-[#F2B36B] font-mono-tech text-right">
                            {ASHEMERE_PROPERTY.plusCode}
                          </span>
                        </div>
                        <div className="py-3 flex items-baseline justify-between gap-4">
                          <span className="type-label-md text-[#9E9E9E]">Check-in / Check-out</span>
                          <span className="type-body-sm text-[#FFFFFF] font-mono-tech tabular-nums text-right">
                            {ASHEMERE_PROPERTY.checkInTime} / {ASHEMERE_PROPERTY.checkOutTime}
                          </span>
                        </div>
                        <div className="py-3 flex items-baseline justify-between gap-4">
                          <span className="type-label-md text-[#9E9E9E]">Private Label</span>
                          <div className="flex items-center gap-2">
                            {isEditingLabel ? (
                              <input
                                type="text"
                                value={customMapLabel}
                                onChange={(e) => setCustomMapLabel(e.target.value)}
                                onBlur={() => setIsEditingLabel(false)}
                                onKeyDown={(e) => e.key === 'Enter' && setIsEditingLabel(false)}
                                autoFocus
                                className="bg-[#0F0F0F] border border-[#F2B36B] px-2 py-1 type-body-sm text-[#FFFFFF] focus:outline-none"
                              />
                            ) : (
                              <span className="type-body-sm text-[#CFCFCF]">{customMapLabel}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setIsEditingLabel(true)}
                          className="btn-ghost-obsidian px-3 py-1.5 type-label-sm flex items-center gap-1.5 cursor-pointer"
                        >
                          <Tag className="w-3 h-3 text-[#F2B36B]" />
                          <span>Add a label</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveInfoModal('suggest-edit')}
                          className="btn-ghost-obsidian px-3 py-1.5 type-label-sm flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3 text-[#F2B36B]" />
                          <span>Suggest an edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveInfoModal('missing-info')}
                          className="btn-ghost-obsidian px-3 py-1.5 type-label-sm flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3 text-[#F2B36B]" />
                          <span>Add missing information</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveInfoModal('add-website')}
                          className="btn-ghost-obsidian px-3 py-1.5 type-label-sm flex items-center gap-1.5 cursor-pointer"
                        >
                          <Globe className="w-3 h-3 text-[#F2B36B]" />
                          <span>{websiteUrl ? 'Update website' : 'Add website'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveInfoModal('maps-history')}
                          className="btn-ghost-obsidian px-3 py-1.5 type-label-sm flex items-center gap-1.5 cursor-pointer"
                        >
                          <History className="w-3 h-3 text-[#F2B36B]" />
                          <span>Your Maps history</span>
                        </button>
                      </div>

                      {infoSubmissionNotice && (
                        <div className="mt-4 p-3 bg-[#181818] border border-[#F2B36B]/40 type-label-sm text-[#F2B36B]">
                          {infoSubmissionNotice}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right 7 Columns */}
                  <div id="location" className="lg:col-span-7 space-y-10">
                    <div className="glass-surface p-6 md:p-10">
                      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/[0.08] mb-6">
                        <div>
                          <div className="type-label-sm text-[#F2B36B] mb-1">
                            LOCATION SUMMARY · {ASHEMERE_PROPERTY.plusCode}
                          </div>
                          <h3 className="type-headline-md text-[#FFFFFF]">
                            Neighborhood: {ASHEMERE_PROPERTY.neighborhood}
                          </h3>
                          <p className="type-body-sm text-[#9E9E9E] mt-1">
                            {ASHEMERE_PROPERTY.locationBasis}
                          </p>
                        </div>

                        <div className="glass-shell-elevated px-4 py-3 text-right">
                          <div className="font-display text-3xl font-light text-[#F2B36B] font-mono-tech tabular-nums">
                            {ASHEMERE_PROPERTY.locationScore}
                          </div>
                          <div className="type-label-sm text-[#FFFFFF]">
                            {ASHEMERE_PROPERTY.locationVerdict}
                          </div>
                        </div>
                      </div>

                      <div className="relative h-[260px] bg-[#0F0F0F] border border-white/[0.08] mb-6 overflow-hidden">
                        <svg
                          viewBox="0 0 800 320"
                          className="w-full h-full"
                          preserveAspectRatio="xMidYMid slice"
                        >
                          <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
                            <line x1="160" y1="0" x2="160" y2="320" />
                            <line x1="320" y1="0" x2="320" y2="320" />
                            <line x1="480" y1="0" x2="480" y2="320" />
                            <line x1="640" y1="0" x2="640" y2="320" />
                            <line x1="0" y1="80" x2="800" y2="80" />
                            <line x1="0" y1="160" x2="800" y2="160" />
                            <line x1="0" y1="240" x2="800" y2="240" />
                          </g>
                          <path
                            d="M 0 110 Q 320 125 800 95"
                            fill="none"
                            stroke="rgba(242, 179, 107, 0.25)"
                            strokeWidth="2"
                            strokeDasharray="6 4"
                          />
                          <path
                            d="M 0 190 L 420 165 L 800 205"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.25)"
                            strokeWidth="2.5"
                          />
                          <path
                            d="M 540 0 L 510 320"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.18)"
                            strokeWidth="4"
                          />
                          <g
                            fill="#9E9E9E"
                            fontSize="10"
                            fontFamily="JetBrains Mono, monospace"
                            letterSpacing="1.5"
                          >
                            <text x="24" y="100">GRAND CANAL WAY CORRIDOR</text>
                            <text x="24" y="180">OLD NANGOR ROAD (R134)</text>
                            <text x="522" y="34">M50 MOTORWAY AXIS</text>
                            <text x="120" y="275">CORKAGH PARK DEMESNE</text>
                          </g>
                          <circle
                            cx="370"
                            cy="168"
                            r="22"
                            fill="rgba(242, 179, 107, 0.15)"
                            stroke="#F2B36B"
                            strokeDasharray="3 3"
                          />
                          <circle cx="370" cy="168" r="5" fill="#F2B36B" />
                          <text
                            x="385"
                            y="162"
                            fill="#FFFFFF"
                            fontSize="11"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            ASHEMERE LODGE (8HCR+JX)
                          </text>
                          <circle cx="485" cy="265" r="4" fill="#CFCFCF" />
                          <text
                            x="498"
                            y="269"
                            fill="#9E9E9E"
                            fontSize="10"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            TALLAGHT CROSS (2.6 MI)
                          </text>
                        </svg>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        {(
                          [
                            { id: 'thingsToDo', label: 'Things to do' },
                            { id: 'transit', label: 'Transit' },
                            { id: 'airports', label: 'Airports' },
                          ] as const
                        ).map((tab) => {
                          const active = locationTab === tab.id;
                          return (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setLocationTab(tab.id)}
                              className={`px-4 py-2 type-label-sm flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                active
                                  ? 'border border-[#F2B36B] text-[#FFFFFF] bg-[#181818]'
                                  : 'border border-white/[0.08] text-[#9E9E9E] hover:text-[#FFFFFF]'
                              }`}
                            >
                              {active && (
                                <span className="w-[3px] h-[3px] bg-[#F2B36B] shrink-0" />
                              )}
                              <span>{tab.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                        {LOCATION_HIGHLIGHTS[locationTab].map((place) => (
                          <div
                            key={place.name}
                            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div>
                              <div className="type-body-md text-[#FFFFFF] font-normal">
                                {place.name}
                              </div>
                              <div className="type-body-sm text-[#9E9E9E]">{place.note}</div>
                            </div>
                            <div className="sm:text-right shrink-0">
                              <div className="type-label-sm text-[#F2B36B] font-mono-tech">
                                {place.distance}
                              </div>
                              <div className="type-label-sm text-[#CFCFCF] mt-0.5">
                                {place.rating}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Similar Hotels Nearby */}
                    <div id="nearby" className="glass-surface p-6 md:p-10">
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-6">
                        <div>
                          <div className="type-label-sm text-[#F2B36B] mb-1">
                            COMPARATIVE ACCOMMODATIONS
                          </div>
                          <h3 className="type-headline-md text-[#FFFFFF]">
                            Similar hotels nearby
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowAllNearbyHotels(!showAllNearbyHotels)}
                          className="btn-ghost-obsidian px-4 py-2 type-label-sm cursor-pointer"
                        >
                          {showAllNearbyHotels
                            ? 'Show primary nearby hotel'
                            : 'View more nearby hotels'}
                        </button>
                      </div>

                      <div className="space-y-4">
                        {visibleNearbyHotels.map((hotel) => (
                          <div
                            key={hotel.id}
                            className="p-4 bg-[#141414] border border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-24 h-20 shrink-0 overflow-hidden border border-white/[0.08]">
                                <ResilientImage
                                  src={hotel.imageUrl}
                                  alt={hotel.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="type-body-lg text-[#FFFFFF] font-normal">
                                  {hotel.name}
                                </h4>
                                <div className="flex flex-wrap items-center gap-2 type-label-sm text-[#9E9E9E] mt-1">
                                  <span className="text-[#F2B36B] font-mono-tech">
                                    {hotel.rating} ({hotel.reviewCount})
                                  </span>
                                  <span aria-hidden="true">·</span>
                                  <span className="text-[#CFCFCF]">{hotel.perk}</span>
                                  <span aria-hidden="true">·</span>
                                  <span className="font-mono-tech">{hotel.distance}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/[0.06]">
                              <div className="font-mono-tech text-sm text-[#FFFFFF] tabular-nums">
                                {formatPrice(hotel.pricePkr)}
                              </div>
                              <button
                                type="button"
                                onClick={() => scrollToHomeSection('prices')}
                                className="type-label-sm text-[#F2B36B] hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <span>Compare</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================================
                GOOGLE REVIEW SUMMARY & TRIPADVISOR REVIEWS (#reviews)
               ===================================================================== */}
            <section id="reviews" className="py-24">
              <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
                  <div>
                    <div className="flex items-center gap-2 type-label-sm text-[#F2B36B] mb-3">
                      <span>04. VERIFIED PATRON FEEDBACK</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#9E9E9E]">GOOGLE &amp; TRIPADVISOR LEDGER</span>
                    </div>
                    <h2 className="type-headline-lg text-[#FFFFFF]">
                      Google Review Summary &amp; Guest Ledger.
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsWriteReviewOpen(true)}
                    className="btn-primary-amber px-6 py-3.5 type-label-md font-medium flex items-center gap-2 self-start lg:self-auto whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Write a review</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="glass-surface p-8">
                      <div className="flex items-center justify-between gap-6 pb-6 border-b border-white/[0.08] mb-6">
                        <div>
                          <div className="type-label-sm text-[#9E9E9E] mb-1">
                            GOOGLE REVIEW SUMMARY
                          </div>
                          <div className="font-display text-6xl font-light text-[#FFFFFF] font-mono-tech tabular-nums">
                            {ASHEMERE_PROPERTY.rating}
                          </div>
                          <div className="type-label-sm text-[#F2B36B] mt-2 font-mono-tech">
                            {ASHEMERE_PROPERTY.reviewCount +
                              (reviews.length - INITIAL_REVIEWS.length)}{' '}
                            REVIEWS
                          </div>
                        </div>

                        <div className="flex-1 space-y-2">
                          {RATING_DISTRIBUTION.map((row) => (
                            <div key={row.stars} className="flex items-center gap-3">
                              <span className="w-4 type-label-sm text-[#CFCFCF] font-mono-tech tabular-nums">
                                {row.stars}
                              </span>
                              <div className="flex-1 h-1.5 bg-[#0F0F0F] border border-white/[0.08] overflow-hidden">
                                <div
                                  className="h-full bg-[#F2B36B]"
                                  style={{ width: `${row.percentage}%` }}
                                />
                              </div>
                              <span className="w-8 text-right type-label-sm text-[#9E9E9E] font-mono-tech tabular-nums">
                                {row.count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <div className="type-label-md text-[#FFFFFF]">Tripadvisor</div>
                          <div className="type-body-sm text-[#9E9E9E]">
                            External traveler index
                          </div>
                        </div>
                        <div className="text-right font-mono-tech">
                          <span className="text-xl text-[#F2B36B]">
                            {ASHEMERE_PROPERTY.tripadvisorScore}
                          </span>
                          <span className="text-white/20 mx-2">·</span>
                          <span className="type-label-sm text-[#CFCFCF]">
                            {ASHEMERE_PROPERTY.tripadvisorCount} reviews
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    {(showAllReviews ? reviews : reviews.slice(0, 2)).map((rev) => (
                      <article key={rev.id} className="glass-surface p-8">
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.06] mb-4">
                          <div className="flex items-center gap-2 type-label-sm">
                            <span className="text-[#FFFFFF] font-mono-tech">{rev.author}</span>
                            <span aria-hidden="true" className="text-white/20">
                              ·
                            </span>
                            <span className="text-[#9E9E9E]">{rev.dateLabel}</span>
                            <span aria-hidden="true" className="text-white/20">
                              ·
                            </span>
                            <span className="text-[#F2B36B]">{rev.source}</span>
                          </div>

                          <div className="flex items-center gap-1 font-mono-tech text-xs text-[#F2B36B]">
                            {Array.from({ length: rev.rating }).map((_, idx) => (
                              <Star
                                key={idx}
                                className="w-3.5 h-3.5 fill-[#F2B36B] text-[#F2B36B]"
                              />
                            ))}
                          </div>
                        </div>

                        <p className="font-display text-xl font-light text-[#FFFFFF] leading-relaxed mb-4">
                          “{rev.comment}”
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/[0.05] type-label-sm text-[#9E9E9E]">
                          <span>{rev.stayType}</span>
                          {rev.roomNote && <span className="text-[#CFCFCF]">{rev.roomNote}</span>}
                        </div>
                      </article>
                    ))}

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="btn-ghost-obsidian px-6 py-3.5 type-label-md cursor-pointer"
                      >
                        {showAllReviews
                          ? 'Show fewer reviews'
                          : `More reviews (${77 + (reviews.length - INITIAL_REVIEWS.length)})`}
                      </button>

                      <span className="type-label-sm text-[#9E9E9E]">
                        WEB RESULTS &amp; ABOUT THIS DATA VERIFIED
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        )}

        {/* =====================================================================
            QUIET EDITORIAL FOOTER WITH FULL MULTI-PAGE NAVIGATION
           ===================================================================== */}
        <footer className="border-t border-white/[0.08] bg-[#0E0E0E]/95 py-16">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <div className="font-display text-lg font-light tracking-tight text-[#FFFFFF] mb-1">
                ASHEMERE LODGE · OBSIDIAN SANCTUARY
              </div>
              <p className="type-label-sm text-[#9E9E9E]">
                {ASHEMERE_PROPERTY.address} · {ASHEMERE_PROPERTY.plusCode} ·{' '}
                {ASHEMERE_PROPERTY.phone}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              {(
                [
                  { id: 'home', label: 'Home' },
                  { id: 'services', label: 'Services' },
                  { id: 'pricing', label: 'Pricing' },
                  { id: 'about', label: 'About' },
                  { id: 'contact', label: 'Contact' },
                  { id: 'docs', label: 'Docs' },
                  { id: 'customers', label: 'Customers' },
                  { id: 'blog', label: 'Blog' },
                  { id: 'changelog', label: 'Changelog' },
                ] as const
              ).map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => navigateToPage(link.id)}
                  className={`type-label-sm transition-colors cursor-pointer ${
                    activePage === link.id
                      ? 'text-[#F2B36B]'
                      : 'text-[#9E9E9E] hover:text-[#F2B36B]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </footer>
      </div>

      {/* =====================================================================
          HOMEPAGE MODALS (RESERVATION, 360 / VIDEO LIGHTBOX, UPLOAD, REVIEW, DIRECTORY)
         ===================================================================== */}
      {selectedRateForBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-xl glass-shell-elevated p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <div>
                <span className="type-label-sm text-[#F2B36B]">
                  {selectedRateForBooking.provider} · ROOM RESERVATION
                </span>
                <h3 className="type-headline-md text-[#FFFFFF] mt-1">
                  Ashemere Lodge ({checkInDate} – {checkOutDate})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRateForBooking(null)}
                className="btn-ghost-obsidian p-2 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingConfirmedRef ? (
              <div className="space-y-6">
                <div className="p-5 bg-[#141414] border border-[#F2B36B]">
                  <div className="type-label-sm text-[#F2B36B] font-mono-tech mb-1">
                    RESERVATION CONFIRMED · REF {bookingConfirmedRef}
                  </div>
                  <p className="type-body-md text-[#FFFFFF]">
                    Your reservation for <strong className="font-normal">{bookingGuestName}</strong>{' '}
                    ({guestCount} guests) via {selectedRateForBooking.provider} is registered.
                  </p>
                  <p className="type-label-sm text-[#9E9E9E] mt-2 font-mono-tech">
                    CHECK-IN: {checkInDate} AT 3:00 PM · TOTAL:{' '}
                    {formatPrice(selectedRateForBooking.pricePkr)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRateForBooking(null)}
                  className="btn-primary-amber w-full py-3.5 type-label-md font-medium cursor-pointer"
                >
                  Return to Ashemere Lodge
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-5">
                <div className="p-4 bg-[#141414] border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <div className="type-body-md text-[#FFFFFF]">
                      {selectedRateForBooking.roomType}
                    </div>
                    <div className="type-label-sm text-[#9E9E9E]">
                      {guestCount} Guests · Check-in 3:00 PM / Check-out 11:00 AM
                    </div>
                  </div>
                  <div className="font-mono-tech text-xl text-[#F2B36B]">
                    {formatPrice(selectedRateForBooking.pricePkr)}
                  </div>
                </div>

                <div>
                  <label className="block type-label-md text-[#9E9E9E] mb-2">
                    Primary Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingGuestName}
                    onChange={(e) => setBookingGuestName(e.target.value)}
                    placeholder="Enter guest full name"
                    className="w-full bg-[#141414] border border-white/10 px-4 py-3 type-body-md text-[#FFFFFF] focus:border-[#F2B36B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block type-label-md text-[#9E9E9E] mb-2">
                    Confirmation Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingGuestEmail}
                    onChange={(e) => setBookingGuestEmail(e.target.value)}
                    placeholder="guest@example.com"
                    className="w-full bg-[#141414] border border-white/10 px-4 py-3 type-body-md text-[#FFFFFF] focus:border-[#F2B36B] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="btn-primary-amber flex-1 py-3.5 type-label-md font-medium cursor-pointer"
                  >
                    Confirm Room at {formatPrice(selectedRateForBooking.pricePkr)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRateForBooking(null)}
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

      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-5xl glass-shell-elevated overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0F0F0F]">
              <div className="flex items-center gap-3">
                <span className="type-label-sm text-[#F2B36B]">{lightboxPhoto.category}</span>
                <span className="text-white/20">·</span>
                <span className="type-body-sm text-[#FFFFFF]">{lightboxPhoto.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="btn-ghost-obsidian px-3 py-1.5 type-label-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative h-[440px] md:h-[540px] overflow-hidden bg-[#0F0F0F]">
              {lightboxPhoto.videoUrl ? (
                <video
                  src={lightboxPhoto.videoUrl}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-cover"
                />
              ) : (
                <ResilientImage
                  src={lightboxPhoto.imageUrl}
                  alt={lightboxPhoto.title}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              )}
              {lightboxPhoto.is360 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-shell-elevated px-6 py-3 flex items-center gap-4">
                  <span className="type-label-sm text-[#F2B36B] font-mono-tech">
                    360° STREET VIEW BEARING: {140 + panoramaYaw}°
                  </span>
                  <input
                    type="range"
                    min="-90"
                    max="90"
                    value={panoramaYaw}
                    onChange={(e) => setPanoramaYaw(Number(e.target.value))}
                    aria-label="Pan 360 Street View"
                    className="accent-[#F2B36B]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isUploadModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg glass-shell-elevated p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <h3 className="type-headline-md text-[#FFFFFF]">Add Photos &amp; Videos</h3>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="btn-ghost-obsidian p-2 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddPhoto} className="space-y-5">
              <div>
                <label className="block type-label-md text-[#9E9E9E] mb-2">
                  Caption / Room Area *
                </label>
                <input
                  type="text"
                  required
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  placeholder="e.g. Immaculate Double Bedroom & En-Suite"
                  className="w-full bg-[#141414] border border-white/10 px-4 py-3 type-body-md text-[#FFFFFF] focus:border-[#F2B36B] focus:outline-none"
                />
              </div>
              <div>
                <label className="block type-label-md text-[#9E9E9E] mb-2">Category</label>
                <select
                  value={newPhotoCategory}
                  onChange={(e) =>
                    setNewPhotoCategory(e.target.value as PhotoAsset['category'])
                  }
                  className="w-full bg-[#141414] border border-white/10 px-4 py-3 type-body-md text-[#FFFFFF] focus:border-[#F2B36B] focus:outline-none"
                >
                  <option value="Rooms">Rooms</option>
                  <option value="Exterior">Exterior</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="From visitors">From visitors</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn-primary-amber w-full py-3.5 type-label-md font-medium cursor-pointer"
              >
                Publish to Ashemere Lodge Archive
              </button>
            </form>
          </div>
        </div>
      )}

      {isWriteReviewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg glass-shell-elevated p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <h3 className="type-headline-md text-[#FFFFFF]">Write a Review · Ashemere Lodge</h3>
              <button
                type="button"
                onClick={() => setIsWriteReviewOpen(false)}
                className="btn-ghost-obsidian p-2 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddReview} className="space-y-5">
              <div>
                <label className="block type-label-md text-[#9E9E9E] mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Kieran B."
                  className="w-full bg-[#141414] border border-white/10 px-4 py-3 type-body-md text-[#FFFFFF] focus:border-[#F2B36B] focus:outline-none"
                />
              </div>
              <div>
                <span className="block type-label-md text-[#9E9E9E] mb-2">Rating</span>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className={`px-3.5 py-2 border font-mono-tech text-xs cursor-pointer ${
                        newReviewRating >= star
                          ? 'border-[#F2B36B] bg-[#181818] text-[#F2B36B]'
                          : 'border-white/10 text-[#9E9E9E]'
                      }`}
                    >
                      {star} ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block type-label-md text-[#9E9E9E] mb-2">Review *</label>
                <textarea
                  rows={4}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share your experience of the bedrooms, staff, and Clondalkin location..."
                  className="w-full bg-[#141414] border border-white/10 p-4 type-body-md text-[#FFFFFF] focus:border-[#F2B36B] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="btn-primary-amber w-full py-3.5 type-label-md font-medium cursor-pointer"
              >
                Publish Review
              </button>
            </form>
          </div>
        </div>
      )}

      {activeInfoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md glass-shell-elevated p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <h3 className="type-headline-md text-[#FFFFFF]">
                {activeInfoModal === 'suggest-edit' && 'Suggest an Edit'}
                {activeInfoModal === 'missing-info' && 'Add Missing Information'}
                {activeInfoModal === 'add-website' && 'Add Official Website'}
                {activeInfoModal === 'maps-history' && 'Your Maps History'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveInfoModal(null)}
                className="btn-ghost-obsidian p-2 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeInfoModal === 'maps-history' ? (
              <div className="space-y-4">
                <p className="type-body-sm text-[#CFCFCF]">
                  Recent views logged in your session for{' '}
                  <span className="text-[#FFFFFF]">8HCR+JX Dublin, Ireland</span>:
                </p>
                <div className="p-4 bg-[#141414] border border-white/[0.08] space-y-2 type-label-sm text-[#9E9E9E] font-mono-tech">
                  <div>· Viewed Ashemere Lodge (7 Old Nangor Road)</div>
                  <div>· Compared Agoda &amp; Booking.com (PKR 14,730)</div>
                  <div>· Inspected Clondalkin Neighborhood (3.2/5)</div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveInfoModal(null)}
                  className="btn-primary-amber w-full py-3 type-label-md font-medium cursor-pointer"
                >
                  Close History
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setInfoSubmissionNotice(
                    'Directory update logged for 7 Old Nangor Road, Dublin.'
                  );
                  setActiveInfoModal(null);
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  required
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder={
                    activeInfoModal === 'add-website'
                      ? 'https://ashemerelodge-dublin.ie'
                      : 'Enter updated property detail...'
                  }
                  className="w-full bg-[#141414] border border-white/10 px-4 py-3 type-body-md text-[#FFFFFF] focus:border-[#F2B36B] focus:outline-none"
                />
                <button
                  type="submit"
                  className="btn-primary-amber w-full py-3 type-label-md font-medium cursor-pointer"
                >
                  Submit Update
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
