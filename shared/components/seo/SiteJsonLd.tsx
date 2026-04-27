import { SITE_URL } from '@/shared/utils/site-url';

interface SiteJsonLdProps {
  locale: string;
}

/**
 * Site-level structured data:
 *  - Organization: brand identity for Google's knowledge panel.
 *  - WebSite w/ SearchAction: lets Google render a sitelinks search box
 *    directly under your result when users search "energy elhadad".
 *
 * Render once, on the home page only.
 */
export const SiteJsonLd = ({ locale }: SiteJsonLdProps) => {
  const origin = SITE_URL;
  const logo = `${origin}/icon`; // served by app/icon.tsx

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Energy Elhadad',
    url: origin,
    logo,
    sameAs: [
      // TODO: fill in once the company confirms final social URLs.
      // 'https://www.facebook.com/energyelhadad',
      // 'https://www.instagram.com/energyelhadad',
    ].filter(Boolean),
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Energy Elhadad',
    url: `${origin}/${locale}`,
    inLanguage: locale === 'ar' ? 'ar-EG' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${origin}/${locale}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
};
