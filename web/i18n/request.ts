import { getRequestConfig } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { locales } from "@/navigation";

function mergeMessages(...messages: Record<string, unknown>[]) {
  return Object.assign({}, ...messages);
}

export default getRequestConfig(async ({ locale }) => {
  setRequestLocale(locale);

  const normalizedLocale = locales.includes(locale) ? locale : "en";

  const [
    home,
    common,
    about,
    contact,
    cart,
    checkout,
    orderConfirmation,
    account,
    register,
    signIn,
    changePassowrd,
    changePasswordSuccess,
    registerSuccess,
    forgotPassword,
    category,
    resetPassword
  ] = await Promise.all([
    import(`../locales/${normalizedLocale}/home.json`),
    import(`../locales/${normalizedLocale}/common.json`),
    import(`../locales/${normalizedLocale}/about.json`),
    import(`../locales/${normalizedLocale}/contact.json`),
    import(`../locales/${normalizedLocale}/cart.json`),
    import(`../locales/${normalizedLocale}/checkout.json`),
    import(`../locales/${normalizedLocale}/order-confirmation.json`),
    import(`../locales/${normalizedLocale}/account.json`),
    import(`../locales/${normalizedLocale}/register.json`),
    import(`../locales/${normalizedLocale}/sign-in.json`),
    import(`../locales/${normalizedLocale}/change-password.json`),
    import(`../locales/${normalizedLocale}/change-password-success.json`),
    import(`../locales/${normalizedLocale}/register-success.json`),
    import(`../locales/${normalizedLocale}/forgot-password.json`),
    import(`../locales/${normalizedLocale}/category.json`),
    import(`../locales/${normalizedLocale}/reset-password.json`)
  ]);

  return {
    locale: normalizedLocale,
    messages: mergeMessages(
      home.default,
      common.default,
      about.default,
      contact.default,
      cart.default,
      checkout.default,
      orderConfirmation.default,
      account.default,
      register.default,
      signIn.default,
      changePassowrd.default,
      changePasswordSuccess.default,
      registerSuccess.default,
      forgotPassword.default,
      category.default,
      resetPassword.default
    ),
  };
});
