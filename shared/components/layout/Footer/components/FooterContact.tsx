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

  const contactsLinks = contactInfo
    ? [
        {
          title: contactInfo.address,
          icon: <LocationIcon className="text-primary" />,
          href: contactInfo.map_url,
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        {
          title: contactInfo.phone_primary,
          icon: <PhoneIcon className="text-primary" />,
          href: `tel:${contactInfo.phone_primary}`,
        },
        {
          title: contactInfo.email,
          icon: <MailIcon className="text-primary" />,
          href: `mailto:${contactInfo.email}`,
        },
      ]
    : [
        {
          title: t('address_fallback'), // Fallback
          icon: <LocationIcon className="text-primary" />,
          href: '/',
        },
        {
          title: t('phone_fallback'), // Fallback
          icon: <PhoneIcon className="text-primary" />,
          href: '/',
        },
        {
          title: t('email_fallback'), // Fallback
          icon: <MailIcon className="text-primary" />,
          href: '/',
        },
      ];

  return (
    <div className="w-full max-w-115">
      <h3 className="mb-4 text-2xl font-semibold text-black">{t('contact_share_title')}</h3>

      <ul className="flex list-none flex-col gap-2">
        {contactsLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="text-signalGray hover:text-primary" {...(link.target ? { target: link.target, rel: link.rel } : {})}>
              <div className="flex items-center gap-2">
                {link.icon}
                <span className="body-m">{link.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* <NewsletterForm /> */}
    </div>
  );
};
