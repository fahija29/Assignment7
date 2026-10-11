
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
export const instant = false;
type ProductPageProps = {
  params: Promise<{ slug: string }>;
};












function formatPrice(price: number): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackUrl=/product/${slug}`);
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">
          পণ্যটি পাওয়া যায়নি
        </h1>

        <Link
          href="/"
          className="mt-3 inline-block text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  const priceDifference = product.price - product.yesterday;
  const isPriceUp = priceDifference > 0;
  const isPriceDown = priceDifference < 0;
  const isPriceSame = priceDifference === 0;

  const percentage =
    product.yesterday > 0
      ? Math.abs((priceDifference / product.yesterday) * 100)
      : Math.abs(product.change);

  const marketPrices = product.markets.flatMap((market) => [
    market.min,
    market.max,
  ]);








  
  const minimumPrice =
    marketPrices.length > 0 ? Math.min(...marketPrices) : product.price;

  const maximumPrice =
    marketPrices.length > 0 ? Math.max(...marketPrices) : product.price;

  const averagePrice =
    marketPrices.length > 0
      ? marketPrices.reduce((total, price) => total + price, 0) /
        marketPrices.length
      : product.price;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>

        <span>/</span>

        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>

        <span>/</span>

        <span className="font-medium text-gray-900">{product.name}</span>
      </nav>

      {/* Product Information */}
      <section className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-3 sm:gap-6">
          {/* Product Name and Yesterday's Price */}
          <div className="flex min-w-0 flex-1 items-start gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-2xl sm:h-12 sm:w-12 sm:text-3xl">
              {product.emoji}
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-bold leading-7 text-gray-900 sm:text-xl">
                {product.name}
              </h1>

              <p className="mt-0.5 text-sm text-gray-500">
                প্রতি {product.unit} · {product.categoryNameBn}
              </p>

              <p className="mt-1.5 text-xs text-gray-500 sm:text-sm">
                গতকালের দাম:{" "}
                <span className="font-semibold text-green-700">
                  ৳{formatPrice(product.yesterday)}
                </span>{" "}
                / {product.unit}
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="shrink-0 text-right">
            <p className="text-xs font-medium text-gray-500 sm:text-sm">
              আজকের দাম
            </p>

            <p className="mt-1 whitespace-nowrap text-xl font-extrabold text-green-700 sm:text-3xl">
              ৳{formatPrice(product.price)}
              <span className="ml-1 text-xs font-semibold text-gray-500 sm:text-sm">
                /{product.unit}
              </span>
            </p>

            {isPriceUp && (
              <div className="mt-1 flex items-center justify-end gap-1">
                <span className="text-sm font-extrabold text-red-600">
                  ▲
                </span>

                <span className="text-sm font-bold text-red-600">
                  {formatPrice(percentage)}%
                </span>
              </div>
            )}

            {isPriceDown && (
              <div className="mt-1 flex items-center justify-end gap-1">
                <span className="text-sm font-extrabold text-green-700">
                  ▼
                </span>

                <span className="text-sm font-bold text-green-700">
                  {formatPrice(percentage)}%
                </span>
              </div>
            )}

            {isPriceSame && (
              <p className="mt-1 text-sm font-bold text-gray-500">০%</p>
            )}
          </div>
        </div>

        {/* Price Change Message */}
        <div className="mt-2 border-t border-gray-100 pt-2">
          {isPriceUp && (
            <p className="text-sm leading-6 text-gray-700">
              গতকালের তুলনায় আজ দাম{" "}
              <span className="font-bold text-red-600">বেড়েছে</span>
              {" · "}
              <span className="font-bold text-red-600">
                {formatPrice(priceDifference)} টাকা
              </span>
            </p>
          )}

          {isPriceDown && (
            <p className="text-sm leading-6 text-gray-700">
              গতকালের তুলনায় আজ দাম{" "}
              <span className="font-bold text-green-700">কমেছে</span>
              {" · "}
              <span className="font-bold text-green-700">
                {formatPrice(Math.abs(priceDifference))} টাকা
              </span>
            </p>
          )}

          {isPriceSame && (
            <p className="text-sm leading-6 text-gray-600">
              গতকালের তুলনায় আজ দামের কোনো পরিবর্তন হয়নি।
            </p>
          )}
        </div>
      </section>

      {/* Price Summary */}
      <section className="mb-6">
        <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-3 items-stretch gap-2.5 sm:gap-4">
          {/* Minimum Price - Red */}
          <div className="flex min-w-0 flex-col justify-center rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
            <p className="text-xs leading-5 text-gray-600 sm:text-sm">
              সর্বনিম্ন দাম
            </p>

            <p className="mt-1 break-words text-base font-bold text-green-600 sm:text-2xl">
              ৳{formatPrice(minimumPrice)}
            </p>
          </div>

          {/* Average Price - Green */}
          <div className="flex min-w-0 flex-col justify-center rounded-xl border border-gray-200 bg-green-50/40 p-3 sm:p-4">
            <p className="text-xs leading-5 text-gray-600 sm:text-sm">
              গড় দাম
            </p>

            <p className="mt-1 break-words text-base font-bold text-green-700 sm:text-2xl">
              ৳{formatPrice(averagePrice)}
            </p>
          </div>

          {/* Maximum Price - Red */}
          <div className="flex min-w-0 flex-col justify-center rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
            <p className="text-xs leading-5 text-gray-600 sm:text-sm">
              সর্বোচ্চ দাম
            </p>

            <p className="mt-1 break-words text-base font-bold text-red-600 sm:text-2xl">
              ৳{formatPrice(maximumPrice)}
            </p>
          </div>
        </div>
      </section>

      {/* Market Prices Table */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            
         

          
            বাজারভেদে পণ্যের সর্বনিম্ন ও সর্বোচ্চ দাম
           </h2>
        </div>

        {product.markets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-separate border-spacing-0 text-left text-sm">
              <thead className="text-gray-600">
                <tr>
                  <th className="border-b border-r border-gray-200 bg-white px-4 py-3 font-semibold sm:px-5">
                    বাজারের নাম
                  </th>

                  <th className="border-b border-r border-gray-200 bg-green-50/30 px-4 py-3 font-semibold sm:px-5">
                    সর্বনিম্ন দাম
                  </th>

                  <th className="border-b border-r border-gray-200 bg-white px-4 py-3 font-semibold sm:px-5">
                    সর্বোচ্চ দাম
                  </th>

                  <th className="border-b border-gray-200 bg-green-50/30 px-4 py-3 font-semibold sm:px-5">
                    গড় দাম
                  </th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="border-b border-r border-gray-200 bg-white px-4 py-3 sm:px-5 sm:py-4">
                      <p className="font-semibold text-gray-900">
                        {market.market}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {market.division}
                      </p>
                    </td>

                    {/* Minimum Price - Red */}
                    <td className="border-b border-r border-gray-200 bg-green-50/30 px-4 py-3 font-medium text-green-600 sm:px-5">
                      ৳{formatPrice(market.min)}
                    </td>

                    {/* Maximum Price - Red */}
                    <td className="border-b border-r border-gray-200 bg-white px-4 py-3 font-medium text-red-600 sm:px-5">
                      ৳{formatPrice(market.max)}
                    </td>

                    {/* Average Price - Green */}
                    <td className="border-b border-gray-200 bg-green-50/30 px-4 py-3 font-semibold text-green-700 sm:px-5">
                      ৳{formatPrice((market.min + market.max) / 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-4 text-sm text-gray-500">
            এই পণ্যের বাজারভিত্তিক দাম এখন পাওয়া যাচ্ছে না।
          </p>
        )}
      </section>

      {/* Back Button */}
      <div className="mt-6">
        <Link
          href={`/category/${product.category}`}
          className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-green-600 hover:text-green-700"
        >
          ← {product.categoryNameBn} বিভাগে ফিরে যান
        </Link>
      </div>
    </main>
  );
}

