"use client";

import ContactForm from "@/components/ui/client/ContactForm";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tt = useTranslations("common.footer.CONTACT_INFO");

  const contacts = tt.raw("children") as {
    type: "email" | "phone" | "geo";
    title: string;
  }[];

  return (
    <section className="space-y-12 w-full py-12">
      <h1 className="text-3xl font-semibold text-center md:text-left">
        {t("form.title")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start justify-items-center md:justify-items-stretch">
        <ContactForm />

        <div
          className="bg-white rounded-lg shadow p-6 space-y-6 text-center 
                        self-center w-full max-w-sm md:w-[308px] 
                        md:justify-self-end md:mr-[100px]">
          {contacts.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <Image
                src={`/contact/${item.type}.svg`}
                alt={item.type}
                width={24}
                height={24}
              />
              <div>{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-8 text-[32px] text-[#565656] text-center md:text-left">
          {t("info.ourAddress")}
        </p>
        <iframe
          src="https://maps.google.com/maps?q=Komitas%206/1,%20Yerevan&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="503"
          style={{ border: 0 }}
          loading="lazy"></iframe>
      </div>
    </section>
  );
}
