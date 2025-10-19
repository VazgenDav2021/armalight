"use server";

import React from "react";
import { makeGenerateMetadata } from "@/lib/seo";
import ContactSection from "@/components/ui/client/ContactSection";
import { Locale } from "@/navigation";
import Navbar from "@/components/layout/Navbar";

export const generateMetadata = makeGenerateMetadata({
  namespace: "contact",
  baseUrl: "https://armlight.hy",
  routePath: "/",
  siteName: "ArmLight",
  imagePath: "/og-image.jpg",
  locales: ["hy", "en", "ru"],
});

const ContactPage = ({
  params: { locale },
}: {
  params: { locale: Locale };
}) => {
  return (
    <>
      <Navbar locale={locale} />
      <ContactSection />
    </>
  );
};

export default ContactPage;
