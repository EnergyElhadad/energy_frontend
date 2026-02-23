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
      icon: <CategoriesIcon className="text-primary" />,
      label: t('company_profile'),
    },
    {
      href: '/terms-and-conditions',
      icon: <CategoriesIcon className="text-primary" />,
      label: t('quality_policy'),
    },
  ];

  return (
    <Dropdown
      trigger={
        <button className="flex h-[24px] items-center gap-[8px]">
          <span className="text-WetGray hover:text-primary line-height-[2] text-[14px] font-semibold transition-colors">{t('about_us')}</span>
          <ArrowDownIcon className="aria-expanded:text-primary aria-expanded:rotate-180" />
        </button>
      }
      triggerMode="hover"
      menuAlign="start"
      menuClassName="!max-w-[220px] !p-0 overflow-hidden !top-full"
    >
      <div>
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="not-first: border-Stroke hover:text-primary flex items-center gap-[10px] border-t px-[16px] py-[12px] transition-colors hover:bg-gray-50"
          >
            {link.icon}
            <span className="text-[14px] font-semibold">{link.label}</span>
          </Link>
        ))}
      </div>
    </Dropdown>
  );
};
