"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { MenuItem } from "@/lib/types";
import ItemModal from "./ItemModal";

interface Props {
  item: MenuItem;
  index: number;
}

export default function MenuItemCard({ item, index }: Props) {
  const [open, setOpen] = useState(false);

  const isLarge = index % 5 === 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        className={`group relative bg-white brut-border brut-shadow cursor-pointer hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-150 flex flex-col ${isLarge ? "lg:col-span-2" : ""}`}
        onClick={() => setOpen(true)}
      >
        {/* Image */}
        <div className={`relative w-full overflow-hidden border-b-2 border-black ${isLarge ? "h-64" : "h-44"}`}>
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category badge */}
          <div className="absolute top-3 left-3 bg-yellow border-2 border-black px-2 py-0.5 text-xs font-black uppercase">
            {item.category}
          </div>
          {!item.available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-yellow font-black text-xl uppercase">Unavailable</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-black uppercase text-lg leading-tight mb-1" style={{ fontFamily: "var(--font-archivo-black)" }}>
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 font-mono leading-snug line-clamp-2">
              {item.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="price-tag text-lg font-bold">
              {item.variants && item.variants.length > 0
                ? `${item.variants[0].price}–${item.variants.at(-1)!.price} DHS`
                : `${item.basePrice} DHS`}
            </span>

            <button
              disabled={!item.available}
              onClick={(e) => { e.stopPropagation(); setOpen(true); }}
              className="bg-yellow border-2 border-black p-2 hover:bg-black hover:text-yellow transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label={`Add ${item.name} to cart`}
            >
              <Plus size={18} strokeWidth={3} />
            </button>
          </div>

          {/* Badges */}
          {(item.variants?.length || item.hasToppings || item.hasSauces || item.hasSupplements || item.hasExtras || item.hasFormule) && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.variants && item.variants.length > 0 && (
                <span className="text-xs font-mono bg-black text-yellow px-2 py-0.5">VARIANTS</span>
              )}
              {item.hasToppings && (
                <span className="text-xs font-mono bg-gray-100 border border-black px-2 py-0.5">+TOPPINGS</span>
              )}
              {item.hasSauces && (
                <span className="text-xs font-mono bg-gray-100 border border-black px-2 py-0.5">SAUCES</span>
              )}
              {(item.hasSupplements || item.hasExtras) && (
                <span className="text-xs font-mono bg-gray-100 border border-black px-2 py-0.5">+EXTRAS</span>
              )}
              {item.hasFormule && (
                <span className="text-xs font-mono bg-yellow border border-black px-2 py-0.5">FORMULE</span>
              )}
            </div>
          )}
        </div>
      </motion.div>

      <ItemModal item={item} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
