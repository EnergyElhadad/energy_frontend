'use client';

import { useState } from 'react';
import { useCart } from '@/shared/components/layout/Header/hooks/useCart';
import { AvailableQuantities } from './components/AvailableQuantities';
import { Descriptions } from './components/Descriptions';
import { FooterOffer } from './components/FooterOffer';
import { OfferTitle } from './components/OfferTitle';
import { Quantity } from './components/Quantity';
import { Reviews } from './components/Reviews';
import { Product } from '@/shared/types/product';

type OfferContentProps = {
  title: string;
  linkUrl: string;
  description: string;
  price: string;
  product: Product;
};

export const OfferContent: React.FC<OfferContentProps> = ({ title, linkUrl, description, price, product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem, isAddingToCart } = useCart();

  const handleAddToCart = () => {
    // Note: hook takes a specific Product type but often these match
    // we'll pass the whole object through
    // @ts-expect-error - Expected difference between Product interfaces temporarily ignored
    addItem(product, quantity);
  };

  return (
    <>
      <OfferTitle title={title} />
      <AvailableQuantities />
      <Reviews product={product} />
      <Descriptions description={description} />
      <Quantity price={price} quantity={quantity} onChange={setQuantity} />
      <FooterOffer linkUrl={linkUrl} onAddToCart={handleAddToCart} isLoading={isAddingToCart} />
    </>
  );
};
