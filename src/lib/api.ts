const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

const CACHE_DURATION = 5 * 60 * 1000;

export type MarketPrice = {
market: string;
division: string;
min: number;
max: number;
};

export type Product = {
id: string | number;
slug: string;
name: string;
description: string;
category: string;
categoryNameBn: string;
categoryIcon: string;
unit: string;
price: number;
yesterday: number;
lastWeek: number;
lastMonth: number;
change: number;
direction: "up" | "down" | "flat";
image: string;
emoji: string;
markets: MarketPrice[];
};

export type Category = {
id: string | number;
slug: string;
nameBn: string;
icon: string;
};

type ApiProduct = {
id: string | number;
slug?: string;
nameBn?: string;
name?: string;
description?: string;
category?: string;
categoryNameBn?: string;
categoryIcon?: string;
unit?: string;
image?: string;
emoji?: string;
today?: number;
price?: number;
yesterday?: number;
lastWeek?: number;
lastMonth?: number;
change?:
| {
dir?: "up" | "down" | "flat";
pct?: number;
}
| number;
direction?: "up" | "down" | "flat";
markets?: MarketPrice[];
};

type ApiCategory = {
id?: string | number;
slug?: string;
nameBn?: string;
name?: string;
icon?: string;
};

type CachedProducts = {
data: Product[];
expiresAt: number;
};

class ApiError extends Error {
status: number;

constructor(status: number) {
super(`API request failed: ${status}`);
this.name = "ApiError";
this.status = status;
}
}

let cachedProducts: CachedProducts | null = null;
let productsRequest: Promise<Product[]> | null = null;

async function fetchApi<T>(url: string): Promise<T> {
const response = await fetch(url, {
cache: "no-store",
});

if (!response.ok) {
throw new ApiError(response.status);
}

return (await response.json()) as T;
}

function extractData(response: unknown): unknown {
if (
response &&
typeof response === "object" &&
"data" in response
) {
return (response as { data: unknown }).data;
}

return response;
}

function normalizeProduct(product: ApiProduct): Product {
const changeValue =
typeof product.change === "number"
? product.change
: product.change?.pct ?? 0;

const direction: "up" | "down" | "flat" =
typeof product.change === "object" &&
product.change?.dir
? product.change.dir
: product.direction ??
(changeValue > 0
? "up"
: changeValue < 0
? "down"
: "flat");

const name = product.nameBn ?? product.name ?? "নাম নেই";
const categoryIcon =
product.categoryIcon ?? product.emoji ?? "🛒";
const image = product.image ?? categoryIcon;

return {
id: product.id,
slug: product.slug ?? String(product.id),
name,
description: product.description ?? "",
category: product.category ?? "",
categoryNameBn: product.categoryNameBn ?? "",
categoryIcon,
unit: product.unit ?? "kg",
price: product.today ?? product.price ?? 0,
yesterday: product.yesterday ?? 0,
lastWeek: product.lastWeek ?? 0,
lastMonth: product.lastMonth ?? 0,
change: changeValue,
direction,
image,
emoji: product.emoji ?? image,
markets: Array.isArray(product.markets)
? product.markets
: [],
};
}

function extractProducts(response: unknown): ApiProduct[] {
const data = extractData(response);

if (Array.isArray(data)) {
return data as ApiProduct[];
}

if (data && typeof data === "object") {
const object = data as {
products?: unknown;
};


if (Array.isArray(object.products)) {
  return object.products as ApiProduct[];
}


}

throw new Error("API থেকে সঠিক পণ্যের তালিকা পাওয়া যায়নি।");
}

function extractSingleProduct(response: unknown): ApiProduct | null {
const data = extractData(response);

if (!data || typeof data !== "object" || Array.isArray(data)) {
return null;
}

if ("id" in data) {
return data as ApiProduct;
}

if ("product" in data) {
const product = (data as { product: unknown }).product;


if (
  product &&
  typeof product === "object" &&
  "id" in product
) {
  return product as ApiProduct;
}


}

return null;
}

async function requestProducts(): Promise<Product[]> {
const response = await fetchApi<unknown>(
`${BASE_URL}/products`
);

const products = extractProducts(response).map(normalizeProduct);

cachedProducts = {
data: products,
expiresAt: Date.now() + CACHE_DURATION,
};

return products;
}

export async function getProducts(): Promise<Product[]> {
if (cachedProducts && Date.now() < cachedProducts.expiresAt) {
return cachedProducts.data;
}

if (productsRequest) {
return productsRequest;
}

productsRequest = requestProducts();

try {
return await productsRequest;
} catch (error) {
if (cachedProducts) {
console.warn(
"Products API failed. Using previously cached products."
);


  return cachedProducts.data;
}

console.error("Products API error:", error);

return [];


} finally {
productsRequest = null;
}
}

export async function getProductById(
id: string | number
): Promise<Product | null> {
try {
const response = await fetchApi<unknown>(
`${BASE_URL}/products/${encodeURIComponent(String(id))}`
);


const product = extractSingleProduct(response);

if (product) {
  return normalizeProduct(product);
}

return null;


} catch (error) {
console.error(`Product API error for ID ${id}:`, error);


// Single Product API ব্যর্থ হলে সব পণ্য থেকে খোঁজে।
const products = await getProducts();

return (
  products.find(
    (product) => String(product.id) === String(id)
  ) ?? null
);


}
}

export async function getProductBySlug(
slug: string
): Promise<Product | null> {
const products = await getProducts();

const product = products.find(
(item) =>
item.slug === slug ||
String(item.id) === slug
);

if (!product) {
return null;
}

// নির্দিষ্ট ID-এর API থেকে সম্পূর্ণ তথ্য আনার চেষ্টা করে।
const detailedProduct = await getProductById(product.id);

return detailedProduct ?? product;
}

export async function getProductsByCategory(
slug: string
): Promise<Product[]> {
const products = await getProducts();

return products.filter(
(product) => product.category === slug
);
}

export async function getCategories(): Promise<Category[]> {
try {
const response = await fetchApi<unknown>(
`${BASE_URL}/categories`
);

const data = extractData(response);

if (!Array.isArray(data)) {
  return [];
}

return (data as ApiCategory[]).map((category) => ({
  id: category.id ?? category.slug ?? "",
  slug: category.slug ?? String(category.id ?? ""),
  nameBn: category.nameBn ?? category.name ?? "",
  icon: category.icon ?? "🛒",
}));

} catch (error) {
console.error("Categories API error:", error);
return [];
}
}
