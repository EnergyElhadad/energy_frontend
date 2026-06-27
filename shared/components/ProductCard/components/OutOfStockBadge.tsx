import { useTranslations } from 'next-intl';

export const OutOfStockBadge = () => {
    const t = useTranslations('Products');
    return (
        <span className="bg-Alert absolute start-3 top-3 z-3 rounded-2xl px-4 py-2 text-sm font-medium text-white">
      {t('out_of_stock')}
    </span>
    );
}