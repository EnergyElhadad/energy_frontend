import { useTranslations } from 'next-intl';
import { Display } from '../../layout/Display';

export const Price = ({ oldPrice, price }: { oldPrice?: number; price: number }) => {
  const t = useTranslations('Products');
  return (
    <div className="mb-3 flex items-center justify-center gap-1 sm:gap-2">
      <Display when={oldPrice !== undefined && oldPrice !== price}>
        <span className="text-signalGray relative whitespace-nowrap text-sm sm:text-[16px]">
          {oldPrice} {t('egp')}
          <span className="bg-signalGray absolute inset-x-0 top-1/2 h-px"></span>
        </span>
        <span className="text-Stroke block h-2.5 border text-sm font-semibold"></span>
      </Display>

      <span className="text-primary whitespace-nowrap text-sm font-bold sm:text-[16px]">
        {price} {t('egp')}
      </span>
    </div>
  );
};
