import AnnouncementBar from "@/shared/components/layout/AnnouncementBar";
import { Footer } from "@/shared/components/layout/Footer";
import Header from "@/shared/components/layout/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <AnnouncementBar text="شحن مجاني للطلبات فوق 500 جنيه | خصومات تصل إلى 50% على منتجات مختارة" />
      <Header />
      <div className="w-full flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
