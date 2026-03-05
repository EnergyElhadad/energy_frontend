import { BoxIcon } from '@/shared/components/icons/Box';
import { useTranslations } from 'next-intl';

interface ProductHeaderProps {
  name: string;
  available_stock: number;
}

export const ProductHeader = ({ name, available_stock }: ProductHeaderProps) => {
  const t = useTranslations('SingleProduct');

  return (
    <>
      <h1 className="text-darkGray text-xl font-bold md:text-2xl">{name}</h1>

      <h3 className="text-darkGray mt-3 flex items-center text-sm md:mt-4 md:text-base">
        <BoxIcon className="text-primary me-2" />
        {t('stock_remaining')}
        <span className="text-primary mx-1">{Number(available_stock) || 0}</span>
        {t('units')}
      </h3>
    </>
  );
};
