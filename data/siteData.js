// Centralized content repository for Painting Doctorz.
// Every page and component reads from this single source of truth.

export const company = {
  name: "Painting Doctorz",
  tagline: "Precision painting, prescribed with care.",
  legalName: "Painting Doctorz Pvt. Ltd.",
  foundedYear: 2009,
  description:
    "Painting Doctorz is a premium residential and commercial painting studio delivering clinical precision, museum-grade finishes, and a white-glove client experience across interior and exterior projects.",
  email: "apaintingdoctorz@gmail.com",
 phoneDisplay: "+1 (289) 788-8670",
  phoneHref: "+12897888670",
  whatsappHref: "+12897888670",
 address: {
  street: "Hamilton", // Replace with your actual business address
  city: "Burlington",
  region: "Oakville, Brantford,",
  postalCode: "St. Catharines, and surrounding areas", // Replace with your actual postal code
  country: "CA",
  countryName: "Canada",
},
  
  geo: {
    latitude: 23.0225,
    longitude: 72.5714,
  },
  priceRange: "₹₹₹",
  ratingValue: 4.9,
  reviewCount: 486,
};

export const socials = [
  { label: "Instagram", href: "https://instagram.com/paintingdoctorz" },
  // { label: "LinkedIn", href: "https://linkedin.com/company/paintingdoctorz" },
  // { label: "Pinterest", href: "https://pinterest.com/paintingdoctorz" },
  // { label: "Houzz", href: "https://houzz.com/pro/paintingdoctorz" },
  
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/interior-services",
    children: [
      {
        heading: "Interior",
        href: "/interior-services",
        items: [
          "Interior Painting",
          "Cabinet Painting",
          "Colour Consultation",
          "Concrete Staining & Epoxy Finish",
          "Light Carpentry Repair",
          "Drywall Repair",
          "Wallpaper Removal",
        ],
      },
      {
        heading: "Exterior",
        href: "/exterior-services",
        items: [
          "Exterior Painting",
          "Power Washing",
          "Stucco Repair & Painting",
          "Vinyl & Aluminum Siding Painting",
          "Home & Deck Staining",
          "EPA Lead Certified",
        ],
      },
    ],
  },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export const businessHours = [
  { day: "Monday", open: "08:00", close: "06:00" },
  { day: "Tuesday",  open: "08:00", close: "06:00" },
  { day: "Wednesday", open: "08:00", close: "06:00" },
  { day: "Thursday", open: "08:00", close: "06:00" },
  { day: "Friday", open: "08:00", close: "06:00" },
  { day: "Saturday",  open: "08:00", close: "06:00" },
  { day: "Sunday",  open: "08:00", close: "06:00" },
];

export const services = [
  {
    slug: "interior-painting",
    title: "Interior Painting",
    category: "interior",
    summary:
      "Flawless walls, ceilings, and trim with dust-controlled preparation and low-VOC premium coatings.",
    description:
      "A clinical interior program engineered around your daily life. We isolate work zones, protect every surface, and hand-finish walls, ceilings, and joinery to a uniform, brushmark-free result.",
    deliverables: [
      "Surface diagnosis & moisture mapping",
      "Two-coat premium low-VOC system",
      "Trim, doors & ceiling detailing",
      "Daily site reset & final walkthrough",
    ],
    // startingPrice: "₹28 / sq.ft",
    icon: "brush",
  },
  {
    slug: "exterior-painting",
    title: "Exterior Painting",
    category: "exterior",
    summary:
      "Weather-shield systems built to survive monsoon, UV, and salt with a decade-long colour guarantee.",
    description:
      "Elevation coatings designed for the Indian climate. We repair, prime, and apply elastomeric weather-shield systems that resist cracking, algae, and fade for years.",
    deliverables: [
      "Crack & seepage remediation",  
      "Alkali-resistant priming",
      "Elastomeric weather-shield topcoat",
    ],
    // startingPrice: "₹34 / sq.ft",
    icon: "shield",
  },
  {
    slug: "texture-finishes",
    title: "Texture & Specialty Finishes",
    category: "interior",
    summary:
      "Venetian plaster, lime wash, metallic, and bespoke artisanal finishes for signature feature walls.",
    description:
      "Hand-applied decorative finishes for statement interiors — Italian Venetian plaster, breathable lime wash, and metallic accents crafted by our artisan team.",
    deliverables: [
      "Bespoke sample boards",
      "Multi-layer artisanal application",
      "Sealed, wipe-clean protection",
      "Signed finish certificate",
    ],
    // startingPrice: "₹120 / sq.ft",
    icon: "sparkle",
  },
  {
    slug: "wood-metal-coating",
    title: "Wood & Metal Coating",
    category: "exterior",
    summary:
      "Melamine, PU, and Duco spray finishes plus anti-corrosion coatings for joinery and grilles.",
    description:
      "Precision spray booth and on-site coatings for wood and metal. From satin PU on doors to anti-corrosion systems on railings and gates.",
    deliverables: [
      "Sanding & grain preparation",
      "Spray-grade PU / Duco / melamine",
      "Anti-corrosion metal priming",
      "Dust-free curing protocol",
    ],
    // startingPrice: "₹90 / sq.ft",
    icon: "layers",
  },
  {
    slug: "waterproofing",
    title: "Waterproofing",
    category: "exterior",
    summary:
      "Terrace, bathroom, and elevation waterproofing that stops seepage at the source, not the symptom.",
    description:
      "Root-cause waterproofing for terraces, wet areas, and elevations. We diagnose the ingress path and build a warrantied membrane system around it.",
    deliverables: [
      "Leak source diagnostics",
      "Crystalline / membrane systems",
      "Ponding & flood testing",
      "Warranty documentation",
    ],
    // startingPrice: "On survey",
    icon: "drop",
  },
  {
    slug: "commercial-projects",
    title: "Commercial Projects",
    category: "interior",
    summary:
      "Turnkey painting for offices, retail, and hospitality with night-shift scheduling and zero downtime.",
    description:
      "Managed painting programs for commercial spaces. We work around your operations with night shifts, phased handovers, and a dedicated project lead.",
    deliverables: [
      "Dedicated project manager",
      "Off-hours & phased execution",
      "Compliance & safety documentation",
      "Scheduled maintenance plan",
    ],
    // startingPrice: "Custom scope",
    icon: "building",
  },
];

export const milestones = [
  {
    year: 2009,
    title: "The first prescription",
    detail:
      "Founded as a two-person studio with a single belief — painting is a craft of diagnosis before decoration.",
  },
  {
    year: 2014,
    title: "The artisan atelier",
    detail:
      "Opened a dedicated finishes atelier and trained the first generation of specialty-finish artisans.",
  },
  {
    year: 2018,
    title: "1,000 homes transformed",
    detail:
      "Crossed one thousand completed residences with a client-recommendation rate above ninety percent.",
  },
  {
    year: 2021,
    title: "Commercial division",
    detail:
      "Launched a turnkey commercial division serving hospitality, retail, and Grade-A office spaces.",
  },
  {
    year: 2024,
    title: "The colour lab",
    detail:
      "Established an in-house colour lab for bespoke tinting and museum-grade finish matching.",
  },
];

export const stats = [
  { value: 4200, suffix: "+", label: "Projects completed" },
  { value: 15, suffix: "yrs", label: "Years of craft" },
  { value: 98, suffix: "%", label: "Client recommendation" },
  { value: 62, suffix: "", label: "Specialist artisans" },
];

export const processSteps = [
  {
    step: "01",
    title: "Diagnose",
    metric: "Free 45-min survey",
    detail:
      "An on-site consultation to map surfaces, moisture, and light — the foundation of every accurate quote.",
  },
  {
    step: "02",
    title: "Prescribe",
    metric: "Fixed transparent quote",
    detail:
      "A written scope with materials, timeline, and a fixed price. No surprises, no hidden line items.",
  },
  {
    step: "03",
    title: "Prepare",
    metric: "Dust-controlled setup",
    detail:
      "We mask, cover, and repair before a single drop of paint. Preparation is eighty percent of the finish.",
  },
  {
    step: "04",
    title: "Perfect",
    metric: "Two-coat premium system",
    detail:
      "Hand and spray application by trained artisans, checked under raking light for a uniform finish.",
  },
  {
    step: "05",
    title: "Present",
    metric: "Signed final walkthrough",
    detail:
      "A joint walkthrough, touch-ups on the spot, and a written guarantee handed over on completion.",
  },
];

export const coreValues = [
  {
    title: "Diagnosis first",
    detail:
      "We treat the cause, not the symptom. Every project starts with a survey, never a guess.",
  },
  {
    title: "Clinical cleanliness",
    detail:
      "Dust barriers, daily resets, and shoe covers. You should barely know we were there.",
  },
  {
    title: "Honest pricing",
    detail:
      "Fixed written quotes with itemised materials. The number we quote is the number you pay.",
  },
  {
    title: "Finish obsession",
    detail:
      "We inspect under raking light and don't sign off until the surface is flawless.",
  },
];

export const portfolioCategories = [
  { id: "all", label: "All Work" },
  { id: "interior", label: "Interior" },
  { id: "exterior", label: "Exterior" },
  { id: "texture", label: "Texture" },
  { id: "commercial", label: "Commercial" },
];

export const portfolioItems = [
  {
    id: "villa-serene",
    title: "Villa Serene",
    category: "interior",
    location: "Hamilton, ON",
    year: 2024,
    finish: "Low-VOC matte, warm neutrals",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "the-monsoon-house",
    title: "The Monsoon House",
    category: "exterior",
    location: "Burlington, ON",
    year: 2023,
    finish: "Elastomeric weather-shield",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "atelier-loft",
    title: "Atelier Loft",
    category: "texture",
    location: "Oakville, ON",
    year: 2024,
    finish: "Venetian plaster feature wall",
    image:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "meridian-offices",
    title: "Meridian Offices",
    category: "commercial",
    location: "Brantford, ON",
    year: 2023,
    finish: "Night-shift turnkey repaint",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "courtyard-residence",
    title: "Courtyard Residence",
    category: "interior",
    location: "St. Catharines, ON",
    year: 2022,
    finish: "Lime wash, breathable finish",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "harbour-facade",
    title: "Harbour Façade",
    category: "exterior",
    location: "Ancaster, Hamilton, ON",
    year: 2024,
    finish: "UV-stable elevation system",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "gilded-lounge",
    title: "Gilded Lounge",
    category: "texture",
    location: "Dundas, Hamilton, ON",
    year: 2023,
    finish: "Metallic accent plaster",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "the-boutique-hotel",
    title: "The Boutique Hotel",
    category: "commercial",
    location: "Grimsby, ON",
    year: 2022,
    finish: "Phased hospitality refit",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
  },
];

export const beforeAfter = {
  before:
    "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=1400&q=80",
  after:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
  beforeLabel: "Before",
  afterLabel: "After",
  caption: "Courtyard Residence — full interior transformation in 9 days.",
};
/* ---- Why Choose Us page ---- */

export const ourProcess = [
  {
    step: "1",
    title: "Inspection & Consultation",
    detail:
      "We assess your property's condition and recommend the right coatings.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
  },
  {
    step: "2",
    title: "Preparation",
    detail:
      "Cleaning, scraping, sanding, and priming to ensure a lasting bond.",
    image:
      "https://images.unsplash.com/photo-1595814433015-e6f5ce69614e?auto=format&fit=crop&w=900&q=80",
  },
  {
    step: "3",
    title: "Painting",
    detail:
      "Premium, weather-tested paints applied for smooth and even coverage.",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80",
  },
  {
    step: "4",
    title: "Protection & Cleanup",
    detail:
      "Sealing edges, detailed trim work, and spotless final presentation.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
];

export const whyChooseUs = [
  {
    title: "Premium weatherproof materials",
    detail:
      "Only weather-tested, low-VOC coatings from the top of the range — specified for monsoon, UV, and salt.",
    icon: "shield",
  },
  {
    title: "Clean, organized, and on-time delivery",
    detail:
      "Dust barriers, daily resets, and a schedule we hold ourselves to. You'll barely know we were there.",
    icon: "clock",
  },
  {
    title: "Skilled team with years of exterior experience",
    detail:
      "In-house artisans trained on façades, elevations, and height work — not day-hire labour.",
    icon: "team",
  },
  {
    title: "Long-lasting protection with a luxurious finish",
    detail:
      "A finish that looks like an interior showroom and protects like an industrial coating.",
    icon: "sparkle",
  },
];

export const transformations = [
  {
    id: "living-room",
    label: "Interior",
    title: "Living Room",
    caption: "Tired beige walls reimagined in a warm, contemporary palette.",
    before:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80",
    after:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "bedroom",
    label: "Interior",
    title: "Bedroom Suite",
    caption: "Flat white walls transformed with a deep, moody accent tone.",
    before:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    after:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "dining",
    label: "Interior",
    title: "Dining Space",
    caption: "A dated dining room brought to life with a rich feature wall.",
    before:
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1400&q=80",
    after:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "facade",
    label: "Exterior",
    title: "Home Exterior",
    caption: "A weathered façade refreshed with a clean, modern colour scheme.",
    before:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=80",
    after:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  },
];
export const testimonials = [
  {
    name: "Ananya Mehta",
    role: "Homeowner, Bodakdev",
    rating: 5,
    quote:
      "The most organised trade we have ever hired. They protected every surface, finished a day early, and the walls look like glass.",
  },
  {
    name: "Rohan Desai",
    role: "Architect, Studio Desai",
    rating: 5,
    quote:
      "I specify Painting Doctorz on every luxury project. Their finish quality under raking light is genuinely in a class of its own.",
  },
  {
    name: "Priya Nair",
    role: "GM, Meridian Offices",
    rating: 5,
    quote:
      "They repainted three floors on night shifts with zero business downtime. Immaculate coordination from survey to handover.",
  },
  {
    name: "Vikram Shah",
    role: "Homeowner, Thaltej",
    rating: 5,
    quote:
      "The lime-wash feature wall is a work of art. Transparent pricing, no surprises, and a team you actually enjoy having at home.",
  },
];

export const heroHighlights = [
  
  "Low-VOC premium coatings",
  "Fixed transparent pricing",
];

export const projectTypes = [
  "Full home interior",
  "Single room / accent wall",
  "Exterior / elevation",
  "Texture / specialty finish",
  "Wood & metal coating",
  "Waterproofing",
  "Commercial space",
];

export const timelineOptions = [
  "As soon as possible",
  "Within 2 weeks",
  "Within a month",
  "1–3 months out",
  "Just exploring",
];

export const budgetOptions = [
  "$1,000 – $2,000",
  "$2,000 – $4,000",
  "$4,000 – $8,000",
  "$8,000 – $12,000",
  "$12,000 and above",
];

/* ---- Interior Services page ---- */

export const interiorServices = [
  {
    slug: "interior-painting",
    title: "Interior Painting",
    detail:
      "Walls, ceilings, and trim finished in premium low-VOC coatings for a smooth, uniform result.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "cabinet-painting",
    title: "Cabinet Painting",
    detail:
      "Kitchen and bathroom cabinetry stripped, sprayed, and cured to a hard, factory-grade finish.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "colour-consultation",
    title: "Colour Consultation",
    detail:
      "Sit with our colour lab to test palettes against your light, flooring, and furnishings before committing.",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "concrete-staining-epoxy",
    title: "Concrete Staining & Epoxy Finish",
    detail:
      "Durable stained and epoxy floor systems for garages, basements, and modern living spaces.",
    image:
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "light-carpentry-repair",
    title: "Light Carpentry Repair",
    detail:
      "Trim, skirting, door frames, and joinery repaired or replaced before we ever pick up a brush.",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "drywall-repair",
    title: "Drywall Repair",
    detail:
      "Cracks, dents, and holes patched, sanded, and blended so the repair disappears under the topcoat.",
    image:
      "https://images.unsplash.com/photo-1595814433015-e6f5ce69614e?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "wallpaper-removal",
    title: "Wallpaper Removal",
    detail:
      "Old paper and adhesive stripped cleanly, then walls skimmed back to a paint-ready surface.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
  },
];

export const interiorOffers = [
  "Kitchen and bathroom refinishing",
  "Drywall patching and surface preparation",
  "Wall, ceiling, and trim painting",
];

/* ---- Exterior Services page ---- */

export const exteriorIntro = {
  lead:
    "Your property's exterior is the first thing people see, and the first line of defense against the elements. That's why we combine top-grade materials, weather-resistant coatings, and a meticulous process to give your building both beauty and durability.",
  statement:
    "We handle every surface — stucco, wood, brick, or siding — ensuring a flawless finish that enhances value and stands up to time.",
  surfaces: ["Stucco", "Wood", "Brick", "Siding", "Concrete", "Metal"],
};

export const exteriorServices = [
  {
    slug: "exterior-painting",
    title: "Exterior Painting",
    detail:
      "Weather-tested coating systems applied to façades and elevations for even coverage and lasting colour.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "power-washing",
    title: "Power Washing",
    detail:
      "Dirt, algae, and chalking stripped away at controlled pressure so the new coat bonds to clean substrate.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "stucco-repair-painting",
    title: "Stucco Repair & Painting",
    detail:
      "Cracks and spalling patched and re-textured, then sealed with a breathable elastomeric finish.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "siding-painting",
    title: "Vinyl & Aluminum Siding Painting",
    detail:
      "Specialist bonding primers and flexible topcoats formulated to grip siding without peeling or warping.",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "home-deck-staining",
    title: "Home & Deck Staining",
    detail:
      "Timber sanded, cleaned, and sealed with penetrating stains that resist UV, moisture, and foot traffic.",
    image:
      "https://images.unsplash.com/photo-1623195372782-57a1486af9a9?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "epa-lead-certified",
    title: "EPA Lead Certified",
    detail:
      "Certified containment and safe-removal protocols for pre-1978 properties, protecting your family and ours.",
    badge: "Certified",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
  },
];

// Prefilled message that opens in the user's WhatsApp.
export const whatsappMessage =
  "Hi Painting Doctorz! I'm interested in your painting services. Could you share more details and a free quote?";
const siteData = {
  company,
  socials,
  navLinks,
  businessHours,
  services,
  milestones,
  stats,
  processSteps,
  coreValues,
  portfolioCategories,
  portfolioItems,
  whatsappMessage,
  beforeAfter,
  interiorServices,   // ← added
  interiorOffers,
  exteriorIntro,      // ← added
  exteriorServices,
  ourProcess,        // ← added
  whyChooseUs,       // ← added
  transformations,
  testimonials,
  heroHighlights,
  projectTypes,
  timelineOptions,
  budgetOptions,
};

export default siteData;
