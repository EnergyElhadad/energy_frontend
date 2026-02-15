import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ShopByCategoryCardProps = {
  name: string;
  image: string;
  id: number;
};

export const ShopByCategoryCard = ({ name, image, id }: ShopByCategoryCardProps) => {
  return (
    <Link href={`/products?categoryId=${id}&categoryName=${name}`}>
      <div className="border-Stroke hover:border-primary mx-auto max-w-43.5 cursor-pointer rounded-2xl border bg-white px-4 py-5 text-center transition hover:shadow-md md:px-5 md:py-6">
        <div className="relative mx-auto mb-2 flex h-26 w-26 items-center justify-center overflow-hidden rounded-full bg-black/4 md:h-33.75 md:w-33.75">
          <Image src={image} alt={name} className="absolute inset-0 m-auto max-h-full max-w-full" width={135} height={135} />
        </div>

        <p className="text-xl font-semibold text-black">{name}</p>
      </div>
    </Link>
  );
};
