"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { HeartIcon } from "./icons/Heart";
import Link from "next/link";
import { EyeIcon } from "./icons/Eye";
import Image from "next/image";
import { ShareIcon } from "./icons/Share";

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
      className="group border-Stroke/50 hover:border-primary/30 relative mx-auto max-w-70.5 cursor-pointer overflow-hidden rounded-sm border bg-white p-2 pb-3 transition hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]"
    >
      {/* shard Icon absolute */}
      <div className="absolute end-3 top-3 z-3 flex -translate-y-100 items-center justify-center gap-3 transition-all duration-300 ease-in-out group-hover:translate-y-0">
        <Link
          href={product.productLink}
          aria-label="View product details"
          className="bg-primary/80 flex h-10.5 w-10.5 items-center justify-center rounded-full text-white"
        >
          <EyeIcon />
        </Link>
        <Link
          href={product.productLink}
          aria-label="Share product"
          className="bg-primary/80 flex h-10.5 w-10.5 items-center justify-center rounded-full text-white"
        >
          <ShareIcon />
        </Link>
      </div>

      <div className="min-h-63.75 w-full">
        {/* Badge */}
        {product.badge && (
          <span className="bg-Alert absolute start-3 top-3 z-3 rounded px-2 py-1 text-xs font-medium text-white">
            {product.badge}
          </span>
        )}

        {/* Image */}
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

      {/* Body Card */}

      <div className="p-2">
        {/* Title */}
        <p className="line-clamp-2 text-center text-sm font-semibold text-black">
          {product.title}
        </p>

        <h3 className="text-signalGray my-3 text-center text-[14px]">
          Accessories
        </h3>

        {/* Price */}
        <div className="mb-3 flex items-center justify-center gap-2">
          <span className="text-signalGray relative text-[16px]">
            {product.oldPrice} EGP
            <span className="bg-signalGray absolute inset-x-0 top-1/2 h-px"></span>
          </span>

          <span className="text-Stroke block h-2.5 border text-sm font-semibold"></span>
          <span className="text-primary text-[16px] font-bold">
            {product.price} EGP
          </span>
        </div>

        {/* Actions */}
        <div className="flex h-10.5 items-center justify-between gap-2">
          <Link
            href={`/products/${product.id}`}
            className="hover:bg-primary/90 border-primary text-primary flex min-h-full w-full items-center justify-center rounded border bg-transparent p-2 px-3 py-1.5 text-sm font-semibold transition hover:text-white"
          >
            أضف للسلة
          </Link>

          <button
            aria-label="Add to wishlist"
            className="hover:Alert border-SmokyWhite hover:border-primary text-Stroke cursor-pointer rounded border bg-transparent p-2.75 transition"
          >
            {<HeartIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
