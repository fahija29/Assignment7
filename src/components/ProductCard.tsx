"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/api";
import { formatChange, formatPrice } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const router = useRouter();

  const positive = product.change > 0;
  const negative = product.change < 0;

  return (
    <button
      type="button"
      onClick={() => router.push(`/product/${product.slug}`)}
      className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Product Image */}
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f1f8f2] ml-3 mt-3">
        {product.image &&
        (product.image.startsWith("http://") ||
          product.image.startsWith("https://")) ? (
          <Image
            src={product.image}
            alt={product.name}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
        ) : (
          <span className="text-2xl">
            {product.image || product.emoji}
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="px-3 pb-3 pt-2">
        <h3 className="text-sm font-bold text-gray-900">
          {product.name}
        </h3>

        <p className="mt-0.5 text-[10px] text-gray-500">
          প্রতি {product.unit}
        </p>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-[9px] text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-0.5 text-base font-bold text-gray-900">
              {formatPrice(product.price)} টাকা
            </p>
          </div>

          <span
            className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
              positive
                ? "bg-red-50 text-red-600"
                : negative
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-500"
            }`}
          >
            {positive ? "▲" : negative ? "▼" : "—"}{" "}
            {formatChange(product.change)}%
          </span>
        </div>
      </div>
    </button>
  );
}