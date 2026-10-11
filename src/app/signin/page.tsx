
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  async function handleSignin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখো।");
      return;
    }

    setLoading(true);

    const toastId = toast.loading("সাইন ইন হচ্ছে...");

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result.error) {
        toast.error(
          result.error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।",
          {
            id: toastId,
          }
        );
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!", {
        id: toastId,
        duration: 3000,
      });

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করো।", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignin(
    provider: "google" | "github"
  ) {
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/signin",
      });

      if (result.error) {
        toast.error(
          result.error.message ||
            `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করা যায়নি।`
        );
        setSocialLoading("");
      }
    } catch {
      toast.error(
        `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করা যায়নি।`
      );
      setSocialLoading("");
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f6faf7] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            আবার ফিরে এসেছ!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            তোমার অ্যাকাউন্টে সাইন ইন করো
          </p>
        </div>

        <form onSubmit={handleSignin} className="space-y-5">
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
              autoComplete="email"
              placeholder="example@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="তোমার পাসওয়ার্ড লেখো"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-xs text-gray-400">অথবা</span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignin("google")}
            disabled={loading || !!socialLoading}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.7 2.91-4.2 2.91-7.21Z"
              />
              <path
                fill="#34A853"
                d="M12 21.77c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.55 0-4.71-1.72-5.49-4.04H3.26v2.52A9.75 9.75 0 0 0 12 21.77Z"
              />
              <path
                fill="#FBBC05"
                d="M6.51 13.86a5.86 5.86 0 0 1 0-3.72V7.62H3.26a9.77 9.77 0 0 0 0 8.76l3.25-2.52Z"
              />
              <path
                fill="#EA4335"
                d="M12 6.1c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.18 14.63 2.23 12 2.23a9.75 9.75 0 0 0-8.74 5.39l3.25 2.52C7.29 7.82 9.45 6.1 12 6.1Z"
              />
            </svg>

            {socialLoading === "google"
              ? "অপেক্ষা..."
              : "Google"}
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignin("github")}
            disabled={loading || !!socialLoading}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.13c-3.2.7-3.87-1.35-3.87-1.35-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.07 11.07 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.08.78 2.18v3.23c0 .3.21.65.79.54A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>

            {socialLoading === "github"
              ? "অপেক্ষা..."
              : "GitHub"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন আপ করো
          </Link>
        </p>

        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-green-700"
          >
            ← হোম পেজে ফিরে যাও
          </Link>
        </div>
      </div>
    </main>
  );
}

