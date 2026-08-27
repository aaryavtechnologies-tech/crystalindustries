import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Mail,
  PackageCheck,
  Sparkles,
  ShieldCheck,
  MapPin,
  Flame,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { WHATSAPP_URL } from "@/components/WhatsAppButton";
import { COMPANY } from "@/data/company";
import { allProducts, productCategories, ProductItem } from "@/data/products";
import heroImg from "@/assets/hero-spices.jpg";
import directSourcing from "@/assets/features/direct-sourcing.jpg";
import globalReach from "@/assets/features/global-reach.jpg";
import qualityAssured from "@/assets/features/quality-assured.jpg";
import groundSpices from "@/assets/products/ground-spices.jpg";
import seeds from "@/assets/products/seeds.jpg";

import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import Counter from "@/components/Counter";
import ProductCard from "@/components/ProductCard";
import ProductQuickView from "@/components/ProductQuickView";

const features = [
  {
    image: directSourcing,
    title: "Direct Market Sourcing",
    desc: "Direct procurement from primary growers for unmatched freshness and lot consistency.",
  },
  {
    image: globalReach,
    title: "Bulk & Container Export Ready",
    desc: "Wholesale volumes, customized multiwall packing options, fumigation and complete container logistics for domestic and international buyers.",
  },
  {
    image: qualityAssured,
    title: "Purity & Laboratory Assured",
    desc: "Rigorous quality checks for high volatile oil content, natural aroma, low moisture, sortex purity, and absence of adulterants.",
  },
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Pick top 8 featured products
  const featuredProducts = allProducts.filter((p) => p.popular).slice(0, 8);

  const handleOpenQuickView = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden pb-16" style={{ paddingTop: "calc(var(--header-h) + 2rem)" }}>
        <img
          src={heroImg}
          alt="Premium Indian Spices from Crystal Industries"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 hero-overlay" />

        {/* Floating Spice Decors */}
        <motion.img
          src={groundSpices}
          alt="Ground spice bowls"
          className="spice-float absolute right-6 top-32 hidden w-44 lg:w-60 rounded-full border-8 border-background/80 shadow-2xl md:block object-cover"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          decoding="async"
          loading="lazy"
          transition={{ delay: 0.4 }}
        />
        <motion.img
          src={seeds}
          alt="Indian agricultural seeds"
          className="spice-float-slow absolute bottom-16 right-24 hidden w-36 lg:w-48 rounded-full border-8 border-background/80 shadow-2xl lg:block object-cover"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        />

        <div className="relative z-10 px-4 sm:px-6 md:px-8 w-full">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary border border-primary/25 text-xs uppercase font-bold tracking-widest mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Thane, Maharashtra • Wholesale & Global Export</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-foreground mb-6 leading-[1.12]"
            >
              {COMPANY.name}
              <span className="block gold-gradient-text mt-1">
                Pure Indian Spice & Agro Supply
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl text-foreground font-medium max-w-2xl mb-8 leading-relaxed bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-sm"
            >
              {COMPANY.tagline} Direct access to 69+ whole spices, ground powders, agricultural seeds,
              grains, and dehydrated products with real batch images and spot pricing on request.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm tracking-wide bg-primary text-primary-foreground hover:opacity-90 active:scale-98 transition-all shadow-lg"
              >
                Explore 69+ Products <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm tracking-wide bg-[#25D366] text-white hover:bg-[#20ba5a] active:scale-98 transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Price Inquiry</span>
              </a>
            </motion.div>

            {/* Micro Trust Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-8 pt-6 border-t border-border/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-muted-foreground"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Direct Wholesale</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Export Quality Sortex</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Samples Available</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Numerical Trust Highlights */}
      <section className="section-padding bg-secondary/40 !py-12 border-y border-border/70">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <Counter end={69} suffix="+" label="Spices & Agro Commodities" />
            <Counter end={9} suffix="" label="Product Categories" />
            <Counter end={24} suffix="h" label="Quotation Response Time" />
            <Counter end={100} suffix="%" label="Bulk & Wholesale Focus" />
          </div>
        </div>
      </section>

      {/* Featured Products Section with Real Images */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Top Sourced Items
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mt-1">
                Featured <span className="gold-gradient-text">Spices & Commodities</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl">
                High-demand export spices and seeds sourced directly from Maharashtra.
                Click any product to view full specifications or get instant WhatsApp pricing.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-accent transition-colors"
            >
              <span>View All 69+ Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onQuickView={handleOpenQuickView}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:opacity-90 transition-all shadow-md"
            >
              Browse Complete 9-Category Catalog <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9 Product Categories Grid Showcase */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            subtitle="Diverse Catalogue"
            title="Explore By Product Category"
            description="From whole and cold-ground spices to oil seeds, millets, dehydrated flakes, and medicinal herbs."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((cat, i) => (
              <AnimatedSection key={cat.id} delay={i * 0.08}>
                <Link
                  to="/products"
                  className="group block rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 h-full flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-serif text-lg font-bold group-hover:text-amber-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-white/80">{cat.products.length} Products Available</p>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                      {cat.shortDesc}
                    </p>

                    <div className="pt-3 border-t border-border/70 flex items-center justify-between text-xs font-semibold text-primary">
                      <span>View Products</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Feature Cards */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            subtitle="Why Partner With Us"
            title="Reliable Indian Spice & Agro Supply"
            description="Crystal Industries provides clear communication, direct sourcing, and dependable dispatch timelines for serious traders and food companies."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className="glass-card overflow-hidden group hover:border-primary/50 transition-all h-full rounded-2xl">
                  <div className="h-52 overflow-hidden bg-muted">
                    <img
                      src={f.image}
                      alt={f.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="section-padding bg-secondary/50 border-t border-border">
        <AnimatedSection className="container mx-auto text-center max-w-2xl px-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <PackageCheck className="w-6 h-6 text-primary" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
            Need Live Product Photos <span className="gold-gradient-text">& Container Pricing?</span>
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground mb-8 leading-relaxed">
            Contact {COMPANY.name} for available spice grades, batch photos, packing specifications,
            and current wholesale market quotations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-primary text-primary-foreground hover:opacity-90 active:scale-98 transition-all shadow-md"
            >
              Get an Official Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-xs sm:text-sm border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
            >
              <Mail className="w-4 h-4" /> Email: {COMPANY.email}
            </a>
          </div>
        </AnimatedSection>
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

export default Index;
