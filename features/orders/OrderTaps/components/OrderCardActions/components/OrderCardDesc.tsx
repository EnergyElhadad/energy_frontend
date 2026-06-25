'use client';

import React from "react";
import { useTranslations } from "next-intl";

export const OrderCardDesc = ({
  title,
  price,
}: {
  title: string;
  price?: number | string;
}) => {
  const t = useTranslations("OrdersPage");
  return (
    <div className="xs:items-start xs:justify-start flex flex-col items-center justify-center gap-1">
      <h3 className="text-WetGray text-sm font-bold md:text-base md:leading-relaxed">
        {title}
      </h3>
      <p className="text-gray400 text-sm font-normal">
        {price} {t("currency")}
      </p>
    </div>
  );
};
