"use client";



import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/categories";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="border-t border-gray-100">
      <div className="flex flex-wrap justify-center gap-1 py-2">
        {categories.map((category) => {
          const active =
            pathname === `/category/${category.slug}`;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`flex items-center gap-1 rounded-md px-3 py-2 text-xs font-medium transition sm:text-sm ${
                active
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}