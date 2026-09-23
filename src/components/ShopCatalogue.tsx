import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Check, Plus, ArrowRight, Star, Wrench, RotateCcw, X } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { CategoryId, Product } from '../types';

interface ShopCatalogueProps {
  selectedCategoryId?: CategoryId | 'all';
  initialSearchQuery?: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, includeSupplyAndFix: boolean) => void;
  onRequestQuote: (product: Product) => void;
  onBookServiceForCategory?: (categoryId: string) => void;
}

export const ShopCatalogue: React.FC<ShopCatalogueProps> = ({
  selectedCategoryId = 'all',
  initialSearchQuery = '',
  onSelectProduct,
  onAddToCart,
  onRequestQuote,
  onBookServiceForCategory,
}) => {
  const [currentCategory, setCurrentCategory] = useState<CategoryId | 'all'>(selectedCategoryId);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [priceMax, setPriceMax] = useState<number>(50000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlySupplyAndFix, setOnlySupplyAndFix] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category prop if updated from outside
  React.useEffect(() => {
    if (selectedCategoryId) {
      setCurrentCategory(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  React.useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Extract unique brands and finishes for filters
  const allBrands = useMemo(() => {
    const brands = new Set<string>();
    PRODUCTS.forEach((p) => brands.add(p.brand));
    return Array.from(brands);
  }, []);

  const allFinishes = useMemo(() => {
    const finishes = new Set<string>();
    PRODUCTS.forEach((p) => {
      if (p.specs.finish) finishes.add(p.specs.finish.split(' ')[0]);
    });
    return Array.from(finishes);
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category match
      if (currentCategory !== 'all' && p.categoryId !== currentCategory) return false;

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.specs.material.toLowerCase().includes(q) ||
          p.specs.application.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // In Stock
      if (onlyInStock && !p.inStock) return false;

      // Supply & Fix available
      if (onlySupplyAndFix && !p.supplyAndFixAvailable) return false;

      // Brand
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;

      // Finish
      if (selectedFinish !== 'all' && !p.specs.finish.toLowerCase().includes(selectedFinish.toLowerCase())) return false;

      // Price filter (skip custom quote items)
      if (p.priceKsh && p.priceKsh > priceMax) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return (a.priceKsh || 0) - (b.priceKsh || 0);
      if (sortBy === 'price-desc') return (b.priceKsh || 0) - (a.priceKsh || 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [currentCategory, searchQuery, onlyInStock, onlySupplyAndFix, selectedBrand, selectedFinish, priceMax, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === currentCategory);

  const resetFilters = () => {
    setSearchQuery('');
    setPriceMax(50000);
    setOnlyInStock(false);
    setOnlySupplyAndFix(false);
    setSelectedBrand('all');
    setSelectedFinish('all');
    setSortBy('featured');
    setCurrentCategory('all');
  };

  const activeFiltersCount = (currentCategory !== 'all' ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (onlySupplyAndFix ? 1 : 0) +
    (selectedBrand !== 'all' ? 1 : 0) +
    (selectedFinish !== 'all' ? 1 : 0) +
    (priceMax < 50000 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="py-6 sm:py-10 bg-[#F1F4FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 truncate">
            <span>BuildCart</span>
            <span>/</span>
            <span>Materials Catalogue</span>
            {activeCategoryObj && (
              <>
                <span>/</span>
                <span className="text-[#001440] font-semibold truncate">{activeCategoryObj.name}</span>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001440] font-['Cabinet_Grotesk'] tracking-tight">
                {activeCategoryObj ? activeCategoryObj.name : 'All Building & Finishing Materials'}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
                {activeCategoryObj
                  ? activeCategoryObj.tagline
                  : 'Shop verified Kenyan construction products with direct Supply & Fix installation services.'}
              </p>
            </div>

            {/* Quick stats & Clear */}
            <div className="flex items-center justify-between sm:justify-end gap-3 pt-1">
              <span className="text-xs text-slate-500 font-medium tabular-nums">
                Showing {filteredProducts.length} materials
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#001440] hover:underline flex items-center gap-1 font-semibold cursor-pointer min-h-[36px]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All ({activeFiltersCount})</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Quick Category Select Dropdown */}
        <div className="sm:hidden mb-4">
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Choose Category:</label>
          <select
            value={currentCategory}
            onChange={(e) => setCurrentCategory(e.target.value as any)}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#001440] focus:ring-2 focus:ring-[#001440] min-h-[44px]"
          >
            <option value="all">All 13 Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.index}. {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* 13 Categories Scrollable Bar for Tablet & Desktop */}
        <div className="hidden sm:block mb-6 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => setCurrentCategory('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap min-h-[38px] ${
                currentCategory === 'all'
                  ? 'bg-[#001440] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Categories (13)
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCurrentCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 min-h-[38px] ${
                  currentCategory === cat.id
                    ? 'bg-[#001440] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span className={currentCategory === cat.id ? 'text-[#FFC30B]' : 'text-slate-400'}>
                  {cat.index}
                </span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories pill bar when a specific category is active */}
        {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
          <div className="mb-6 p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="font-bold text-[#001440] shrink-0">Sub-categories:</span>
            <div className="flex items-center gap-1.5 text-slate-600 min-w-max">
              {activeCategoryObj.subcategories.map((sub, i) => (
                <span
                  key={i}
                  className="bg-[#F1F4FA] px-2.5 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap hover:bg-[#FFC30B]/20 cursor-pointer min-h-[32px] flex items-center"
                  onClick={() => setSearchQuery(sub.split(' ')[0])}
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Main Grid with Filter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Universal Filters Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-sm font-bold text-[#001440] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#FFC30B]" />
                  <span>Universal Filters</span>
                </span>
                <button
                  onClick={resetFilters}
                  className="text-xs text-slate-500 hover:text-[#001440] cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              {/* Search in catalogue */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Search Material</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tile, paint, sink, quartz..."
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#001440]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Supply & Fix Toggle Filter */}
              <div className="pt-2">
                <label className="flex items-center justify-between cursor-pointer p-3 rounded-xl bg-[#001440]/5 border border-[#001440]/10 hover:bg-[#001440]/10 transition-colors">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#001440] flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-[#001440]" />
                      <span>Supply &amp; Fix Ready</span>
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Has verified installation add-on
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={onlySupplyAndFix}
                    onChange={(e) => setOnlySupplyAndFix(e.target.checked)}
                    className="w-4 h-4 rounded text-[#001440] focus:ring-[#FFC30B] accent-[#001440]"
                  />
                </label>
              </div>

              {/* In Stock only toggle */}
              <div>
                <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                  <span className="font-medium">In Stock for Immediate Dispatch</span>
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 rounded text-[#001440] accent-[#001440]"
                  />
                </label>
              </div>

              {/* Max Price Slider */}
              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Max Price</span>
                  <span className="text-[#001440] tabular-nums">
                    Up to KSh {priceMax.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#001440] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>KSh 1,000</span>
                  <span>KSh 50,000+</span>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="border-t border-slate-100 pt-4">
                <label className="text-xs font-bold text-slate-700 block mb-2">Brand / Manufacturer</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-[#F1F4FA] border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#001440]"
                >
                  <option value="all">All Brands ({allBrands.length})</option>
                  {allBrands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Finish Filter */}
              <div className="border-t border-slate-100 pt-4">
                <label className="text-xs font-bold text-slate-700 block mb-2">Surface Finish</label>
                <select
                  value={selectedFinish}
                  onChange={(e) => setSelectedFinish(e.target.value)}
                  className="w-full bg-[#F1F4FA] border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#001440]"
                >
                  <option value="all">All Finishes</option>
                  {allFinishes.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Product Cards Grid & Controls */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Mobile filter toggle & Sort bar */}
            <div className="flex items-center justify-between bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs gap-2">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 text-xs font-bold text-[#001440] bg-[#F1F4FA] hover:bg-[#FFC30B]/20 px-3.5 py-2 rounded-lg border border-slate-200 min-h-[38px]"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-600 ml-auto">
                <span className="font-semibold text-slate-700 hidden xs:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#F1F4FA] border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-medium focus:outline-none min-h-[38px]"
                >
                  <option value="featured">Featured / Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Mobile Full Filter Modal Drawer */}
            {mobileFilterOpen && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
                <div className="w-full max-w-sm bg-white h-full flex flex-col justify-between overflow-y-auto p-5 space-y-5 animate-in slide-in-from-right duration-200">
                  <div className="space-y-5">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-[#FFC30B]" />
                        <span className="font-bold text-base text-[#001440]">Filter Materials</span>
                      </div>
                      <button
                        onClick={() => setMobileFilterOpen(false)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg min-h-[36px]"
                        aria-label="Close filters"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Search inside filter */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">Search Material</label>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tile, paint, sink, quartz..."
                        className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3 py-2.5 text-sm"
                      />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3 pt-1">
                      <label className="flex items-center justify-between p-3 rounded-xl bg-[#001440]/5 border border-[#001440]/10 cursor-pointer min-h-[44px]">
                        <span className="text-xs font-bold text-[#001440] flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5 text-[#001440]" />
                          <span>Supply &amp; Fix Ready Only</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={onlySupplyAndFix}
                          onChange={(e) => setOnlySupplyAndFix(e.target.checked)}
                          className="w-4 h-4 accent-[#001440]"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 cursor-pointer min-h-[44px]">
                        <span>In Stock for Immediate Dispatch</span>
                        <input
                          type="checkbox"
                          checked={onlyInStock}
                          onChange={(e) => setOnlyInStock(e.target.checked)}
                          className="w-4 h-4 accent-[#001440]"
                        />
                      </label>
                    </div>

                    {/* Max Price Slider */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                        <span>Max Price:</span>
                        <span className="text-[#001440]">Up to KSh {priceMax.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="1000"
                        max="50000"
                        step="1000"
                        value={priceMax}
                        onChange={(e) => setPriceMax(Number(e.target.value))}
                        className="w-full accent-[#001440]"
                      />
                    </div>

                    {/* Brand */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">Brand</label>
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3 py-2.5 text-xs min-h-[44px]"
                      >
                        <option value="all">All Brands ({allBrands.length})</option>
                        {allBrands.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    {/* Finish */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">Finish</label>
                      <select
                        value={selectedFinish}
                        onChange={(e) => setSelectedFinish(e.target.value)}
                        className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3 py-2.5 text-xs min-h-[44px]"
                      >
                        <option value="all">All Finishes</option>
                        {allFinishes.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-200 flex gap-2">
                    <button
                      onClick={resetFilters}
                      className="flex-1 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl min-h-[44px]"
                    >
                      Reset All
                    </button>
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="flex-1 py-3 text-xs font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#eab309] rounded-xl min-h-[44px]"
                    >
                      Show Results ({filteredProducts.length})
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Products List / Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-slate-200 shadow-sm space-y-4">
                <p className="text-sm sm:text-base text-slate-600 font-medium">
                  No materials match the current filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 text-xs font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#eab309] rounded-xl cursor-pointer min-h-[40px]"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => {
                  const isQuote = product.pricingType === 'quote_required';

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-[#001440] transition-all flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Product Image Box */}
                      <div
                        onClick={() => onSelectProduct(product)}
                        className="relative h-44 sm:h-48 bg-[#F9F9F8] overflow-hidden cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />

                        {/* Top Metadata */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#001440] px-2 py-0.5 rounded shadow-xs backdrop-blur-xs">
                            {product.brand}
                          </span>
                          {product.supplyAndFixAvailable && (
                            <span className="text-[10px] font-bold bg-[#FFC30B] text-[#001440] px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                              <Wrench className="w-2.5 h-2.5" />
                              <span>Supply &amp; Fix</span>
                            </span>
                          )}
                        </div>

                        {/* Rating overlay bottom left */}
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded">
                          <Star className="w-3 h-3 fill-[#FFC30B] text-[#FFC30B]" />
                          <span className="font-semibold">{product.rating}</span>
                          <span className="text-slate-300 text-[10px]">({product.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Product Content Details */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] text-slate-500 mb-1 flex items-center gap-1.5 truncate">
                            <span>{product.specs.finish}</span>
                            <span>·</span>
                            <span>{product.specs.material}</span>
                          </div>

                          <h3
                            onClick={() => onSelectProduct(product)}
                            className="text-sm font-bold text-[#001440] hover:text-[#001440] cursor-pointer line-clamp-2 leading-snug mb-2"
                            title={product.name}
                          >
                            {product.name}
                          </h3>

                          {/* Price or Request Quote state */}
                          <div className="my-2">
                            {isQuote ? (
                              <div className="bg-[#001440]/5 border border-[#001440]/10 rounded-lg p-2 text-center">
                                <span className="text-xs font-bold text-[#001440] block">
                                  Bespoke / Custom Sizing
                                </span>
                                <span className="text-[10px] text-slate-600 block">
                                  Request site quote with dimensions
                                </span>
                              </div>
                            ) : (
                              <div>
                                <div className="text-lg font-black text-[#001440] font-['Cabinet_Grotesk'] tabular-nums leading-none">
                                  KSh {product.priceKsh?.toLocaleString()}
                                </div>
                                <span className="text-[11px] text-slate-500 font-medium">
                                  {product.unit}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Supply & Fix Callout if available */}
                          {product.supplyAndFixAvailable && (
                            <div className="text-[11px] bg-[#F1F4FA] p-2 rounded-lg text-slate-700 space-y-0.5 border border-slate-200/80 mb-3">
                              <div className="font-semibold text-[#001440] flex items-center justify-between text-[11px]">
                                <span>Installation:</span>
                                <span className="text-[#001440] font-bold">
                                  + KSh {product.supplyAndFixRateKsh?.toLocaleString()}
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-500 truncate">
                                {product.supplyAndFixUnit}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action buttons (Add to Cart vs Request Quote) */}
                        <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                          {isQuote ? (
                            <button
                              onClick={() => onRequestQuote(product)}
                              className="w-full py-2.5 px-3 text-xs font-bold text-white bg-[#001440] hover:bg-[#001e5c] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 min-h-[42px] active:scale-[0.98]"
                            >
                              <span>Request a Quote</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => onSelectProduct(product)}
                                className="flex-1 py-2.5 px-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer text-center truncate min-h-[42px]"
                              >
                                View Specs
                              </button>
                              <button
                                onClick={() => onAddToCart(product, false)}
                                className="flex-1 py-2.5 px-2.5 text-xs font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#eab309] rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1 truncate min-h-[42px] active:scale-[0.98]"
                              >
                                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>Add to Cart</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
