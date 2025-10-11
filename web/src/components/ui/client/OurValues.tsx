import Image from "next/image";
import { useTranslations } from "next-intl";

export default function OurValues() {
  const t = useTranslations("about.values");
  const values = t.raw("children") as {
    url: string;
    title: string;
    text: string;
  }[];

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-semibold mb-8 text-center text-[#565656]">
        {t("title")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center gap-4">
            <Image
              src={item.url}
              alt={item.title}
              width={64}
              height={64}
              className="mb-2"
            />
            <h3 className="text-xl text-[#565656] font-medium">{item.title}</h3>
            <p className="text-[#565656] text-sm">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
