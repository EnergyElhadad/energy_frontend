import Image, { ImageProps } from 'next/image';
import React from 'react';
import { Badge } from './components/Badge';
import { BodyCard } from './components/BodyCard';
import { HiddenIcons } from './components/HiddenIcons';
import { Display } from '../layout/Display';

export type ProductT = {
  id: number | string;
  title: string;
  image: string;
  originalPrice: number;
  oldPrice?: number;
  badge?: string;
  category?: string;
  imageProps?: Omit<ImageProps, 'src' | 'alt'>;
  onClick?: () => void;
};

export const ProductCard: React.FC<ProductT> = ({ id, title, image, originalPrice, oldPrice, badge, category, imageProps, onClick }) => {
  return (
    <div className="group border-Stroke/50 hover:border-primary relative mx-auto flex max-w-70.5 cursor-pointer flex-col overflow-hidden rounded-sm border bg-white p-2 pb-3 transition hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]">
      <HiddenIcons title={title} id={id} onView={onClick} />
      <div className="flex max-h-63.75 min-h-63.75 w-full flex-col items-center justify-center overflow-hidden">
        <Display when={!!badge}>
          <Badge text={badge!} />
        </Display>
        <div className="relative w-full overflow-hidden rounded-xl">
          <Image src={image} alt={title} width={268} height={255} className="mx-auto" {...imageProps} />
        </div>
      </div>
      <BodyCard category={category} title={title} id={id} originalPrice={originalPrice} oldPrice={oldPrice} />
    </div>
  );
};
