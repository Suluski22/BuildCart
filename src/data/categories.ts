import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'tiles-flooring',
    index: '01',
    name: 'Tiles & Flooring',
    shortName: 'Tiles',
    tagline: 'Porcelain, ceramic, SPC vinyl, terrazzo & heavy-traffic floor systems',
    subcategories: [
      'Porcelain Floor Tiles',
      'Ceramic Wall Tiles',
      'SPC Vinyl Plank Flooring',
      'Terrazzo & Mosaic Tiles',
      'Outdoor Non-Slip Pavers',
      'Tile Adhesives, Grouts & Spacers'
    ],
    filterAttributes: [
      { name: 'Finish', options: ['Polished', 'Matte', 'Honed', 'Rustic', 'Lappato'] },
      { name: 'Size', options: ['60x60 cm', '60x120 cm', '80x80 cm', '30x60 cm', '20x120 cm (Wood Plank)'] },
      { name: 'Material', options: ['Full Body Porcelain', 'Glazed Ceramic', 'SPC Vinyl', 'Engineered Stone'] },
      { name: 'Application', options: ['Living Room', 'Bathroom & Wet Areas', 'Kitchen', 'Outdoor / Patio', 'Commercial'] }
    ],
    isCuratedHome: true,
    image: '/images/cat_tiles_flooring_1790163945050.jpg'
  },
  {
    id: 'paints-wall-finishes',
    index: '02',
    name: 'Paints & Wall Finishes',
    shortName: 'Paints',
    tagline: 'Interior emulsions, weather-guard exteriors, primers and textured coatings',
    subcategories: [
      'Interior Vinyl Matt Emulsion',
      'Interior Silk & Eggshell',
      'Exterior Weatherguard Coat',
      'Textured & Stucco Wall Finishes',
      'Primers, Undercoats & Sealers',
      'Wood Varnishes, Stains & Sealants'
    ],
    filterAttributes: [
      { name: 'Finish', options: ['Vinyl Matt', 'Silk', 'Gloss', 'Satin', 'Textured Granito'] },
      { name: 'Application', options: ['Interior Walls', 'Exterior Facades', 'Woodwork', 'Metal Primer', 'High Moisture'] },
      { name: 'Coverage', options: ['High Coverage (12-14 sqm/L)', 'Standard (9-11 sqm/L)'] },
      { name: 'Volume', options: ['1 Litre', '4 Litres', '20 Litres (Drum)'] }
    ],
    isCuratedHome: true,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'wall-panels-surfaces',
    index: '03',
    name: 'Wall Panels & Decorative Surfaces',
    shortName: 'Wall Panels',
    tagline: 'Fluted wood slats, acoustic felt panels, 3D relief and stone veneers',
    subcategories: [
      'Acoustic Oak Fluted Slat Panels',
      'Charcoal Wall Slat Cladding',
      'Flexible PU Faux Stone Panels',
      'PVC Marble UV Wall Sheets',
      '3D Gypsum Wall Relief Tiles'
    ],
    filterAttributes: [
      { name: 'Finish', options: ['Natural Oak', 'Smoked Walnut', 'Calacatta Marble Look', 'Matte Black', 'Raw Stone'] },
      { name: 'Material', options: ['MDF + Real Wood Veneer', 'High Density Charcoal Polystyrene', 'Flexible PU Stone', 'PVC Composites'] },
      { name: 'Application', options: ['TV Feature Wall', 'Dining Accent', 'Executive Office', 'Bedroom Headboard'] }
    ],
    isCuratedHome: true,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'bathroom-sanitaryware',
    index: '04',
    name: 'Bathroom & Sanitaryware',
    shortName: 'Bathroom',
    tagline: 'Rimless WC suites, floating vanity counters, thermostatic shower towers & taps',
    subcategories: [
      'Rimless Wall-Hung & Floor WCs',
      'Floating Vanity Basins & Storage',
      'Concealed Cisterns & Flush Plates',
      'Thermostatic Rain Shower Columns',
      'Brushed Brass & Matt Black Mixers',
      'Towel Warmers & Bathroom Hardware'
    ],
    filterAttributes: [
      { name: 'Finish', options: ['Matte Black', 'Brushed Brass', 'Chrome', 'Brushed Gunmetal', 'Gloss White'] },
      { name: 'Installation', options: ['Wall-Hung Concealed', 'Deck Mounted', 'Floor Standing'] },
      { name: 'Material', options: ['Vitreous China', 'Solid Brass Cartridge', 'Marine Plywood Vanity', 'Stainless Steel 304'] }
    ],
    isCuratedHome: true,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'kitchen-cabinetry',
    index: '05',
    name: 'Kitchen & Cabinetry',
    shortName: 'Kitchens',
    tagline: 'Custom modular base & wall units, pantry pull-outs, quartz tops & soft-close systems',
    subcategories: [
      'Modular Base Cabinet Carcasses',
      'Overhead Fluted & Slab Cabinets',
      'Full-Height Larder & Pantry Pullouts',
      'Quartz & Nano-Granite Undermount Sinks',
      'Blum-Style Soft Close Drawers & Hinges',
      'Architectural Profile Handles'
    ],
    filterAttributes: [
      { name: 'Style', options: ['Modern Handleless (J-Pull)', 'Slim Shaker', 'Contemporary Slab', 'Fluted Accents'] },
      { name: 'Carcass Material', options: ['Marine Moisture Resistant MDF', 'Waterproof Particle Board', 'Solid Plywood'] },
      { name: 'Finish', options: ['Super Matte Anti-Fingerprint', 'High Gloss Acrylic', 'Natural Wood Grain'] }
    ],
    isCuratedHome: true,
    image: '/images/cat_kitchen_cabinetry_1790163957321.jpg'
  },
  {
    id: 'countertops-stone',
    index: '06',
    name: 'Countertops & Stone',
    shortName: 'Countertops',
    tagline: 'Engineered quartz slabs, imported granite, marble accents & precision fabrication',
    subcategories: [
      'Calacatta & Carrara Engineered Quartz Slabs',
      'Absolute Black Honed Granite',
      'Natural Italian & Turkish Marble Slabs',
      'Sintered Porcelain Big Slabs',
      'Backsplash Upstands & Edge Profiles'
    ],
    filterAttributes: [
      { name: 'Stone Type', options: ['Engineered Quartz', 'Granite', 'Natural Marble', 'Sintered Stone'] },
      { name: 'Thickness', options: ['15mm', '20mm', '30mm Built-up Edge (Mitered)'] },
      { name: 'Finish', options: ['Polished High Gloss', 'Honed Matte', 'Leathered / Suede'] }
    ],
    isCuratedHome: true,
    image: '/images/cat_countertops_stone_1790163967414.jpg'
  },
  {
    id: 'waterproofing',
    index: '07',
    name: 'Waterproofing',
    shortName: 'Waterproofing',
    tagline: 'Two-part cementitious slurries, torch-on bituminous membranes & balcony sealants',
    subcategories: [
      'Two-Component Flexible Cementitious Slurry',
      'Torch-On Bituminous Roof Membranes (4mm)',
      'Liquid-Applied Polyurethane Membrane',
      'Crystalline Concrete Admixtures',
      'Expanding Waterstop Bars & Joint Sealants'
    ],
    filterAttributes: [
      { name: 'Application Area', options: ['Wet Areas / Bathrooms', 'Flat Concrete Roof', 'Basement & Retaining Wall', 'Swimming Pools & Water Tanks', 'Balconies'] },
      { name: 'System Type', options: ['Cementitious Polymer', 'Torch-On SBS Bitumen', 'Liquid Polyurethane', 'Elastomeric Acrylic'] }
    ],
    isCuratedHome: false
  },
  {
    id: 'doors-hardware',
    index: '08',
    name: 'Doors & Architectural Hardware',
    shortName: 'Doors & Locks',
    tagline: 'Engineered solid wood flush doors, security steel pivot systems & designer hardware',
    subcategories: [
      'Solid Core Flush Interior Doors',
      'High-Security Multi-Point Steel Pivot Doors',
      'Barn Doors & Sliding Hardware Tracks',
      'Smart Digital Biometric Mortise Locks',
      'Architectural Lever Handles & Pull Bars',
      'Heavy Duty Ball-Bearing Hinges & Stops'
    ],
    filterAttributes: [
      { name: 'Door Type', options: ['Interior Flush Door', 'Main Entry Pivot Door', 'Sliding Pocket Door', 'Framed Glass Door'] },
      { name: 'Finish', options: ['Natural Teak Veneer', 'White Lacquered', 'Matt Black Hardware', 'Satin Stainless Steel'] },
      { name: 'Security Level', options: ['Standard Interior', 'High Security 12-Point', 'Biometric / Smart Entry'] }
    ],
    isCuratedHome: true,
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'ceilings-gypsum',
    index: '09',
    name: 'Ceilings & Gypsum',
    shortName: 'Ceilings',
    tagline: 'Standard & moisture-resistant gypsum boards, shadowline channels & light coves',
    subcategories: [
      'Standard Gypsum Boards (9mm / 12mm)',
      'Moisture Resistant Green Gypsum Boards',
      'Galvanized Ceiling Studs, Tracks & Perimeter Angles',
      'Shadowline Aluminum Ceiling Trims & Light Troughs',
      'Gypsum Joint Fillers, Fibreglass Tape & Screws'
    ],
    filterAttributes: [
      { name: 'Board Thickness', options: ['9.0mm (Ceiling)', '12.0mm (Walls / Partitions)', '15.0mm (Fire Rated)'] },
      { name: 'Specialty', options: ['Moisture Resistant (Green)', 'Standard Interior', 'Sound Attenuation'] }
    ],
    isCuratedHome: false
  },
  {
    id: 'lighting',
    index: '10',
    name: 'Lighting',
    shortName: 'Lighting',
    tagline: 'Architectural anti-glare downlights, low-voltage magnetic tracks & designer fixtures',
    subcategories: [
      'Deep Recessed Anti-Glare Downlights',
      'Magnetic Track Light Rail & Modulators',
      'COB High-Density LED Strips & Aluminum Profiles',
      'Modern Dining Linear Pendant Fixtures',
      'Step Lights & Outdoor IP65 Wall Luminaires'
    ],
    filterAttributes: [
      { name: 'Color Temperature', options: ['3000K Warm White', '4000K Natural White', 'CCT Tunable'] },
      { name: 'Mounting Type', options: ['Recessed Flush', 'Surface Mounted', 'Pendant Suspended', 'Magnetic Track'] },
      { name: 'Beam Angle', options: ['Narrow Spot (15°)', 'Medium Flood (24°)', 'Wide Flood (38°-60°)'] }
    ],
    isCuratedHome: true,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'glass-mirrors-aluminium',
    index: '11',
    name: 'Glass, Mirrors & Aluminium',
    shortName: 'Glass & Mirrors',
    tagline: 'Toughened shower cubicles, fluted partition screens & touch LED mirrors',
    subcategories: [
      'Frameless 10mm Toughened Glass Shower Enclosures',
      'Fluted Reeded Glass Interior Partitions',
      'Smart LED Anti-Fog Vanity Mirrors',
      'Heavy-Gauge Powder-Coated Aluminium Sliding Doors',
      'Shower Hardware Brackets & Stabilizer Bars'
    ],
    filterAttributes: [
      { name: 'Glass Type', options: ['Clear Tempered 10mm', 'Fluted / Reeded', 'Tinted Grey Tempered', 'Frosted Privacy'] },
      { name: 'Hardware Finish', options: ['Matte Black', 'Brushed Gold', 'Polished Chrome', 'Gunmetal Grey'] }
    ],
    isCuratedHome: false
  },
  {
    id: 'staircases-balustrades',
    index: '12',
    name: 'Staircases & Balustrades',
    shortName: 'Staircases',
    tagline: 'Cantilevered glass balustrades, stainless steel spigots & hardwood treads',
    subcategories: [
      'Frameless Glass Balustrades with Stainless Spigots',
      'Top-Mounted Aluminium Base Channel Systems',
      'Kiln-Dried Mvule & Mahogany Staircase Treads',
      'Black Matte Slotted Handrail Profiles'
    ],
    filterAttributes: [
      { name: 'Material', options: ['12mm Laminated Toughened Glass', 'Stainless Steel 316 Marine Grade', 'Solid Hardwood Timber'] },
      { name: 'Mounting', options: ['Side Bracket Mounted', 'Floor Spigot Mounted', 'Concealed Dry-Glazed Shoe'] }
    ],
    isCuratedHome: false
  },
  {
    id: 'interior-accessories-hardware',
    index: '13',
    name: 'Interior Accessories & Hardware',
    shortName: 'Accessories',
    tagline: 'Concealed aluminum skirting, floor transition profiles & heavy-duty fixings',
    subcategories: [
      'Concealed Shadowline Aluminum Skirting (60mm / 80mm)',
      'Waterproof Charcoal Polystyrene Skirting Boards',
      'T-Bar Floor Transition Profiles & Reducers',
      'Heavy Duty Ceiling Anchors, Drywall Screws & Chemical Fixings',
      'Heavy Weight Concealed Curtain Track Channels'
    ],
    filterAttributes: [
      { name: 'Finish', options: ['Anodized Matte Silver', 'Matte Black', 'White Primer Ready', 'Brushed Champagne'] },
      { name: 'Application', options: ['Floor-Wall Boundary', 'Tile-to-Wood Transition', 'Gypsum Anchoring'] }
    ],
    isCuratedHome: false
  }
];
