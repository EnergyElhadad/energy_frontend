import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { ReviewsTab } from './components/ReviewsTab';
import { useLocale, useTranslations } from 'next-intl';
import { ProductSpecification } from '../../types';
import { Display } from '@/shared/components/layout/Display';

type Props = {
  generalDescription: string;
  specifications: ProductSpecification[];
  reviewsCount: number;
  productId: number;
};

export const ProductTabs: React.FC<Props> = ({ generalDescription = '', specifications = [], reviewsCount = 0, productId }) => {
  const locale = useLocale();
  const t = useTranslations('SingleProduct');

  const activeTab = !!generalDescription ? 'general' : specifications && specifications.length > 0 ? 'specs' : 'reviews';

  return (
    <Tabs defaultValue={activeTab} style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
      <TabsList className="border-Stroke min-h-10 w-full justify-start rounded-none border-b bg-white p-0">
        <Display when={!!generalDescription}>
          <TabsTrigger
            className="data-[state=active]:bg-primary flex-1 rounded-none border-none bg-white py-2.5 text-sm text-gray-500 shadow-none data-[state=active]:text-white md:max-w-[226px] md:min-w-[150px] md:py-3 md:text-base"
            value="general"
          >
            {t('general_description')}
          </TabsTrigger>
        </Display>
        <Display when={specifications && specifications.length > 0}>
          <TabsTrigger
            className="data-[state=active]:bg-primary flex-1 rounded-none border-none bg-white py-2.5 text-sm text-gray-500 shadow-none data-[state=active]:text-white md:max-w-[226px] md:min-w-[150px] md:py-3 md:text-base"
            value="specs"
          >
            {t('technical_specifications')}
          </TabsTrigger>
        </Display>
        <TabsTrigger
          className="data-[state=active]:bg-primary flex-1 rounded-none border-none bg-white py-2.5 text-sm text-gray-500 shadow-none data-[state=active]:text-white md:max-w-[226px] md:min-w-[150px] md:py-3 md:text-base"
          value="reviews"
        >
          {t('reviews')} ({reviewsCount})
        </TabsTrigger>
      </TabsList>

      <div className="-mt-2 min-h-[200px] bg-white p-4 md:min-h-[265px] md:p-6">
        <Display when={!!generalDescription}>
          <TabsContent value="general">
            <div className="[&_li]:mb-1 [&_ul]:list-disc [&_ul]:ps-5" dangerouslySetInnerHTML={{ __html: generalDescription }} />
          </TabsContent>
        </Display>
        <Display when={specifications && specifications.length > 0}>
          <TabsContent value="specs">
            <div className="flex flex-col overflow-hidden rounded-md">
              {specifications.map((spec, index) => (
                <div key={index} className={`flex flex-col px-4 py-3 sm:flex-row sm:items-center md:px-6 md:py-4 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                  <div className="mb-1 w-full text-sm text-gray-600 sm:mb-0 sm:w-1/3 md:text-base">{spec.spec_name}</div>
                  <div className="w-full text-sm text-gray-800 sm:w-2/3 md:text-base">{spec.spec_value}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Display>
        <TabsContent value="reviews">
          <ReviewsTab productId={productId} />
        </TabsContent>
      </div>
    </Tabs>
  );
};
