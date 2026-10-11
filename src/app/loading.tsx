
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f6faf7]">
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Navbar Skeleton */}
        <div className="h-20 animate-pulse rounded-xl bg-gray-200" />

        {/* Hero Skeleton */}
        <div className="mt-5 h-64 animate-pulse rounded-2xl bg-gray-200" />

        {/* Products Skeleton */}
        <div className="mt-8">
          <div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-40 animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
