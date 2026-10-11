"use client";

import { useEffect, useState } from "react";
import { Product, getProducts } from "@/lib/api";
import { formatChange, formatPrice } from "@/lib/utils";

const fallbackProducts: Product[] = [
// চাল
{
id: "chal-1",
slug: "shornomushi-chal",
name: "স্বর্ণমাছি চাল",
description: "",
category: "chal",
categoryNameBn: "চাল",
categoryIcon: "🍚",
unit: "কেজি",
price: 148,
yesterday: 145,
lastWeek: 0,
lastMonth: 0,
change: 2.1,
direction: "up",
image: "",
emoji: "🍚",
markets: [],
},
{
id: "chal-2",
slug: "miniket-chal",
name: "মিনিকেট চাল",
description: "",
category: "chal",
categoryNameBn: "চাল",
categoryIcon: "🍚",
unit: "কেজি",
price: 99,
yesterday: 102,
lastWeek: 0,
lastMonth: 0,
change: -2.9,
direction: "down",
image: "",
emoji: "🍚",
markets: [],
},
{
id: "chal-3",
slug: "batam-size-chal",
name: "বাটাম সাইজ চাল",
description: "",
category: "chal",
categoryNameBn: "চাল",
categoryIcon: "🍚",
unit: "কেজি",
price: 66,
yesterday: 64,
lastWeek: 0,
lastMonth: 0,
change: 3.1,
direction: "up",
image: "",
emoji: "🍚",
markets: [],
},

// ডাল
{
id: "dal-1",
slug: "mosur-dal",
name: "মসুর ডাল",
description: "",
category: "dal",
categoryNameBn: "ডাল",
categoryIcon: "🫘",
unit: "কেজি",
price: 142,
yesterday: 138,
lastWeek: 0,
lastMonth: 0,
change: 2.9,
direction: "up",
image: "",
emoji: "🫘",
markets: [],
},
{
id: "dal-2",
slug: "chola",
name: "ছোলা",
description: "",
category: "dal",
categoryNameBn: "ডাল",
categoryIcon: "🫘",
unit: "কেজি",
price: 120,
yesterday: 123,
lastWeek: 0,
lastMonth: 0,
change: -2.4,
direction: "down",
image: "",
emoji: "🫘",
markets: [],
},
{
id: "dal-3",
slug: "amon-dal",
name: "আমন ডাল (খোসাসিলা)",
description: "",
category: "dal",
categoryNameBn: "ডাল",
categoryIcon: "🫘",
unit: "কেজি",
price: 156,
yesterday: 152,
lastWeek: 0,
lastMonth: 0,
change: 2.6,
direction: "up",
image: "",
emoji: "🫘",
markets: [],
},

// তেল
{
id: "tel-1",
slug: "soybean-oil",
name: "সয়াবিন তেল",
description: "",
category: "tel",
categoryNameBn: "তেল",
categoryIcon: "🛢️",
unit: "লিটার",
price: 170,
yesterday: 168,
lastWeek: 0,
lastMonth: 0,
change: 1.2,
direction: "up",
image: "",
emoji: "🛢️",
markets: [],
},
{
id: "tel-2",
slug: "mustard-oil",
name: "সরিষার তেল",
description: "",
category: "tel",
categoryNameBn: "তেল",
categoryIcon: "🛢️",
unit: "লিটার",
price: 240,
yesterday: 245,
lastWeek: 0,
lastMonth: 0,
change: -2.0,
direction: "down",
image: "",
emoji: "🛢️",
markets: [],
},

// সবজি
{
id: "sobji-1",
slug: "potato",
name: "আলু",
description: "",
category: "sobji",
categoryNameBn: "সবজি",
categoryIcon: "🥬",
unit: "কেজি",
price: 35,
yesterday: 33,
lastWeek: 0,
lastMonth: 0,
change: 6.1,
direction: "up",
image: "",
emoji: "🥔",
markets: [],
},
{
id: "sobji-2",
slug: "tomato",
name: "টমেটো",
description: "",
category: "sobji",
categoryNameBn: "সবজি",
categoryIcon: "🥬",
unit: "কেজি",
price: 60,
yesterday: 65,
lastWeek: 0,
lastMonth: 0,
change: -7.7,
direction: "down",
image: "",
emoji: "🍅",
markets: [],
},
{
id: "sobji-3",
slug: "onion",
name: "পেঁয়াজ",
description: "",
category: "sobji",
categoryNameBn: "সবজি",
categoryIcon: "🥬",
unit: "কেজি",
price: 70,
yesterday: 68,
lastWeek: 0,
lastMonth: 0,
change: 2.9,
direction: "up",
image: "",
emoji: "🧅",
markets: [],
},

// মাছ
{
id: "mach-1",
slug: "rui-fish",
name: "রুই মাছ",
description: "",
category: "mach",
categoryNameBn: "মাছ",
categoryIcon: "🐟",
unit: "কেজি",
price: 350,
yesterday: 340,
lastWeek: 0,
lastMonth: 0,
change: 2.9,
direction: "up",
image: "",
emoji: "🐟",
markets: [],
},
{
id: "mach-2",
slug: "tilapia-fish",
name: "তেলাপিয়া মাছ",
description: "",
category: "mach",
categoryNameBn: "মাছ",
categoryIcon: "🐟",
unit: "কেজি",
price: 220,
yesterday: 225,
lastWeek: 0,
lastMonth: 0,
change: -2.2,
direction: "down",
image: "",
emoji: "🐟",
markets: [],
},

// মাংস
{
id: "mangsho-1",
slug: "broiler-chicken",
name: "ব্রয়লার মুরগি",
description: "",
category: "mangsho",
categoryNameBn: "মাংস",
categoryIcon: "🍗",
unit: "কেজি",
price: 190,
yesterday: 185,
lastWeek: 0,
lastMonth: 0,
change: 2.7,
direction: "up",
image: "",
emoji: "🍗",
markets: [],
},
{
id: "mangsho-2",
slug: "beef",
name: "গরুর মাংস",
description: "",
category: "mangsho",
categoryNameBn: "মাংস",
categoryIcon: "🍗",
unit: "কেজি",
price: 750,
yesterday: 750,
lastWeek: 0,
lastMonth: 0,
change: 0,
direction: "same",
image: "",
emoji: "🥩",
markets: [],
},

// ডিম-দুধ
{
id: "dim-dudh-1",
slug: "eggs",
name: "মুরগির ডিম",
description: "",
category: "dim-dudh",
categoryNameBn: "ডিম-দুধ",
categoryIcon: "🥛",
unit: "টি",
price: 13,
yesterday: 12,
lastWeek: 0,
lastMonth: 0,
change: 8.3,
direction: "up",
image: "",
emoji: "🥚",
markets: [],
},
{
id: "dim-dudh-2",
slug: "milk",
name: "তরল দুধ",
description: "",
category: "dim-dudh",
categoryNameBn: "ডিম-দুধ",
categoryIcon: "🥛",
unit: "লিটার",
price: 90,
yesterday: 90,
lastWeek: 0,
lastMonth: 0,
change: 0,
direction: "same",
image: "",
emoji: "🥛",
markets: [],
},

// মসলা
{
id: "mosla-1",
slug: "turmeric-powder",
name: "হলুদের গুঁড়া",
description: "",
category: "mosla",
categoryNameBn: "মসলা",
categoryIcon: "🌶️",
unit: "কেজি",
price: 320,
yesterday: 315,
lastWeek: 0,
lastMonth: 0,
change: 1.6,
direction: "up",
image: "",
emoji: "🌶️",
markets: [],
},
{
id: "mosla-2",
slug: "chili-powder",
name: "মরিচের গুঁড়া",
description: "",
category: "mosla",
categoryNameBn: "মসলা",
categoryIcon: "🌶️",
unit: "কেজি",
price: 380,
yesterday: 370,
lastWeek: 0,
lastMonth: 0,
change: 2.7,
direction: "up",
image: "",
emoji: "🌶️",
markets: [],
},
];

export default function PriceTicker() {
const [products, setProducts] = useState<Product[]>(fallbackProducts);

useEffect(() => {
let cancelled = false;


async function loadProducts() {
  try {
    const apiProducts = await getProducts();

    if (!cancelled && apiProducts.length > 0) {
      setProducts(apiProducts);
    }
  } catch (error) {
    console.error("Running price ticker:", error);
  }
}

loadProducts();

return () => {
  cancelled = true;
};


}, []);

// তালিকাটি দুইবার রাখা হয়েছে, যাতে চলমান অ্যানিমেশন মসৃণ থাকে।
const tickerItems = [...products, ...products];

return ( <section
   aria-label="চলমান বাজারদর"
   className="w-full overflow-hidden border-y border-gray-200 bg-[#f4faf5]"
 > <div className="ticker-track flex w-max items-center py-3">
{tickerItems.map((product, index) => {
const positive = product.change > 0;
const negative = product.change < 0;


      return (
        <div
          key={`${product.id}-${index}`}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap px-5 text-xs sm:px-6 sm:text-sm"
        >
          <span className="text-base">
            {product.emoji || product.categoryIcon || "🛒"}
          </span>

          <span className="font-semibold text-gray-800">
            {product.name}
          </span>

          <span className="text-gray-500">
            {formatPrice(product.price)} টাকা/
            {product.unit.replace("প্রতি ", "")}
          </span>

          <span
            className={
              positive
                ? "font-semibold text-green-600"
                : negative
                  ? "font-semibold text-red-500"
                  : "font-semibold text-gray-400"
            }
          >
            {positive ? "▲" : negative ? "▼" : "—"}{" "}
            {formatChange(product.change)}%
          </span>

          <span className="ml-2 text-gray-300" aria-hidden="true">
            ◆
          </span>
        </div>
      );
    })}
  </div>
</section>


);
}
