'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { addToCart, getCartItems, removeCartItem, updateCartItem } from '../services/cart';
import type { CartItem, Product, UseCartReturn } from '@/shared/types/cart';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import {
  addToGuestCart,
  getGuestCartCount,
  getGuestCartTotal,
  readGuestCart,
  removeFromGuestCart,
  updateGuestCartQuantity,
} from '../utils/guestCart';

export const useCart = (): UseCartReturn => {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const isGuest = status !== 'loading' && !session?.user;

  // ---- Guest (localStorage) cart state ----
  const [guestItems, setGuestItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!isGuest) return;
    setGuestItems(readGuestCart());
    const handler = () => setGuestItems(readGuestCart());
    window.addEventListener('guest-cart-changed', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('guest-cart-changed', handler);
      window.removeEventListener('storage', handler);
    };
  }, [isGuest]);

  // ---- Authenticated cart (server) ----
  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
    enabled: !isGuest,
  });

  const serverItems: CartItem[] =
    data?.result.items.map(item => ({
      id: item.product.id,
      title: item.product.name,
      category: '', // TODO: API doesn't provide category for cart items yet
      image: item.product.primary_image || '/images/products/product-placeholder.webp',
      quantity: item.quantity,
      price: item.product.offer_price,
      itemTotal: item.item_total,
    })) || [];

  const items: CartItem[] = isGuest ? guestItems : serverItems;
  const count = isGuest ? getGuestCartCount(guestItems) : data?.result.items_count || 0;

  const { mutate: addToCartMutation, isPending: isAddingToCart } = useMutation({
    mutationFn: addToCart,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(data.message);
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Something went wrong');
      } else {
        toast.error('Something went wrong');
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
          toast.error('لا يمكن طلب كمية أكبر من المتاح في المخزون');
          return;
        }
        toast.error(serverMsg || 'Something went wrong');
      } else {
        toast.error('Something went wrong');
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
        toast.error(error.response?.data?.message || 'Something went wrong');
      } else {
        toast.error('Something went wrong');
      }
    },
  });

  const addItem = (product: Product, quantity: number = 1, options?: { onSuccess?: () => void }) => {
    if (isGuest) {
      addToGuestCart(product, quantity);
      toast.success('تم إضافة العنصر إلى العربة بنجاح');
      options?.onSuccess?.();
      return;
    }
    addToCartMutation(
      { product_id: product.id, quantity },
      {
        onSuccess: () => {
          options?.onSuccess?.();
        },
      }
    );
  };

  const removeItem = (id: string | number) => {
    if (isGuest) {
      removeFromGuestCart(id);
      return;
    }
    removeCartItemMutation({ product_id: id });
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (isGuest) {
      updateGuestCartQuantity(id, quantity);
      return;
    }
    if (quantity <= 0) {
      removeItem(id);
    } else {
      updateCartItemMutation({ product_id: id, quantity });
    }
  };

  const cartTotal = isGuest ? getGuestCartTotal(guestItems) : data?.result.cart_total || 0;
  const discountBreakdown = isGuest ? undefined : data?.result.discount_breakdown;

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
