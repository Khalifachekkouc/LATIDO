"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CATEGORIES, CATEGORY_ICONS } from "@/lib/constants";
import type { Category } from "@/lib/types";

interface Props {
  activeCategory: Category | "All";
  onSelect: (cat: Category | "All") => void;
}

export default function CategoryNav({ activeCategory, onSelect }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      setIsSticky(nav.getBoundingClientRect().top <= 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const all: (Category | "All")[] = ["All", ...(CATEGORIES as unknown as Category[])];

  return (
    <div
      ref={navRef}
      className={`sticky top-0 z-40 bg-white border-b-4 border-black transition-shadow ${isSticky ? "shadow-[0_4px_0_0_#FFD400]" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-none snap-x px-4 pb-2">
          {all.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => onSelect(cat)}
                className={`relative flex items-center gap-2 px-5 py-4 font-black text-sm uppercase whitespace-nowrap transition-all duration-150 border-r-2 border-black shrink-0 snap-start
                  ${isActive ? "bg-yellow text-black" : "bg-white text-black hover:bg-yellow/20"}`}
              >
                {cat !== "All" && (
                  <span>{CATEGORY_ICONS[cat] ?? "🍴"}</span>
                )}
                {cat}
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-black"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
