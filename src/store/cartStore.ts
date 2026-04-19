import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItemState, PricedOption, Variant } from "@/lib/types";

interface CartStore {
  items: CartItemState[];
  addItem: (item: Omit<CartItemState, "cartId">) => void;
  removeItem: (cartId: string) => void;
  updateQty: (cartId: string, qty: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  itemCount: () => number;
  generateWhatsAppURL: () => string;
}

function calcLinePrice(ci: CartItemState): number {
  const base = ci.selectedVariant ? ci.selectedVariant.price : ci.item.basePrice;
  const tops = ci.selectedToppings.reduce((a, t) => a + t.price, 0);
  const sups = ci.selectedSupplements.reduce((a, s) => a + s.price, 0);
  const exts = ci.selectedExtras.reduce((a, e) => a + e.price, 0);
  const formule = ci.selectedFormule?.price ?? 0;
  return (base + tops + sups + exts + formule) * ci.qty;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const cartId = `${item.item.id}-${Date.now()}`;
        set((s) => ({ items: [...s.items, { ...item, cartId }] }));
      },
      removeItem: (cartId) =>
        set((s) => ({ items: s.items.filter((i) => i.cartId !== cartId) })),
      updateQty: (cartId, qty) =>
        set((s) => ({
          items: s.items.map((i) => (i.cartId === cartId ? { ...i, qty } : i)),
        })),
      clearCart: () => set({ items: [] }),
      totalPrice: () => get().items.reduce((a, ci) => a + calcLinePrice(ci), 0),
      itemCount: () => get().items.reduce((a, ci) => a + ci.qty, 0),

      generateWhatsAppURL: () => {
        const items = get().items;
        const total = get().totalPrice();
        const lines: string[] = ["🔥 LATIDO ORDER 🔥", "──────────────────"];

        items.forEach((ci) => {
          const varLabel = ci.selectedVariant ? ` — ${ci.selectedVariant.name}` : "";
          const base = ci.selectedVariant ? ci.selectedVariant.price : ci.item.basePrice;
          lines.push(`${ci.qty}x ${ci.item.name}${varLabel} — ${base * ci.qty} DHS`);
          if (ci.selectedToppings.length > 0)
            lines.push(`  🧅 Toppings: ${ci.selectedToppings.map((t) => t.label).join(", ")}`);
          if (ci.selectedSauces.length > 0)
            lines.push(`  🥫 Sauces: ${ci.selectedSauces.join(", ")}`);
          ci.selectedSupplements.forEach((s) =>
            lines.push(`  + ${s.label} +${s.price * ci.qty} DHS`)
          );
          ci.selectedExtras.forEach((e) =>
            lines.push(`  + ${e.label} +${e.price * ci.qty} DHS`)
          );
          if (ci.selectedFormule)
            lines.push(
              `  🍽️ Formule: ${ci.selectedFormule.label} +${ci.selectedFormule.price * ci.qty} DHS`
            );
        });

        lines.push("──────────────────");
        lines.push(`💰 TOTAL: ${total} DHS`);
        return `https://wa.me/212631303131?text=${encodeURIComponent(lines.join("\n"))}`;
      },
    }),
    { name: "latido-cart" }
  )
);
