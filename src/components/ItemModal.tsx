"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { SAUCES, TOPPINGS, SUPPLEMENTS, EXTRAS, FORMULES } from "@/lib/constants";
import type { MenuItem, Variant, PricedOption } from "@/lib/types";

const MAX_SAUCES = 2;

interface Props {
  item: MenuItem;
  open: boolean;
  onClose: () => void;
}

export default function ItemModal({ item, open, onClose }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(item.variants?.[0]);
  const [selectedToppings, setSelectedToppings] = useState<PricedOption[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [selectedSupplements, setSelectedSupplements] = useState<PricedOption[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<PricedOption[]>([]);
  const [selectedFormule, setSelectedFormule] = useState<PricedOption | undefined>(undefined);
  const [qty, setQty] = useState(1);

  function reset() {
    setSelectedVariant(item.variants?.[0]);
    setSelectedToppings([]);
    setSelectedSauces([]);
    setSelectedSupplements([]);
    setSelectedExtras([]);
    setSelectedFormule(undefined);
    setQty(1);
  }

  function toggleSauce(sauce: string) {
    setSelectedSauces((prev) =>
      prev.includes(sauce)
        ? prev.filter((s) => s !== sauce)
        : prev.length < MAX_SAUCES
        ? [...prev, sauce]
        : prev
    );
  }

  function togglePriced(
    opt: PricedOption,
    current: PricedOption[],
    setter: (v: PricedOption[]) => void
  ) {
    setter(
      current.find((o) => o.label === opt.label)
        ? current.filter((o) => o.label !== opt.label)
        : [...current, opt]
    );
  }

  const displayExtras =
    item.category === "Beef Burgers" || item.category === "Chicken Burgers"
      ? EXTRAS.filter((ex) => ex.label !== "Gratiné")
      : EXTRAS;

  const base = selectedVariant ? selectedVariant.price : item.basePrice;
  const topsTotal = selectedToppings.reduce((a, t) => a + t.price, 0);
  const suppTotal = selectedSupplements.reduce((a, s) => a + s.price, 0);
  const extrasTotal = selectedExtras.reduce((a, e) => a + e.price, 0);
  const formulePrice = selectedFormule?.price ?? 0;
  const unitTotal = base + topsTotal + suppTotal + extrasTotal + formulePrice;
  const grandTotal = unitTotal * qty;

  function handleAdd() {
    if (item.variants && !selectedVariant) {
      toast.error("Please select a size / quantity");
      return;
    }
    addItem({
      item,
      selectedVariant,
      selectedToppings,
      selectedSauces,
      selectedSupplements,
      selectedExtras,
      selectedFormule,
      qty,
    });
    toast.success(`${item.name} ajouté!`, { description: `${grandTotal} DHS` });
    reset();
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { reset(); onClose(); } }}>
      <DialogContent className="max-w-lg p-0 border-4 border-black rounded-none brut-shadow bg-white gap-0">
        <DialogTitle className="sr-only">{item.name}</DialogTitle>

        {/* Image */}
        <div className="relative h-48 w-full border-b-4 border-black shrink-0">
          <Image src={item.image} alt={item.name} fill sizes="512px" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-4 bg-yellow border-2 border-black px-3 py-0.5">
            <span className="font-black uppercase text-sm">{item.category}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 p-5 overflow-y-auto max-h-[55vh]">
          <div>
            <h2 className="text-2xl font-black uppercase" style={{ fontFamily: "var(--font-archivo-black)" }}>
              {item.name}
            </h2>
            <p className="text-sm text-gray-600 font-mono mt-0.5">{item.description}</p>
          </div>

          {/* Variants (mandatory) */}
          {item.variants && item.variants.length > 0 && (
            <Section title="Taille / Quantité *">
              <div className="flex flex-wrap gap-2">
                {item.variants.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 font-mono font-bold text-sm border-2 border-black transition-all
                      ${selectedVariant?.name === v.name ? "bg-yellow brut-shadow-sm" : "bg-white hover:bg-gray-50"}`}
                  >
                    {v.name} — {v.price} DHS
                  </button>
                ))}
              </div>
            </Section>
          )}

          {/* Toppings +3 DHS each */}
          {item.hasToppings && (
            <Section title="Toppings (+3 DHS chacun)">
              {TOPPINGS.map((t) => (
                <PricedRow
                  key={t.label}
                  opt={t}
                  checked={!!selectedToppings.find((o) => o.label === t.label)}
                  onChange={() => togglePriced(t, selectedToppings, setSelectedToppings)}
                />
              ))}
            </Section>
          )}

          {/* Sauces (free, max 2) */}
          {item.hasSauces && (
            <Section title={`Sauces — Gratuit (max ${MAX_SAUCES})`}>
              <div className="flex flex-wrap gap-2">
                {SAUCES.map((s) => {
                  const checked = selectedSauces.includes(s);
                  const disabled = !checked && selectedSauces.length >= MAX_SAUCES;
                  return (
                    <button
                      key={s}
                      onClick={() => toggleSauce(s)}
                      disabled={disabled}
                      className={`px-3 py-1.5 text-xs font-mono border-2 border-black transition-all
                        ${checked ? "bg-yellow" : "bg-white hover:bg-gray-50"}
                        ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 font-mono mt-1">
                {selectedSauces.length}/{MAX_SAUCES} sélectionnées
              </p>
            </Section>
          )}

          {/* Supplements */}
          {item.hasSupplements && (
            <Section title="Suppléments">
              {SUPPLEMENTS.map((sup) => (
                <PricedRow
                  key={sup.label}
                  opt={sup}
                  checked={!!selectedSupplements.find((s) => s.label === sup.label)}
                  onChange={() => togglePriced(sup, selectedSupplements, setSelectedSupplements)}
                />
              ))}
            </Section>
          )}

          {/* Extras */}
          {item.hasExtras && (
            <Section title="Extras">
              {displayExtras.map((ex) => (
                <PricedRow
                  key={ex.label}
                  opt={ex}
                  checked={!!selectedExtras.find((e) => e.label === ex.label)}
                  onChange={() => togglePriced(ex, selectedExtras, setSelectedExtras)}
                />
              ))}
            </Section>
          )}

          {/* Formule */}
          {item.hasFormule && (
            <Section title="🍽️ Formule Menu">
              <label className="flex items-center gap-3 cursor-pointer font-mono text-sm">
                <input
                  type="radio"
                  name="formule"
                  checked={!selectedFormule}
                  onChange={() => setSelectedFormule(undefined)}
                  className="accent-yellow w-4 h-4"
                />
                Sans formule
              </label>
              {FORMULES.map((f) => (
                <label key={f.label} className="flex items-center gap-3 cursor-pointer font-mono text-sm">
                  <input
                    type="radio"
                    name="formule"
                    checked={selectedFormule?.label === f.label}
                    onChange={() => setSelectedFormule(f)}
                    className="accent-yellow w-4 h-4"
                  />
                  <span className="flex-1">{f.label}</span>
                  <span className="price-tag font-bold">+{f.price} DHS</span>
                </label>
              ))}
            </Section>
          )}
        </div>

        {/* Footer */}
        <div className="border-t-4 border-black p-4 flex items-center gap-3 bg-white shrink-0">
          <div className="flex items-center border-2 border-black">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-yellow transition-colors font-black">
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 font-mono font-bold border-x-2 border-black min-w-[40px] text-center">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 hover:bg-yellow transition-colors font-black">
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 bg-yellow border-2 border-black font-black uppercase px-4 py-3 flex items-center justify-between brut-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} />
              Ajouter
            </div>
            <span className="price-tag">{grandTotal} DHS</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-black uppercase text-xs mb-2 border-b-2 border-black pb-1 tracking-wide">{title}</h4>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function PricedRow({ opt, checked, onChange }: { opt: { label: string; price: number }; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        className="border-2 border-black rounded-none data-[state=checked]:bg-yellow data-[state=checked]:text-black"
      />
      <span className="font-mono text-sm flex-1">{opt.label}</span>
      <span className="price-tag text-sm font-bold">+{opt.price} DHS</span>
    </label>
  );
}
