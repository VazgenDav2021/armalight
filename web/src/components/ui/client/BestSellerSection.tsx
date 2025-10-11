import Image from "next/image";
import React from "react";

type BestSellerProps = {
  imageUrl: string;
  title: string;
  text: string;
  button: { text: string; url: string };
};

const BestSellerSection = ({
  imageUrl,
  title,
  text,
  button,
}: BestSellerProps) => {
  return (
    <section className="w-full py-12">
      <div className="max-w-[1220px] mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 w-full">
          <Image
            src={imageUrl}
            alt={title}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
          <h2 className=" font-medium text-2xl md:text-3xl text-gray-900">
            {title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {text}
          </p>
          <div className="mt-6">
            <a
              href={button.url}
              className="inline-block px-6 py-3 bg-transparent text-[#565656] border-2 border-[#565656] rounded">
              {button.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellerSection;
