import Counter from '@/shared/components/ui/Counter';
import { useTranslations } from 'next-intl';

type QuantityProps = {
  price: string;
  quantity: number;
  onChange: (value: number) => void;
};

export const Quantity: React.FC<QuantityProps> = ({ price, quantity, onChange }) => {
  const t = useTranslations('SingleProduct');
  return (
    <div className="mt-auto mb-6 flex items-center gap-4">
      <p className="text-base font-bold text-black">{t('select_quantity')}</p>
      <Counter value={quantity} onChange={onChange} variant="large" />
      <p className="ms-auto text-2xl font-semibold text-black">
        {price} {t('currency')}
      </p>
    </div>
  );
};
