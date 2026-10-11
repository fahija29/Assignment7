"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [date, setDate] = useState("");

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
    <section className="mt-5 overflow-hidden rounded-2xl bg-[#edf7ef]">
      <div className="grid items-center gap-6 px-6 py-8 sm:px-8 md:grid-cols-2 md:px-10 md:py-10">
        <div>
          <p className="mb-2 text-sm font-medium text-green-700">
            {date}
          </p>

          <h2 className="max-w-xl text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার
            দাম — বাজারভিত্তিক বিস্তারিত, গড়,
            সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-5 inline-flex rounded-md bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্য"
            width={420}
            height={300}
            priority
            className="h-auto w-full max-w-[360px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}