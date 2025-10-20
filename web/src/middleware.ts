import createMiddleware from "next-intl/middleware";
import { locales } from "./navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  const anonymousKey = req.cookies.get("anonymousKey")?.value;
  let cartId = req.cookies.get("cartId")?.value;

  let guestKey = anonymousKey || undefined;

  if (!cartId) {
    const token = req.cookies.get("token")?.value;

    const params = new URLSearchParams();
    if (token) params.append("token", token);
    if (guestKey) params.append("anonymousKey", guestKey);

    const apiResponse = await fetch(
      `http://localhost:5000/api/cart/get-or-create?${params.toString()}`,
      {
        headers: { cookie: req.headers.get("cookie") || "" },
      }
    );

    const data = await apiResponse.json();

    if (data?._id) {
      cartId = data._id;
      res.cookies.set("cartId", cartId as string, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
      if (!anonymousKey && data.anonymousKey) {
        res.cookies.set("anonymousKey", data.anonymousKey as string, {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
        });
      }
    }
  }

  return res;
};

export const config = {
  matcher: ["/((?!_next|.*\\..*|admin-page(?:/.*)?).*)"],
};
