import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type CategoryCardProps = {
  name: string;
  image: string;
  id: number;
};

export const CategoryCard = ({ name, image, id }: CategoryCardProps) => {
  return (
    <Link href={`/products?categoryId=${id}&categoryName=${name}`}>
      <div className="border-Stroke hover:border-primary mx-auto h-full max-w-43.5 cursor-pointer rounded-2xl border bg-white px-2 py-4 text-center transition hover:shadow-md md:px-5 md:py-6">
        <div className="relative mx-auto mb-2 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-black/4 md:h-33.75 md:w-33.75">
          <Image src={image || '/images/logo.png'} alt={name} className="absolute inset-0 m-auto max-h-full max-w-full" fill />
        </div>

        <p className="text-sm font-semibold text-black md:text-xl">{name}</p>
      </div>
    </Link>
  );
};
