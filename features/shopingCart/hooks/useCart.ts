'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { addToCart, getCartItems, removeCartItem, updateCartItem } from '../services/cart';
import type { CartItem, Product, UseCartReturn } from '@/shared/types/cart';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import { trackAddToCart } from '@/shared/components/analytics/metaPixelEvents';

export const useCart = (): UseCartReturn => {
  const queryClient = useQueryClient();
  const { status } = useSession();
  const t = useTranslations('Cart');

  // Both guests and authenticated users use the server cart. The guest cart is
  // keyed on the session cookie (Axios sends it via `withCredentials`), so items
  // actually land in the backend cart — a prerequisite for apply-promo and
  // checkout, which both read the server cart. We wait until the auth status is
  // resolved so the request carries the right credentials (guest vs token).
  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
    enabled: status !== 'loading',
  });

  // Defensive: the cart response shape can vary (auth failure → error envelope
  // without `result`, partial response, deployment skew between FE & BE, etc).
  // A throw here unmounts the React tree and shows the generic "Application
  // error" page, so guard every level of the access chain.
  const serverItems: CartItem[] =
    data?.result?.items?.map(item => ({
      id: item.product.id,
      title: item.product.name,
      category: '', // TODO: API doesn't provide category for cart items yet
      image: item.product.primary_image || '/images/products/product-placeholder.webp',
      quantity: item.quantity,
      price: item.product.offer_price,
      itemTotal: item.item_total,
    })) ?? [];

  const items: CartItem[] = serverItems;
  const count = data?.result?.items_count ?? 0;

  const { mutate: addToCartMutation, isPending: isAddingToCart } = useMutation({
    mutationFn: addToCart,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(data.message);
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || t('something_wrong'));
      } else {
        toast.error(t('something_wrong'));
      }
    },
  });

  const { mutate: updateCartItemMutation } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(data.message);
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        const serverMsg = error.response?.data?.message;
        // Backend returns a generic "فشل تحديث العنصر في العربة" when the
        // requested quantity exceeds available stock — surface a clearer
        // message to the user.
        if (serverMsg === 'فشل تحديث العنصر في العربة') {
          toast.error(t('stock_limit_reached'));
          return;
        }
        toast.error(serverMsg || t('something_wrong'));
      } else {
        toast.error(t('something_wrong'));
      }
    },
  });

  const { mutate: removeCartItemMutation } = useMutation({
    mutationFn: removeCartItem,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(data.message);
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || t('something_wrong'));
      } else {
        toast.error(t('something_wrong'));
      }
    },
  });

  const addItem = (product: Product, quantity: number = 1, options?: { onSuccess?: () => void }) => {
    addToCartMutation(
      { product_id: product.id, quantity },
      {
        onSuccess: () => {
          // Every add-to-cart entry point (product page, cards, offer modal)
          // funnels through here, and only confirmed adds are counted.
          trackAddToCart({ id: product.id, name: product.title, price: product.price, quantity });
          options?.onSuccess?.();
        },
      }
    );
  };

  const removeItem = (id: string | number) => {
    removeCartItemMutation({ product_id: id });
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      updateCartItemMutation({ product_id: id, quantity });
    }
  };

  const cartTotal = data?.result?.cart_total ?? 0;
  const discountBreakdown = data?.result?.discount_breakdown;

  return {
    items,
    count,
    cartTotal,
    discountBreakdown,
    addItem,
    removeItem,
    updateQuantity,
    isAddingToCart,
  };
};
