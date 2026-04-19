"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronUp, X, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function CartBar() {
  const { items, totalPrice, itemCount, removeItem, clearCart, generateWhatsAppURL } = useCartStore();
  const [expanded, setExpanded] = useState(false);
  const count = itemCount();
  const total = totalPrice();

  if (count === 0) return null;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Cart Panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-20 left-0 right-0 z-50 max-w-xl mx-auto bg-white border-4 border-black brut-shadow m-4"
          >
            <div className="flex items-center justify-between p-4 border-b-2 border-black bg-yellow">
              <h3 className="font-black uppercase text-lg">Your Order</h3>
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="p-2 border-2 border-black hover:bg-black hover:text-yellow transition-colors"
                  title="Clear cart"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setExpanded(false)}
                  className="p-2 border-2 border-black hover:bg-black hover:text-yellow transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="max-h-72 overflow-y-auto divide-y-2 divide-black">
              {items.map((ci) => {
                const baseP = ci.selectedVariant ? ci.selectedVariant.price : ci.item.basePrice;
                const suppTotal = ci.selectedSupplements.reduce((a, s) => a + s.price, 0);
                const formuleP = ci.selectedFormule ? ci.selectedFormule.price : 0;
                const lineTotal = (baseP + suppTotal + formuleP) * ci.qty;

                return (
                  <div key={ci.cartId} className="p-3 flex gap-3 items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between font-black uppercase text-sm">
                        <span className="truncate">{ci.qty}x {ci.item.name}</span>
                        <span className="price-tag ml-2 shrink-0">{lineTotal} DHS</span>
                      </div>
                      {ci.selectedVariant && (
                        <p className="text-xs font-mono text-gray-500">{ci.selectedVariant.label}</p>
                      )}
                      {ci.selectedSupplements.length > 0 && (
                        <p className="text-xs font-mono text-gray-500">
                          + {ci.selectedSupplements.map((s) => s.label).join(", ")}
                        </p>
                      )}
                      {ci.selectedFormule && (
                        <p className="text-xs font-mono text-gray-500">
                          Formule: {ci.selectedFormule.label}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(ci.cartId)}
                      className="text-gray-400 hover:text-black shrink-0 mt-0.5"
                    >
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Bottom Bar */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t-4 border-yellow"
      >
        <div className="max-w-xl mx-auto flex items-center gap-3 p-3">
          {/* Cart icon + count */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="relative flex items-center gap-2 bg-yellow border-2 border-yellow px-4 py-3 font-black hover:bg-yellow-300 transition-colors"
          >
            <ShoppingBag size={20} />
            <span className="text-sm">{count}</span>
            <ChevronUp
              size={16}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>

          {/* Total */}
          <div className="flex-1">
            <p className="text-yellow text-xs font-mono uppercase">Total</p>
            <p className="text-white font-black text-xl price-tag">{total} DHS</p>
          </div>

          {/* WhatsApp button */}
          <a
            href={generateWhatsAppURL()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white font-black uppercase px-5 py-3 border-2 border-yellow hover:bg-[#1FAD54] transition-colors flex items-center gap-2 text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order Now
          </a>
        </div>
      </motion.div>
    </>
  );
}
