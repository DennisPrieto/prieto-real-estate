// Schematic Biscayne Bay geometry for the chart artwork.
// Points are approximate (lat, lon) traced at neighborhood scale. This is an
// illustration, not a navigational or survey-accurate map.

const BOUNDS = { lonMin: -80.345, lonMax: -80.105, latMin: 25.635, latMax: 25.85 };
const K = 4000;
const COS = Math.cos((25.75 * Math.PI) / 180);

export const WIDTH = Math.round((BOUNDS.lonMax - BOUNDS.lonMin) * COS * K);
export const HEIGHT = Math.round((BOUNDS.latMax - BOUNDS.latMin) * K);

export const project = ([lat, lon]) => [
  +((lon - BOUNDS.lonMin) * COS * K).toFixed(1),
  +((BOUNDS.latMax - lat) * K).toFixed(1),
];

// Mainland shoreline, north to south (land lies to the west).
const SHORE = [
  [25.85, -80.1835], [25.835, -80.1845], [25.82, -80.186], [25.805, -80.187], [25.795, -80.1873],
  [25.785, -80.1868], [25.777, -80.186], [25.77, -80.1865], [25.765, -80.189], [25.758, -80.193],
  [25.752, -80.199], [25.745, -80.206], [25.74, -80.211], [25.733, -80.22], [25.728, -80.23],
  [25.722, -80.238], [25.715, -80.247], [25.705, -80.256], [25.697, -80.262], [25.688, -80.27],
  [25.678, -80.277], [25.668, -80.284], [25.655, -80.293], [25.645, -80.3], [25.635, -80.307],
];

const MIAMI_BEACH = [
  [25.85, -80.14], [25.82, -80.142], [25.8, -80.145], [25.785, -80.142], [25.772, -80.14],
  [25.766, -80.137], [25.768, -80.128], [25.785, -80.127], [25.81, -80.123], [25.85, -80.12],
];

const VIRGINIA_KEY = [
  [25.762, -80.165], [25.752, -80.17], [25.741, -80.165], [25.742, -80.153], [25.755, -80.15],
];

const KEY_BISCAYNE = [
  [25.735, -80.162], [25.715, -80.168], [25.695, -80.165], [25.675, -80.16], [25.665, -80.157],
  [25.675, -80.15], [25.7, -80.152], [25.72, -80.154], [25.732, -80.158],
];

const smooth = (pts) => {
  // Catmull-Rom to cubic Bezier for a hand-drawn chart line.
  const p = pts.map(project);
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
};

export const shorePath = smooth(SHORE);
export const landPath = `${shorePath} L0 ${HEIGHT} L0 0 Z`;
const closed = (pts) => `${smooth([...pts, pts[0]])} Z`;
export const islands = [closed(MIAMI_BEACH), closed(VIRGINIA_KEY), closed(KEY_BISCAYNE)];

// Depth contours: the shoreline offset into the bay.
export const contours = [0.009, 0.018, 0.029].map((dx) => smooth(SHORE.map(([la, lo]) => [la, lo + dx])));

// Illustrative soundings (feet). Positions sit in open water.
export const soundings = [
  [25.835, -80.163, 7], [25.812, -80.168, 9], [25.79, -80.166, 8], [25.773, -80.159, 6],
  [25.748, -80.185, 9], [25.73, -80.196, 10], [25.712, -80.209, 11], [25.7, -80.226, 9],
  [25.686, -80.24, 10], [25.672, -80.252, 8], [25.658, -80.266, 7], [25.723, -80.182, 12],
  [25.69, -80.195, 11], [25.705, -80.185, 12],
].map(([la, lo, v]) => ({ xy: project([la, lo]), v }));

export const PLACES = {
  edgewater: { name: 'Edgewater', at: [25.8, -80.1905] },
  brickell: { name: 'Brickell', at: [25.761, -80.1945] },
  'coconut-grove': { name: 'Coconut Grove', at: [25.727, -80.2405] },
  'coral-gables': { name: 'Coral Gables', at: [25.721, -80.2684] },
  pinecrest: { name: 'Pinecrest', at: [25.665, -80.308] },
};

export const bayLabel = project([25.715, -80.215]);

// Graticule ticks every 0.05 degrees.
export const latTicks = [25.65, 25.7, 25.75, 25.8].map((la) => ({ y: project([la, BOUNDS.lonMin])[1], label: `25°${Math.round((la - 25) * 60)}′N` }));
export const lonTicks = [-80.3, -80.25, -80.2, -80.15].map((lo) => ({ x: project([BOUNDS.latMax, lo])[0], label: `80°${Math.round((-lo - 80) * 60)}′W` }));
