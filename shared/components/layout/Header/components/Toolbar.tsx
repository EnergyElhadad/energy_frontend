'use client';

import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
import { CartDropdown } from './CartDropdown';
import { AuthLinksDropdown } from './AuthLinksDropdown';
import { UserMenu } from './UserMenu';
import { useSession } from 'next-auth/react';
import { WishlistDropdown } from './WishlistDropdown';

export const Toolbar = () => {
  const { status } = useSession();

  return (
    <div className="flex shrink-0 items-center gap-[15px] lg:gap-[24px]">
      <div className="hidden items-center gap-[15px] lg:flex lg:gap-[24px]">
        <LanguageSwitcher />
        {status === 'authenticated' && <WishlistDropdown />}
      </div>

      <CartDropdown />

      <div className="hidden lg:block">{status === 'authenticated' ? <UserMenu /> : <AuthLinksDropdown />}</div>
    </div>
  );
};
