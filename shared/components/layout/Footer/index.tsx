import Image from 'next/image';
import { SocialList } from './components/SocialList';
import { FooterLinks } from './components/FooterLinks';
import { FooterContact } from './components/FooterContact';
import { ContactInfo, SocialMedia } from '@/shared/services/content';

interface FooterProps {
  contactInfo: ContactInfo | null;
  socialMedia: SocialMedia | null;
}

export const Footer = ({ contactInfo, socialMedia }: FooterProps) => {
  return (
    <footer className="bg-white py-12">
      <div className="container">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="w-full md:min-w-84">
            <Image src={socialMedia?.logo || ''} alt={'Energy Elhadad Logo'} width={100} height={100} />

            {socialMedia?.slogan && <p className="body-m text-signalGray my-6 max-w-full">{socialMedia?.slogan}</p>}

            <SocialList socialMedia={socialMedia} />
          </div>

          <FooterLinks />

          <FooterContact contactInfo={contactInfo} />
        </div>
      </div>
    </footer>
  );
};
