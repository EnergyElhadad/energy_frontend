"use client";

import { Link } from "@/core/i18n";
import { LocationIcon } from "@/shared/components/icons/Location";
import { MailIcon } from "@/shared/components/icons/Mail";
import { PhoneIcon } from "@/shared/components/icons/Phone";
import { useTranslations } from "next-intl";
import { NewsletterForm } from "./NewsletterForm";

export const FooterContact = () => {
  const t = useTranslations("Footer");

  const contactsLinks = [
    {
      title: "123 شارع التحرير، القاهرة، مصر", // This might need translation too, but keeping hardcoded as it wasn't in list or maybe generic address. user provided generic texts. I will keep it for now.
      icon: <LocationIcon className="text-primary" />,
      href: "/",
    },
    {
      title: "+20 123 456 7890",
      icon: <PhoneIcon className="text-primary" />,
      href: "/",
    },
    {
      title: "info@electrostore.com",
      icon: <MailIcon className="text-primary" />,
      href: "/",
    },
  ];

  return (
    <div className="w-full max-w-115">
      <h3 className="mb-4 text-2xl font-semibold text-black">
        {t("contact_share_title")}
      </h3>

      <ul className="flex list-none flex-col gap-2">
        {contactsLinks.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-signalGray hover:text-primary"
            >
              <div className="flex items-center gap-2">
                {link.icon}
                <span className="body-m">{link.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <NewsletterForm />
    </div>
  );
};
