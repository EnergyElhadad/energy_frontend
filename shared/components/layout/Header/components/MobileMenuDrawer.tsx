'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Menu, X, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/shared/components/ui/drawer';
import { CategoriesResponse } from '@/shared/services/categories';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
import { AuthLinksDropdown } from './AuthLinksDropdown';
import { UserMenu } from './UserMenu';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Link } from '@/core/i18n';
import { useLocale, useTranslations } from 'next-intl';

interface MobileMenuDrawerProps {
  categoriesData: CategoriesResponse;
}

export const MobileMenuDrawer = ({ categoriesData }: MobileMenuDrawerProps) => {
  const { status } = useSession();
  const t = useTranslations('Header');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const NavChevron = isRtl ? ChevronLeft : ChevronRight;
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsOpen(false);
    setIsCategoriesOpen(false);
  }, [pathname, searchParams]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) setIsCategoriesOpen(false);
  };

  const linksAfterCategories = [
    { href: '/products', label: t('all_products') },
    { href: '/about', label: t('company_profile') },
    { href: '/quality-policy', label: t('quality_policy') },
    { href: '/contact', label: t('contact_us') },
  ];

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <button className="flex items-center justify-center p-2 text-gray-700 lg:hidden" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-4/5 max-w-sm border-none lg:hidden">
        {/* Header: Logo + Close */}
        <div className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-3">
          <DrawerClose asChild>
            <Link href="/" className="flex items-center" aria-label="Home">
              <Image src="/images/header-logo.svg" alt="Logo" width={110} height={35} priority />
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <button className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </DrawerClose>
        </div>

        {/* Menu items */}
        <div className="flex-1 overflow-y-auto">
          <nav>
            {/* Home */}
            <DrawerClose asChild>
              <Link href="/" className="flex w-full items-center justify-between border-b border-gray-100 px-5 py-3.5 transition-colors hover:bg-gray-50">
                <span className="text-sm font-medium text-gray-700">{t('home')}</span>
                <NavChevron className="h-4 w-4 text-gray-400" />
              </Link>
            </DrawerClose>

            {/* Categories (collapsible) */}
            {categoriesData.result.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => setIsCategoriesOpen(prev => !prev)}
                  aria-expanded={isCategoriesOpen}
                  aria-controls="mobile-categories-panel"
                  className="flex w-full items-center justify-between border-b border-gray-100 px-5 py-3.5 transition-colors hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">{t('all_categories')}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoriesOpen && (
                  <div id="mobile-categories-panel" className="bg-gray-50">
                    {categoriesData.result.map(category => (
                      <DrawerClose asChild key={category.id}>
                        <Link
                          href={`/products?categoryId=${category.id}&categoryName=${encodeURIComponent(category.name)}`}
                          className="flex w-full items-center gap-3 border-b border-gray-100 px-5 py-3 transition-colors hover:bg-gray-100"
                        >
                          {category.image && (
                            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-white">
                              <Image src={category.image} alt={category.name} fill className="object-cover" />
                            </div>
                          )}
                          <span className="flex-1 text-sm font-medium text-gray-700">{category.name}</span>
                          <NavChevron className="h-4 w-4 shrink-0 text-gray-400" />
                        </Link>
                      </DrawerClose>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Other static links */}
            {linksAfterCategories.map(link => (
              <DrawerClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className="flex w-full items-center justify-between border-b border-gray-100 px-5 py-3.5 transition-colors hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">{link.label}</span>
                  <NavChevron className="h-4 w-4 text-gray-400" />
                </Link>
              </DrawerClose>
            ))}
          </nav>
        </div>

        {/* Footer (Auth & Language) */}
        <div className="mt-auto space-y-3 border-t border-gray-100 px-4 py-4">
          <div className="w-full">{status === 'authenticated' ? <UserMenu direction="up" /> : <AuthLinksDropdown direction="up" />}</div>
          <div className="flex w-full justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
