import { SupplyAndFixService } from '../types';

export const SUPPLY_AND_FIX_SERVICES: SupplyAndFixService[] = [
  {
    id: 'interior-fittings-finishes',
    index: '01',
    title: 'Interior Fittings & Finishes',
    subtitle: 'Comprehensive interior fitting, trims, door hanging and final architectural touches',
    description: 'Expert installation of interior architectural hardware, doors, baseboards, skirtings, vanity fixtures and fine finishes to bring your interior to turn-key completion.',
    scopeItems: [
      'Interior solid door hung and mortise lock fitting',
      'Architectural concealed or surface skirting board installation',
      'Sanitaryware fitting: wall-hung WCs, basins & mixer taps',
      'Curtain tracks, pelmets and interior wall accessories',
      'Comprehensive punchlist snagging and defects rectification'
    ],
    commonProjects: ['Apartment turn-key fitout', 'Full home renovation', 'Office interior upgrade'],
    estimatedLaborRate: 'From KSh 850 / fitting item or day rate',
    turnaroundTime: '2 - 5 business days per unit',
    iconName: 'Wrench'
  },
  {
    id: 'tiling-flooring',
    index: '02',
    title: 'Tiling & Flooring',
    subtitle: 'Master tilers for large-format porcelain, marble patterns, SPC vinyl and wet areas',
    description: 'Precision sub-floor leveling, screed checks, laser-guided tile alignment, 45-degree miter cuts for external corners, and epoxy or cementitious grouting with zero lippage.',
    scopeItems: [
      'Subfloor inspection, moisture check and screed preparation',
      'Large format porcelain tiles (60x60, 60x120, 80x80)',
      'Bathroom floor-to-ceiling tiling with slope to waste drainage',
      'Mitered 45-degree edge profiling (shark nose / pencil miter)',
      'Anti-stain epoxy grouting or high-performance cementitious grout'
    ],
    commonProjects: ['Living room floor replacement', 'Master ensuite tiling', 'Kitchen splashback tiling', 'Commercial showroom floors'],
    estimatedLaborRate: 'KSh 380 - 550 / sqm depending on tile format',
    turnaroundTime: '3 - 7 days for average 3-bedroom home',
    iconName: 'Grid'
  },
  {
    id: 'countertops-stone',
    index: '03',
    title: 'Countertops & Stone',
    subtitle: 'Laser template digital measurement, precision factory cutting and on-site stone installation',
    description: 'Turnkey fabrication and seamless installation of engineered quartz, natural granite, marble and sintered stone for kitchen islands, vanity tops, and bar counters.',
    scopeItems: [
      'On-site laser templating once base cabinets are securely anchored',
      'CNC stone cutting, undermount sink cut-outs & hob cut-outs',
      'Mitered 40mm/50mm built-up waterfall edges and pencil bullnose',
      'Stone joint bonding with color-matched epoxy resin',
      'Sealing of natural stones & polishing of exposed edges'
    ],
    commonProjects: ['Kitchen island waterfall countertop', 'Bathroom double-basin stone top', 'Bar & server counter'],
    estimatedLaborRate: 'KSh 3,500 - 5,500 / linear meter (including templating & install)',
    turnaroundTime: '4 - 7 business days from cabinet templating',
    iconName: 'Layers'
  },
  {
    id: 'cabinetry-joinery',
    index: '04',
    title: 'Cabinetry & Joinery',
    subtitle: 'Custom kitchen carcasses, wardrobes, TV media feature units and bespoke joinery',
    description: 'Precision cabinetry installation by seasoned carpenters. We handle carcass leveling, Blum or soft-close hinge calibration, drawer runners, and custom filler scribing to walls.',
    scopeItems: [
      'Site dimension verification and carcass laser leveling',
      'Upper wall unit heavy-duty suspension brackets and anchoring',
      'Full height larder pantry and magic corner pull-out mechanisms',
      'Integrated under-cabinet LED strip lighting routing',
      'Handleless J-pull or architectural designer handle installation'
    ],
    commonProjects: ['Custom fitted kitchen', 'Floor-to-ceiling master bedroom wardrobes', 'Acoustic TV feature unit'],
    estimatedLaborRate: 'KSh 4,500 - 7,000 / running meter installation',
    turnaroundTime: '5 - 10 working days',
    iconName: 'Home'
  },
  {
    id: 'waterproofing',
    index: '05',
    title: 'Waterproofing',
    subtitle: 'Guaranteed leak-free wet areas, balconies, concrete flat roofs and water reservoirs',
    description: 'Certified waterproofing technicians applying polymer-modified cementitious coatings, torch-on membranes, and polyurethane systems with mandatory 24-48hr pond testing.',
    scopeItems: [
      'Substrate crack repair, cove fillet forming at wall-floor junctions',
      'Two-coat polymer cementitious waterproofing in all bathrooms',
      '4mm torch-on polyester-reinforced bituminous membrane on flat roofs',
      '48-hour flood ponding leak verification prior to tiling',
      'Issuance of formal BuildCart workmanship guarantee certificate'
    ],
    commonProjects: ['Bathroom wet zone waterproofing', 'Flat concrete roof terrace', 'Swimming pool & basement wall'],
    estimatedLaborRate: 'KSh 450 - 750 / sqm (inclusive of primer & pond test)',
    turnaroundTime: '2 - 4 days including curing & flood test',
    iconName: 'ShieldCheck'
  },
  {
    id: 'painting-wall-finishes',
    index: '06',
    title: 'Painting & Wall Finishes',
    subtitle: 'Skim-coating wall prep, spray & roller interior emulsions, exterior weather-guarding',
    description: 'Flawless wall finishing starts with rigorous surface preparation: skimming with wall putty, sanding under work lights, applying penetrating primers, and 2-3 coats of premium finish.',
    scopeItems: [
      'Full wall gypsum skim-coating and orbital machine sanding',
      'Application of masonry alkali-resistant primer / sealer',
      'Two to three coats of premium vinyl matt or silk emulsion',
      'Crisp cutting-in at ceilings, door architraves and skirtings',
      'Protective masking of floors, fixtures and cleanup on completion'
    ],
    commonProjects: ['Interior house repainting', 'New construction plaster skim & paint', 'Feature wall textured coating'],
    estimatedLaborRate: 'KSh 120 - 220 / sqm (labor only or materials+labor packages)',
    turnaroundTime: '3 - 6 days for typical 3-bedroom residence',
    iconName: 'Paintbrush'
  },
  {
    id: 'ceilings-gypsum',
    index: '07',
    title: 'Ceilings & Gypsum',
    subtitle: 'Suspended false ceilings, architectural light troughs, shadowlines & soundproofing',
    description: 'Structural framing using heavy-gauge galvanized studs, precision board installation with staggered joints, mesh tape embedding, and 3-coat joint compound finishing.',
    scopeItems: [
      'Laser-level perimeter angle framing and suspended tie rods',
      'Staggered gypsum board hanging with drywall screw dimpling',
      'Concealed LED strip light coves and shadowline aluminum channels',
      'Joint taping with fiberglass scrim and three coats of gypsum filler',
      'Cutouts for recessed downlights, AC grilles, and access panels'
    ],
    commonProjects: ['Modern living room dropped ceiling with cove light', 'Bulkheads & curtain pockets', 'Drywall room partitions'],
    estimatedLaborRate: 'KSh 850 - 1,400 / sqm (framing, board fix & compound finish)',
    turnaroundTime: '4 - 8 days for full house false ceiling',
    iconName: 'Maximize'
  },
  {
    id: 'glass-aluminium',
    index: '08',
    title: 'Glass & Aluminium',
    subtitle: 'Frameless shower cubicles, acoustic office partitions, sliding patio systems & mirrors',
    description: 'Precision glazing installations using toughened safety glass, heavy-duty stainless steel clamps, anti-mildew silicone seals, and smooth sliding aluminium systems.',
    scopeItems: [
      'Accurate plumb & square measurement for custom glass manufacturing',
      'Frameless 10mm tempered glass shower screen & door fitting',
      'Heavy-gauge powder-coated aluminium sliding / folding doors',
      'Smart LED backlit vanity mirror mounting and electrical tie-in',
      'Sanitary grade mildew-resistant translucent silicone sealing'
    ],
    commonProjects: ['Walk-in shower enclosure', 'Living room aluminium sliding glass door', 'Acoustic glass office divider'],
    estimatedLaborRate: 'KSh 4,000 - 8,500 / shower unit or KSh 1,200 / sqm partition',
    turnaroundTime: '3 - 6 days after glass tempering',
    iconName: 'Square'
  }
];
