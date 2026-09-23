import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { WhatIsBuildCart } from './components/WhatIsBuildCart';
import { CuratedCategories } from './components/CuratedCategories';
import { SupplyAndFixSection } from './components/SupplyAndFixSection';
import { HowItWorks } from './components/HowItWorks';
import { AudienceSection } from './components/AudienceSection';
import { ShopCatalogue } from './components/ShopCatalogue';
import { ServicesCatalogue } from './components/ServicesCatalogue';
import { TrustAndAbout } from './components/TrustAndAbout';
import { ContactSection } from './components/ContactSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ServiceBookingModal } from './components/ServiceBookingModal';
import { CartDrawer } from './components/CartDrawer';
import { QuoteRequestModal } from './components/QuoteRequestModal';
import { PartnerModal } from './components/PartnerModal';
import { BrandGuideModal } from './components/BrandGuideModal';
import { Footer } from './components/Footer';
import { CategoryId, Product, SupplyAndFixService, CartItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategoryForShop, setSelectedCategoryForShop] = useState<CategoryId | 'all'>('all');
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<SupplyAndFixService | null>(null);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerType, setPartnerType] = useState<'supplier' | 'professional'>('supplier');
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Cart State (Initialized with 1 realistic initial product to show functionality immediately)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-sample-1',
      product: {
        id: 'prod-tile-01',
        categoryId: 'tiles-flooring',
        name: 'Calacatta Imperial Polished Porcelain Floor Tile (60x120cm)',
        brand: 'Ceramica Venti',
        priceKsh: 2850,
        unit: 'per sqm',
        pricingType: 'fixed',
        rating: 4.9,
        reviewsCount: 42,
        inStock: true,
        leadTime: 'Same day or next day in Nairobi & Kiambu',
        description: 'High-definition Italian ink-jet marble veining on rectified full-body porcelain.',
        specs: {
          material: 'Full Body Porcelain',
          finish: 'High Gloss Polished',
          size: '60x120 cm (Rectified Edge)',
          colour: 'Warm White with Gold-Grey Veins',
          application: 'Living Room, Hallway, Master Bedroom',
          origin: 'Italy'
        },
        supplyAndFixAvailable: true,
        supplyAndFixRateKsh: 480,
        supplyAndFixUnit: 'per sqm installation with epoxy grout',
        image: '/src/assets/images/cat_tiles_flooring_1790163945050.jpg'
      },
      quantity: 45,
      includeSupplyAndFix: true,
    }
  ]);

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    includeSupplyAndFix: boolean = false,
    notes?: string
  ) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                includeSupplyAndFix: includeSupplyAndFix || item.includeSupplyAndFix,
                notes: notes || item.notes,
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: 'cart-' + Date.now(),
            product,
            quantity,
            includeSupplyAndFix,
            notes,
          },
        ];
      }
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleToggleSupplyAndFix = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, includeSupplyAndFix: !item.includeSupplyAndFix }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Nav actions
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['shop', 'services', 'supply-and-fix', 'how-it-works', 'about', 'contact', 'home'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch {
        // noop
      }
    } else {
      window.location.hash = tab;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelectFromHome = (catId: CategoryId) => {
    setSelectedCategoryForShop(catId);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (service?: SupplyAndFixService) => {
    setSelectedServiceForBooking(service || null);
    setBookingModalOpen(true);
  };

  const handleOpenPartner = (type: 'supplier' | 'professional') => {
    setPartnerType(type);
    setPartnerModalOpen(true);
  };

  const handleOpenQuote = (product: Product) => {
    setQuoteProduct(product);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F4FA] text-[#001440]">
      {/* Top Navigation Bar exactly matching requested layout */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={navigateTo}
        cartCount={cartItems.length}
        openCart={() => setCartOpen(true)}
        openBookingModal={() => handleOpenBooking()}
        openBrandModal={() => setBrandModalOpen(true)}
        openPartnerModal={handleOpenPartner}
        onSearch={(q) => {
          setGlobalSearchQuery(q);
          navigateTo('shop');
        }}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* 1. Hero Section */}
            <Hero
              onShopClick={() => navigateTo('shop')}
              onBookServiceClick={() => handleOpenBooking()}
              onSupplyAndFixClick={() => navigateTo('supply-and-fix')}
            />

            {/* 2. The Problem Section */}
            <ProblemSection onExploreClick={() => navigateTo('how-it-works')} />

            {/* 3. What is BuildCart? Section */}
            <WhatIsBuildCart
              onShopClick={() => navigateTo('shop')}
              onFixClick={() => navigateTo('services')}
              onBuildClick={() => navigateTo('about')}
            />

            {/* 4. Curated Category Cards */}
            <CuratedCategories
              onSelectCategory={handleCategorySelectFromHome}
              onViewAllProducts={() => {
                setSelectedCategoryForShop('all');
                navigateTo('shop');
              }}
            />

            {/* 5. Supply & Fix Section */}
            <SupplyAndFixSection
              onBookService={() => handleOpenBooking()}
              onExploreServices={() => navigateTo('supply-and-fix')}
            />

            {/* 6. How It Works (5 Steps) */}
            <HowItWorks
              onShopClick={() => navigateTo('shop')}
              onBookServiceClick={() => handleOpenBooking()}
            />

            {/* 7. Audience-Specific Sections */}
            <AudienceSection
              onShopClick={() => navigateTo('shop')}
              onBookServiceClick={() => handleOpenBooking()}
              onPartnerModal={handleOpenPartner}
            />

            {/* 8. Trust & About Preview */}
            <TrustAndAbout onExploreShop={() => navigateTo('shop')} />
          </>
        )}

        {activeTab === 'shop' && (
          <ShopCatalogue
            selectedCategoryId={selectedCategoryForShop}
            initialSearchQuery={globalSearchQuery}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p, includeFix) => handleAddToCart(p, 1, includeFix)}
            onRequestQuote={(p) => handleOpenQuote(p)}
          />
        )}

        {(activeTab === 'services' || activeTab === 'supply-and-fix') && (
          <ServicesCatalogue
            onBookService={(s) => handleOpenBooking(s)}
            onShopMaterials={() => navigateTo('shop')}
          />
        )}

        {activeTab === 'how-it-works' && (
          <div className="py-6">
            <HowItWorks
              onShopClick={() => navigateTo('shop')}
              onBookServiceClick={() => handleOpenBooking()}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <ProblemSection onExploreClick={() => navigateTo('supply-and-fix')} />
            </div>
          </div>
        )}

        {activeTab === 'audiences' && (
          <div className="py-6">
            <AudienceSection
              onShopClick={() => navigateTo('shop')}
              onBookServiceClick={() => handleOpenBooking()}
              onPartnerModal={handleOpenPartner}
            />
          </div>
        )}

        {activeTab === 'about' && (
          <TrustAndAbout onExploreShop={() => navigateTo('shop')} />
        )}

        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        openBrandModal={() => setBrandModalOpen(true)}
        openPartnerModal={handleOpenPartner}
        openBookingModal={() => handleOpenBooking()}
      />

      {/* Modals & Slide-overs */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty, fix, notes) => handleAddToCart(p, qty, fix, notes)}
        onRequestQuote={(p) => handleOpenQuote(p)}
      />

      <QuoteRequestModal
        product={quoteProduct}
        isOpen={quoteModalOpen}
        onClose={() => {
          setQuoteModalOpen(false);
          setQuoteProduct(null);
        }}
      />

      <ServiceBookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setSelectedServiceForBooking(null);
        }}
        initialService={selectedServiceForBooking}
      />

      <PartnerModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
        initialType={partnerType}
      />

      <BrandGuideModal
        isOpen={brandModalOpen}
        onClose={() => setBrandModalOpen(false)}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onToggleSupplyAndFix={handleToggleSupplyAndFix}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
