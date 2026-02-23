import AnnouncementBar from '@/shared/components/layout/AnnouncementBar';
import { Footer } from '@/shared/components/layout/Footer';
import Header from '@/shared/components/layout/Header';
import { getMessages, getContactInfo, getSocialMedia } from '@/shared/services/content';
import React from 'react';
import { FloatingWhatsApp } from '@/shared/components/layout/FloatingWhatsApp';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const [{ result: messages }, { result: contactInfoArray }, { result: socialMediaArray }] = await Promise.all([getMessages(), getContactInfo(), getSocialMedia()]);

  const contactInfo = contactInfoArray?.[0] || null;
  const socialMedia = socialMediaArray?.[0] || null;

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <AnnouncementBar messages={messages} />
      <Header />
      <div className="h-full w-full flex-1">{children}</div>
      <Footer contactInfo={contactInfo} socialMedia={socialMedia} />
      {contactInfo?.whatsapp_number && <FloatingWhatsApp phoneNumber={contactInfo.whatsapp_number} />}
    </div>
  );
};

export default layout;
