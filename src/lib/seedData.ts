import type { MenuItem } from "./types";

export const SEED_MENU: Omit<MenuItem, "id">[] = [
  // --- BEEF BURGERS ---
  {
    name: "Classic Latido",
    category: "Beef Burgers",
    description: "Beef patty, cheddar, lettuce, tomato, special sauce.",
    image: "/menu/beef-burgers-1.png",
    basePrice: 40,
    available: true,
    hasToppings: true,
    hasSupplements: true,
    hasExtras: true,
    hasFormule: true,
  },
  {
    name: "Mushroom Swiss",
    category: "Beef Burgers",
    description: "Double beef patty, swiss cheese, sautéed mushrooms, caramelized onions.",
    image: "/menu/beef-burgers-2.png",
    basePrice: 50,
    available: true,
    hasToppings: true,
    hasSupplements: true,
    hasExtras: true,
    hasFormule: true,
  },

  // --- CHICKEN BURGERS ---
  {
    name: "Crispy Chicken",
    category: "Chicken Burgers",
    description: "Crispy fried chicken breast, coleslaw, pickles, spicy mayo.",
    image: "/menu/chicken-burgers-1.png",
    basePrice: 40,
    available: true,
    hasToppings: true,
    hasSupplements: true,
    hasExtras: true,
    hasFormule: true,
  },

  // --- TACOS ---
  {
    name: "Fire Taco",
    category: "Tacos",
    description: "Spicy minced beef, cheddar, french fries inside, signature fire sauce.",
    image: "/menu/tacos-1.png",
    basePrice: 0,
    available: true,
    variants: [
      { name: "Medium", price: 30 },
      { name: "Large", price: 40 },
    ],
    hasSauces: true,
    hasSupplements: true,
    hasExtras: true,
    hasFormule: true,
  },
  {
    name: "Chicken Nuggets Taco",
    category: "Tacos",
    description: "Chicken nuggets, french fries inside, algerienne sauce.",
    image: "/menu/tacos-2.png",
    basePrice: 0,
    available: true,
    variants: [
      { name: "Medium", price: 28 },
      { name: "Large", price: 38 },
    ],
    hasSauces: true,
    hasSupplements: true,
    hasExtras: true,
    hasFormule: true,
  },

  // --- BURGER SHOTS ---
  {
    name: "Mixed Burger Shots",
    category: "Burger Shots",
    description: "Mix of mini beef and crispy chicken burgers, melted cheddar.",
    image: "/menu/burger-shots-1.png",
    basePrice: 0,
    available: true,
    variants: [
      { name: "5 Pièces", price: 38 },
      { name: "10 Pièces", price: 70 },
      { name: "15 Pièces", price: 99 },
    ],
    hasFormule: true,
  },

  // --- TACO SHOTS ---
  {
    name: "Beef Taco Shots",
    category: "Taco Shots",
    description: "Mini tacos filled with seasoned beef, grated cheddar, and latido sauce.",
    image: "/menu/taco-shots-1.png",
    basePrice: 0,
    available: true,
    variants: [
      { name: "5 Pièces", price: 37 },
      { name: "10 Pièces", price: 69 },
      { name: "15 Pièces", price: 99 },
    ],
    hasFormule: true,
  },

  // --- WRAPS ---
  {
    name: "Crispy Wrap",
    category: "Wraps",
    description: "Crispy chicken tenders, lettuce, cheese, secret sauce.",
    image: "/menu/wraps-1.png",
    basePrice: 40,
    available: true,
    hasFormule: true,
  },

  // --- HOT DOGS ---
  {
    name: "Classic Hot Dog",
    category: "Hot Dogs",
    description: "Sausage, ketchup, mustard, crispy onions.",
    image: "/menu/hot-dogs-1.png",
    basePrice: 30,
    available: true,
    hasFormule: true,
  },

  // --- SANDWICHES ---
  {
    name: "Philly Cheesesteak",
    category: "Sandwiches",
    description: "Thinly sliced steak, melted provolone, grilled onions on a soft hoagie.",
    image: "/menu/sandwiches-1.png",
    basePrice: 55,
    available: true,
    hasFormule: true,
  },

  // --- SIDES ---
  {
    name: "Cajun Fries",
    category: "Sides",
    description: "Crispy fries coated in our signature cajun seasoning.",
    image: "/menu/sides-1.png",
    basePrice: 15,
    available: true,
  },

  // --- SALADS ---
  {
    name: "Caesar Salad",
    category: "Salads",
    description: "Fresh romaine lettuce, parmesan, croutons, grilled chicken, caesar dressing.",
    image: "/menu/salads-1.png",
    basePrice: 40,
    available: true,
  },

  // --- MENU KIDS ---
  {
    name: "Mini Cheeseburger Meal",
    category: "Menu Kids",
    description: "Mini cheeseburger, small fries, small juice, and a toy.",
    image: "/menu/menu-kids-1.png",
    basePrice: 45,
    available: true,
  },

  // --- DESSERTS ---
  {
    name: "Cheesecake",
    category: "Desserts",
    description: "Classic New York style cheesecake with strawberry drizzle.",
    image: "/menu/desserts-1.png",
    basePrice: 30,
    available: true,
  },

  // --- MILKSHAKES ---
  {
    name: "Oreo Milkshake",
    category: "Milkshakes",
    description: "Thick vanilla shake blended with crushed Oreos.",
    image: "/menu/milkshakes-1.png",
    basePrice: 28,
    available: true,
  },

  // --- DRINKS ---
  {
    name: "Fresh Orange Juice",
    category: "Drinks",
    description: "Freshly squeezed orange juice.",
    image: "/menu/drinks-1.png",
    basePrice: 17,
    available: true,
  },
];
