import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, Sparkles, MapPin, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY } from "@/data/company";
import Logo from "@/components/Logo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products & Catalogue" },
  { to: "/services", label: "Services" },
  { to: "/why-us", label: "Why Choose Us" },
  { to: "/contact", label: "Contact & Quote" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();



  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Creative Top Announcement Bar */}
      <div className="bg-emerald-950 text-white/90 text-[11px] py-1.5 px-4 border-b border-emerald-800/40 hidden sm:block">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-amber-300 font-semibold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400" /> Thane, Maharashtra
            </span>
            <span className="text-white/40">•</span>
            <span className="text-white/80 hidden md:inline">
              Direct Indian Spices, Seeds & Agro Commodity Export
            </span>
          </div>

          <div className="flex items-center gap-4 font-medium">
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navbar */}
      <nav
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-border shadow-md py-2.5"
            : "bg-background/80 backdrop-blur-md border-border/70 py-3 md:py-4"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
          {/* Brand Logo */}
          <Logo variant="default" />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((l) => {
              const isActive = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-3.5 py-2 text-xs font-semibold tracking-wide rounded-lg transition-all ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/products"
              className="p-2.5 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </Link>



            <Link
              to="/contact"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 active:scale-98 transition-all shadow-sm"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">


            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg border border-border text-foreground hover:bg-muted focus:outline-none"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Over Menu / Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-b border-border bg-background/98 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex flex-col px-5 py-5 space-y-4">
              {/* Mobile Navigation List */}
              <div className="flex flex-col space-y-1">
                {navLinks.map((l) => {
                  const isActive = location.pathname === l.to;
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground font-bold shadow-sm"
                          : "text-foreground hover:bg-muted/60"
                      }`}
                    >
                      <span>{l.label}</span>
                      <ArrowRight className={`w-4 h-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    </Link>
                  );
                })}
              </div>



              {/* Mobile Address Info */}
              <div className="pt-2 text-[11px] text-muted-foreground flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>{COMPANY.address}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
