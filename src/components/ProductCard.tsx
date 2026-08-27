import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Eye, MapPin, Package, Award } from "lucide-react";
import { ProductItem } from "@/data/products";
import { COMPANY } from "@/data/company";

interface ProductCardProps {
  product: ProductItem;
  onQuickView?: (product: ProductItem) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  index = 0,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hello Crystal Industries, I'm interested in *${product.name}* from ${product.origin}. Please share current bulk pricing, available packing options, and payment terms.`
  );
  const whatsappUrl = `https://wa.me/${COMPANY.phoneHref.replace("+", "")}?text=${whatsappMessage}`;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      className="group relative flex flex-col h-full rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/40">
        
        {imgError ? (
          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(product.category)} flex items-center justify-center p-6 text-center`}>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-serif font-bold text-white/40 mb-2">{initials}</span>
              <span className="text-sm font-semibold text-white leading-tight drop-shadow-md">{product.name}</span>
            </div>
          </div>
        ) : (
          <>
            {/* Loading Skeleton */}
            {!imgLoaded && (
              <div className="absolute inset-0 animate-pulse bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground font-medium">Loading...</span>
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => {
                setImgError(true);
                setImgLoaded(true);
              }}
              className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        )}

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-background/90 backdrop-blur-md text-primary border border-primary/20 shadow-sm">
            {product.category}
          </span>
          {product.badge && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-slate-950 shadow-md">
              <Award className="w-2.5 h-2.5" />
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick View Floating Action on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 backdrop-blur-[2px] p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView?.(product);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/95 text-foreground text-xs font-semibold shadow-lg hover:bg-primary hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" /> Quick Specs
          </button>
        </div>

        {/* Bottom Image Form Label */}
        <div className="absolute bottom-2 left-2.5 pointer-events-none">
          <span className="text-[11px] font-medium text-white/90 drop-shadow-sm flex items-center gap-1">
            <Package className="w-3 h-3 text-amber-400" /> {product.form}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-4 md:p-5">
        <div className="flex-1">
          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>

        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold bg-[#25D366] text-white hover:bg-[#20ba5a] active:scale-98 transition-all shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp Price</span>
          </a>

          <button
            type="button"
            onClick={() => onQuickView?.(product)}
            title="View full specifications & packing"
            className="p-2.5 rounded-lg border border-border bg-muted/40 hover:bg-primary/10 hover:border-primary/50 text-foreground transition-colors"
          >
            <Eye className="w-4 h-4 text-primary" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
