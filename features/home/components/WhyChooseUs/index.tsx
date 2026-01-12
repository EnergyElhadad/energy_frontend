import React from "react";
import { HeaderWhyChooseUs } from "./components/HeaderWhyChooseUs";
import { QualityIcon } from "@/shared/components/icons/Quality";
import { SupportIcon } from "@/shared/components/icons/Support";
import { SaftyPayIcon } from "@/shared/components/icons/SaftyPay";
import { CardWhyChooseUs } from "./components/CardWhyChooseUs";

export const WhyChooseUs = () => {
  return (
    <section
      className="bg-Background py-10"
      aria-labelledby="why-choose-us-heading "
    >
      <div className="container">
        <div className="mx-auto min-h-29 max-w-7xl px-4">
          <HeaderWhyChooseUs />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <CardWhyChooseUs
              title="ضمان الجودة"
              content="جميع منتجاتنا أصلية ومضمونة"
              icon={<QualityIcon />}
            />
            <CardWhyChooseUs
              title="  دعم فني 24/7"
              content="   فريق دعم متاح على مدار الساعة"
              icon={<SupportIcon />}
            />
            <CardWhyChooseUs
              title="   دفع آمن"
              content="        خيارات دفع متعددة وآمنة"
              icon={<SaftyPayIcon />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
