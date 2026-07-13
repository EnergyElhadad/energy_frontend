'use client';

import { useEffect, useRef } from 'react';
import { trackViewContent } from './metaPixelEvents';

interface MetaPixelViewContentProps {
  id: string | number;
  name: string;
  /** Effective (post-discount) unit price. */
  value?: number;
}

/**
 * Fires ViewContent once per viewed product. Rendered by ProductDetails so it
 * receives the already-computed effective price. The ref is keyed by product
 * id: it dedupes Strict Mode double-effects, while product-to-product
 * navigation (which may reuse the component instance) still fires.
 */
export const MetaPixelViewContent = ({ id, name, value }: MetaPixelViewContentProps) => {
  const tracked = useRef<string | null>(null);

  useEffect(() => {
    const key = String(id);
    if (tracked.current === key) return;
    tracked.current = key;
    trackViewContent({ id, name, value });
  }, [id, name, value]);

  return null;
};
