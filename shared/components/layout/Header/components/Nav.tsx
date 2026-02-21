import { AboutDropdown } from './AboutDropdown';
import { CategoriesDropdown } from './CategoriesDropdown';
import { Link } from '@/core/i18n';
import { getCategories } from '@/shared/services/categories.server';

export const Nav = async () => {
  const categoriesData = await getCategories();

  return (
    <nav className="border-Stroke hidden border-t py-[15px] lg:block">
      <div className="container">
        <ul className="flex list-none items-center gap-[24px]">
          <li className="border-Stroke border-e pe-[24px]">
            <CategoriesDropdown initialData={categoriesData} />
          </li>
          <li>
            <Link href="/" className="text-WetGray hover:text-primary text-[14px] font-semibold transition-colors">
              الرئيسية
            </Link>
          </li>
          <li>
            <AboutDropdown />
          </li>
          <li>
            <Link href="/contact" className="text-WetGray hover:text-primary text-[14px] font-semibold transition-colors">
              تواصل معنا
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
