import { useTranslations } from 'next-intl';
import { Dropdown } from '@/shared/components/ui/Dropdown';

import { Link } from '@/core/i18n';
import { CategoriesIcon } from '@/shared/components/icons/Categories';
import { ArrowDownIcon } from '@/shared/components/icons/ArrowDown';

export const AboutDropdown = () => {
  const t = useTranslations('Header');

  const links = [
    {
      href: '/about',
      icon: <CategoriesIcon className='text-primary' />,
      label: 'تعريف بالشركة',
    },
    {
      href: '/quality-policy',
      icon: <CategoriesIcon className='text-primary' />,
      label: 'سياسة الجودة',
    },
  ]

  return (
    <Dropdown
      trigger={
        <button className='flex items-center gap-[8px] h-[24px]'>
          <span className='text-[14px] text-WetGray font-semibold hover:text-primary transition-colors line-height-[2]'>
            عن الشركة
          </span>
          <ArrowDownIcon className='aria-expanded:rotate-180 aria-expanded:text-primary' />
        </button>
      }
      triggerMode="hover"
      menuAlign='start'
      menuClassName='!max-w-[220px] !p-0 overflow-hidden !top-full'
    >
      <div>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className='flex items-center gap-[10px] px-[16px] py-[12px] not-first: border-t border-Stroke hover:bg-gray-50 hover:text-primary transition-colors'
          >
            {link.icon}
            <span className='text-[14px] font-semibold'>
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </Dropdown>
  );
};
