"use client";

import { Link } from "@/core/i18n";
import { useTranslations } from "next-intl";

export const FooterLinks = () => {
  const t = useTranslations("Footer");

  const quickLinks = [
    {
      title: t("about"),
      href: "/about",
    },
    {
      title: t("products"),
      href: "/products",
    },
    {
      title: t("special_offers"),
      href: "/special-offers",
    },
    {
      title: t("contact_us"),
      href: "/contact-us",
    },
    {
      title: t("terms"),
      href: "/terms-and-conditions",
    },
  ];

  return (
    <div className="w-full">
      <h3 className="mb-4 text-2xl font-semibold text-black">
        {t("quick_links_title")}
      </h3>

      <ul className="flex list-none flex-col gap-2">
        {quickLinks.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-signalGray hover:text-primary"
            >
              <span className="body-m">{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
