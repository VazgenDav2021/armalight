"use server";

import React from "react";
import { makeGenerateMetadata } from "@/lib/seo";
import ContactSection from "@/components/ui/client/ContactSection";

export const generateMetadata = makeGenerateMetadata({
  namespace: "contact",
  baseUrl: "https://armlight.hy",
  routePath: "/",
  siteName: "ArmLight",
  imagePath: "/og-image.jpg",
  locales: ["hy", "en", "ru"],
});

const ContactPage = () => {
  return <ContactSection />;
};

export default ContactPage;
