/**
 * Meta (Facebook) Pixel — https://developers.facebook.com/docs/meta-pixel
 *
 * ID intentionally hardcoded (not env-driven): marketing requires always-on
 * tracking, and a missing env var on a host would silently disable it.
 * The ID is public in page source by definition.
 */
export const META_PIXEL_ID = '2497929610647135';

/**
 * Base pixel bootstrap. Rendered once inside <head> of the root layout so it
 * is present in the server-rendered HTML (view-source acceptance criterion).
 * The snippet's own `if(f.fbq)return` guard prevents double initialization.
 * Route-change PageViews are handled by <MetaPixelPageView />.
 */
export const MetaPixelScript = () => (
  <script
    id="meta-pixel"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
    }}
  />
);

/**
 * <noscript> image fallback for JS-disabled browsers. Rendered as the first
 * child of <body>: an <img> inside <head> is invalid HTML (browsers relocate
 * it and prematurely close <head>), so the standard GTM-style body placement
 * is used. Still visible in page source.
 */
export const MetaPixelNoScript = () => (
  <noscript
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1"/>`,
    }}
  />
);
