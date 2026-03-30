import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { ReviewsTab } from './components/ReviewsTab';
import { useLocale, useTranslations } from 'next-intl';
import { ProductSpecification } from '../../types';

type Props = {
  generalDescription: string;
  specifications: ProductSpecification[];
  reviewsCount: number;
  productId: number;
};

export const ProductTabs: React.FC<Props> = ({ generalDescription = '', specifications = [], reviewsCount = 0, productId }) => {
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
          {specifications && specifications.length > 0 ? (
            <div className="flex flex-col overflow-hidden rounded-md">
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row sm:items-center px-4 py-3 md:px-6 md:py-4 ${
                    index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                  }`}
                >
                  <div className="w-full sm:w-1/3 text-sm text-gray-600 md:text-base mb-1 sm:mb-0">
                    {spec.spec_name}
                  </div>
                  <div className="w-full sm:w-2/3 text-sm text-gray-800 md:text-base">
                    {spec.spec_value}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 md:text-base">{t('no_specifications') || 'No specifications available'}</p>
          )}
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewsTab productId={productId} />
        </TabsContent>
      </div>
    </Tabs>
  );
};
