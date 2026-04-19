export type Category =
  | "Beef Burgers"
  | "Chicken Burgers"
  | "Wraps"
  | "Hot Dogs"
  | "Sandwiches"
  | "Tacos"
  | "Burger Shots"
  | "Taco Shots"
  | "Sides"
  | "Salads"
  | "Menu Kids"
  | "Desserts"
  | "Milkshakes"
  | "Drinks";

export interface Variant {
  name: string;
  price: number;
}

export interface PricedOption {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  image: string;
  basePrice: number;
  available: boolean;
  variants?: Variant[];
  hasToppings?: boolean;
  hasSauces?: boolean;
  hasSupplements?: boolean;
  hasExtras?: boolean;
  hasFormule?: boolean;
}

export interface CartItemState {
  cartId: string;
  item: MenuItem;
  selectedVariant?: Variant;
  selectedToppings: PricedOption[];
  selectedSauces: string[];
  selectedSupplements: PricedOption[];
  selectedExtras: PricedOption[];
  selectedFormule?: PricedOption;
  qty: number;
}
