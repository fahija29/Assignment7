"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
      return;
    }

    if (user) {
      setName(user.name || "");
    }
  }, [user, isPending, router]);

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন।");
      return;
    }

    setIsUpdating(true);

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
      });

      if (result.error) {
        toast.error(result.error.message || "তথ্য আপডেট করা যায়নি।");
        return;
      }

      toast.success("তথ্য সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch {
      toast.error("তথ্য আপডেট করা যায়নি।");
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে।");

      // Sign out করার পর Homepage-এ যাবে
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি।");
    } finally {
      setIsSigningOut(false);
    }
  }

  if (isPending || !user) {
    return (
      <main className="min-h-[70vh] bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mt-3 h-5 w-80 animate-pulse rounded bg-gray-200" />
          <div className="mt-8 h-64 animate-pulse rounded-2xl bg-white" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-gray-50 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              আমার প্রোফাইল
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </div>

          {/* Sign out */}
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
          >
            ↩ {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
          </button>
        </div>

        {/* Profile Card */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Name Dropdown */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex w-full items-center justify-between px-5 py-5 text-left transition hover:bg-gray-50 sm:px-6"
          >
            <span className="text-lg font-semibold text-gray-900">
              {user.name || "Rezwan"}
            </span>

            <span
              className={`text-lg text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          {/* Information */}
          {isOpen && (
            <div className="border-t border-gray-100 px-5 py-6 sm:px-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                তথ্য
              </h2>

              <form onSubmit={handleUpdate} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    নাম
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Rezwan"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    ইমেইল
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={user.email || "you@example.com"}
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none"
                  />
                </div>

                {/* Update */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}