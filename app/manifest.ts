import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Energy Elhadad',
    short_name: 'Energy Elhadad',
    description: "Energy Elhadad's official platform for integrated energy solutions and outstanding services.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#64AD46',
    orientation: 'portrait',
    icons: [
      {
        src: '/images/header-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
