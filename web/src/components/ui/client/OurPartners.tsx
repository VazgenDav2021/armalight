import { useTranslations } from "next-intl";
import Image from "next/image";

const OurPartners = () => {
  const partners = [
    { src: "/home/partners/partner1.svg", alt: "Partner 1" },
    { src: "/home/partners/partner2.svg", alt: "Partner 2" },
    { src: "/home/partners/partner3.svg", alt: "Partner 3" },
    { src: "/home/partners/partner4.svg", alt: "Partner 4" },
    { src: "/home/partners/partner5.svg", alt: "Partner 5" },
    { src: "/home/partners/partner6.svg", alt: "Partner 6" },
  ];

  const t = useTranslations('home')

  return (
    <section className="w-full py-12">
      <div className="container max-w-[1220px] mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8">
          {t("ourPartnersTitle")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {partners.map((img, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-4 rounded cursor-pointer">
              <Image
                src={img.src}
                alt={img.alt}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
