import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function CenteredMessage() {
  const t = useTranslations("orderConfirmation");

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
      <Image src="/common/success.svg" alt="icon" width={80} height={80} />
      <h2 className="text-2xl font-semibold color-[#565656]">{t("TITLE")}</h2>
      <Link
        href="/"
        className="bg-brand hover:bg-brand/90 text-white px-6 py-2 rounded-lg transition">
        {t("BUTTON_TITLE")}
      </Link>
    </div>
  );
}
