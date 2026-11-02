export interface RoomHotspot {
  id: string;
  index: string;
  name: string;
  zone: string;
  xPercent: number;
  yPercent: number;
  areaSqm: number;
  ceilingHeightM: number;
  acousticDb: number;
  ambientLux: number;
  materials: string;
  description: string;
}

export interface SpecificationItem {
  label: string;
  value: string;
}

export interface Estate {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'woodland' | 'coastal' | 'courtyard' | 'alpine';
  categoryLabel: string;
  location: string;
  coordinates: string;
  elevationM: number;
  completionYear: number;
  architect: string;
  totalAreaSqm: number;
  siteAreaHectares: number;
  glazingAreaSqm: number;
  acousticRatingDb: number;
  priceGuidance: string;
  imageUrl: string;
  imageAlt: string;
  leadNarrative: string;
  architecturalThesis: string;
  compassBearing: number;
  specifications: SpecificationItem[];
  hotspots: RoomHotspot[];
}

export const ESTATES: Estate[] = [
  {
    id: 'karuizawa-pavilion',
    index: '01',
    title: 'Karuizawa Woodland Pavilion',
    subtitle: 'Yakisugi Charred Cedar & Basalt Reflection Sanctuary',
    category: 'woodland',
    categoryLabel: 'Woodland Pavilion',
    location: 'Nagano Prefecture, Japan',
    coordinates: '36°20′54″N · 138°35′49″E',
    elevationM: 1042,
    completionYear: 2026,
    architect: 'Kengo & Takahashi Atelier',
    totalAreaSqm: 680,
    siteAreaHectares: 4.8,
    glazingAreaSqm: 245,
    acousticRatingDb: 18,
    priceGuidance: 'USD 18,500,000 · Private Treaty',
    imageUrl: '/src/assets/images/hero_woodland_pavilion_1793608842744.jpg',
    imageAlt: 'Karuizawa Woodland Pavilion at twilight with warm glowing suspended hearth and black basalt infinity reflection pool',
    leadNarrative:
      'Set within a cuatro-hectare old-growth red pine forest, the Karuizawa Pavilion suspends a monolithic charred cedar roof plane over frameless triple-glazed structural glass and hand-split Kurama basalt.',
    architecturalThesis:
      'Designed around nocturnal acoustic stillness and thermal mass, the residence eliminates interior corridors in favor of a continuous perimeter gallery overlooking a zero-edge black slate reflection basin.',
    compassBearing: 142,
    specifications: [
      { label: 'Structural Envelope', value: 'Kiln-Charred Yakisugi Cypress & Seismic Steel Post-Tensioned Frame' },
      { label: 'Glazing System', value: '4.2m Low-Iron Triple-Laminated Acoustic Glass (Ug = 0.5 W/m²K)' },
      { label: 'Foundation & Plinth', value: 'Hand-Cleft Kurama Black Basalt over Base-Isolated Concrete Mat' },
      { label: 'Thermal & Hearth', value: 'Suspended Raw Cast-Iron Gyrofocus Hearth + Geothermal Radiant Slabs' },
      { label: 'Acoustic Attenuation', value: 'STC 64 Perimeter Envelope · 18 dBA Nocturnal Interior Floor' },
      { label: 'Water & Reflection Basin', value: '18.5m Heated Black Granite Zero-Edge Basin with Bio-Filtration' },
      { label: 'Air & Microclimate', value: 'Hospital-Grade ERV with Hinoki Essential Oil Vapor Diffusion' },
      { label: 'Private Access', value: 'Heated Basalt Forest Drive & CAA-Certified Helipad Clearing' },
    ],
    hotspots: [
      {
        id: 'hearth-salon',
        index: '01',
        name: 'Suspended Hearth Salon',
        zone: 'Primary Living Pavilion',
        xPercent: 48,
        yPercent: 46,
        areaSqm: 142,
        ceilingHeightM: 4.2,
        acousticDb: 18,
        ambientLux: 45,
        materials: 'Honed Kurama Basalt · Oiled Smoked Oak · Raw Cast Iron',
        description:
          'Anchored by a 360-degree rotating suspended hearth, the primary salon opens seamlessly on two axes toward the reflection basin through motorized pocket glazing.',
      },
      {
        id: 'reflection-plinth',
        index: '02',
        name: 'Basalt Reflection Terrace',
        zone: 'South-East Water Court',
        xPercent: 52,
        yPercent: 74,
        areaSqm: 195,
        ceilingHeightM: 0,
        acousticDb: 24,
        ambientLux: 12,
        materials: 'Flamed Shanxi Black Granite · Split Nagano Slate',
        description:
          'A cantilevered wet-edge mirror pool calibrated to reflect the warm 2200K interior hearth glow against the surrounding pine canopy at twilight.',
      },
      {
        id: 'hinoki-onsen',
        index: '03',
        name: 'Thermal Hinoki Bathhouse',
        zone: 'West Wing Sanctuary',
        xPercent: 24,
        yPercent: 52,
        areaSqm: 84,
        ceilingHeightM: 3.6,
        acousticDb: 16,
        ambientLux: 18,
        materials: '300-Year Kiso Hinoki Timber · Volcanic Andesite Stone',
        description:
          'Fed by a private deep-bore mineral spring at 41.5°C, enclosed in untreated aromatic Kiso cypress with a frameless horizontal aperture toward the moss ravine.',
      },
      {
        id: 'monograph-library',
        index: '04',
        name: 'Nocturnal Study & Archive',
        zone: 'North Quiet Quadrant',
        xPercent: 73,
        yPercent: 38,
        areaSqm: 68,
        ceilingHeightM: 3.8,
        acousticDb: 15,
        ambientLux: 35,
        materials: 'Charred Larch Millwork · Saddle Leather · Brushed Bronze',
        description:
          'Acoustically decoupled reading sanctuary housing floor-to-ceiling museum vitrines, humidity-regulated rare folio storage, and bespoke warm-dimming linear optics.',
      },
      {
        id: 'master-suite',
        index: '05',
        name: 'East Canopy Sleeping Suite',
        zone: 'East Cantilever',
        xPercent: 78,
        yPercent: 62,
        areaSqm: 112,
        ceilingHeightM: 3.9,
        acousticDb: 16,
        ambientLux: 22,
        materials: 'Woven Kyoto Hemp Wallcoverings · Dark Stained Ash',
        description:
          'Positioned four meters above the forest floor with automated blackout linen drapery, concealed dressing vault, and private morning meditation loggia.',
      },
    ],
  },
  {
    id: 'big-sur-promontory',
    index: '02',
    title: 'Garrapata Coastal Cantilever',
    subtitle: 'Board-Formed Obsidian Concrete & Weathering Steel Monolith',
    category: 'coastal',
    categoryLabel: 'Coastal Cantilever',
    location: 'Big Sur Coast, California',
    coordinates: '36°25′11″N · 121°54′58″W',
    elevationM: 184,
    completionYear: 2025,
    architect: 'Vandenberg & Studio K',
    totalAreaSqm: 740,
    siteAreaHectares: 6.2,
    glazingAreaSqm: 290,
    acousticRatingDb: 20,
    priceGuidance: 'USD 24,000,000 · Private Treaty',
    imageUrl: '/src/assets/images/estate_cantilever_cliff_1793608843805.jpg',
    imageAlt: 'Minimalist monolithic dark concrete cliffside sanctuary cantilevered over the Pacific Ocean at dusk',
    leadNarrative:
      'Anchored 184 meters into coastal granite bedrock via post-tensioned titanium tiebacks, the Garrapata Monolith projects 14 meters over the Pacific surf zone in complete structural silence.',
    architecturalThesis:
      'Poured in a single continuous lift of carbon-pigmented board-formed concrete, the residence weathers marine fog and gale-force gusts while maintaining a warm, library-quiet interior core.',
    compassBearing: 268,
    specifications: [
      { label: 'Structural Envelope', value: 'Carbon-Pigmented Board-Formed Concrete & 12mm Blackened Corten Steel' },
      { label: 'Cantilever Projection', value: '14.2m Unbraced Overhang Anchored by 18 Bedrock Post-Tension Cables' },
      { label: 'Glazing System', value: 'Hurricane-Rated Marine Laminated Starphire Glass with Salt-Shed Coating' },
      { label: 'Thermal & Hearth', value: '4.8m Linear Cast-Bronze Vapor & Wood Hearth + Hydronic Floor Loops' },
      { label: 'Acoustic Attenuation', value: 'STC 68 Marine Surf Isolation · 20 dBA Interior Ambient Floor' },
      { label: 'Power & Autonomy', value: '140 kWh Subterranean Microgrid + Desalination & Fog-Harvesting Cistern' },
      { label: 'Subterranean Wine Vault', value: '1,800-Bottle Bedrock Cavern Maintained at 12.5°C / 70% RH' },
      { label: 'Private Access', value: 'Gated Coastal Ridge Tunnel & Subterranean 4-Car Collector Gallery' },
    ],
    hotspots: [
      {
        id: 'pacific-observatory',
        index: '01',
        name: 'Cantilevered Horizon Gallery',
        zone: 'West Overhang',
        xPercent: 32,
        yPercent: 44,
        areaSqm: 168,
        ceilingHeightM: 4.5,
        acousticDb: 20,
        ambientLux: 38,
        materials: 'Board-Formed Obsidian Concrete · Blackened Steel · Travertine',
        description:
          'Suspended directly above the breaking Pacific swell with zero vertical mullions across an 18-meter western aperture.',
      },
      {
        id: 'cliff-terrace',
        index: '02',
        name: 'Wind-Sheltered Loggia',
        zone: 'Extreme West Nose',
        xPercent: 18,
        yPercent: 48,
        areaSqm: 54,
        ceilingHeightM: 4.0,
        acousticDb: 34,
        ambientLux: 15,
        materials: 'Structural Glass Balustrade · Flamed Basalt Pavers',
        description:
          'Aerodynamically sculpted parapet deflects coastal updrafts, allowing calm open-air twilight observation 180 meters above sea level.',
      },
      {
        id: 'bedrock-archive',
        index: '03',
        name: 'Monolith Library & Hearth',
        zone: 'Central Core',
        xPercent: 56,
        yPercent: 46,
        areaSqm: 130,
        ceilingHeightM: 4.5,
        acousticDb: 17,
        ambientLux: 42,
        materials: 'Smoked European Walnut · Honed Pietra Grey Marble',
        description:
          'Recessed book-lined sanctuary warmed by a double-sided cast-bronze hearth that divides the coastal observatory from the entry court.',
      },
      {
        id: 'entry-portal',
        index: '04',
        name: 'Timber & Concrete Compression Portal',
        zone: 'East Arrival Axis',
        xPercent: 82,
        yPercent: 52,
        areaSqm: 76,
        ceilingHeightM: 5.2,
        acousticDb: 19,
        ambientLux: 28,
        materials: 'Vertical Western Red Cedar · Poured Terrazzo',
        description:
          'A monumental 5.2-meter tall recessed timber threshold lit by warm grazing uplights that frame the first axial view of the ocean horizon.',
      },
    ],
  },
  {
    id: 'kyoto-moss-atrium',
    index: '03',
    title: 'Daitoku-ji Moss Atrium',
    subtitle: 'Sunken Hearth & Enclosed Nocturnal Bryophyte Courtyard',
    category: 'courtyard',
    categoryLabel: 'Courtyard Atrium',
    location: 'Kita Ward, Kyoto, Japan',
    coordinates: '35°02′38″N · 135°44′46″E',
    elevationM: 86,
    completionYear: 2026,
    architect: 'Studio Shirokuro',
    totalAreaSqm: 520,
    siteAreaHectares: 0.9,
    glazingAreaSqm: 180,
    acousticRatingDb: 15,
    priceGuidance: 'USD 14,800,000 · Private Treaty',
    imageUrl: '/src/assets/images/estate_courtyard_atrium_1793608845251.jpg',
    imageAlt: 'Interior nocturnal dark stone and charred cedar courtyard sanctuary with sunken hearth and moss garden',
    leadNarrative:
      'Conceived as an inward-looking cloister in northern Kyoto, the Daitoku-ji Atrium wraps four subterranean and ground-level living pavilions around a 400-year-old bryophyte moss and maple sanctuary.',
    architecturalThesis:
      'By sinking the primary seating pit 60 centimeters into hand-laid Tamba slate, the eye level of seated occupants aligns directly with the illuminated moss typography outside the frameless glass wall.',
    compassBearing: 95,
    specifications: [
      { label: 'Structural Envelope', value: 'Hand-Chiseled Tamba Fieldstone & Kiln-Brushed Sugi Cedar' },
      { label: 'Courtyard Ecology', value: '38 Indigenous Bryophyte Moss Varieties with Automated Mist Irrigation' },
      { label: 'Glazing System', value: 'Anti-Reflective Museum-Grade Laminated Glass (< 0.8% Reflectance)' },
      { label: 'Thermal & Hearth', value: 'Sunken Irori Basalt Fire Pit with Downdraft Smoke Extraction' },
      { label: 'Acoustic Attenuation', value: 'Double Perimeter Earthen Wall · 15 dBA Reference Quiet Floor' },
      { label: 'Lighting Calibration', value: '1800K–2400K Circadian Botanical Spotlights & Hidden Cove Grazing' },
      { label: 'Tea & Calligraphy Pavilion', value: 'Authentic 4.5-Tatami Sukiya Room with Ro Hearth & Mizuya' },
      { label: 'Private Access', value: 'Discreet Machiya Timber Gate & Subterranean Chauffeur Turnaround' },
    ],
    hotspots: [
      {
        id: 'sunken-irori',
        index: '01',
        name: 'Sunken Slate Hearth Pit',
        zone: 'Lower Lounge',
        xPercent: 46,
        yPercent: 68,
        areaSqm: 96,
        ceilingHeightM: 3.8,
        acousticDb: 15,
        ambientLux: 32,
        materials: 'Cleft Tamba Slate · Raw Linen Upholstery · Abaca Weave',
        description:
          'Sub-grade conversational hearth featuring a concealed downdraft exhaust system that draws woodsmoke downward without an overhead flue.',
      },
      {
        id: 'bryophyte-court',
        index: '02',
        name: 'Nocturnal Moss & Maple Court',
        zone: 'Open-Air Botanical Core',
        xPercent: 74,
        yPercent: 44,
        areaSqm: 140,
        ceilingHeightM: 0,
        acousticDb: 21,
        ambientLux: 14,
        materials: 'Koke Bryophyte Carpet · Weathered鞍馬 Kurama Boulders',
        description:
          'Illuminated by theatrical pin-spots concealed within the eaves to reveal the velvet micro-topography of ancient moss after nightfall.',
      },
      {
        id: 'charred-gallery',
        index: '03',
        name: 'Yakisugi Ceramic Gallery',
        zone: 'West Cloister',
        xPercent: 25,
        yPercent: 48,
        areaSqm: 72,
        ceilingHeightM: 3.6,
        acousticDb: 16,
        ambientLux: 25,
        materials: 'Deep-Charred Cedar Planks · Hand-Troweled Kuro-Shikkui Plaster',
        description:
          'Dedicated exhibition promenade for monolithic stoneware vessels and antique Bizen ceramics.',
      },
    ],
  },
  {
    id: 'engadin-alpine-monolith',
    index: '04',
    title: 'Engadin Basalt Monolith',
    subtitle: 'High-Altitude Quartzite & Cantilevered Glass Sanctuary',
    category: 'alpine',
    categoryLabel: 'Alpine Monolith',
    location: 'Upper Engadin Valley, Switzerland',
    coordinates: '46°28′19″N · 09°49′32″E',
    elevationM: 1920,
    completionYear: 2026,
    architect: 'Atelier Graubünden',
    totalAreaSqm: 890,
    siteAreaHectares: 5.4,
    glazingAreaSqm: 310,
    acousticRatingDb: 17,
    priceGuidance: 'CHF 26,500,000 · Private Treaty',
    imageUrl: '/src/assets/images/estate_alpine_monolith_1793608844586.jpg',
    imageAlt: 'Secluded nocturnal alpine glass and dark basalt stone residence nestled in a quiet Swiss mountain valley',
    leadNarrative:
      'Carved into a high-altitude larch ridge at 1,920 meters in the Upper Engadin, this twin-volume residence pairs dry-stacked Valser quartzite towers with warm bronze-framed alpine observatories.',
    architecturalThesis:
      'Engineered to Minergie-P-Eco autonomous standards, the residence captures deep winter solar gain while glowing like a solitary amber lantern against the nocturnal Bernina massif.',
    compassBearing: 215,
    specifications: [
      { label: 'Structural Envelope', value: 'Dry-Stacked Valser Quartzite Masonry & Blackened Swiss Larch' },
      { label: 'Glazing System', value: 'Quadruple-Insulated Argon-Filled Alpine Glazing (Ug = 0.4 W/m²K)' },
      { label: 'Thermal & Hearth', value: 'Two-Story Mass-Storage Soapstone Hearth + 400m Deep Geothermal Probes' },
      { label: 'Acoustic Attenuation', value: 'STC 66 Triple-Isolated Timber-Concrete Composite Slabs' },
      { label: 'Wellness & Cryo Spa', value: 'Cantilevered 38°C Outdoor Brine Pool, Finnish Smoke Sauna & Snow Room' },
      { label: 'Elevation & Access', value: '1,920m ASL · Heated Underground Funicular Link from Valley Road' },
      { label: 'Art & Ski Vault', value: 'Climate-Controlled Private Ski Room & Museum-Spec Painting Archive' },
      { label: 'Private Aviation', value: '14 Minutes from Samedan Engadin Airport (LSZS)' },
    ],
    hotspots: [
      {
        id: 'bernina-salon',
        index: '01',
        name: 'Double-Height Alpine Observatory',
        zone: 'Upper East Volume',
        xPercent: 62,
        yPercent: 54,
        areaSqm: 185,
        ceilingHeightM: 5.4,
        acousticDb: 17,
        ambientLux: 48,
        materials: 'Valser Quartzite · Brushed Untreated Larch · Oiled Bronze',
        description:
          'Commands an uninterrupted 240-degree panorama across the Bernina glaciers, centered around a monolithic floor-to-ceiling hearth chimney.',
      },
      {
        id: 'brine-terrace',
        index: '02',
        name: 'Heated Alpine Brine Plinth',
        zone: 'Lower West Deck',
        xPercent: 42,
        yPercent: 70,
        areaSqm: 145,
        ceilingHeightM: 0,
        acousticDb: 22,
        ambientLux: 16,
        materials: 'Thermally Treated Swiss Ash · Dark Gneiss Stone Basin',
        description:
          'Steaming mineral brine infinity pool set flush into the timber deck, overlooking the snow-covered larch gorge.',
      },
      {
        id: 'west-cantilever',
        index: '03',
        name: 'Suspended Master Sanctuary',
        zone: 'Upper West Cantilever',
        xPercent: 40,
        yPercent: 52,
        areaSqm: 118,
        ceilingHeightM: 3.6,
        acousticDb: 15,
        ambientLux: 24,
        materials: 'Felted Engadin Wool Panels · Smoked Larch · Honed Gneiss',
        description:
          'Corner glass sleeping box cantilevered above the western slope with private dressing gallery and deep stone soaking tub.',
      },
    ],
  },
];

export const MONOGRAPH_TESTIMONIALS = [
  {
    quote:
      'Transitioning our family collection from Zurich to the Engadin Basalt Monolith reduced our annual external energy draw by 94% while achieving an interior nocturnal noise floor of 17 dBA—quieter than a recording studio.',
    author: 'Dr. Henrik von Meyenburg',
    role: 'Principal Patron & Architectural Collector',
    organization: 'Meyenburg Foundation, Basel',
    metric: '17 dBA Verified Interior Noise Floor · 94% Energy Autonomy',
  },
  {
    quote:
      'Kengo & Takahashi Atelier executed the 4.2-meter triple-laminated structural glazing in Karuizawa with zero visible mullions. Even during November mountain gales, the water surface and interior acoustics remain completely still.',
    author: 'Kenjiro Sakamoto',
    role: 'Managing Director of Private Estates',
    organization: 'Mitsui Fudosan Private Client Group, Tokyo',
    metric: '4.2m Frameless Span · Zero Thermal Bridging at -15°C',
  },
];
