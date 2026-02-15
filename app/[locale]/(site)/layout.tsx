import AnnouncementBar from '@/shared/components/layout/AnnouncementBar';
import { Footer } from '@/shared/components/layout/Footer';
import Header from '@/shared/components/layout/Header';
import { getMessages } from '@/shared/services/content';
import React from 'react';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { result: messages } = await getMessages();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AnnouncementBar messages={messages} />
      <Header />
      <div className="h-full w-full flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
