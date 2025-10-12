"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export default function RegisterPage() {
  const t = useTranslations("register");
  const router = useRouter();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const firstName = firstNameRef.current?.value.trim() || "";
    const lastName = lastNameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value || "";

    if (!firstName || !lastName || !email || !password) {
      setError(t("invalidData") || "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await authService.register({
        firstName,
        lastName,
        email,
        password,
      });
      router.push("/account");
    } catch (err: any) {
      setError(err.message || t("registrationFailed") || "Registration failed");
    } finally {
      setLoading(false);
      if (firstNameRef.current) firstNameRef.current.value = "";
      if (lastNameRef.current) lastNameRef.current.value = "";
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
              htmlFor="firstName"
              className="block text-sm font-normal text-[#565656]">
              {t("firstName")}
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder={t("firstName")}
              required
              ref={firstNameRef}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-normal text-[#565656]">
              {t("lastName")}
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder={t("lastName")}
              required
              ref={lastNameRef}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-normal text-[#565656]">
              {t("email")}
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
                type="password"
                placeholder="••••••••"
                required
                ref={passwordRef}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
              />
              <button
                type="button"
                aria-label="Show password"
                onClick={() => {
                  if (passwordRef.current)
                    passwordRef.current.type =
                      passwordRef.current.type === "password"
                        ? "text"
                        : "password";
                }}
                className="absolute inset-y-0 right-3 flex items-center text-[#565656] hover:text-gray-800">
                👁️
              </button>
            </div>
          </div>

          {/* 🔥 Сообщение об ошибке */}
          {error && (
            <div className="mt-4 text-sm text-red-600 text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-md bg-brand py-3 text-white text-base font-medium hover:bg-brand/90 focus:ring-2 focus:ring-brand focus:ring-offset-2">
           {t("register")}
          </button>

          <p className="mt-8 text-center text-sm font-normal text-[#565656]">
            {t("alreadyHaveAccount")}{" "}
            <a
              href="/sign-in"
              className="font-medium text-brand hover:underline">
              {t("signIn")}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
