'use client';

import { useEffect, useRef } from 'react';
import { useCart } from '@/features/shopingCart/hooks/useCart';
import { trackInitiateCheckout } from './metaPixelEvents';

/**
 * Fires InitiateCheckout once when the checkout page renders with a loaded,
 * non-empty cart. Gating on items.length also covers the query's loading
 * phase (useCart returns [] until the cart resolves), so the event carries
 * real totals; an empty-cart visit to /cart/checkout fires nothing.
 */
export const MetaPixelInitiateCheckout = () => {
  const { items, cartTotal } = useCart();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current || items.length === 0) return;
    fired.current = true;
    trackInitiateCheckout({
      contents: items.map(item => ({ id: item.id, quantity: item.quantity })),
      value: cartTotal,
    });
  }, [items, cartTotal]);

  return null;
};
