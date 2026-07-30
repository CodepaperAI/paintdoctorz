export const serviceAreas = [
  {
    slug: "hamilton",
    city: "Hamilton",
    region: "Ontario",
    intro:
      "Painting Doctorz brings clinical prep and premium finishes to homes across Hamilton — from century houses on the escarpment to new builds in Ancaster and Stoney Creek.",
    neighbourhoods: ["Ancaster", "Dundas", "Stoney Creek", "Westdale", "Waterdown"],
    localNote:
      "Hamilton's mix of heritage brick and exposed escarpment weather means exterior coatings here need genuine freeze-thaw and moisture resistance — not a builder-grade topcoat.",
    projectExample:
      "A full interior repaint of a 1920s Westdale home — lead-safe prep, plaster repair, and hand-finished trim across 3 bedrooms in 6 days.",
  },
  {
    slug: "burlington",
    city: "Burlington",
    region: "Ontario",
    intro:
      "From lakeshore homes to family houses in Alton Village, Painting Doctorz delivers low-VOC interior painting and durable exterior systems across Burlington.",
    neighbourhoods: ["Aldershot", "Alton Village", "Millcroft", "Roseland", "The Orchard"],
    localNote:
      "Burlington's lakefront exposure puts extra demand on exterior paint — wind-driven rain and sun off the water fade lesser coatings fast. We spec systems built for it.",
    projectExample:
      "Exterior repaint of an Aldershot family home — pressure wash, full crack repair, and a UV-stable topcoat completed ahead of schedule.",
  },
  {
    slug: "oakville",
    city: "Oakville",
    region: "Ontario",
    intro:
      "Painting Doctorz serves Oakville's premium homes with meticulous interior work, cabinet refinishing, and elevation coatings that match the town's high standard.",
    neighbourhoods: ["Bronte", "Glen Abbey", "Old Oakville", "River Oaks", "Joshua Creek"],
    localNote:
      "Oakville homeowners expect a showroom finish. We inspect every wall under raking light and don't sign off until it's flawless — the standard this town is known for.",
    projectExample:
      "Kitchen cabinet respray and full main-floor repaint in a Glen Abbey home — factory-grade finish, completed with zero dust migration.",
  },
  {
    slug: "brantford",
    city: "Brantford",
    region: "Ontario",
    intro:
      "Painting Doctorz brings honest pricing and premium finishes to Brantford homes and businesses — interior, exterior, and everything between.",
    neighbourhoods: ["West Brant", "Echo Place", "Lynden Hills", "Mayfair", "Terrace Hill"],
    localNote:
      "Brantford's older housing stock often needs proper surface repair before paint. We treat the cause — not just the symptom — so the finish actually lasts.",
    projectExample:
      "A West Brant bungalow taken from tired beige to a warm, modern palette — walls, ceilings, and trim in under a week.",
  },
  {
    slug: "st-catharines",
    city: "St. Catharines",
    region: "Ontario",
    intro:
      "Serving the heart of Niagara, Painting Doctorz delivers weather-tough exterior systems and flawless interiors to St. Catharines homes.",
    neighbourhoods: ["Port Dalhousie", "Old Glenridge", "Western Hill", "Grantham", "Facer"],
    localNote:
      "Niagara's humidity and lake-effect weather are hard on exteriors. Our elastomeric weather-shield systems are chosen specifically to handle it.",
    projectExample:
      "Full exterior refresh on a Port Dalhousie home — algae treatment, priming, and a 10-year-guarantee topcoat that still looks new.",
  },
];

export function getAreaSlugs() {
  return serviceAreas.map((a) => a.slug);
}
export function getArea(slug) {
  return serviceAreas.find((a) => a.slug === slug) || null;
}