import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Phone, MapPin, Package, Award, CheckCircle2, ShieldCheck } from "lucide-react";
import { ProductItem } from "@/data/products";
import { COMPANY } from "@/data/company";

interface ProductQuickViewProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Reset image state when product changes
  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
  }, [product]);

  if (!isOpen || !product) return null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Whole Spices": return "from-orange-500 to-red-600";
      case "Ground Spices": return "from-yellow-400 to-amber-600";
      case "Seeds": return "from-amber-600 to-orange-700";
      case "Herbs & Seasonings": return "from-green-500 to-emerald-700";
      case "Dehydrated Products": return "from-stone-400 to-stone-600";
      case "Grains & Cereals": return "from-yellow-200 to-yellow-500";
      case "Dried Fruits & Nuts": return "from-orange-300 to-amber-700";
      case "Coffee & Cocoa": return "from-orange-800 to-stone-800";
      case "Coconut Products": return "from-slate-100 to-slate-300";
      default: return "from-primary to-primary/70";
    }
  };

  const initials = product.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  const whatsappMessage = encodeURIComponent(
    `Hello Crystal Industries, I would like to request an official quotation & specifications for:\n\n*Product:* ${product.name}\n*Category:* ${product.category}\n*Grade:* ${product.grade}\n*Origin:* ${product.origin}\n*Packaging Required:* Bulk / Container\n\nPlease send wholesale FOB/CIF rates.`
  );
  const whatsappUrl = `https://wa.me/${COMPANY.phoneHref.replace("+", "")}?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 hover:bg-muted text-foreground transition-colors border border-border"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Image Column */}
            <div className="relative h-64 sm:h-full min-h-[260px] bg-muted overflow-hidden">
              {imgError ? (
                <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(product.category)} flex items-center justify-center p-6 text-center`}>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl font-serif font-bold text-white/40 mb-3">{initials}</span>
                    <span className="text-xl font-semibold text-white leading-tight drop-shadow-md">{product.name}</span>
                  </div>
                </div>
              ) : (
                <>
                  {!imgLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground font-medium">Loading...</span>
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    onLoad={() => setImgLoaded(true)}
                    onError={() => {
                      setImgError(true);
                      setImgLoaded(true);
                    }}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      imgLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground mb-1.5 shadow-sm">
                  {product.category}
                </span>
                <p className="text-xs text-white/80 flex items-center gap-1 drop-shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Premium Quality Certified
                </p>
              </div>
            </div>

            {/* Details Column */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {product.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300">
                      {product.badge}
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2">
                  {product.name}
                </h2>

                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Specs List */}
                <div className="space-y-2.5 text-xs bg-muted/40 p-3.5 rounded-xl border border-border/80 mb-5">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">Sourcing Origin: </span>
                      <span className="text-muted-foreground">{product.origin}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">Available Grade: </span>
                      <span className="text-muted-foreground">{product.grade}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Package className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">Standard Packing: </span>
                      <span className="text-muted-foreground">{product.packaging}</span>
                    </div>
                  </div>
                </div>

                {/* Trust bullets */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground mb-5">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Lab Tested Purity</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Container / Bulk Ready</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Samples on Request</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>FOB / CIF Dispatch</span>
                  </div>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="space-y-2 pt-3 border-t border-border">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-xs hover:bg-[#20ba5a] transition-all shadow-md active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Instant WhatsApp Quotation
                </a>

                <a
                  href={`tel:${COMPANY.phoneHref}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-primary/40 bg-primary/5 text-primary font-medium text-xs hover:bg-primary hover:text-white transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call: {COMPANY.phone}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductQuickView;
