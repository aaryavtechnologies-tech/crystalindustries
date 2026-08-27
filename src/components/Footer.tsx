import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowUp,
  ShieldCheck,
  Award,
  Globe2,
  ChevronRight
} from "lucide-react";
import { COMPANY, WHATSAPP_MESSAGE } from "@/data/company";
import { productCategories } from "@/data/products";
import Logo from "@/components/Logo";

const Footer: React.FC = () => {
  const whatsappUrl = `https://wa.me/${COMPANY.phoneHref.replace("+", "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-emerald-950 text-white border-t border-emerald-800/60 overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Value Proposition Strip */}
      <div className="border-b border-emerald-800/40 bg-emerald-900/40 py-8 px-4">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">APMC Market Vashi</p>
              <p className="text-[11px] text-white/70">Direct sourcing from premier trade hub</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">100% Pure & Machine Cleaned</p>
              <p className="text-[11px] text-white/70">Sortex purity & laboratory tested</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Globe2 className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Domestic & Global Supply</p>
              <p className="text-[11px] text-white/70">Container & bulk packaging ready</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Wholesale Rates On Request</p>
              <p className="text-[11px] text-white/70">Fast turnaround on quotes & samples</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer */}
      <div className="container mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="default" theme="light" />

            <p className="text-xs text-white/75 leading-relaxed pt-2 max-w-sm">
              {COMPANY.name} is a trusted supplier and exporter of authentic Indian whole spices,
              ground powders, agricultural seeds, millets, dehydrated products, and herbal botanicals.
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1.5 rounded-lg bg-emerald-900/80 border border-emerald-700/50 text-[11px] text-amber-300 font-medium">
                {COMPANY.license}
              </span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba5a] transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Wholesale Desk</span>
              </a>
            </div>
          </div>

          {/* Column 2: Product Catalogue Categories (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-amber-300">
              Product Categories
            </h4>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              {productCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to="/products"
                  className="text-white/75 hover:text-amber-300 transition-colors flex items-center gap-1 group py-0.5 truncate"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500 group-hover:text-amber-400 transition-colors shrink-0" />
                  <span className="truncate">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-amber-300">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2 pt-1 text-xs text-white/75">
              <Link to="/" className="hover:text-amber-300 transition-colors">Home Overview</Link>
              <Link to="/about" className="hover:text-amber-300 transition-colors">About Our Story</Link>
              <Link to="/products" className="hover:text-amber-300 transition-colors">Complete Catalog</Link>
              <Link to="/services" className="hover:text-amber-300 transition-colors">Export & Packing</Link>
              <Link to="/why-us" className="hover:text-amber-300 transition-colors">Why Waris Brother</Link>
              <Link to="/contact" className="hover:text-amber-300 transition-colors">Request a Quote</Link>
            </div>
          </div>

          {/* Column 4: Contact & Office (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-amber-300">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-3 pt-1 text-xs text-white/80">
              <a
                href={`tel:${COMPANY.phoneHref}`}
                className="flex items-center gap-2 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COMPANY.phone}</span>
              </a>

              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2 hover:text-amber-300 transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COMPANY.email}</span>
              </a>

              <div className="flex items-start gap-2 text-[11px] leading-snug">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{COMPANY.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Golden Gradient Divider */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} <strong className="text-white">{COMPANY.name}</strong>. All rights reserved.
          </p>

          <p className="text-[11px] text-white/40">
            APMC Market Vashi • Navi Mumbai • Maharashtra, India
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/90 hover:bg-emerald-800 text-white/80 hover:text-white transition-all border border-emerald-700/50"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
