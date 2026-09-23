export type CategoryId =
  | 'tiles-flooring'
  | 'paints-wall-finishes'
  | 'wall-panels-surfaces'
  | 'bathroom-sanitaryware'
  | 'kitchen-cabinetry'
  | 'countertops-stone'
  | 'waterproofing'
  | 'doors-hardware'
  | 'ceilings-gypsum'
  | 'lighting'
  | 'glass-mirrors-aluminium'
  | 'staircases-balustrades'
  | 'interior-accessories-hardware';

export interface Category {
  id: CategoryId;
  index: string; // '01', '02', etc.
  name: string;
  shortName: string;
  tagline: string;
  subcategories: string[];
  filterAttributes: {
    name: string;
    options: string[];
  }[];
  isCuratedHome: boolean;
  image?: string;
}

export type PricingType = 'fixed' | 'quote_required';

export interface Product {
  id: string;
  categoryId: CategoryId;
  name: string;
  brand: string;
  priceKsh?: number;
  unit: string; // e.g. 'per sqm', 'per 20L drum', 'per piece', 'per running meter'
  pricingType: PricingType;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  leadTime: string;
  description: string;
  specs: {
    material: string;
    finish: string;
    size?: string;
    colour?: string;
    application: string;
    origin?: string;
  };
  supplyAndFixAvailable: boolean;
  supplyAndFixRateKsh?: number;
  supplyAndFixUnit?: string; // e.g. 'per sqm installation'
  image: string;
  customizable?: boolean;
}

export interface SupplyAndFixService {
  id: string;
  index: string; // '01' to '08'
  title: string;
  subtitle: string;
  description: string;
  scopeItems: string[];
  commonProjects: string[];
  estimatedLaborRate: string;
  turnaroundTime: string;
  iconName: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  includeSupplyAndFix: boolean;
  customDimensions?: string;
  notes?: string;
}

export interface BookingSubmission {
  serviceId: string;
  serviceTitle: string;
  fullName: string;
  phone: string;
  email: string;
  county: string;
  estateOrTown: string;
  projectScope: string;
  estimatedAreaOrUnits?: string;
  preferredStartDate: string;
  notes?: string;
}

export interface QuoteSubmission {
  productId?: string;
  productName: string;
  fullName: string;
  phone: string;
  email: string;
  location: string;
  dimensionsOrScope: string;
  includeInstallation: boolean;
  timeline: string;
  notes?: string;
}

export interface PartnerSubmission {
  type: 'supplier' | 'professional';
  fullName: string;
  companyOrTradeName: string;
  phone: string;
  email: string;
  location: string;
  primaryCategoryOrTrade: string;
  yearsOfExperience: string;
  portfolioOrCatalogNotes?: string;
}
