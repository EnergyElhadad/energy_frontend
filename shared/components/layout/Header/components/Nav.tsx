import { AboutDropdown } from './AboutDropdown';
import { CategoriesDropdown } from './CategoriesDropdown';
import { Link } from '@/core/i18n';
import { getCategories } from '@/shared/services/categories.server';
import { getTranslations } from 'next-intl/server';

export const Nav = async () => {
  const categoriesData = await getCategories();
  const t = await getTranslations('Header');

  return (
    <nav className="border-Stroke hidden border-t py-[15px] lg:block">
      <div className="container">
        <ul className="flex list-none items-center gap-[24px]">
          <li className="border-Stroke border-e pe-[24px]">
            <CategoriesDropdown initialData={categoriesData} />
          </li>
          <li>
            <Link href="/" className="text-WetGray hover:text-primary text-[14px] font-semibold transition-colors">
              {t('home')}
            </Link>
          </li>
          <li>
            <AboutDropdown />
          </li>
          <li>
            <Link href="/contact-us" className="text-WetGray hover:text-primary text-[14px] font-semibold transition-colors">
              {t('contact_us')}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
