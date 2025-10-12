import AccountSidebar from "@/components/ui/client/AccountSidebar";
import AccountContent from "@/components/ui/client/AccountContent";
import { makeGenerateMetadata } from "@/lib/seo";
import { cookies } from "next/headers";
import { User } from "@/lib/types";

export const generateMetadata = makeGenerateMetadata({
  namespace: "account",
  baseUrl: "https://armlight.hy",
  routePath: "/",
  siteName: "ArmLight",
  imagePath: "/og-image.jpg",
  locales: ["hy", "en", "ru"],
});

async function getMeServer(): Promise<User | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const res = await fetch(`http://localhost:5000/api/auth/me`, {
      headers: {
        Cookie: `token=${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json() as Promise<User>;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}

export default async function AccountPage() {
  const user: User | null = await getMeServer();

  return (
    <section className="flex flex-col direct min-h-screen py-10">
      <div className="flex gap-32">
        <AccountSidebar />
        <AccountContent user={user} />
      </div>
    </section>
  );
}
