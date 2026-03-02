/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

export const ImageWithPlaceholder = ({ image, title, ...imageProps }: { image: string; title: string; imageProps?: Omit<ImageProps, 'src' | 'alt'> }) => {
  const [imageSrc, setImageSrc] = useState(image);
  const [isLoading, setIsLoading] = useState(true);

  const width = (imageProps as any)?.width ?? 268;
  const height = (imageProps as any)?.height ?? 255;

  return (
    <div className="relative flex items-center justify-center" style={{ width, height }}>
      {isLoading && <div className="absolute inset-0 mx-auto animate-pulse rounded-lg" style={{ width, height, backgroundColor: '#e5e7eb' }} />}
      <Image
        src={imageSrc}
        alt={title}
        width={268}
        height={255}
        className={`mx-auto transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        {...imageProps}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageSrc('/images/logo.png');
          setIsLoading(false);
        }}
      />
    </div>
  );
};
