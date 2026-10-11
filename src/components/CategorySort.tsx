"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { type Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

type CategorySortProps = {
  products: Product[];
  categoryName: string;
};

export default function CategorySort({
  products,
  categoryName,
}: CategorySortProps) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, sort]);

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {categoryName} এর পণ্য
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label
            htmlFor="category-sort"
            className="text-sm font-medium text-gray-700"
          >
            দাম অনুযায়ী সাজান:
          </label>

          <select
            id="category-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">কম দাম → বেশি দাম</option>
            <option value="high">বেশি দাম → কম দাম</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white px-4 py-12 text-center">
          <div className="text-4xl" aria-hidden="true">
            📦
          </div>

          <h3 className="mt-3 text-base font-semibold text-gray-900">
            কোনো পণ্য পাওয়া যায়নি
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>

          <Link
            href="/"
            className="mt-4 inline-flex rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </Link>
        </div>
      )}
    </>
  );
  
}