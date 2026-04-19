"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Category, MenuItem } from "@/lib/types";
import { getMenuItems } from "@/lib/firestore";
import { CATEGORIES } from "@/lib/constants";
import MenuItemCard from "@/components/MenuItemCard";
import HeroSection from "@/components/HeroSection";
import CategoryNav from "@/components/CategoryNav";
import CartBar from "@/components/CartBar";
import Footer from "@/components/Footer";



export default function HomePage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenuItems().then((items) => {
      setMenuItems(items);
      setLoading(false);
    });
  }, []);

  const filtered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((i) => i.category === activeCategory);

  const grouped = activeCategory === "All"
    ? CATEGORIES.map((cat) => ({
        cat,
        items: menuItems.filter((i) => i.category === cat && i.available),
      })).filter((g) => g.items.length > 0)
    : [{ cat: activeCategory, items: filtered.filter((i) => i.available) }];

  return (
    <main>
      <HeroSection />

      {/* Marquee */}
      <div className="bg-yellow border-y-4 border-black overflow-hidden py-2">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="font-black uppercase text-sm tracking-widest">
              🔥 LATIDO &nbsp;•&nbsp; EVERY BITE DROPS A BEAT &nbsp;•&nbsp; FES, MAROC &nbsp;•&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* Category Nav */}
      <div id="menu">
        <CategoryNav activeCategory={activeCategory} onSelect={setActiveCategory} />
      </div>

      {/* Menu Content */}
      <section className="max-w-6xl mx-auto px-4 py-10 pb-32">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 brut-border animate-pulse" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {grouped.map(({ cat, items }) => (
                <div key={cat} className="mb-12">
                  {activeCategory === "All" && (
                    <div className="flex items-center gap-4 mb-6">
                      <h2
                        className="text-3xl font-black uppercase"
                        style={{ fontFamily: "var(--font-archivo-black)" }}
                      >
                        {cat}
                      </h2>
                      <div className="flex-1 h-0.5 bg-black" />
                      <span className="price-tag text-sm bg-black text-yellow px-3 py-1">
                        {items.length} items
                      </span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
                    {items.map((item, idx) => (
                      <MenuItemCard key={item.id} item={item} index={idx} />
                    ))}
                  </div>
                </div>
              ))}

              {grouped.every((g) => g.items.length === 0) && (
                <div className="text-center py-20">
                  <p className="font-black text-4xl uppercase text-gray-300">No Items</p>
                  <p className="font-mono text-gray-400 mt-2">Check back soon.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      <Footer />
      <CartBar />
    </main>
  );
}
