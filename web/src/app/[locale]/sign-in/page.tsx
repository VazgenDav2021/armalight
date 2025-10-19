"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { useCart } from "@/lib/cart/store";

export default function SignInPage() {
  const t = useTranslations("signIn");
  const router = useRouter();
  const { setUser } = useCart();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const email = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value || "";

    if (!email || !password) {
      setError(t("invalidCredentials"));
      return;
    }

    try {
      setLoading(true);
      await authService.login({ email, password });
      const user = await authService.getMe();
      setUser(user);

      router.push("/account");
    } catch (err: any) {
      setError(t("invalidCredentials"));
    } finally {
      setLoading(false);
      if (emailRef.current) emailRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg p-8 shadow bg-white">
        <h1 className="text-[24px] font-normal leading-[150%] text-[#565656]">
          {t("title")}
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-normal text-[#565656]">
              {t("mail")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              ref={emailRef}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-normal text-[#565656]">
              {t("password")}
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                ref={passwordRef}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
              />
              <button
                type="button"
                aria-label="Show password"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-[#565656] hover:text-gray-800">
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <div className="mt-2">
              <a
                href="/forgot-password"
                className="text-sm font-normal text-[#565656] hover:underline">
                {t("forgetPassword")}
              </a>
            </div>
          </div>
          {error && (
            <div className="mt-4 text-sm text-red-600 text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-md bg-brand py-3 text-white text-base font-medium hover:bg-brand/90 focus:ring-2 focus:ring-brand focus:ring-offset-2">
            {loading ? t("loading") : t("enter")}
          </button>

          <div className="flex mt-8 items-center justify-center gap-1">
            <p className="text-center text-sm font-normal text-[#565656]">
              {t("dontHaveAccount")}
            </p>
            <a
              href="/register"
              className="font-medium text-brand hover:underline">
              {t("register")}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
