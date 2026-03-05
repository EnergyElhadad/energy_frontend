import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { ReviewsTab } from './components/ReviewsTab';
import { useLocale, useTranslations } from 'next-intl';

type Props = {
  generalDescription: string;
  technicalSpecifications: string;
  reviewsCount: number;
  productId: number;
};

export const ProductTabs: React.FC<Props> = ({ generalDescription = '', technicalSpecifications = '', reviewsCount = 0, productId }) => {
  const locale = useLocale();
  const t = useTranslations('SingleProduct');

  return (
    <Tabs defaultValue="general" style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
      <TabsList className="border-Stroke min-h-10 w-full justify-start rounded-none border-b bg-white p-0">
        <TabsTrigger
          className="data-[state=active]:bg-primary flex-1 rounded-none border-none bg-white py-2.5 text-sm text-gray-500 shadow-none data-[state=active]:text-white md:max-w-[226px] md:min-w-[150px] md:py-3 md:text-base"
          value="general"
        >
          {t('general_description')}
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-primary flex-1 rounded-none border-none bg-white py-2.5 text-sm text-gray-500 shadow-none data-[state=active]:text-white md:max-w-[226px] md:min-w-[150px] md:py-3 md:text-base"
          value="specs"
        >
          {t('technical_specifications')}
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-primary flex-1 rounded-none border-none bg-white py-2.5 text-sm text-gray-500 shadow-none data-[state=active]:text-white md:max-w-[226px] md:min-w-[150px] md:py-3 md:text-base"
          value="reviews"
        >
          {t('reviews')} ({reviewsCount})
        </TabsTrigger>
      </TabsList>
      <div className="-mt-2 min-h-[200px] bg-white p-4 md:min-h-[265px] md:p-6">
        <TabsContent value="general">
          <p dangerouslySetInnerHTML={{ __html: generalDescription }} />
        </TabsContent>
        <TabsContent value="specs">
          <p dangerouslySetInnerHTML={{ __html: technicalSpecifications }} />
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewsTab productId={productId} />
        </TabsContent>
      </div>
    </Tabs>
  );
};
