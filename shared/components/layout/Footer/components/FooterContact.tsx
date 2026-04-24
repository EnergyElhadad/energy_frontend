'use client';

import { Link } from '@/core/i18n';
import { LocationIcon } from '@/shared/components/icons/Location';
import { MailIcon } from '@/shared/components/icons/Mail';
import { PhoneIcon } from '@/shared/components/icons/Phone';
import { useTranslations } from 'next-intl';
import { ContactInfo } from '@/shared/services/content';

interface FooterContactProps {
  contactInfo: ContactInfo | null;
}

export const FooterContact = ({ contactInfo }: FooterContactProps) => {
  const t = useTranslations('Footer');

  const { address, phone_primary, email, map_url } = contactInfo || {};

  const contactsLinks = [
    {
      title: address,
      icon: <LocationIcon className="text-primary" />,
      href: map_url,
      target: '_blank',
      rel: 'noopener noreferrer',
      ltr: false,
    },
    {
      title: phone_primary,
      icon: <PhoneIcon className="text-primary" />,
      href: phone_primary ? `tel:${phone_primary}` : undefined,
      ltr: true,
    },
    {
      title: email,
      icon: <MailIcon className="text-primary" />,
      href: email ? `mailto:${email}` : undefined,
      ltr: true,
    },
  ].filter(link => Boolean(link.title));

  if (contactsLinks.length === 0) return null;

  return (
    <div className="w-full max-w-115">
      <h3 className="mb-4 text-center text-2xl font-semibold text-black">{t('contact_share_title')}</h3>

      <ul className="mx-auto flex w-fit list-none flex-col gap-2">
        {contactsLinks.map((link, index) => {
          const row = (
            <div className="flex items-center gap-2" dir="ltr">
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">{link.icon}</span>
              <span className="body-m">{link.title}</span>
            </div>
          );

          return (
            <li key={index}>
              {link.href ? (
                <Link href={link.href} className="text-signalGray hover:text-primary" {...(link.target ? { target: link.target, rel: link.rel } : {})}>
                  {row}
                </Link>
              ) : (
                <div className="text-signalGray">{row}</div>
              )}
            </li>
          );
        })}
      </ul>

      {/* <NewsletterForm /> */}
    </div>
  );
};
