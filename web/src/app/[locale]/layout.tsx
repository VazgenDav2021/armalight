import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: "en" | "ru" | "hy" };
}) => {
  const messages = await getMessages({ locale: params.locale });

  return (
    <html lang={params.locale}>
      <NextIntlClientProvider locale={params.locale} messages={messages}>
        <body>
          <Navbar />
          <main className="container max-w-[1220px] pt-16">{children}</main>
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
};

export default RootLayout;
