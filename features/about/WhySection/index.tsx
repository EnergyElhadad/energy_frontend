import { QualityIcon } from "@/shared/components/icons/Quality";
import { SaftyPayIcon } from "@/shared/components/icons/SaftyPay";
import { SupportIcon } from "@/shared/components/icons/Support";

import { WhyChooseCard } from "./components/WhyChooseCard";

export const WhySection = () => {
  return (
    <section className="mt-10 sm:mt-20 md:mt-40.75">
      <div className="mx-auto mb-10 max-w-100 text-center sm:max-w-[67%]">
        <h3 className="text-WetGray mb-4 text-2xl font-bold md:text-[32px]">
          لماذا تختار ENERGY ELHADAD؟
        </h3>
        <p className="text-WetGray text-base leading-7 font-medium">
          هي شركة متخصصة في توفير وبيع المنتجات والحلول الكهربائية عالية الجودة،
          حيث نعمل على تلبية احتياجات الأفراد والشركات من خلال مجموعة متكاملة من
          المنتجات الموثوقة التي تجمع بين الكفاءة، الأمان، والأداء العالي
        </p>
      </div>
      <div className="flex flex-col items-stretch gap-4 md:flex-row">
        <WhyChooseCard
          icon={<QualityIcon />}
          title="جودة مضمونة"
          description="جميع منتجاتنا أصلية ومضمونة"
        />
        <WhyChooseCard
          icon={<SupportIcon />}
          title="دعم فني 24/7"
          description="فريق دعم متاح على مدار الساعة"
        />
        <WhyChooseCard
          icon={<SaftyPayIcon />}
          title="دفع آمن"
          description="خيارات دفع متعددة وآمنة"
        />
      </div>
    </section>
  );
};
