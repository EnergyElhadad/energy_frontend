import { Link } from "@/core/i18n";
import Image from "next/image";
import React from "react";
import { SocialList } from "./components/SocialList";
import { LocationIcon } from "@/shared/components/icons/Location";
import { PhoneIcon } from "@/shared/components/icons/Phone";
import { MailIcon } from "@/shared/components/icons/Mail";

export const Footer = () => {
  const quickLinks = [
    {
      title: "عن الشركة",
      href: "/about",
    },
    {
      title: "المنتجات",
      href: "/products",
    },
    {
      title: "العروض الخاصة",
      href: "/special-offers",
    },
    {
      title: "تواصل معنا",
      href: "/contact-us",
    },
    {
      title: "الشروط والاحكام",
      href: "/terms-and-conditions",
    },
  ];

  const contactsLinks = [
    {
      title: "123 شارع التحرير، القاهرة، مصر",
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

            <p className="body-m text-signalGray my-6">
              متجرك الموثوق للمنتجات الكهربائية عالية الجودة بأفضل الأسعار في
              مصر
            </p>

            <SocialList />
          </div>

          <div className="w-full">
            <h3 className="mb- mb-4 text-2xl font-semibold text-black">
              روابط سريعة
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

          <div className="w-full max-w-115">
            <h3 className="mb- mb-4 text-2xl font-semibold text-black">
              تواصل معنا
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

            <div className="mt-4">
              <h4>اشترك في النشرة الإخبارية</h4>

              <div className="flex gap-2">
                <input type="email" placeholder="بريدك الإلكتروني" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
