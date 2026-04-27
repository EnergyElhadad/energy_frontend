import { ImageResponse } from 'next/og';

export const alt = 'Energy Elhadad - Integrated Energy Solutions';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Default OpenGraph image used when a shared link doesn't override it.
// Per-page metadata (e.g. product page) can still set its own openGraph.images
// to override this one.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #64AD46 0%, #4A8533 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: 80,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -2,
            marginBottom: 24,
          }}
        >
          Energy Elhadad
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 400,
            opacity: 0.9,
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Integrated Energy Solutions & Outstanding Services
        </div>
      </div>
    ),
    { ...size }
  );
}
