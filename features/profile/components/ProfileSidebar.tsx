'use client';

import { Link } from '@/core/i18n';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/utils';

export const ProfileSidebar = () => {
  const pathname = usePathname();

  const links = [
    {
      label: 'البيانات الشخصية',
      href: '/profile',
      isActive: (path: string) => {
        // Check if it's strictly /profile (or /ar/profile)
        // We can check if the path ends with /profile
        const isRootProfile = path.endsWith('/profile');
        return isRootProfile;
      },
    },
    {
      label: 'العناوين',
      href: '/profile/addresses',
      isActive: (path: string) => path.includes('/profile/addresses'),
    },
    {
      label: 'المدفوعات',
      href: '/profile/payments',
      isActive: (path: string) => path.includes('/profile/payments'),
    },
  ];

  return (
    <div className="flex w-full flex-row gap-3 rounded-md bg-white p-4 sm:flex-col">
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'rounded-md p-3 text-sm font-medium transition-colors',
            link.isActive(pathname || '') ? 'bg-primary text-white' : 'bg-Background text-WetGray hover:bg-gray-100'
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};
