import { Link } from "@/core/i18n";
import { FacebookIcon } from "@/shared/components/icons/social/Facebook";
import { InstagramIcon } from "@/shared/components/icons/social/Instagram";
import { TwitterIcon } from "@/shared/components/icons/social/Twitter";
import { YoutubeIcon } from "@/shared/components/icons/social/Youtube";

export const SocialList = () => {
  const socialLinks = [
    {
      icon: <FacebookIcon />,
      href: "/",
    },
    {
      icon: <TwitterIcon />,
      href: "/",
    },
    {
      icon: <InstagramIcon />,
      href: "/",
    },
    {
      icon: <YoutubeIcon />,
      href: "/",
    },
  ];

  return (
    <ul className="flex list-none gap-4">
      {socialLinks.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            target="_blank"
            className="bg-primary-20 text-primary hover:bg-primary flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300 ease-in-out hover:text-white"
          >
            {link.icon}
          </Link>
        </li>
      ))}
    </ul>
  );
};
