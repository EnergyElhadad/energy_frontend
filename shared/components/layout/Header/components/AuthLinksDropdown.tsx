import { useTranslations } from 'next-intl';
import { Dropdown } from '@/shared/components/ui/Dropdown';

import { Link } from '@/core/i18n';
import { UserIcon } from '@/shared/components/icons/User';
import { LoginIcon } from '@/shared/components/icons/Login';
import { SignupIcon } from '@/shared/components/icons/Signup';

export const AuthLinksDropdown = () => {
  const t = useTranslations('Header');

  const links = [
    {
      href: '/signin',
      icon: <LoginIcon className='text-primary' />,
      label: t('signin'),
    },
    {
      href: '/signup',
      icon: <SignupIcon className='text-primary' />,
      label: t('signup'),
    },
  ];

  return (
    <Dropdown
      trigger={
        <button className="group flex items-center justify-center gap-[8px] w-[127px] h-[42px] border border-Stroke rounded-full px-[12px] py-[8px] transition-all duration-300 ease-in-out cursor-pointer">
          <UserIcon className='text-primary group-aria-expanded:text-white' />
          <span className='text-WetGray text-[12px] font-semibold group-aria-expanded:text-white'>
            {t('signin')}
          </span>
        </button>
      }
      triggerMode="click"
      menuClassName='!max-w-[220px] !p-0 overflow-hidden'
      activeClassName='!bg-primary'
    >
      <div className="">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className='flex items-center gap-[8px] px-[16px] py-[20px] hover:bg-gray-50 hover:text-primary transition-colors'
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
