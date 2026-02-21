'use client';

import { useQuery } from '@tanstack/react-query';
import { HomeProductsSection } from './HomeProductsSection';
import { getHomeFeaturesClient } from '../services/home';
import { HomeFeaturesResponse } from '../services/home.server';

interface HomeFeaturesListProps {
  initialData: HomeFeaturesResponse;
}

export const HomeFeaturesList = ({ initialData }: HomeFeaturesListProps) => {
  const { data } = useQuery({
    queryKey: ['products', 'homeFeatures'],
    queryFn: getHomeFeaturesClient,
    initialData,
  });

  if (!data?.result || data.result.length === 0) return null;

  return (
    <>
      {data.result.map(feature => (
        <HomeProductsSection key={feature.id} title={feature.title} products={feature.products} urlLink={`/products?home_sections=${feature.id}`} />
      ))}
    </>
  );
};
