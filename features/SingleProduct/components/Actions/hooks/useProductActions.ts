import { useRouter } from '@/core/i18n';
import { useCart } from '@/features/shopingCart/hooks/useCart';
import { Product } from '@/shared/types/cart';

export const useProductActions = () => {
  const router = useRouter();
  const { addItem, isAddingToCart } = useCart();

  const handleAddToCart = (product: Product, quantity: number) => {
    addItem(product, quantity);
  };

  const handleQuickBuy = (product: Product, quantity: number) => {
    addItem(product, quantity, {
      onSuccess: () => {
        router.push('/cart');
      },
    });
  };

  return {
    isAddToCartLoading: isAddingToCart,
    isQuickBuyLoading: isAddingToCart,
    handleAddToCart,
    handleQuickBuy,
  };
};
