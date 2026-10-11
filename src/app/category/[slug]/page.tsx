import Link from "next/link";
import { notFound } from "next/navigation";

import { getProductsByCategory } from "@/lib/api";
import { categories } from "@/lib/categories";
import CategorySort from "@/components/CategorySort";
export const instant = false;
type CategoryPageProps = {
params: Promise<{
slug: string;
}>;
};




















export default async function CategoryPage({
params,
}: CategoryPageProps) {
const { slug } = await params;

const category = categories.find(
(item) => item.slug === slug
);

if (!category) {
notFound();
}

const products = await getProductsByCategory(slug);

return ( <main className="min-h-screen bg-[#f6faf7]"> <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
{/* Back to Home */} <Link
       href="/"
       className="inline-flex text-sm font-medium text-green-700 transition hover:text-green-800 hover:underline"
     >
← হোমে ফিরে যান </Link>

```
    {/* Category Header */}
    <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-4xl">
          {category.icon}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {category.nameBn}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {category.nameBn} বিভাগের আজকের বাজারদর
          </p>
        </div>
      </div>

      <div className="w-fit rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
        {products.length.toLocaleString("bn-BD")}টি পণ্য
      </div>
    </div>

    {/* Products and Sorting */}
    <section className="mt-8">
      <CategorySort
        products={products}
        categoryName={category.nameBn}
      />
    </section>
  </div>
</main>


);
}
