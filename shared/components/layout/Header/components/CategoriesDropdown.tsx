import { useTranslations } from 'next-intl';
import { Dropdown } from '@/shared/components/ui/Dropdown';

import { Link } from '@/core/i18n';
import { CategoriesIcon } from '@/shared/components/icons/Categories';
import Image from 'next/image';

const categories = [
  {
    href: '/products?category=All',
    icon: '/images/categories/01.webp',
    label: 'كل المنتجات',
  },
  {
    href: '/products?category=Accessories',
    icon: '/images/categories/01.webp',
    label: 'اكسسوارات',
  },
  {
    href: '/products?category=Lead',
    icon: '/images/categories/01.webp',
    label: 'لمبات ليد',
  },
]

export const CategoriesDropdown = () => {
  const t = useTranslations('Header');

  return (
    <Dropdown
      trigger={
        <button className='flex items-center gap-[10px] transition-colors duration-300 ease-in-out'>
          <CategoriesIcon className='text-primary' />
          <span className='text-[14px] text-primary'>
            جميع الأقسام
          </span>
        </button>
      }
      triggerMode="hover"
      menuAlign='start'
      menuClassName='!max-w-[220px] !p-0 overflow-hidden !top-full'
    >
      <div>
        {categories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className='flex items-center gap-[10px] px-[16px] py-[12px] not-first: border-t border-Stroke hover:bg-gray-50 hover:text-primary transition-colors'
          >
            <Image src={category.icon} alt={category.label} width={40} height={40} />
            <span className='text-[14px] font-semibold'>
              {category.label}
            </span>
          </Link>
        ))}
      </div>
    </Dropdown>
  );
};
