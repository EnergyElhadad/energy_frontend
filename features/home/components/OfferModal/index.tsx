'use client';

import { CloseIcon } from '@/shared/components/icons/Close';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import { Product } from '@/shared/types/product';
import { toSlug } from '@/shared/utils/slug';
import { ReactNode } from 'react';
import { ImagesOfferSwipper } from './components/ImagesOfferSwipper';
import { OfferContent } from './components/OfferContent';

interface OfferModalProps {
  trigger?: ReactNode;
  onClose?: () => void;
  product: Product;
}

export const OfferModal = ({ onClose, product }: OfferModalProps) => {
  if (!product) return null;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="bg-Background flex h-svh flex-col gap-6 rounded-sm p-5 sm:p-10 lg:h-fit lg:max-w-6xl lg:flex-row">
        <DialogTitle className="sr-only"></DialogTitle>
        <DialogClose className="text-WetGray hover:text-Alert absolute start-2 top-2 z-40 transition">
          <CloseIcon />
        </DialogClose>

        <ImagesOfferSwipper images={product.images} />

        <div className="flex flex-1 flex-col">
          <OfferContent title={product.name} description={product.short_description} price={product.price} linkUrl={`/products/${product.id}-${toSlug(product.name)}`} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
