import { SKF_PRODUCTS } from "./skfProducts";
import { VBC_PRODUCTS } from "./vbcProducts";

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  featured?: boolean;
  description: string;
  specs: Spec[];
}

export interface Category {
  id: string;
  name: string;
  tagline: string;
  image: string;
}

export const COMPANY = {
  name: "M/S HELAL ENTERPRISE",
  short: "Helal Enterprise",
  division: "Bearings & Industrial Parts",
  address: "Shop 219–220, Nawabpur, Dhaka 1100, Bangladesh",
  mapQuery: "Nawabpur Road, Dhaka 1100, Bangladesh",
  email: "helalent@gmail.com",
  phones: [
    { label: "+880 1715-078403", tel: "+8801715078403", tag: "Sales & Wholesale" },
    { label: "+880 1335-116262", tel: "+8801335116262", tag: "Orders" },
    { label: "+880 1816-416867", tel: "+8801816416867", tag: "Enquiry" },
    { label: "+880 2471-14890", tel: "+880247114890", tag: "Office (Landline)" },
  ],
  hours: "Saturday – Thursday · 9:00 AM – 8:00 PM",
  whatsapp: "+8801772094911",
  whatsappUrl: "https://wa.me/8801772094911",
  tagline: "SKF Authorised Distributor — Bangladesh",
  since: "Since 1976 · SKF since 1987",
};

export const tk = (n: number) => "৳" + Math.round(n).toLocaleString("en-IN");

export const CATEGORIES: Category[] = [
  {
    id: "ball-bearings",
    name: "Ball Bearings",
    tagline: "Deep groove, angular contact & self-aligning",
    image: "/images/cat-ball-bearings.jpg",
  },
  {
    id: "roller-bearings",
    name: "Roller Bearings",
    tagline: "Tapered, spherical, cylindrical & needle",
    image: "/images/cat-roller-bearings.jpg",
  },
  {
    id: "bearing-units",
    name: "Bearing Units",
    tagline: "Pillow blocks, flanged & take-up housings",
    image: "/images/prod-pillowblock.jpg",
  },
  {
    id: "seals",
    name: "Seals & O-Rings",
    tagline: "Rotary shaft seals, O-rings & hydraulic kits",
    image: "/images/cat-seals.jpg",
  },
  {
    id: "power-transmission",
    name: "Power Transmission",
    tagline: "Chains, belts, sprockets & couplings",
    image: "/images/prod-chain.jpg",
  },
  {
    id: "maintenance",
    name: "Maintenance & Tools",
    tagline: "Grease, lubricants, pullers & heaters",
    image: "/images/cat-tools.jpg",
  },
];

export const BRANDS = [
  "SKF",
  "FAG",
  "NSK",
  "NTN",
  "KOYO",
  "TIMKEN",
  "NACHI",
  "FKL",
  "URB",
  "NOK",
  "GATES",
  "RENOLD",
];

const LOCAL_PRODUCTS: Product[] = [
  {
    id: "p01",
    sku: "6205-2Z",
    name: "Deep Groove Ball Bearing 6205-2Z",
    brand: "SKF",
    category: "ball-bearings",
    price: 1250,
    stock: 240,
    image: "/images/prod-ballbearing.jpg",
    featured: true,
    description:
      "A versatile single-row deep groove ball bearing with metal shields on both sides. Pre-lubricated and maintenance-free, it handles radial and moderate axial loads in electric motors, pumps and general machinery.",
    specs: [
      { label: "Bore diameter", value: "25 mm" },
      { label: "Outside diameter", value: "52 mm" },
      { label: "Width", value: "15 mm" },
      { label: "Sealing", value: "2Z — metal shields both sides" },
      { label: "Dynamic load rating", value: "14.8 kN" },
      { label: "Reference speed", value: "28,000 r/min" },
      { label: "Weight", value: "0.13 kg" },
    ],
  },
  {
    id: "p02",
    sku: "6308-2RS1",
    name: "Deep Groove Ball Bearing 6308-2RS1",
    brand: "FAG",
    category: "ball-bearings",
    price: 2450,
    stock: 120,
    image: "/images/cat-ball-bearings.jpg",
    featured: true,
    description:
      "Medium-series deep groove ball bearing with low-friction rubber contact seals. Designed for dusty mill environments where relubrication is difficult — common in fans, gearboxes and agricultural drives.",
    specs: [
      { label: "Bore diameter", value: "40 mm" },
      { label: "Outside diameter", value: "90 mm" },
      { label: "Width", value: "23 mm" },
      { label: "Sealing", value: "2RS1 — rubber seals both sides" },
      { label: "Dynamic load rating", value: "42.3 kN" },
      { label: "Limiting speed", value: "8,500 r/min" },
      { label: "Weight", value: "0.63 kg" },
    ],
  },
  {
    id: "p03",
    sku: "7205 BECBP",
    name: "Angular Contact Ball Bearing 7205 BECBP",
    brand: "SKF",
    category: "ball-bearings",
    price: 3980,
    stock: 64,
    image: "/images/hero-bearings.jpg",
    description:
      "Single-row angular contact bearing with 40° contact angle for combined radial and one-direction axial loads. Ideal in pump shafts and high-speed spindles; pairs available on request.",
    specs: [
      { label: "Bore diameter", value: "25 mm" },
      { label: "Outside diameter", value: "52 mm" },
      { label: "Width", value: "15 mm" },
      { label: "Contact angle", value: "40°" },
      { label: "Cage", value: "Glass-fibre reinforced polyamide" },
      { label: "Dynamic load rating", value: "15.6 kN" },
      { label: "Weight", value: "0.14 kg" },
    ],
  },
  {
    id: "p04",
    sku: "1206 ETN9",
    name: "Self-Aligning Ball Bearing 1206 ETN9",
    brand: "NSK",
    category: "ball-bearings",
    price: 1850,
    stock: 88,
    image: "/images/prod-ballbearing.jpg",
    description:
      "Double-row self-aligning bearing that tolerates shaft misalignment and deflection. A dependable choice for long shafts in conveyors, textile drums and ventilation systems.",
    specs: [
      { label: "Bore diameter", value: "30 mm" },
      { label: "Outside diameter", value: "62 mm" },
      { label: "Width", value: "16 mm" },
      { label: "Misalignment tolerance", value: "Up to 2.5°" },
      { label: "Dynamic load rating", value: "15.9 kN" },
      { label: "Weight", value: "0.22 kg" },
    ],
  },
  {
    id: "p05",
    sku: "30208",
    name: "Tapered Roller Bearing 30208",
    brand: "TIMKEN",
    category: "roller-bearings",
    price: 1680,
    stock: 150,
    image: "/images/prod-tapered.jpg",
    featured: true,
    description:
      "Separable tapered roller bearing (cone + cup) built for heavy combined loads. Widely used in vehicle hubs, differentials and machine tool gearboxes across Bangladesh.",
    specs: [
      { label: "Bore diameter", value: "40 mm" },
      { label: "Outside diameter", value: "80 mm" },
      { label: "Overall width", value: "19.75 mm" },
      { label: "Design", value: "Separable cone and cup" },
      { label: "Dynamic load rating", value: "59.8 kN" },
      { label: "Weight", value: "0.42 kg" },
    ],
  },
  {
    id: "p06",
    sku: "22210 E",
    name: "Spherical Roller Bearing 22210 E",
    brand: "SKF",
    category: "roller-bearings",
    price: 6850,
    stock: 36,
    image: "/images/cat-roller-bearings.jpg",
    featured: true,
    description:
      "Heavy-duty spherical roller bearing for vibrating screens, crushers and rolling mill duty. Self-aligning under severe load with reinforced symmetrical rollers.",
    specs: [
      { label: "Bore diameter", value: "50 mm" },
      { label: "Outside diameter", value: "90 mm" },
      { label: "Width", value: "23 mm" },
      { label: "Misalignment tolerance", value: "Up to 2°" },
      { label: "Dynamic load rating", value: "104 kN" },
      { label: "Weight", value: "0.61 kg" },
    ],
  },
  {
    id: "p07",
    sku: "NU310 ECP",
    name: "Cylindrical Roller Bearing NU310",
    brand: "NTN",
    category: "roller-bearings",
    price: 3250,
    stock: 72,
    image: "/images/cat-roller-bearings.jpg",
    description:
      "NU-design cylindrical roller bearing with high radial capacity and free axial displacement. Preferred for electric motors, traction drives and high-speed machine spindles.",
    specs: [
      { label: "Bore diameter", value: "50 mm" },
      { label: "Outside diameter", value: "110 mm" },
      { label: "Width", value: "27 mm" },
      { label: "Cage", value: "Polyamide (ECP)" },
      { label: "Dynamic load rating", value: "127 kN" },
      { label: "Weight", value: "1.15 kg" },
    ],
  },
  {
    id: "p08",
    sku: "HK 2016",
    name: "Needle Roller Bearing HK 2016",
    brand: "KOYO",
    category: "roller-bearings",
    price: 380,
    stock: 400,
    image: "/images/cat-machining.jpg",
    description:
      "Drawn-cup needle roller bearing with an extremely compact cross-section. Suits tight spaces in two-stroke engines, compressors and power tools.",
    specs: [
      { label: "Bore diameter", value: "20 mm" },
      { label: "Outside diameter", value: "26 mm" },
      { label: "Width", value: "16 mm" },
      { label: "Design", value: "Open-end drawn cup" },
      { label: "Dynamic load rating", value: "12.9 kN" },
      { label: "Weight", value: "0.02 kg" },
    ],
  },
  {
    id: "p09",
    sku: "UCP 206",
    name: "Pillow Block Unit UCP 206",
    brand: "FKL",
    category: "bearing-units",
    price: 1450,
    stock: 96,
    image: "/images/prod-pillowblock.jpg",
    featured: true,
    description:
      "Cast-iron pillow block housing with a sealed insert bearing and grub-screw shaft locking. Bolt-on convenience for conveyor lines, fans and agricultural machinery.",
    specs: [
      { label: "Shaft diameter", value: "30 mm" },
      { label: "Housing", value: "Cast iron, P 206" },
      { label: "Locking", value: "Set screw / grub screw" },
      { label: "Bolt hole centres", value: "121 mm" },
      { label: "Overall height", value: "83 mm" },
      { label: "Weight", value: "1.35 kg" },
    ],
  },
  {
    id: "p10",
    sku: "UCF 208",
    name: "Four-Bolt Flanged Unit UCF 208",
    brand: "KG",
    category: "bearing-units",
    price: 1980,
    stock: 58,
    image: "/images/prod-pillowblock.jpg",
    description:
      "Square four-bolt flanged housing with relubricatable insert bearing. Mounts directly onto vertical machine frames in packaging lines and material handling systems.",
    specs: [
      { label: "Shaft diameter", value: "40 mm" },
      { label: "Housing", value: "Cast iron, F 208" },
      { label: "Bolt pattern", value: "4-bolt square flange" },
      { label: "Bolt hole centres", value: "102 mm" },
      { label: "Weight", value: "2.10 kg" },
    ],
  },
  {
    id: "p11",
    sku: "UCT 210",
    name: "Take-Up Unit UCT 210",
    brand: "URB",
    category: "bearing-units",
    price: 2750,
    stock: 24,
    image: "/images/prod-pillowblock.jpg",
    description:
      "Take-up housing with guide slots for tensioning conveyor belts and chain drives. Compatible with standard T 210 frames; wide-slot version available on request.",
    specs: [
      { label: "Shaft diameter", value: "50 mm" },
      { label: "Housing", value: "Cast iron, T 210" },
      { label: "Adjustment travel", value: "56 mm" },
      { label: "Locking", value: "Set screw" },
      { label: "Weight", value: "3.30 kg" },
    ],
  },
  {
    id: "p12",
    sku: "TC 35x52x8",
    name: "Rotary Shaft Oil Seal 35–52–8 NBR",
    brand: "NOK",
    category: "seals",
    price: 220,
    stock: 520,
    image: "/images/cat-seals.jpg",
    featured: true,
    description:
      "Metal-cased rotary shaft seal with a nitrile (NBR) garter-spring sealing lip. Keeps oil in and dust out on gearboxes, motors and wheel hubs up to 120 °C.",
    specs: [
      { label: "Shaft diameter", value: "35 mm" },
      { label: "Bore diameter", value: "52 mm" },
      { label: "Width", value: "8 mm" },
      { label: "Material", value: "NBR rubber, steel case" },
      { label: "Temperature range", value: "−30 °C to +120 °C" },
    ],
  },
  {
    id: "p13",
    sku: "ORK-NBR70-424",
    name: "O-Ring Assortment Kit NBR 70 (424 pcs)",
    brand: "NOK",
    category: "seals",
    price: 1150,
    stock: 140,
    image: "/images/cat-seals.jpg",
    description:
      "Workshop assortment of 424 metric O-rings in 30 common sizes, shore A 70 nitrile rubber. Packed in a sectioned organiser box for quick maintenance jobs.",
    specs: [
      { label: "Pieces", value: "424 pcs / 30 sizes" },
      { label: "Material", value: "NBR, Shore A 70" },
      { label: "Size range", value: "3 mm – 38.2 mm ID" },
      { label: "Application", value: "Hydraulics, pneumatic, general sealing" },
    ],
  },
  {
    id: "p14",
    sku: "HSK-50T",
    name: "Hydraulic Cylinder Seal Kit 50 mm Rod",
    brand: "Hallite",
    category: "seals",
    price: 3400,
    stock: 30,
    image: "/images/cat-seals.jpg",
    description:
      "Complete rod seal service kit for 50 mm hydraulic cylinders: rod seal, wiper, wear rings and pistons seals in polyurethane and NBR. Fits common excavator and press cylinders.",
    specs: [
      { label: "Rod diameter", value: "50 mm" },
      { label: "Kit contents", value: "11 elements incl. wear rings" },
      { label: "Material", value: "PU / NBR / POM" },
      { label: "Pressure rating", value: "Up to 400 bar" },
    ],
  },
  {
    id: "p15",
    sku: "RC08B-1-5M",
    name: "Precision Roller Chain 08B-1 (5 m Box)",
    brand: "RENOLD",
    category: "power-transmission",
    price: 2650,
    stock: 76,
    image: "/images/prod-chain.jpg",
    featured: true,
    description:
      "British-standard 1/2″ pitch simplex roller chain supplied in a 5-metre box with connecting links. Shot-peened plates for fatigue resistance in drives and conveyors.",
    specs: [
      { label: "Pitch", value: '12.7 mm (1/2")' },
      { label: "Standard", value: "ISO 606 / BS 228 (08B)" },
      { label: "Roller diameter", value: "8.51 mm" },
      { label: "Tensile strength", value: "18.2 kN" },
      { label: "Box length", value: "5 m (394 pitches)" },
    ],
  },
  {
    id: "p16",
    sku: "SPA 1320",
    name: "Wrapped Wedge V-Belt SPA 1320",
    brand: "GATES",
    category: "power-transmission",
    price: 520,
    stock: 210,
    image: "/images/cat-power-transmission.jpg",
    description:
      "SPA-section wrapped wedge belt for compact, high-power drives in crushers, compressors and blowers. Oil- and heat-resistant with matched-length tolerances.",
    specs: [
      { label: "Section", value: "SPA (12.7 mm top width)" },
      { label: "Datum length", value: "1320 mm" },
      { label: "Temperature range", value: "−30 °C to +80 °C" },
      { label: "Standard", value: "ISO 4184 / DIN 7753" },
    ],
  },
  {
    id: "p17",
    sku: "JAW-38/45",
    name: "Jaw Coupling 38/45 with Spider 98 Sh-A",
    brand: "NBE",
    category: "power-transmission",
    price: 1350,
    stock: 44,
    image: "/images/cat-power-transmission.jpg",
    description:
      "Torsionally flexible jaw coupling with replaceable polyurethane spider. Damps vibration and compensates shaft misalignment between motors and pumps.",
    specs: [
      { label: "Bore range", value: "12 – 38 mm" },
      { label: "Rated torque", value: "60 Nm" },
      { label: "Spider hardness", value: "98 Sh-A (red)" },
      { label: "Material", value: "Cast iron hubs, PU spider" },
    ],
  },
  {
    id: "p18",
    sku: "SPK-12B1-18T",
    name: "Sprocket 12B-1, 18 Teeth, Pilot Bore",
    brand: "URB",
    category: "power-transmission",
    price: 480,
    stock: 132,
    image: "/images/prod-chain.jpg",
    description:
      "Induction-hardened 18-tooth simplex sprocket for 3/4″ pitch (12B-1) chain. Supplied with pilot bore for machining to your required shaft size and keyway.",
    specs: [
      { label: "Chain size", value: '12B-1 (3/4" pitch)' },
      { label: "Teeth", value: "18 T" },
      { label: "Pitch circle dia.", value: "109.71 mm" },
      { label: "Bore", value: "Pilot bore (machinable)" },
      { label: "Teeth hardness", value: "HRC 40–45" },
    ],
  },
  {
    id: "p19",
    sku: "LGMT 2/1",
    name: "Multipurpose Bearing Grease LGMT 2 (1 kg)",
    brand: "SKF",
    category: "maintenance",
    price: 1050,
    stock: 110,
    image: "/images/cat-tools.jpg",
    featured: true,
    description:
      "General-purpose lithium-calcium grease for bearings running at normal temperatures and loads. Excellent rust protection for electric motors, pumps and fans.",
    specs: [
      { label: "Thickener", value: "Lithium-calcium" },
      { label: "NLGI grade", value: "2" },
      { label: "Base oil viscosity", value: "110 mm²/s at 40 °C" },
      { label: "Temperature range", value: "−30 °C to +120 °C" },
      { label: "Pack size", value: "1 kg tin" },
    ],
  },
  {
    id: "p20",
    sku: "KLQ-ISOFLEX15",
    name: "High-Speed Spindle Grease (1 kg)",
    brand: "KLÜBER",
    category: "maintenance",
    price: 2800,
    stock: 18,
    image: "/images/cat-tools.jpg",
    description:
      "Low-torque synthetic grease for spindle and precision bearings running at very high speeds. Long service intervals in CNC spindles and textile machinery.",
    specs: [
      { label: "NLGI grade", value: "2" },
      { label: "Speed factor", value: "Up to 1,000,000 n·dm" },
      { label: "Temperature range", value: "−40 °C to +130 °C" },
      { label: "Pack size", value: "1 kg tub" },
    ],
  },
  {
    id: "p21",
    sku: "BHP-175",
    name: "Hydraulic Bearing Puller Kit (12-Tonne)",
    brand: "NBE",
    category: "maintenance",
    price: 4500,
    stock: 12,
    image: "/images/cat-tools.jpg",
    description:
      "Self-contained hydraulic puller set for removing bearings, gears and couplings up to 12 tonnes of pulling force. Complete with two/three-jaw head and carrying case.",
    specs: [
      { label: "Pulling force", value: "12 t" },
      { label: "Max reach", value: "250 mm" },
      { label: "Max spread", value: "300 mm" },
      { label: "Jaw configuration", value: "2-jaw / 3-jaw convertible" },
      { label: "Includes", value: "Blow-mould case & adapters" },
    ],
  },
  {
    id: "p22",
    sku: "IH-030",
    name: "Portable Induction Bearing Heater 3.6 kVA",
    brand: "NBE",
    category: "maintenance",
    price: 18500,
    stock: 6,
    image: "/images/cat-machining.jpg",
    description:
      "Compact induction heater for clean, controlled mounting of bearings up to 40 kg. Temperature-hold, demagnetisation and automatic shut-off protect bearing raceways.",
    specs: [
      { label: "Power", value: "3.6 kVA, 230 V" },
      { label: "Bearing weight", value: "Up to 40 kg" },
      { label: "Min. bore", value: "30 mm" },
      { label: "Temperature range", value: "0 – 250 °C" },
      { label: "Function", value: "Auto demagnetise & temp hold" },
    ],
  },
];

/** Full mega-catalogue — curated range + eparts clone (273) + vongbingocanh
 *  Vietnam SKF catalog (193) = ~460 genuine bearing & industrial parts. */
export const PRODUCTS: Product[] = [...LOCAL_PRODUCTS, ...SKF_PRODUCTS, ...VBC_PRODUCTS];

export const IMAGE_LIBRARY = [
  "/images/hero-industrial.jpg",
  "/images/hero-bearings.jpg",
  "/images/prod-ballbearing.jpg",
  "/images/cat-ball-bearings.jpg",
  "/images/cat-roller-bearings.jpg",
  "/images/prod-tapered.jpg",
  "/images/prod-pillowblock.jpg",
  "/images/cat-seals.jpg",
  "/images/prod-chain.jpg",
  "/images/cat-power-transmission.jpg",
  "/images/cat-tools.jpg",
  "/images/cat-machining.jpg",
  "/images/cat-fasteners.jpg",
  "/images/warehouse.jpg",
  "/images/about-engineer.jpg",
  "/images/ind-manufacturing.jpg",
];
