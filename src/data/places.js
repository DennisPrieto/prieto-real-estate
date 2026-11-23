// Neighborhood and practice-area content. Keep every factual claim checkable;
// no market statistics without a dated source. Describe places, never people
// (fair housing).

export const NEIGHBORHOODS = [
  {
    slug: 'coral-gables',
    name: 'Coral Gables',
    coord: '25°43′N 80°16′W',
    title: 'Coral Gables homes: what we check before we price',
    description: 'Selling or buying in Coral Gables? How Jaelly & Dennis Prieto read municipality, historic review, permits and waterfront details before pricing a Gables home.',
    lede: 'A planned city with a long memory. Mediterranean Revival streets, the Biltmore, banyan-lined avenues and bayfront enclaves such as Cocoplum and Gables Estates.',
    place: [
      'Coral Gables was planned by George Merrick in the 1920s and still reads as a designed city: coral-rock walls, barrel-tile roofs, plazas and fountains, and a Board of Architects that reviews exterior changes.',
      'Along Biscayne Bay, enclaves such as Cocoplum and Gables Estates offer homes with private docks and open-water access. Inland, older Mediterranean and mid-century homes sit on mature, shaded lots.',
    ],
    checks: [
      ['Which city is it really in', 'A Coral Gables mailing address does not mean a Coral Gables property. The folio tells us the municipality, which changes taxes, permitting and how buyers search for the home.'],
      ['Historic and design review', 'Designated or contributing homes carry renovation rules. Buyers price that in; we disclose it and show what is still possible.'],
      ['Permit history', 'Additions, enclosed garages and roofs checked against the permit record before a buyer’s inspector finds the gap.'],
      ['Waterfront details', 'Dock, seawall and lift condition, water depth at the dock and bridge clearance to the bay, for homes on canals and the bay.'],
    ],
  },
  {
    slug: 'coconut-grove',
    name: 'Coconut Grove',
    coord: '25°43′N 80°14′W',
    title: 'Coconut Grove homes and condominiums',
    description: 'Coconut Grove real estate advice from Jaelly & Dennis Prieto: tree canopy rules, flood elevation, and condominium reserves checked before you list or buy.',
    lede: 'One of Miami’s oldest neighborhoods. Dense tree canopy, bayfront parks and the marinas around Dinner Key, with historic cottages beside modern estates.',
    place: [
      'Settled in the late 1800s and part of the City of Miami since 1925, the Grove keeps a village scale: narrow streets under a heavy canopy, CocoWalk and the bayfront parks, and some of the city’s oldest homes.',
      'Housing ranges from wood-frame cottages to contemporary estates and low-rise condominiums near the water, often within a few blocks of one another.',
    ],
    checks: [
      ['Canopy and conservation rules', 'Tree protection and neighborhood conservation rules shape what a buyer can build or expand. We map it before a buyer assumes it.'],
      ['Flood zone and elevation', 'Elevation certificates and flood insurance quotes early, because they move a buyer’s monthly number more than the rate does.'],
      ['Condominium health', 'For low-rise associations: reserves, inspections and any pending assessments, read before pricing or making an offer.'],
      ['Lot and setback potential', 'For older homes on larger lots, what could be built today matters as much as what stands there.'],
    ],
  },
  {
    slug: 'brickell',
    name: 'Brickell',
    coord: '25°45′N 80°11′W',
    title: 'Brickell condominiums: buying and selling with the building file in hand',
    description: 'Brickell condo advice from Jaelly & Dennis Prieto: milestone inspections, reserve studies, assessments, insurance and rental rules reviewed before you buy or list.',
    lede: 'Miami’s financial district and its tallest residential skyline, along Brickell Avenue and the bay, walkable to offices, Brickell City Centre and Metrorail.',
    place: [
      'Brickell is high-rise living: towers from the 1970s to new construction, amenity-rich buildings, and short walks to offices, restaurants and transit.',
      'Because almost every purchase is a condominium, the building matters as much as the unit. Two similar units can carry very different costs of ownership.',
    ],
    checks: [
      ['Milestone inspections', 'Florida law since 2022 requires milestone structural inspections for condominium buildings three stories or taller. We find where a building is in that cycle.'],
      ['Reserve study and assessments', 'Structural integrity reserve studies and the association budget show whether owners face special assessments. That belongs in the price.'],
      ['Insurance and dues', 'Master policy, deductible and recent dues changes, compared across buildings so a buyer sees the true monthly cost.'],
      ['Rental and use rules', 'Minimum lease terms and approval rules, which decide whether a unit works as an investment.'],
    ],
  },
  {
    slug: 'edgewater',
    name: 'Edgewater',
    coord: '25°48′N 80°11′W',
    title: 'Edgewater condominiums, land and redevelopment',
    description: 'Edgewater real estate and land advice from Jaelly & Dennis Prieto: zoning capacity, assemblages and new-construction condominiums along Biscayne Bay.',
    lede: 'A bayfront neighborhood between downtown’s arts district and Midtown, rebuilt over two decades from low-rise blocks into one of Miami’s newest skylines.',
    place: [
      'Edgewater runs along Biscayne Bay north of downtown. Bay-view towers, many recently completed or under construction, now stand beside older low-rise apartments and single-family lots.',
      'That mix makes Edgewater two markets at once: condominium buyers choosing between resale and new construction, and owners of smaller properties whose land may be worth more than their building.',
    ],
    checks: [
      ['Zoning capacity', 'What the zoning allows on a lot, in height and density, often sets the value of older low-rise properties here.'],
      ['Assemblage potential', 'Whether neighboring parcels could combine into a larger site, and what that does to each owner’s number.'],
      ['New construction versus resale', 'Deposit schedules, delivery risk and assignment rules on pre-construction contracts, against what a finished resale offers today.'],
      ['Building health', 'For existing towers: inspections, reserves and assessments, as in Brickell.'],
    ],
  },
  {
    slug: 'pinecrest',
    name: 'Pinecrest',
    coord: '25°40′N 80°18′W',
    title: 'Pinecrest homes on large lots',
    description: 'Pinecrest real estate advice from Jaelly & Dennis Prieto: lot size, permit history, roofs and insurance reviewed before pricing a Pinecrest home.',
    lede: 'A village of large residential lots and heavy landscaping, incorporated in 1996, home to Pinecrest Gardens and quiet, winding streets.',
    place: [
      'Pinecrest is almost entirely single-family homes on generous lots, many with pools and mature trees, from original ranch houses to newly built estates.',
      'Because so many homes have been expanded over the decades, the paperwork behind a house is often where its value is won or lost.',
    ],
    checks: [
      ['Permit history', 'Additions, pool houses and converted spaces matched to the permit record. Unpermitted space is common in older homes and changes what an appraiser will count.'],
      ['Roof age and insurance', 'Roof age on record drives insurability and premiums. We pull it before a buyer’s insurer does.'],
      ['Lot potential', 'Lot size, setbacks and village rules, for buyers weighing renovation against rebuilding.'],
      ['Flood and elevation', 'Flood zone and elevation data assembled early, especially for older homes built at lower grades.'],
    ],
  },
];

export const PRACTICE = [
  {
    slug: 'land-and-assemblages',
    name: 'Land and assemblages',
    variant: 'assemblage',
    title: 'Development land and assemblages in Miami-Dade and Broward',
    description: 'Land and assemblage advisory from Dennis Prieto, Epique Realty: zoning capacity, buildable-area valuation, multi-owner coordination and developer outreach.',
    lede: 'Most land is priced on what stands on it. Developers price it on what can be built. We work from the second number.',
    body: [
      'An assemblage brings neighboring parcels together into one site large enough for a developer’s building. Each owner holds a piece of a value none of them can reach alone, and the work is in showing that value clearly and keeping every owner aligned.',
      'Dennis comes to land from construction. He reads a site the way a developer’s team will: buildable area, height and density, access, utilities, and the cost and time between purchase and vertical construction.',
    ],
    steps: [
      ['Parcel and owner research', 'Folio, title and ownership records for every parcel, including entities and how they are controlled.'],
      ['Zoning capacity', 'What the zoning allows today, and whether state law such as the Live Local Act opens more.'],
      ['Value on a buildable basis', 'An opinion of value per buildable unit or square foot, next to what the existing building is worth.'],
      ['Confidential marketing', 'Teaser first, full package under NDA, presented to developers who build at that scale.'],
    ],
  },
  {
    slug: 'industrial',
    name: 'Industrial',
    variant: 'industrial',
    title: 'Industrial and warehouse properties in South Florida',
    description: 'Industrial and warehouse advisory from Dennis Prieto, Epique Realty, for owner-users and investors: clear height, loading, yard, zoning and use.',
    lede: 'For owner-users and investors, an industrial building is judged on a short list of physical facts. We put those facts first.',
    body: [
      'Industrial buyers rarely need the adjectives. They need clear height, door count and type, truck court depth, yard and outside storage, power, and whether zoning allows their use. A building that cannot answer those quickly loses the buyers who would pay most for it.',
      'We work with owner-users looking for a building that fits an operation, and with owners deciding whether to sell, lease, or hold.',
    ],
    steps: [
      ['Building facts', 'Clear height, loading, yard, power, sprinklers and parking, documented before anyone tours.'],
      ['Use and zoning', 'Confirm the intended use is permitted, and what approvals it needs if it is not.'],
      ['Comparable sales and leases', 'Priced against recent trades in the same submarket and building class.'],
      ['Buyer and tenant search', 'For owner-users, a short list that fits the operation, not a stack of listings.'],
    ],
  },
  {
    slug: 'live-local-act',
    name: 'Transit and Live Local Act sites',
    variant: 'transit',
    title: 'Live Local Act and transit-oriented sites',
    description: 'How Florida’s Live Local Act and transit proximity can change what a commercial or industrial site is worth. Site reviews by Dennis Prieto, Epique Realty.',
    lede: 'Florida’s Live Local Act lets qualifying residential projects rise on land zoned commercial, industrial or mixed-use. For some owners, that changes the value of their land.',
    body: [
      'Since July 2023, the Live Local Act has required local governments to allow multifamily and mixed-use residential development on land zoned commercial, industrial or mixed-use when at least 40 percent of the units are affordable. Qualifying projects can reach the highest density allowed in the jurisdiction and the tallest height allowed within one mile, or three stories, whichever is higher.',
      'Amendments in 2024 and 2025 (the 2025 changes took effect July 1, 2025) adjusted definitions, parking near major transit stops, and limits near historic districts, military installations and airports. The details decide whether a specific site qualifies, so every review starts from the current statute and the local implementation, confirmed with land-use counsel.',
    ],
    steps: [
      ['Eligibility screen', 'Zoning category, location exclusions and parcel size, checked against the current statute.'],
      ['Capacity estimate', 'Density and height a qualifying project could reach, and the parking it would need near transit.'],
      ['Value impact', 'What a developer could pay for the land on that basis, next to its current-use value.'],
      ['Next step', 'Hold, sell to a developer, or partner. With counsel and your broker before anything is signed.'],
    ],
  },
];
