"use client";

import { useTranslations } from "next-intl";
import { HeartIcon } from "@/shared/components/icons/Heart";
import { useWishlist } from "../hooks/useWishlist";
import { CartItem } from "./CartItem";
import { Dropdown } from "@/shared/components/ui/Dropdown";

import { Link } from "@/core/i18n";
import { HeaderActionButton } from "./HeaderActionButton";

export const WishlistDropdown = () => {
  const t = useTranslations("Header");
  const { items, updateQuantity } = useWishlist();

  return (
    <Dropdown
      trigger={
        <HeaderActionButton
          icon={<HeartIcon className="text-primary text-xl" />}
          badgeCount={items.length}
          aria-label={t("wishlist")}
        />
      }
      triggerMode="hover"
    >
      <div className="">
        <h3 className="mb-[7px] text-[14px] font-semibold">{t("wishlist")}</h3>
        <div className="custom-scrollbar flex max-h-[300px] flex-col gap-[8px] overflow-y-auto">
          {items.map((item) => (
            <CartItem
              key={item.id}
              product={item}
              quantity={item.quantity}
              onQuantityChange={(val) => updateQuantity(item.id, val)}
            />
          ))}
        </div>
        <Link
          href="/wishlist"
          className="border-primary text-primary hover:bg-primary mt-[12px] flex h-[42px] w-full items-center justify-center rounded-[8px] border text-[14px] font-semibold transition-all duration-300 ease-in-out hover:text-white"
        >
          {t("got_to_wishlist")}
        </Link>
      </div>
    </Dropdown>
  );
};
