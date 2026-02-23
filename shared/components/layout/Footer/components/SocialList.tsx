import { Link } from '@/core/i18n';
import { FacebookIcon } from '@/shared/components/icons/social/Facebook';
import { InstagramIcon } from '@/shared/components/icons/social/Instagram';
import { TwitterIcon } from '@/shared/components/icons/social/Twitter';
import { YoutubeIcon } from '@/shared/components/icons/social/Youtube';
import { useTranslations } from 'next-intl';
import { SocialMedia } from '@/shared/services/content';

interface SocialListProps {
  socialMedia: SocialMedia | null;
}

export const SocialList = ({ socialMedia }: SocialListProps) => {
  const t = useTranslations('Footer');

  const socialLinks = [];

  // If a URL does not exist or equals 'null', do not add it to the array.
  if (socialMedia?.facebook_url) {
    socialLinks.push({
      icon: <FacebookIcon />,
      href: socialMedia.facebook_url,
      label: t('facebook_label'),
    });
  }

  if (socialMedia?.x_url) {
    socialLinks.push({
      icon: <TwitterIcon />,
      href: socialMedia.x_url,
      label: t('twitter_label'),
    });
  }

  if (socialMedia?.instagram_url) {
    socialLinks.push({
      icon: <InstagramIcon />,
      href: socialMedia.instagram_url,
      label: t('instagram_label'),
    });
  }

  if (socialMedia?.youtube_url) {
    socialLinks.push({
      icon: <YoutubeIcon />,
      href: socialMedia.youtube_url,
      label: t('youtube_label'),
    });
  }

  return (
    <ul className="flex list-none gap-4">
      {socialLinks.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="bg-primary-20 text-primary hover:bg-primary flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300 ease-in-out hover:text-white"
          >
            {link.icon}
          </Link>
        </li>
      ))}
    </ul>
  );
};
