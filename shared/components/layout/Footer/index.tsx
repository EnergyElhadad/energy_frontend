import Image from "next/image";
import { SocialList } from "./components/SocialList";
import { useTranslations } from "next-intl";
import { FooterLinks } from "./components/FooterLinks";
import { FooterContact } from "./components/FooterContact";

export const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-white py-12">
      <div className="container">
        <div className="flex justify-between gap-12">
          <div className="min-w-84">
            <Image
              src="/images/footer-logo.svg"
              alt="footer-logo"
              width={100}
              height={100}
            />

            <p className="body-m text-signalGray my-6">{t("description")}</p>

            <SocialList />
          </div>

          <FooterLinks />

          <FooterContact />
        </div>
      </div>
    </footer>
  );
};
