import { Button } from '@/shared/components/ui/Button';
import { useTranslations } from 'next-intl';

type RestProps = {
  reset: () => void;
};

export const ResetButton: React.FC<RestProps> = ({ reset }) => {
  const t = useTranslations('Products');
  return (
    <Button
      variant={'outline'}
      onClick={reset}
      className="hover:bg-primary border-gray600 text-gray600 h-10.5 w-full rounded-sm border px-4 py-2 text-sm transition hover:border-none hover:text-white"
    >
      {t('reset')}
    </Button>
  );
};
