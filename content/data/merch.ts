import type { MerchItem } from "@/lib/types";

/** From https://90fmtrivia.org/merch.html for Trivia 56.
 *  Prices in USD. The watcher refreshes this annually. */
export const merch: MerchItem[] = [
  // Apparel
  { name: "Infant onesie", category: "apparel", price: 19, sizes: "6–24 mo" },
  { name: "Youth t-shirt", category: "apparel", price: 13, sizes: "XS–XL" },
  { name: "Adult t-shirt", category: "apparel", price: 16, sizes: "S–4XL" },
  { name: "Long-sleeve shirt", category: "apparel", price: 21, sizes: "S–4XL" },
  { name: "Women's-cut tee", category: "apparel", price: 18, sizes: "S–2XL" },
  { name: "Tie-dyed t-shirt", category: "apparel", price: 27, sizes: "S–2XL" },
  { name: "Sweatshirt", category: "apparel", price: 27, sizes: "S–4XL" },
  { name: "Sport pants", category: "apparel", price: 30, sizes: "S–2XL" },
  { name: "Hoodie", category: "apparel", price: 32, sizes: "S–4XL" },
  { name: "Zippered hoodie", category: "apparel", price: 45, sizes: "S–4XL" },
  // Headwear
  { name: "Baseball cap", category: "headwear", price: 18 },
  { name: "Bucket hat", category: "headwear", price: 14 },
  // Accessories
  { name: "Sticker set", category: "accessory", price: 10 },
  { name: "Acrylic pin", category: "accessory", price: 3 },
  { name: "Refrigerator magnet", category: "accessory", price: 4 },
  { name: "Cork coaster set (4)", category: "accessory", price: 18 },
  // Drinkware
  { name: "Coffee mug", category: "drinkware", price: 8 },
  { name: "Brewery pint glass", category: "drinkware", price: 7 },
  // Media
  {
    name: "TRIVIA TOWN movie",
    category: "media",
    price: 21,
    note: "Documentary about the contest",
  },
  {
    name: "NEW TRIVIA TIMES",
    category: "media",
    price: 10,
    note: "The contest publication — included with team registration",
  },
];
