import React from 'react';

type OverlayHeroProps = {
  show?: boolean;
};

export const OverlayHero: React.FC<OverlayHeroProps> = ({ show = true }) => {
  if (!show) return null;
  return <div className="absolute inset-0 bg-linear-to-l from-black/90 to-black/20" />;
};
