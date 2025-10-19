"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductCard from "@/components/ui/client/ProductCard";
import { useTranslations } from "next-intl";
import { Locale } from "@/navigation";
import { ProductLocale } from "@/services/productService";

type SliderProps = {
  products: ProductLocale<Locale>[]
};

const Slider = ({ products }: SliderProps) => {
  const t = useTranslations("home");

  return (
    <section className="relative w-screen ml-auto">
      <h2 className="text-2xl font-semibold mb-4">{t("bestSellerTitle")}</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1.5}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        loop
        className="w-full">
        {products?.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
