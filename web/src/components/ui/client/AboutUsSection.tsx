import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutUsSection() {
  const t = useTranslations("about");

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-center">
      <div className="relative w-full h-[300px] md:h-[400px] order-2 md:order-1">
        <Image
          src="/about/about.svg"
          alt={t("title")}
          fill
          className="object-cover rounded-[16px]"
        />
      </div>
      <div className="flex flex-col gap-6 order-1 md:order-2 text-[#565656]">
        <h2 className="text-3xl font-semibold ">{t("title")}</h2>
        <p className="leading-relaxed">{t("text")}</p>
      </div>
    </section>
  );
}
