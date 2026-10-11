import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import Footer from "@/components/Footer";
import { getProducts, Product } from "@/lib/api";

export default async function Home() {
let products: Product[] = [];

try {
products = await getProducts();
} catch {
products = [];
}


const risers = [...products]
.filter((product) => product.change > 0)
.sort((a, b) => b.change - a.change)
.slice(0, 6);

const fallers = [...products]
.filter((product) => product.change < 0)
.sort((a, b) => a.change - b.change)
.slice(0, 6);

return ( <div className="min-h-screen bg-[#f6faf7]"> <main className="mx-auto max-w-6xl px-4">
{/* Hero */} <Hero />

```
    {/* Price Increased */}
    <ProductSection
      title="আজ দাম বেড়েছে ▲"
      subtitle="আজ যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে"
      products={risers}
    />

    {/* Price Decreased */}
    <ProductSection
      title="আজ দাম কমেছে ▼"
      subtitle="আজ যেসব পণ্যের দাম কমেছে"
      products={fallers}
    />

    {/* All Products */}
    <ProductSection
      id="সব-পণ্য"
      title="সব পণ্য"
      subtitle="আজকের সব পণ্যের বাজারদর এক জায়গায় দেখুন"
      products={products}
    />
  </main>

  <Footer />
</div>


);
}
