"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
const router = useRouter();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [loading, setLoading] = useState(false);
const [socialLoading, setSocialLoading] = useState<
"google" | "github" | null

> (null);

async function handleSignup(event: FormEvent<HTMLFormElement>) {
event.preventDefault();


if (
  !name.trim() ||
  !email.trim() ||
  !password ||
  !confirmPassword
) {
  toast.error("সবগুলো ঘর পূরণ করো।");
  return;
}

if (password.length < 8) {
  toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
  return;
}

if (password !== confirmPassword) {
  toast.error("দুটি পাসওয়ার্ড মিলছে না।");
  return;
}

setLoading(true);
const toastId = toast.loading("অ্যাকাউন্ট তৈরি হচ্ছে...");

try {
  const result = await authClient.signUp.email({
    name: name.trim(),
    email: email.trim(),
    password,
  });

  if (result.error) {
    toast.error(
      result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।",
      { id: toastId }
    );
    return;
  }

  toast.success("অ্যাকাউন্ট তৈরি হয়েছে!", { id: toastId });
  router.replace("/");
  router.refresh();
} catch {
  toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।", {
    id: toastId,
  });
} finally {
  setLoading(false);
}


}

async function handleSocialSignup(provider: "google" | "github") {
setSocialLoading(provider);


const providerName = provider === "google" ? "Google" : "GitHub";

try {
  const result = await authClient.signIn.social({
    provider,
    callbackURL: "/",
    errorCallbackURL: "/signup",
  });

  if (result.error) {
    toast.error(
      result.error.message ||
        `${providerName} দিয়ে সাইন আপ করা যায়নি।`
    );
    setSocialLoading(null);
  }
} catch {
  toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
  setSocialLoading(null);
}


}

return (
<> <main className="flex min-h-[70vh] items-center justify-center bg-[#f6faf7] px-4 py-12"> <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8"> <div className="mb-7 text-center"> <h1 className="text-2xl font-bold text-gray-900">
নতুন অ্যাকাউন্ট তৈরি করো </h1>


        <p className="mt-2 text-sm leading-6 text-gray-500">
          বিনা খরচে সাইন আপ করে বাজার দর ও পণ্যের বিস্তারিত দেখুন।
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-5">
        <div>
          <label
            htmlFor="signup-name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            তোমার নাম
          </label>

          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            placeholder="তোমার নাম লেখো"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            required
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            ইমেইল
          </label>

          <input
            id="signup-email"
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
            htmlFor="signup-password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            পাসওয়ার্ড
          </label>

          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            minLength={8}
            required
          />
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            পাসওয়ার্ড নিশ্চিত করুন
          </label>

          <input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="আবার পাসওয়ার্ড লেখো"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            minLength={8}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || socialLoading !== null}
          className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
            : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />

        <span className="text-xs text-gray-500">
          অথবা সাইন আপ করো
        </span>

        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Google and GitHub signup buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSocialSignup("google")}
          disabled={loading || socialLoading !== null}
          className="flex min-w-0 items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {socialLoading === "google" ? (
            <span className="text-xs">সংযোগ হচ্ছে...</span>
          ) : (
            <>
              <svg
                aria-hidden="true"
                viewBox="0 0 48 48"
                className="h-5 w-5 shrink-0"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.06 13.22l7.98 6.19C12.94 13.72 18.01 9.5 24 9.5Z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 37.99 46.98 31.8 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.04 28.59A14.4 14.4 0 0 1 9.25 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.93 23.93 0 0 0 0 24c0 3.87.93 7.52 2.58 10.78l7.46-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.18 2.3-5.99 0-11.06-4.22-12.96-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>

              <span>Google</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignup("github")}
          disabled={loading || socialLoading !== null}
          className="flex min-w-0 items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {socialLoading === "github" ? (
            <span className="text-xs">সংযোগ হচ্ছে...</span>
          ) : (
            <>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0 fill-current"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.74 2.08 3.56 1.58.1-.73.39-1.22.7-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.45 3.05-1.15 3.05-1.15.61 1.55.23 2.7.11 2.98.72.78 1.16 1.78 1.16 3 0 4.29-2.62 5.23-5.11 5.51.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>

              <span>GitHub</span>
            </>
          )}
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="font-semibold text-green-700 hover:underline"
        >
          সাইন ইন করো
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

  <Footer />
</>


);
}
