'use client';

import { Menu } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/shared/components/ui/drawer';
import { CategoriesResponse } from '@/shared/services/categories';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
import { AuthLinksDropdown } from './AuthLinksDropdown';
import { UserMenu } from './UserMenu';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Link } from '@/core/i18n';
import { X, Home } from 'lucide-react';

interface MobileMenuDrawerProps {
  categoriesData: CategoriesResponse;
}

export const MobileMenuDrawer = ({ categoriesData }: MobileMenuDrawerProps) => {
  const { status } = useSession();

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="flex items-center justify-center p-2 text-gray-700 lg:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-4/5 max-w-sm border-none lg:hidden">
        {/* Header */}
        <div className="flex w-full items-center justify-between border-b border-gray-100 p-4">
          <DrawerClose asChild>
            <button className="p-2 text-gray-400 hover:text-gray-900">
              <X className="h-6 w-6" />
            </button>
          </DrawerClose>

          <DrawerClose asChild>
            <Link href="/" className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200">
              الرئيسية
              <Home className="h-4 w-4 text-green-600" />
            </Link>
          </DrawerClose>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto pt-2">
          {categoriesData.result.map(category => (
            <DrawerClose asChild key={category.id}>
              <Link
                href={`/products?categoryId=${category.id}&categoryName=${encodeURIComponent(category.name)}`}
                className="flex w-full items-center justify-between border-b border-gray-100 px-6 py-4 transition-colors hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
                {category.image && (
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-200">
                    <Image src={category.image} alt={category.name} fill className="object-cover" />
                  </div>
                )}
              </Link>
            </DrawerClose>
          ))}

          {/* Static Links */}
          <DrawerClose asChild>
            <Link href="/products" className="flex w-full items-center justify-between border-b border-gray-100 px-6 py-4 transition-colors hover:bg-gray-50">
              <span className="text-sm font-medium text-gray-700">كل المنتجات</span>
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link href="/about" className="flex w-full items-center justify-between border-b border-gray-100 px-6 py-4 transition-colors hover:bg-gray-50">
              <span className="text-sm font-medium text-gray-700">تعريف بالشركة</span>
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link href="/quality-policy" className="flex w-full items-center justify-between border-b border-gray-100 px-6 py-4 transition-colors hover:bg-gray-50">
              <span className="text-sm font-medium text-gray-700">سياسة الجودة</span>
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link href="/contact" className="flex w-full items-center justify-between border-b border-gray-100 px-6 py-4 transition-colors hover:bg-gray-50">
              <span className="text-sm font-medium text-gray-700">تواصل معنا</span>
            </Link>
          </DrawerClose>
        </div>

        {/* Footer (Auth & Language) */}
        <div className="mt-auto space-y-6 border-t border-gray-100 p-6">
          <div className="flex w-full justify-center">{status === 'authenticated' ? <UserMenu /> : <AuthLinksDropdown />}</div>
          <div className="flex w-full justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
