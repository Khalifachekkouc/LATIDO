import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  "Beef Burgers",
  "Chicken Burgers",
  "Wraps",
  "Hot Dogs",
  "Sandwiches",
  "Tacos",
  "Burger Shots",
  "Taco Shots",
  "Sides",
  "Salads",
  "Menu Kids",
  "Desserts",
  "Milkshakes",
  "Drinks",
];

export const SAUCES = [
  "Algérienne",
  "Andalousse",
  "Barbecue",
  "Burger Biggy",
  "Blanche",
  "Mayo Japanese",
  "Chili Thaï",
  "Samouraï",
  "Mayonnaise",
  "Ketchup",
];

export const TOPPINGS = [
  { label: "Champignons", price: 3 },
  { label: "Oignons Caramélisés", price: 3 },
  { label: "Oignons Frites", price: 3 },
  { label: "Jalapeños", price: 3 },
  { label: "Pickles", price: 3 },
  { label: "Sauce", price: 3 },
  { label: "Fromage", price: 3 },
];

export const SUPPLEMENTS = [
  { label: "Jalapeños", price: 3 },
  { label: "Fromage Cheddar", price: 5 },
  { label: "Mozzarella", price: 5 },
  { label: "Dinde Fumée", price: 5 },
  { label: "Onion Rings", price: 5 },
  { label: "Crispy Onions", price: 5 },
];

export const EXTRAS = [
  { label: "Gratiné", price: 10 },
  { label: "Doritos / Cheetos / Takis", price: 15 },
  { label: "Sans Gluten", price: 25 },
];

export const FORMULES = [
  { label: "Frites + Soda", price: 15 },
  { label: "Frites + Jus", price: 25 },
  { label: "Frites + Milkshake", price: 30 },
];

export interface CategoryRule {
  useVariants: boolean;
  defaultVariants?: { name: string; price: number }[];
  hasToppings: boolean;
  hasSauces: boolean;
  hasSupplements: boolean;
  hasExtras: boolean;
  hasFormule: boolean;
}

export const CATEGORY_RULES: Record<Category, CategoryRule> = {
  "Beef Burgers": {
    useVariants: false,
    hasToppings: true,
    hasSauces: false,
    hasSupplements: true,
    hasExtras: true,
    hasFormule: true,
  },
  "Chicken Burgers": {
    useVariants: false,
    hasToppings: true,
    hasSauces: false,
    hasSupplements: true,
    hasExtras: true,
    hasFormule: true,
  },
  Tacos: {
    useVariants: true,
    defaultVariants: [
      { name: "Medium", price: 0 },
      { name: "Large", price: 0 },
    ],
    hasToppings: false,
    hasSauces: true,
    hasSupplements: true,
    hasExtras: true,
    hasFormule: true,
  },
  "Burger Shots": {
    useVariants: true,
    defaultVariants: [
      { name: "5 Pièces", price: 0 },
      { name: "10 Pièces", price: 0 },
      { name: "15 Pièces", price: 0 },
    ],
    hasToppings: false,
    hasSauces: false,
    hasSupplements: false,
    hasExtras: false,
    hasFormule: true,
  },
  "Taco Shots": {
    useVariants: true,
    defaultVariants: [
      { name: "5 Pièces", price: 0 },
      { name: "10 Pièces", price: 0 },
      { name: "15 Pièces", price: 0 },
    ],
    hasToppings: false,
    hasSauces: false,
    hasSupplements: false,
    hasExtras: false,
    hasFormule: true,
  },
  Wraps: {
    useVariants: false,
    hasToppings: false,
    hasSauces: false,
    hasSupplements: false,
    hasExtras: false,
    hasFormule: true,
  },
  Sandwiches: {
    useVariants: false,
    hasToppings: false,
    hasSauces: false,
    hasSupplements: false,
    hasExtras: false,
    hasFormule: true,
  },
  "Hot Dogs": {
    useVariants: false,
    hasToppings: false,
    hasSauces: false,
    hasSupplements: false,
    hasExtras: false,
    hasFormule: true,
  },
  Sides: {
    useVariants: false,
    hasToppings: false,
    hasSauces: false,
    hasSupplements: false,
    hasExtras: false,
    hasFormule: false,
  },
  Salads: {
    useVariants: false,
    hasToppings: false,
    hasSauces: false,
    hasSupplements: false,
    hasExtras: false,
    hasFormule: false,
  },
  "Menu Kids": {
    useVariants: false,
    hasToppings: false,
    hasSauces: false,
    hasSupplements: false,
    hasExtras: false,
    hasFormule: false,
  },
  Desserts: {
    useVariants: false,
    hasToppings: false,
    hasSauces: false,
    hasSupplements: false,
    hasExtras: false,
    hasFormule: false,
  },
  Milkshakes: {
    useVariants: false,
    hasToppings: false,
    hasSauces: false,
    hasSupplements: false,
    hasExtras: false,
    hasFormule: false,
  },
  Drinks: {
    useVariants: false,
    hasToppings: false,
    hasSauces: false,
    hasSupplements: false,
    hasExtras: false,
    hasFormule: false,
  },
};

export const CATEGORY_ICONS: Record<string, string> = {
  "Beef Burgers": "🍔",
  "Chicken Burgers": "🍗",
  Wraps: "🌯",
  "Hot Dogs": "🌭",
  Sandwiches: "🥪",
  Tacos: "🌮",
  "Burger Shots": "🍔",
  "Taco Shots": "🌮",
  Sides: "🍟",
  Salads: "🥗",
  "Menu Kids": "👶",
  Desserts: "🍰",
  Milkshakes: "🥤",
  Drinks: "🧃",
};
