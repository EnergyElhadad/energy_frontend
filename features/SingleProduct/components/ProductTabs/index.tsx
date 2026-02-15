import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { ReviewsTab } from "./components/ReviewsTab";
import { useLocale, useTranslations } from "next-intl";

type Props = {
  generalDescription: string;
  technicalSpecifications: string;
  reviewsCount: number;
};

export const ProductTabs: React.FC<Props> = ({
  generalDescription = "",
  technicalSpecifications = "",
  reviewsCount = 0,
}) => {
  const locale = useLocale();
  const t = useTranslations("SingleProduct");

  return (
    <Tabs
      defaultValue="general"
      style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
    >
      <TabsList className="border-Stroke min-h-10 w-full justify-start rounded-none border-b bg-white p-0">
        <TabsTrigger
          className="data-[state=active]:bg-primary max-w-[226px] min-w-[150px] rounded-none border-none bg-white py-3 text-base text-gray-500 shadow-none data-[state=active]:text-white"
          value="general"
        >
          {t("general_description")}
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-primary max-w-[226px] min-w-[150px] rounded-none border-none bg-white py-3 text-base text-gray-500 shadow-none data-[state=active]:text-white"
          value="specs"
        >
          {t("technical_specifications")}
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-primary max-w-[226px] min-w-[150px] rounded-none border-none bg-white py-3 text-base text-gray-500 shadow-none data-[state=active]:text-white"
          value="reviews"
        >
          {t("reviews")} ({reviewsCount})
        </TabsTrigger>
      </TabsList>
      <div className="-mt-2 min-h-[265px] bg-white p-6">
        <TabsContent value="general">
          <p dangerouslySetInnerHTML={{ __html: generalDescription }} />
        </TabsContent>
        <TabsContent value="specs">
          <p dangerouslySetInnerHTML={{ __html: technicalSpecifications }} />
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewsTab />
        </TabsContent>
      </div>
    </Tabs>
  );
};
