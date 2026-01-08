import AnnouncementBar from '@/shared/components/layout/AnnouncementBar'
import Header from '@/shared/components/layout/Header'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <AnnouncementBar text="شحن مجاني للطلبات فوق 500 جنيه | خصومات تصل إلى 50% على منتجات مختارة" />
      <Header />
      {children}
    </main>
  )
}

export default layout