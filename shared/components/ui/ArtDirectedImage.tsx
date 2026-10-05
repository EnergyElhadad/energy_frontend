import Image, { getImageProps } from 'next/image';
import { preload } from 'react-dom';

const MOBILE_MEDIA = '(max-width: 767px)';
const DESKTOP_MEDIA = '(min-width: 768px)';

type ArtDirectedImageProps = {
  src: string;
  /** Separate artwork for < 768px. Without it, a plain next/image is rendered. */
  mobileSrc?: string;
  alt: string;
  /** `sizes` for the desktop artwork. */
  sizes: string;
  /** `sizes` for the mobile artwork. Defaults to `sizes`. */
  mobileSizes?: string;
  className?: string;
  /** LCP image: eager + fetchpriority=high + a <link rel=preload> per breakpoint. */
  priority?: boolean;
};

/**
 * `fill` image with separate mobile/desktop artwork, both served through the
 * Next.js optimizer.
 *
 * A plain `<picture><source srcSet={rawUrl}>` around next/image is a trap: the
 * browser always prefers a matching <source>, so it downloads the raw
 * multi-MB upload and the optimized (and preloaded) <img> srcset is never
 * used. getImageProps gives each <source> an optimized srcset instead.
 */
export const ArtDirectedImage = ({ src, mobileSrc, alt, sizes, mobileSizes = sizes, className, priority = false }: ArtDirectedImageProps) => {
  if (!mobileSrc || mobileSrc === src) {
    return <Image src={src} alt={alt} fill sizes={sizes} preload={priority} fetchPriority={priority ? 'high' : undefined} className={className} />;
  }

  const common = {
    alt,
    fill: true,
    loading: priority ? 'eager' : 'lazy',
    fetchPriority: priority ? 'high' : undefined,
  } as const;
  const { props: desktop } = getImageProps({ ...common, src, sizes });
  const { props: mobile } = getImageProps({ ...common, src: mobileSrc, sizes: mobileSizes });

  if (priority) {
    // getImageProps doesn't preload. Media-scoped preloads ensure each
    // viewport fetches only the artwork it actually displays.
    preload(mobile.src, { as: 'image', imageSrcSet: mobile.srcSet, imageSizes: mobile.sizes, fetchPriority: 'high', media: MOBILE_MEDIA });
    preload(desktop.src, { as: 'image', imageSrcSet: desktop.srcSet, imageSizes: desktop.sizes, fetchPriority: 'high', media: DESKTOP_MEDIA });
  }

  return (
    <picture>
      <source media={MOBILE_MEDIA} srcSet={mobile.srcSet} sizes={mobile.sizes} />
      <source media={DESKTOP_MEDIA} srcSet={desktop.srcSet} sizes={desktop.sizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...desktop} className={className} />
    </picture>
  );
};
