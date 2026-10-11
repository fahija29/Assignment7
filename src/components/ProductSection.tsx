import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/api";


type ProductSectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
};

export default function ProductSection({
  id,
  title,
  subtitle,
  products,
}: ProductSectionProps) {
  return (
    <section
      id={id}
      className="py-8 sm:py-10"
    >
      {/* Section Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}