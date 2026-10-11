
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const categories = [
  { id: "chal", name: "চাল", icon: "🍚", slug: "chal" },
  { id: "dal", name: "ডাল", icon: "🫘", slug: "dal" },
  { id: "tel", name: "তেল", icon: "🛢️", slug: "tel" },
  { id: "sobji", name: "সবজি", icon: "🥬", slug: "sobji" },
  { id: "mach", name: "মাছ", icon: "🐟", slug: "mach" },
  { id: "mangsho", name: "মাংস", icon: "🍗", slug: "mangsho" },
  { id: "dim-dudh", name: "ডিম-দুধ", icon: "🥛", slug: "dim-dudh" },
  { id: "mosla", name: "মসলা", icon: "🌶️", slug: "mosla" },
];

export default function Header() {
  const [date, setDate] = useState("");

  const { data: session } = authClient.useSession();
  const user = session?.user ?? null;

  useEffect(() => {
    const today = new Date();

    setDate(
      today.toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      })
    );
  }, []);

  return (
    <header className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex min-h-[76px] items-center justify-between gap-4 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-200">
              <span
                role="img"
                aria-label="Shopping cart"
                className="text-2xl leading-none"
              >
                🛒
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold text-green-700 sm:text-xl">
                বাজার দর
              </span>

              <span className="text-xs text-gray-500 sm:text-sm">
                {date}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {user ? (
              <Link
                href="/profile"
                className="rounded-md bg-green-700 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-800 sm:px-4 sm:text-sm"
              >
                প্রোফাইল
              </Link>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-md border border-green-700 px-3 py-2 text-xs font-medium text-green-700 transition hover:bg-green-50 sm:px-4 sm:text-sm"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-md bg-green-700 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-800 sm:px-4 sm:text-sm"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="border-b border-gray-200"
        >
          <div className="flex flex-wrap items-center justify-start gap-1 py-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex shrink-0 items-center gap-1 rounded px-2 py-1 text-xs font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700 sm:text-sm"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

