import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "default" | "compact" | "vertical" | "icon-only";
  theme?: "dark" | "light" | "gold";
  className?: string;
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "default",
  theme = "dark",
  className = "",
  linkToHome = true,
}) => {
  const isIconOnly = variant === "icon-only";
  const isVertical = variant === "vertical";
  const isCompact = variant === "compact";

  const content = (
    <div
      className={`inline-flex items-center group select-none transition-all duration-300 ${
        isVertical ? "flex-col text-center" : "flex-row"
      } ${className}`}
    >
      {/* Emblem / Monogram Crest for Crystal Industries */}
      <div
        className={`relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${
          isVertical
            ? "w-16 h-16 mb-3"
            : isCompact
            ? "w-10 h-10 mr-2.5"
            : "w-12 h-12 md:w-13 md:h-13 mr-3"
        }`}
      >
        {/* Brand Icon - Modern Leaf inside Hexagon */}
        <div className="relative w-full h-full flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-primary shadow-lg border border-white/20">
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 md:w-8 md:h-8 text-white drop-shadow-sm"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        </div>

        {/* Ambient Subtle Gold Glow */}
        <div className="absolute inset-0 rounded-xl bg-amber-500/20 blur-md pointer-events-none group-hover:bg-amber-500/40 transition-all duration-300" />
      </div>

      {/* Brand Typography */}
      {!isIconOnly && (
        <div className={`flex flex-col ${isVertical ? "items-center" : "items-start"}`}>
          <div className="flex items-center gap-1">
            <span
              className={`font-serif font-extrabold tracking-tight uppercase leading-none transition-colors ${
                theme === "gold"
                  ? "gold-gradient-text"
                  : theme === "light"
                  ? "text-white"
                  : "text-foreground group-hover:text-primary"
              } ${isCompact ? "text-base sm:text-lg" : "text-lg sm:text-xl md:text-2xl"}`}
            >
              Crystal
            </span>
          </div>

          <div
            className={`flex items-center gap-1.5 mt-0.5 tracking-[0.24em] uppercase font-sans font-bold ${
              theme === "light" ? "text-amber-300" : "text-primary"
            } ${isCompact ? "text-[8px] sm:text-[9px]" : "text-[9px] sm:text-[10px] md:text-[11px]"}`}
          >
            <span className="w-1.5 h-[1.5px] bg-primary/70 rounded-full inline-block" />
            <span>Industries</span>
            <span className="w-1.5 h-[1.5px] bg-primary/70 rounded-full inline-block" />
          </div>

          {!isCompact && !isVertical && (
            <span
              className={`text-[8px] sm:text-[9px] tracking-wider uppercase font-medium mt-0.5 ${
                theme === "light" ? "text-white/70" : "text-muted-foreground"
              }`}
            >
              Spices • Seeds • Agro Supply
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
