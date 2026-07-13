/**
 * Meta Pixel standard e-commerce events — ViewContent, AddToCart,
 * InitiateCheckout, Purchase. https://developers.facebook.com/docs/meta-pixel/reference
 *
 * Every helper no-ops when fbq is unavailable (SSR, blocked script, future
 * CSP): tracking must never break shop functionality. Product ids are sent as
 * strings — Meta matches them against the catalog feed, which uses string ids.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// The shop sells in Egyptian pounds only (see `currency` in dictionaries).
const CURRENCY = 'EGP';

export const trackMetaPixel = (event: string, params?: Record<string, unknown>, eventId?: string) => {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  if (eventId) {
    // eventID enables deduplication if the backend later sends the same
    // event through the Conversions API.
    window.fbq('track', event, params ?? {}, { eventID: eventId });
  } else if (params) {
    window.fbq('track', event, params);
  } else {
    window.fbq('track', event);
  }
};

/** A cart line in the shape Meta expects for the `contents` parameter. */
export interface PixelContent {
  id: string | number;
  quantity: number;
}

const toContents = (contents: PixelContent[]) => ({
  content_type: 'product',
  content_ids: contents.map(c => String(c.id)),
  contents: contents.map(c => ({ id: String(c.id), quantity: c.quantity })),
  num_items: contents.reduce((sum, c) => sum + c.quantity, 0),
});

export const trackViewContent = ({ id, name, value }: { id: string | number; name: string; value?: number }) =>
  trackMetaPixel('ViewContent', {
    content_type: 'product',
    content_ids: [String(id)],
    content_name: name,
    ...(Number.isFinite(value) ? { value, currency: CURRENCY } : {}),
  });

export const trackAddToCart = ({ id, name, price, quantity }: { id: string | number; name?: string; price?: number | string; quantity: number }) => {
  // Callers pass whatever product shape they have (see the OfferModal, which
  // passes the raw API product) — coerce and drop what's missing rather than
  // constrain them.
  const unitPrice = Number(price);
  trackMetaPixel('AddToCart', {
    ...toContents([{ id, quantity }]),
    ...(name ? { content_name: name } : {}),
    ...(Number.isFinite(unitPrice) ? { value: unitPrice * quantity, currency: CURRENCY } : {}),
  });
};

export const trackInitiateCheckout = ({ contents, value }: { contents: PixelContent[]; value: number }) =>
  trackMetaPixel('InitiateCheckout', {
    ...toContents(contents),
    value,
    currency: CURRENCY,
  });

export const trackPurchase = ({ orderNumber, value, contents }: { orderNumber: string; value: number; contents: PixelContent[] }) =>
  trackMetaPixel(
    'Purchase',
    {
      ...(contents.length ? toContents(contents) : { content_type: 'product' }),
      value,
      currency: CURRENCY,
    },
    orderNumber
  );
