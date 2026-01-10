'use client';

import { LanguageSwitcher } from "@/shared/components/LanguageSwitcher";
import { CartDropdown } from "./CartDropdown";

export const Toolbar = () => {
  return (
    <div className="flex items-center gap-[15px] sm:gap-[24px] shrink-0">
      <div className="hidden sm:block">
        <LanguageSwitcher />
      </div>

      {/* TODO : Add WishlistDropdown When Authenticated */}
      {/* <WishlistDropdown /> */}

      <CartDropdown />




    </div>
  );
};
