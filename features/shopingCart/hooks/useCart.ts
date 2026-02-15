'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToCart, getCartItems, removeCartItem, updateCartItem } from '../services/cart';
import type { CartItem, Product, UseCartReturn } from '@/shared/types/cart';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';

export const useCart = (): UseCartReturn => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
  });

  const items: CartItem[] =
    data?.result.items.map(item => ({
      id: item.product.id,
      title: item.product.name,
      category: '', // TODO: API doesn't provide category for cart items yet
      image: item.product.primary_image,
      quantity: item.quantity,
      price: item.product.offer_price,
      itemTotal: item.item_total,
    })) || [];

  const count = data?.result.items_count || 0;

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
        toast.error(error.response?.data?.message || 'Something went wrong');
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
    removeCartItemMutation({ product_id: id });
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      updateCartItemMutation({ product_id: id, quantity });
    }
  };

  const cartTotal = data?.result.cart_total || 0;
  const discountBreakdown = data?.result.discount_breakdown;

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
