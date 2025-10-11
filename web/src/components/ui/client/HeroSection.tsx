import React from "react";
import { useTranslations } from "next-intl";

type HeroButton = {
  URL: string;
  BACKGROUND?: string;
  TEXT: string;
};

const HeroSection = () => {
  const t = useTranslations("home");
  const buttons = t.raw("hero.BUTTONS") as HeroButton[];

  return (
    <section
      className="relative w-screen ml-[calc(-50vw+50%)] min-h-[80vh] flex items-center justify-center bg-cover bg-center text-center"
      style={{ backgroundImage: `url(/home/hero.svg)` }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 flex flex-col items-center gap-6">
        <h1 className=" font-thin text-[24px] sm:text-[28px] md:text-[32px] text-white">
          {t("hero.TITLE")}
        </h1>

        <p className=" text-[20px] sm:text-[24px] md:text-[28px] font-bold text-white">
          {t("hero.TEXT")}
        </p>
        {buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {buttons.map((btn, i) => (
              <a
                key={i}
                href={btn.URL}
                className="px-6 py-3 rounded-md border transition text-center"
                style={{
                  background: btn.BACKGROUND || "transparent",
                  color: btn.BACKGROUND === "transparent" ? "#fff" : "#000",
                  borderColor:
                    btn.BACKGROUND === "transparent" ? "#fff" : "transparent",
                }}>
                {t("hero.TEXT")}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
