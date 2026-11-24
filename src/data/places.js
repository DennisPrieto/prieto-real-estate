// Neighborhood and practice-area content. Keep every factual claim checkable;
// no market statistics without a dated source. Describe places, never people
// (fair housing).

import { PLACES } from './bay.js';

const fmt = (v, pos, neg) => { const a = Math.abs(v); const d = Math.floor(a); return `${d}°${Math.round((a - d) * 60)}′${v >= 0 ? pos : neg}`; };
const coordOf = (slug) => { const [la, lo] = PLACES[slug].at; return `${fmt(la, 'N', 'S')} ${fmt(lo, 'E', 'W')}`; };

const BASE = [
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

const MORE = [
  {
    slug: 'aventura', region: 'north', name: 'Aventura',
    title: 'Aventura condominiums and island communities',
    description: 'Aventura real estate advice from Jaelly & Dennis Prieto, Epique Realty: building inspections, reserves, boat slips and association rules checked before you buy or list.',
    lede: 'A city of high-rise condominiums, marinas and private island communities on the Intracoastal Waterway at the Broward line, incorporated in 1995 and home to Aventura Mall.',
    place: [
      'Aventura grew up around golf courses, marinas and the Intracoastal. Most homes here are condominiums, from towers built in the 1970s and 1980s to new construction, with Williams Island and the Turnberry area among its best-known addresses.',
      'Townhomes and a smaller number of single-family homes sit in gated communities set back from the water.',
    ],
    checks: [
      ['Building age and inspections', 'Many towers here are old enough to be in or near their milestone inspection cycle. We find where each building stands before you price or offer.'],
      ['Reserves and assessments', 'Structural reserve studies and the association budget, read for assessments that belong in the price.'],
      ['Boat slips', 'Whether a slip is deeded, leased or assigned by the association changes what a buyer is actually getting.'],
      ['Approval and leasing rules', 'Association approval timelines and minimum lease terms, which decide whether a unit works as an investment.'],
    ],
  },
  {
    slug: 'golden-beach', region: 'north', name: 'Golden Beach',
    title: 'Golden Beach oceanfront and Intracoastal homes',
    description: 'Golden Beach real estate advice from Jaelly & Dennis Prieto, Epique Realty: oceanfront permitting, seawalls, flood elevation and town rules reviewed before pricing.',
    lede: 'A small town of single-family homes between the ocean and the Intracoastal at the northern edge of Miami-Dade, with no towers in a coastline full of them.',
    place: [
      'Golden Beach is a narrow strip of large homes: oceanfront on one side of Ocean Boulevard, Intracoastal-front on the other, under the town’s own building and design rules.',
      'It sits between the towers of Sunny Isles Beach and Hallandale Beach, which makes its low skyline, and its supply, unusual.',
    ],
    checks: [
      ['Coastal construction line', 'Oceanfront rebuilding and major renovation need state coastal permits. We find out what a buyer could build before they assume it.'],
      ['Seawalls and docks', 'For Intracoastal homes: seawall condition, dock permits and water depth at the dock.'],
      ['Town design review', 'What the town allows for additions and new homes, in writing, before a buyer prices a renovation.'],
      ['Flood and insurance', 'Elevation certificates and insurance quotes early, because they move the monthly cost.'],
    ],
  },
  {
    slug: 'sunny-isles', region: 'north', name: 'Sunny Isles Beach',
    title: 'Sunny Isles Beach oceanfront condominiums',
    description: 'Sunny Isles Beach condo advice from Jaelly & Dennis Prieto, Epique Realty: new construction deposits, older-building reserves, rental rules and insurance reviewed.',
    lede: 'An oceanfront city of high-rise condominiums, incorporated in 1997, where some of South Florida’s tallest residential towers stand directly on the beach.',
    place: [
      'Sunny Isles Beach is almost entirely towers on a narrow strip between the Atlantic and the Intracoastal, from 1960s and 1970s buildings to some of the newest residential construction in the region.',
      'Buyers here are usually choosing between a new tower and an older building with a lower price per square foot. The difference is in the building file.',
    ],
    checks: [
      ['New construction', 'Deposit schedules, completion timelines and assignment rules on pre-construction contracts.'],
      ['Older buildings', 'Milestone inspections, reserves and assessments, compared side by side with the newer towers.'],
      ['Rental rules', 'Minimum lease terms and short-term rental limits, building by building.'],
      ['Windstorm and flood insurance', 'Master policy, deductible and recent dues changes, so a buyer sees the real monthly cost.'],
    ],
  },
  {
    slug: 'bal-harbour', region: 'islands', name: 'Bal Harbour',
    title: 'Bal Harbour condominiums and homes',
    description: 'Bal Harbour real estate advice from Jaelly & Dennis Prieto, Epique Realty: oceanfront condominiums and the gated residential section, reviewed before you buy or list.',
    lede: 'A village incorporated in 1946, known for Bal Harbour Shops, oceanfront condominiums along Collins Avenue and a gated residential section of single-family homes on the bay.',
    place: [
      'Bal Harbour fits a lot into a small area: oceanfront towers to the east, the Shops at its center, and a gated neighborhood of single-family homes along the waterways to the west.',
      'Haulover Inlet and the jetty mark its northern edge, with boat access to the ocean minutes away.',
    ],
    checks: [
      ['Oceanfront condominium health', 'Inspections, reserves and assessments, read before pricing or an offer.'],
      ['Gated section rules', 'Association and security-district rules that apply to the single-family homes.'],
      ['Waterfront details', 'Seawall, dock and water depth for homes on the waterways.'],
      ['Flood and insurance', 'Elevation data and insurance quotes assembled early.'],
    ],
  },
  {
    slug: 'bay-harbor', region: 'islands', name: 'Bay Harbor Islands',
    title: 'Bay Harbor Islands condominiums, homes and redevelopment',
    description: 'Bay Harbor Islands real estate advice from Jaelly & Dennis Prieto, Epique Realty: older condominium buildings, redevelopment potential and waterfront homes.',
    lede: 'A town on two islands in Biscayne Bay, incorporated in 1947, with low and mid-rise condominiums on one island and waterfront single-family homes on the other.',
    place: [
      'Bay Harbor Islands sits just west of Bal Harbour across the water. Many of its multifamily buildings date from the 1950s and 1960s, and a number have been replaced by new boutique condominiums.',
      'That makes it two markets at once: buyers choosing among older and new buildings, and owners whose land may be worth more to a developer than their building is to a buyer.',
    ],
    checks: [
      ['Older building health', 'Milestone inspections, reserves and assessments in mid-century buildings.'],
      ['Redevelopment value', 'What zoning allows on a lot, and whether a developer would pay more than an end buyer.'],
      ['Waterfront homes', 'Seawall, dock and water depth for single-family homes on the bay.'],
      ['Flood and insurance', 'Elevation data and quotes before an offer.'],
    ],
  },
  {
    slug: 'surfside', region: 'islands', name: 'Surfside',
    title: 'Surfside homes and oceanfront condominiums',
    description: 'Surfside real estate advice from Jaelly & Dennis Prieto, Epique Realty: single-family homes and oceanfront condominiums, with building safety records read first.',
    lede: 'A small town between Miami Beach and Bal Harbour, with single-family streets west of Collins Avenue and oceanfront condominiums along it.',
    place: [
      'Surfside keeps a small-town scale: a walkable stretch of Harding Avenue, single-family homes on quiet streets, and condominiums on the ocean side of Collins Avenue.',
      'The 2021 collapse of Champlain Towers South in Surfside led directly to Florida’s milestone inspection and reserve requirements for condominiums, and buyers here read building records closely.',
    ],
    checks: [
      ['Condominium safety records', 'Milestone inspections, structural reserve studies and any required repairs, before price is discussed.'],
      ['Assessments', 'Approved and expected special assessments, and who pays them at closing.'],
      ['Single-family permits', 'Additions and renovations matched to the permit record.'],
      ['Flood and insurance', 'Elevation data and insurance quotes early.'],
    ],
  },
  {
    slug: 'indian-creek', region: 'islands', name: 'Indian Creek',
    title: 'Indian Creek Village',
    description: 'Indian Creek Village: a private island of estate lots west of Surfside. Discreet representation for owners and buyers from Jaelly & Dennis Prieto, Epique Realty.',
    lede: 'A private island village in Indian Creek, west of Surfside, with a few dozen estate lots, a country club and its own police department.',
    place: [
      'Indian Creek Village is one of the most private addresses in South Florida: a single gated island reached by one bridge, made up of large waterfront estate lots around a golf course.',
      'With so few properties, most change hands quietly. Supply, not marketing, is the constraint.',
    ],
    checks: [
      ['Discretion first', 'Owners here often prefer private sales. We work off-market when that is what the owner wants.'],
      ['Lot and rebuild potential', 'Lot size, waterfront frontage and village rules for new construction.'],
      ['Club and access', 'Club and village requirements that apply to owners and their guests.'],
      ['Waterfront details', 'Seawall, dock and water depth for each lot.'],
    ],
  },
  {
    slug: 'miami-shores', region: 'bayfront', name: 'Miami Shores',
    title: 'Miami Shores homes and bayfront estates',
    description: 'Miami Shores real estate advice from Jaelly & Dennis Prieto, Epique Realty: permit history, village code, bayfront seawalls and flood data checked before pricing.',
    lede: 'A village incorporated in 1932, with tree-lined streets, Mediterranean Revival and mid-century homes, and bayfront estates along Biscayne Bay.',
    place: [
      'Miami Shores is a planned village of single-family homes on generous lots, laid out in the 1920s, with a small downtown along NE 2nd Avenue and a country club at its center.',
      'Its bayfront homes on Biscayne Bay are among the larger waterfront lots this close to downtown Miami.',
    ],
    checks: [
      ['Permit history', 'Additions and converted spaces matched to the village’s permit record.'],
      ['Village code', 'Rules on additions, design and use that shape what a buyer can change.'],
      ['Bayfront details', 'Seawall, dock and water depth for homes on the bay.'],
      ['Flood and insurance', 'Elevation data and quotes, especially for older homes.'],
    ],
  },
  {
    slug: 'miami-beach', region: 'islands', name: 'Miami Beach',
    title: 'Miami Beach homes, islands and condominiums',
    description: 'Miami Beach real estate advice from Jaelly & Dennis Prieto, Epique Realty: historic districts, flood elevation, rental rules and condominium health reviewed.',
    lede: 'A city of neighborhoods and islands, from South Beach’s Art Deco district to Mid-Beach estates, North Beach, and the residential islands of Biscayne Bay.',
    place: [
      'Miami Beach runs from South Pointe to North Beach, with the Venetian Islands, Star Island and the islands of Normandy and La Gorce in the bay behind it.',
      'Housing ranges from Art Deco apartments to oceanfront towers and waterfront estates, often under historic district rules that shape what can be changed.',
    ],
    checks: [
      ['Historic districts', 'Whether a property is in a historic district, and what that means for renovation and demolition.'],
      ['Flood and elevation', 'Elevation, flood zone and the city’s stormwater work near the property, read before price.'],
      ['Rental rules', 'Short-term rental limits by zone and building, which decide whether a unit works as an investment.'],
      ['Condominium health', 'Inspections, reserves and assessments for towers and older low-rise buildings.'],
    ],
  },
  {
    slug: 'fisher-island', region: 'islands', name: 'Fisher Island',
    title: 'Fisher Island residences',
    description: 'Fisher Island real estate advice from Jaelly & Dennis Prieto, Epique Realty: club requirements, association approvals and building records reviewed with discretion.',
    lede: 'A private island off the southern tip of Miami Beach, reached by ferry or private boat, built around the former Vanderbilt estate and now a club community of condominiums and villas.',
    place: [
      'Fisher Island has no bridge. Residents and guests arrive by the island’s ferry or by boat, and the island operates as a private club community.',
      'Its residences range from condominiums in low and mid-rise buildings to villas and estate homes, many with marina and water views across Government Cut.',
    ],
    checks: [
      ['Club requirements', 'Membership and its costs, as a condition of ownership, set out before a buyer commits.'],
      ['Association approval', 'Approval process and timelines for buyers and tenants.'],
      ['Building records', 'Inspections, reserves and assessments for each building.'],
      ['Access and logistics', 'Ferry, guest and contractor access, which affect renovation planning.'],
    ],
  },
  {
    slug: 'key-biscayne', region: 'islands', name: 'Key Biscayne',
    title: 'Key Biscayne homes and condominiums',
    description: 'Key Biscayne real estate advice from Jaelly & Dennis Prieto, Epique Realty: oceanfront condominium health, flood elevation and village rules reviewed before pricing.',
    lede: 'An island village south of downtown, reached by the Rickenbacker Causeway and incorporated in 1991, with Crandon Park at one end and Bill Baggs Cape Florida State Park at the other.',
    place: [
      'Key Biscayne combines oceanfront condominium towers along its eastern shore with single-family streets inland and waterfront homes on the bay side.',
      'With parks at both ends and one road on and off the island, it keeps a village pace a short drive from Brickell.',
    ],
    checks: [
      ['Oceanfront condominium health', 'Inspections, reserves and assessments in the island’s towers.'],
      ['Flood and elevation', 'Elevation certificates and insurance quotes, especially for older single-family homes.'],
      ['Village rules', 'Building and renovation rules for single-family lots.'],
      ['Waterfront details', 'Seawall, dock and water depth for bayside homes.'],
    ],
  },
  {
    slug: 'gables-by-the-sea', region: 'south', name: 'Gables by the Sea',
    title: 'Gables by the Sea waterfront homes',
    description: 'Gables by the Sea real estate advice from Jaelly & Dennis Prieto, Epique Realty: canal depth, bridge clearance, seawalls and Coral Gables design review checked before pricing.',
    lede: 'A guard-gated waterfront neighborhood at the southern edge of Coral Gables along Old Cutler Road, where most homes sit on canals with boat access to Biscayne Bay.',
    place: [
      'Gables by the Sea sits where Red Road and Old Cutler Road divide, east toward the bay, beside Matheson Hammock Park.',
      'Its homes are laid out along canals that lead to Biscayne Bay, so the value of a lot depends as much on its water as on its house.',
    ],
    checks: [
      ['Canal depth and bridge clearance', 'What size boat a lot can actually keep and take to the bay.'],
      ['Seawall and dock', 'Condition, permits and repair history.'],
      ['Coral Gables design review', 'City and Board of Architects rules for additions and new homes.'],
      ['Flood and elevation', 'Elevation data and insurance quotes before an offer.'],
    ],
  },
];

const REGION = { 'coral-gables': 'south', 'coconut-grove': 'south', brickell: 'bayfront', edgewater: 'bayfront', pinecrest: 'south' };
const ORDER = Object.keys(PLACES); // north to south, as on the chart
export const NEIGHBORHOODS = [...BASE.map((n) => ({ ...n, region: REGION[n.slug] })), ...MORE]
  .map((n) => ({ ...n, coord: coordOf(n.slug) }))
  .sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));

export const REGIONS = [
  { key: 'north', name: 'North: Aventura to Sunny Isles' },
  { key: 'islands', name: 'The islands and the beaches' },
  { key: 'bayfront', name: 'The bayfront' },
  { key: 'south', name: 'South: the Grove, the Gables and Pinecrest' },
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
      'The Legislature has amended the Act every year since: in 2024, 2025 and again in 2026 (House Bill 1389, in effect July 1, 2026), adjusting eligible land, definitions, parking near transit, height protections and exclusions near airports and other sensitive areas. The details decide whether a specific site qualifies, so every review starts from the current statute and the local implementation, confirmed with land-use counsel.',
    ],
    steps: [
      ['Eligibility screen', 'Zoning category, location exclusions and parcel size, checked against the current statute.'],
      ['Capacity estimate', 'Density and height a qualifying project could reach, and the parking it would need near transit.'],
      ['Value impact', 'What a developer could pay for the land on that basis, next to its current-use value.'],
      ['Next step', 'Hold, sell to a developer, or partner. With counsel and your broker before anything is signed.'],
    ],
  },
];
