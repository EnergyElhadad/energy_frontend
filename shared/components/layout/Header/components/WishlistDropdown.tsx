'use client';

import { useTranslations } from 'next-intl';
import { HeartIcon } from '@/shared/components/icons/Heart';
import { useWishlist } from '@/shared/hooks/useWishlist';
import { Dropdown } from '@/shared/components/ui/Dropdown';
import { Link } from '@/core/i18n';
import { HeaderActionButton } from './HeaderActionButton';
import Image from 'next/image';
import { removeFromWishlist } from '@/shared/services/wishlist';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export const WishlistDropdown = () => {
  const t = useTranslations('Header');
  const { items, count, removeItem } = useWishlist();
  const queryClient = useQueryClient();

  const handleRemove = async (id: number) => {
    removeItem(id); // optimistic removal from UI
    try {
      await removeFromWishlist(id);
      queryClient.invalidateQueries({ queryKey: ['wishlistPage'] });
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Ensure `ProductsView` and hook sink
    } catch {
      toast.error(t('remove_failed'));
    }
  };

  return (
    <Dropdown trigger={<HeaderActionButton icon={<HeartIcon className="text-primary text-xl" />} badgeCount={count} aria-label={t('wishlist')} />} triggerMode="hover">
      <div className="">
        <h3 className="mb-[7px] text-[14px] font-semibold">{t('wishlist')}</h3>
        {items.length === 0 ? (
          <p className="text-signalGray py-4 text-center text-sm">{t('empty')}</p>
        ) : (
          <div className="scrollbar-thin flex max-h-[300px] flex-col gap-[8px] overflow-y-auto">
            {items.map(item => (
              <div key={item.id} className="border-Stroke flex gap-2 rounded-[8px] border p-2 sm:gap-[10px] sm:p-[8px]">
                <div className="relative h-20 w-20 shrink-0 sm:h-[106px] sm:w-[112px]">
                  <Image src={item.image} alt={item.title} fill className="rounded-[4px] object-cover" />
                </div>
                <div className="flex min-w-0 grow flex-col justify-between">
                  <div>
                    <h4 className="mb-1 line-clamp-2 text-[11px] leading-[1.4] font-semibold sm:text-[12px]">{item.title}</h4>
                    <p className="text-signalGray mb-1 text-[9px] sm:mb-2 sm:text-[10px]">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary text-sm font-bold">
                      {item.price} {t('egp', { namespace: 'Products' })}
                    </span>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="border-Alert text-Alert hover:bg-Alert cursor-pointer rounded border px-3 py-1 text-xs font-medium transition hover:text-white"
                      aria-label="Remove from wishlist"
                    >
                      {t('remove')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link
          href="/wishlist"
          className="border-primary text-primary hover:bg-primary mt-[12px] flex h-[42px] w-full items-center justify-center rounded-[8px] border text-[14px] font-semibold transition-all duration-300 ease-in-out hover:text-white"
        >
          {t('got_to_wishlist')}
        </Link>
      </div>
    </Dropdown>
  );
};
