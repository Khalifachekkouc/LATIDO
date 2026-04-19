"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray, Controller, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, Upload, ImageIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const IMGBB_API_KEY = "49af2343f1507f865004d877b4252898";
import { CATEGORIES, CATEGORY_RULES } from "@/lib/constants";
import type { MenuItem, Category } from "@/lib/types";

const variantSchema = z.object({ name: z.string().min(1), price: z.coerce.number().min(0) });

const schema = z.object({
  name: z.string().min(1),
  category: z.enum(CATEGORIES as [Category, ...Category[]]),
  description: z.string(),
  image: z.string().min(1),
  basePrice: z.coerce.number().min(0),
  available: z.boolean(),
  variants: z.array(variantSchema),
  hasToppings: z.boolean(),
  hasSauces: z.boolean(),
  hasSupplements: z.boolean(),
  hasExtras: z.boolean(),
  hasFormule: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  initialData?: MenuItem;
  onSave: (data: Omit<MenuItem, "id">) => Promise<void>;
  onCancel: () => void;
}

export default function MenuItemForm({ initialData, onSave, onCancel }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string>(initialData?.image ?? "");

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      name: initialData?.name ?? "",
      category: initialData?.category ?? "Beef Burgers",
      description: initialData?.description ?? "",
      image: initialData?.image ?? "",
      basePrice: initialData?.basePrice ?? 0,
      available: initialData?.available ?? true,
      variants: initialData?.variants ?? [],
      hasToppings: initialData?.hasToppings ?? false,
      hasSauces: initialData?.hasSauces ?? false,
      hasSupplements: initialData?.hasSupplements ?? false,
      hasExtras: initialData?.hasExtras ?? false,
      hasFormule: initialData?.hasFormule ?? false,
    },
  });

  const { fields, append, remove, replace } = useFieldArray({ control, name: "variants" });
  const watchedCategory = watch("category") as Category;
  const watchedImage = watch("image");
  const rules = CATEGORY_RULES[watchedCategory];

  useEffect(() => {
    if (!rules) return;
    setValue("hasToppings", rules.hasToppings);
    setValue("hasSauces", rules.hasSauces);
    setValue("hasSupplements", rules.hasSupplements);
    setValue("hasExtras", rules.hasExtras);
    setValue("hasFormule", rules.hasFormule);
    if (rules.useVariants && rules.defaultVariants) {
      replace(rules.defaultVariants.map((v) => ({ name: v.name, price: 0 })));
    } else if (!rules.useVariants) {
      replace([]);
    }
  }, [watchedCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);
    setUploadProgress(0);

    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: form,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error?.message ?? "ImgBB upload failed");
      const url: string = json.data.url;
      setValue("image", url, { shouldValidate: true });
      setPreviewUrl(url);
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Check your ImgBB API key.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }

  async function onSubmit(data: FormValues) {
    const payload: Omit<MenuItem, "id"> = {
      name: data.name,
      category: data.category,
      description: data.description,
      image: data.image,
      basePrice: data.basePrice,
      available: data.available,
      ...(data.variants.length > 0 ? { variants: data.variants } : {}),
      ...(data.hasToppings ? { hasToppings: true } : {}),
      ...(data.hasSauces ? { hasSauces: true } : {}),
      ...(data.hasSupplements ? { hasSupplements: true } : {}),
      ...(data.hasExtras ? { hasExtras: true } : {}),
      ...(data.hasFormule ? { hasFormule: true } : {}),
    };
    await onSave(payload);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-5">

      {/* Name + Category */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Field label="Name *">
            <input {...register("name")} placeholder="Classic Burger" className={inp} />
          </Field>
        </div>

        <Field label="Category *">
          <select {...register("category")} className={inp + " bg-white"}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Base Price (DHS)">
          <input
            type="number"
            {...register("basePrice")}
            disabled={rules?.useVariants}
            className={inp + (rules?.useVariants ? " opacity-40 cursor-not-allowed" : "")}
          />
        </Field>

        <div className="col-span-2">
          <Field label="Description">
            <textarea {...register("description")} rows={2} className={inp + " resize-none"} />
          </Field>
        </div>

        {/* Available toggle */}
        <div className="col-span-2 flex items-center gap-3">
          <Controller
            control={control}
            name="available"
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-yellow data-[state=checked]:border-black border-2 border-black"
              />
            )}
          />
          <Label className="font-mono text-sm font-bold uppercase">Available</Label>
        </div>
      </div>

      {/* Image Upload */}
      <div className="border-t-2 border-black pt-4">
        <Field label="Product Image">
          {/* Hidden file input */}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Preview */}
          {previewUrl && (
            <div className="relative mb-3 border-2 border-black h-40 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-mono text-sm font-bold animate-pulse">Uploading...</span>
                </div>
              )}
            </div>
          )}

          {/* Upload button + manual URL fallback */}
          <div className="flex gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 border-2 border-black font-black uppercase text-xs px-4 py-2.5 hover:bg-yellow transition-colors disabled:opacity-50 brut-shadow-sm"
            >
              {uploading ? (
                <><Upload size={14} className="animate-bounce" /> Uploading...</>
              ) : (
                <><ImageIcon size={14} /> {previewUrl ? "Change Image" : "Upload Image"}</>
              )}
            </button>

            <input
              {...register("image")}
              placeholder="Or paste URL / path"
              onChange={(e) => {
                setValue("image", e.target.value);
                setPreviewUrl(e.target.value);
              }}
              className={inp + " flex-1"}
            />
          </div>
        </Field>
      </div>

      {/* Variants */}
      {rules?.useVariants && (
        <div className="border-t-2 border-black pt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-black uppercase text-xs">
              Variants <span className="text-gray-400 font-mono normal-case">(required for this category)</span>
            </p>
            <button
              type="button"
              onClick={() => append({ name: "", price: 0 })}
              className="flex items-center gap-1 text-xs font-mono font-bold border-2 border-black px-3 py-1.5 hover:bg-yellow transition-colors"
            >
              <Plus size={12} /> Add
            </button>
          </div>
          {fields.map((field, i) => (
            <div key={field.id} style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
              <Controller
                control={control}
                name={`variants.${i}.name`}
                render={({ field: f }) => (
                  <input
                    {...f}
                    placeholder="Medium / 5 Pièces"
                    style={{ flex: 1, color: "#000", backgroundColor: "#fff", border: "2px solid #000", padding: "8px 12px", fontFamily: "monospace", fontSize: "14px", outline: "none", minWidth: 0 }}
                  />
                )}
              />
              <Controller
                control={control}
                name={`variants.${i}.price`}
                render={({ field: f }) => (
                  <input
                    {...f}
                    type="number"
                    min={0}
                    placeholder="0"
                    onChange={(e) => f.onChange(parseFloat(e.target.value) || 0)}
                    style={{ width: "90px", color: "#000", backgroundColor: "#fff", border: "2px solid #000", padding: "8px 12px", fontFamily: "monospace", fontSize: "14px", outline: "none" }}
                  />
                )}
              />
              <span style={{ fontFamily: "monospace", fontSize: "14px", flexShrink: 0 }}>DHS</span>
              <button type="button" onClick={() => remove(i)} className="p-2 border-2 border-black hover:bg-red-100 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Customization toggles */}
      {rules && (rules.hasToppings || rules.hasSauces || rules.hasSupplements || rules.hasExtras || rules.hasFormule) && (
        <div className="border-t-2 border-black pt-4">
          <p className="font-black uppercase text-xs mb-3">
            Customization <span className="text-gray-400 font-mono normal-case">(auto-set by category)</span>
          </p>
          <div className="grid grid-cols-2 gap-3">
            {rules.hasToppings && <ToggleField name="hasToppings" label="Toppings (+3 DHS)" control={control} />}
            {rules.hasSauces && <ToggleField name="hasSauces" label="Sauces (free, max 2)" control={control} />}
            {rules.hasSupplements && <ToggleField name="hasSupplements" label="Suppléments" control={control} />}
            {rules.hasExtras && <ToggleField name="hasExtras" label="Extras" control={control} />}
            {rules.hasFormule && <ToggleField name="hasFormule" label="Formule Menu" control={control} />}
          </div>
        </div>
      )}

      {rules && !rules.hasToppings && !rules.hasSauces && !rules.hasSupplements && !rules.hasExtras && !rules.hasFormule && (
        <div className="border-t-2 border-black pt-4">
          <p className="text-xs font-mono text-gray-400">ℹ️ No customization for <strong>{watchedCategory}</strong>.</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 border-t-2 border-black pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border-2 border-black font-black uppercase py-3 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || uploading}
          className="flex-1 bg-yellow border-2 border-black font-black uppercase py-3 brut-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : initialData ? "Save Changes" : "Create Item"}
        </button>
      </div>
    </form>
  );
}

/* ── helpers ── */

const inp =
  "w-full bg-white text-black border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none focus:border-yellow";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-black uppercase text-xs mb-1 tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function ToggleField({
  name,
  label,
  control,
}: {
  name: "hasToppings" | "hasSauces" | "hasSupplements" | "hasExtras" | "hasFormule";
  label: string;
  control: any;
}) {
  return (
    <div className="flex items-center gap-3 p-3 border-2 border-black">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            className="data-[state=checked]:bg-yellow data-[state=checked]:border-black border-2 border-black"
          />
        )}
      />
      <Label className="font-mono text-xs">{label}</Label>
    </div>
  );
}
