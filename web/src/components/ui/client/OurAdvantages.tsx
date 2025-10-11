import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

const OurAdvantages = () => {
  const t = useTranslations("home.advantages");

  const items = t.raw("CHILDREN") as {
    LOGO: string;
    TITLE: string;
    TEXT: string;
  }[];

  return (
    <section className="w-full py-12">
      <div className="max-w-[1220px] mx-auto">
        <h2 className="text-2xl md:text-3xl text-[#565656] font-medium text-center mb-10">
          {t("TITLE")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex cursor-pointer flex-col items-center text-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <Image
                src={item.LOGO}
                alt={item.TITLE}
                width={60}
                height={60}
                className="mb-4"
              />
              <h3 className=" font-bold text-lg text-[#565656] mb-2">
                {item.TITLE}
              </h3>
              <p className="text-[#565656] font-normal text-sm leading-relaxed">
                {item.TEXT}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurAdvantages;
