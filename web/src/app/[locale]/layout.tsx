import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { Locale } from "@/navigation";

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) => {
  const messages = await getMessages({ locale: params.locale });

  return (
    <html lang={params.locale}>
      <NextIntlClientProvider locale={params.locale} messages={messages}>
        <body>
          <Navbar locale={params.locale} />
          <main className="container max-w-[1220px] pt-16">{children}</main>
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
};

export default RootLayout;
