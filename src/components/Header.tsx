
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Header = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      })
    );
  }, []);

  return (
    <header className="flex w-full items-center justify-between px-4 py-4">
      {/* Logo, Title and Date - Left Side */}
      <div className="flex items-center gap-2">
        <Image
          src="/logo-icon.png"
          alt="বাজার দর"
          height={40}
          width={40}
          priority
        />

        <div className="flex flex-col items-start">
          <span className="text-xl font-bold text-green-700">
            বাজার দর
          </span>

          <span className="text-sm text-gray-500">
            {date}
          </span>
        </div>
      </div>

      {/* Sign In and Sign Up - Right Side */}
      <div className="flex items-center gap-2">
        <button className="rounded-md bg-green-700 px-4 py-2 text-sm text-white hover:bg-green-800">
          সাইন ইন
        </button>

        <button className="rounded-md bg-green-700 px-4 py-2 text-sm text-white hover:bg-green-800">
          সাইন আপ
        </button>
      </div>
    </header>
  );
};

export default Header;