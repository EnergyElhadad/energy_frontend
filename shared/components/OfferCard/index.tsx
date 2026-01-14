"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Badge } from "./components/Badge";
import { BodyCard } from "./components/BodyCard";
import { HiddenIcons } from "./components/HiddenIcons";

export type ProductT = {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice: number;
  badge?: string;
  productLink: string;
};

const OfferCard: React.FC<ProductT> = (product) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(product.productLink)}
      className="group border-Stroke/50 hover:border-primary relative mx-auto max-w-70.5 cursor-pointer overflow-hidden rounded-sm border bg-white p-2 pb-3 transition hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]"
    >
      <HiddenIcons productLink={product.productLink} />
      <div className="min-h-63.75 w-full">
        {product.badge && <Badge text={product.badge} />}

        <div className="relative mb-4 w-full">
          <Image
            src={product.image}
            alt={product.title}
            width={268}
            height={255}
            className="mx-auto"
          />
        </div>
      </div>
      <BodyCard product={product} />
    </div>
  );
};

export default OfferCard;
