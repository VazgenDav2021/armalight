import Image from "next/image";
import { useTranslations } from "next-intl";
import LogoIcon from "@/icons/LogoIcon";

export default function Footer() {
  const t = useTranslations("common.footer");

  const links = t.raw("LINKS.children") as { title: string; url: string }[];
  const contact = t.raw("CONTACT_INFO.children") as {
    type: string;
    title: string;
  }[];

  return (
    <footer className="bg-[#154444] text-white">
      <div className="container max-w-[1220px] py-8 flex flex-col md:flex-row items-start justify-between gap-8">
        <LogoIcon color="#fff" />

        <div className="flex flex-col md:flex-row gap-[64px] w-full md:w-auto">
          <div>
            <div className="font-semibold mb-2">{t("LINKS.title")}</div>
            <ul className="space-y-1 text-sm">
              {links.map((l, idx) => (
                <li key={idx}>
                  <a className="hover:underline" href={l.url}>
                    {l.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-2">{t("CONTACT_INFO.title")}</div>
            <ul className="space-y-1 text-sm">
              {contact.map((c, idx) => (
                <li key={idx}>
                  {c.type === "email" ? (
                    <a href={`mailto:${c.title}`} className="hover:underline">
                      {c.title}
                    </a>
                  ) : c.type === "phone" ? (
                    <a href={`tel:${c.title}`} className="hover:underline">
                      {c.title}
                    </a>
                  ) : (
                    <span>{c.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-2">{t("FOLLOR_US.title")}</div>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram">
                <Image
                  src="/common/insta.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition"
                />
              </a>
              <a href="#" aria-label="Meta">
                <Image
                  src="/common/meta.svg"
                  alt="Meta"
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition"
                />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Image
                  src="/common/linkedin.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
