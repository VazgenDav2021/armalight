import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function CategorySection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "common.navigation" });
  const root = t.raw("children")[0] as {
    title: string;
    children: { title: string; url: string }[];
  };

  const title = root.title;
  const categories = root.children;

  return (
    <section className="w-full py-12">
      <div className="max-w-[1220px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 text-center">
          {title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.url}
              className="group flex flex-col items-center">
              <div className="w-full h-[300px] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src="/placeholder-200x300.png"
                  alt={cat.title}
                  width={200}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="mt-3 text-gray-700 font-medium text-lg group-hover:text-gray-900 transition">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
