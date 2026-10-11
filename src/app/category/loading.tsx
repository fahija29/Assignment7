export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f6faf7]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {/* Back Skeleton */}
        <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

        {/* Category Header Skeleton */}
        <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 animate-pulse rounded-2xl bg-gray-200" />

            <div>
              <div className="h-8 w-28 animate-pulse rounded bg-gray-200" />

              <div className="mt-2 h-4 w-52 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
        </div>

        {/* Sort Skeleton */}
        <div className="mt-8 flex h-20 animate-pulse items-center justify-between rounded-xl bg-white p-4 shadow-sm">
          <div>
            <div className="h-4 w-24 rounded bg-gray-200" />

            <div className="mt-2 h-3 w-40 rounded bg-gray-200" />
          </div>

          <div className="h-10 w-48 rounded-lg bg-gray-200" />
        </div>

        {/* Product Skeletons */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <div className="h-44 animate-pulse bg-gray-200" />

              <div className="p-4">
                <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

                <div className="mt-2 h-3 w-20 animate-pulse rounded bg-gray-200" />

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />

                    <div className="mt-2 h-5 w-24 animate-pulse rounded bg-gray-200" />
                  </div>

                  <div className="h-6 w-14 animate-pulse rounded-full bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}