import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productCategories, allProducts, ProductItem } from "@/data/products";
import { COMPANY } from "@/data/company";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import ProductQuickView from "@/components/ProductQuickView";
import productsImg from "@/assets/spices-products.jpg";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  IndianRupee,
  Search,
  SlidersHorizontal,
  Sparkles,
  Layers,
  X,
  PackageCheck,
  PhoneCall,
  Check
} from "lucide-react";

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [onlyPopular, setOnlyPopular] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false);

  // Active Category Object
  const currentCategoryObj = useMemo(() => {
    return productCategories.find((c) => c.name === activeCategory);
  }, [activeCategory]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      // Popular filter
      const matchesPopular = !onlyPopular || product.popular;

      // Search query
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.origin.toLowerCase().includes(query) ||
        product.grade.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesPopular && matchesSearch;
    });
  }, [activeCategory, onlyPopular, searchQuery]);

  const handleOpenQuickView = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="page-top">
      {/* Hero Header */}
      <section className="relative h-64 sm:h-72 md:h-80 flex items-center justify-center overflow-hidden">
        <img
          src={productsImg}
          alt="Crystal Industries Spices and Agro Commodities"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-black/40 text-amber-400 border border-amber-500/30 mb-4 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Complete Wholesale & Export Catalog
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-lg"
          >
            Spice & Agro <span className="text-amber-400">Product Catalogue</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto drop-shadow-md font-medium"
          >
            Browse all 69+ authentic whole spices, cold-ground powders, agricultural seeds, grains,
            and herbs from APMC Market Vashi. Real photography, grades and wholesale rates on request.
          </motion.p>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="section-padding !py-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Search & Filter Toolbar */}
          <div className="glass-card p-4 md:p-6 mb-8 rounded-2xl shadow-sm border border-border">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Live Search Input */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search spices, seeds, grains (e.g. Cumin, Turmeric, Basmati, Garlic)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Chips */}
              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setOnlyPopular(!onlyPopular)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    onlyPopular
                      ? "bg-amber-500 text-slate-950 border-amber-500 shadow-sm"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Top Export Picks
                </button>

                <div className="text-xs text-muted-foreground whitespace-nowrap pl-2 border-l border-border hidden sm:block">
                  Showing <strong className="text-foreground">{filteredProducts.length}</strong> items
                </div>
              </div>
            </div>

            {/* Scrollable Category Navigation Bar (Mobile & Desktop Friendly) */}
            <div className="mt-5 pt-5 border-t border-border/70">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
                {/* "All" button */}
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 snap-start border ${
                    activeCategory === "All"
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-background/80 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>All Categories</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === "All" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {allProducts.length}
                  </span>
                </button>

                {/* Categories */}
                {productCategories.map((cat) => {
                  const isActive = activeCategory === cat.name;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 snap-start border ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-background/80 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {cat.products.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Category Spotlight Banner (When a specific category is selected) */}
          {currentCategoryObj && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={currentCategoryObj.name}
              className="glass-card overflow-hidden mb-8 border border-border/80"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-72 h-44 md:h-52 shrink-0 relative overflow-hidden bg-muted">
                  <img
                    src={currentCategoryObj.image}
                    alt={currentCategoryObj.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white px-2.5 py-1 rounded bg-black/40 backdrop-blur-sm">
                    {currentCategoryObj.products.length} Products
                  </span>
                </div>

                <div className="p-5 md:p-7 flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                    Category Overview
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-1 mb-2">
                    {currentCategoryObj.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed mb-4">
                    {currentCategoryObj.shortDesc}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-primary">
                    <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-lg">
                      <IndianRupee className="w-3.5 h-3.5" />
                      <span>{currentCategoryObj.priceNote}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      • Direct APMC Vashi Dispatch • Container & Bag Sizing
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onQuickView={handleOpenQuickView}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center max-w-md mx-auto my-12">
              <PackageCheck className="w-12 h-12 text-muted-foreground mx-auto mb-3 stroke-[1.5]" />
              <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                No matching products found
              </h3>
              <p className="text-xs text-muted-foreground mb-5">
                We couldn't find any products matching "{searchQuery}". Try searching for another spice or reset the filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  setOnlyPopular(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Bottom Quotation / Sample Request Callout */}
          <AnimatedSection className="mt-16">
            <div className="relative rounded-2xl overflow-hidden glass-card p-8 md:p-12 text-center border border-primary/20 bg-gradient-to-b from-card to-primary/5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <PhoneCall className="w-6 h-6 text-primary" />
              </div>

              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
                Need Exact <span className="gold-gradient-text">Specifications, Certificates & Bulk Pricing?</span>
              </h3>

              <p className="text-muted-foreground text-xs sm:text-sm mb-6 max-w-xl mx-auto leading-relaxed">
                Send us your target spice list, desired quantity, and destination port. {COMPANY.name} will immediately share COA lab certificates, container packing specs, and current market rates.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:opacity-90 transition-all shadow-md"
                >
                  Request Official Quotation <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${COMPANY.phoneHref}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm font-medium hover:border-primary/50 transition-all"
                >
                  Direct Call: {COMPANY.phone}
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick View Modal */}
      <ProductQuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => {
          setIsQuickViewOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
};

export default Products;
