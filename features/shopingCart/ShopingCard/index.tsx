import { useCart } from '@/shared/components/layout/Header/hooks';
import Counter from '@/shared/components/ui/Counter';
import Image from 'next/image';
import { ShopingCardDesc } from './components/ShopingCardDesc';
import { ShopingButtonCard } from './components/ShopingButtonCard';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useTranslations } from 'next-intl';
import { Link } from '@/core/i18n';
import { toSlug } from '@/shared/utils/slug';

interface ShopingCardProps {
  id: string | number;
  price?: string | number;
  itemTotal?: number;
  title: string;
  imageUrl: string;
  quantity: number;
}

export const ShopingCard: React.FC<ShopingCardProps> = ({ id, price, itemTotal, title, imageUrl, quantity }) => {
  const { updateQuantity, removeItem } = useCart();
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const debouncedQuantity = useDebounce(localQuantity, 500);
  const isMounted = useRef(false);
  const t = useTranslations('Products');
  const productUrl = `/products/${id}-${toSlug(title)}`;

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (debouncedQuantity !== quantity) {
      updateQuantity(id, debouncedQuantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuantity]);

  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  return (
    <div className="border-gray100 relative flex w-full max-w-223.5 flex-col gap-4 rounded-sm border bg-white p-4 md:flex-row md:items-center">
      <div className="flex flex-1 items-start gap-4 md:items-center">
        <Link
          href={productUrl}
          className="border-Stroke relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-sm border transition-opacity hover:opacity-80 md:aspect-auto md:h-20 md:w-29.25"
        >
          <Image src={imageUrl} fill className="object-cover" alt="shoping-cart-image" />
        </Link>
        <div className="flex flex-1 flex-col gap-2 md:items-start md:gap-1">
          <Link href={productUrl} className="hover:text-primary transition-colors">
            <ShopingCardDesc title={title} price={price} />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 md:justify-end md:gap-4 lg:gap-8">
        <Counter value={localQuantity} onChange={setLocalQuantity} variant="large" onDelete={() => removeItem(id)} />
        <p className="shrink-0 text-sm font-bold text-black md:text-base">
          {itemTotal || Number(price) * quantity} {t('egp')}
        </p>
        <ShopingButtonCard onClick={() => removeItem(id)} />
      </div>
    </div>
  );
};
