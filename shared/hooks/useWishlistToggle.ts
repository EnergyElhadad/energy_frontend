'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { addToWishlist, removeFromWishlist } from '@/shared/services/wishlist';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export const useWishlistToggle = (productId: number | string, initialIsInWishlist: boolean = false) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);

  useEffect(() => {
    setIsInWishlist(initialIsInWishlist);
  }, [initialIsInWishlist]);

  const addMutation = useMutation({
    mutationFn: () => addToWishlist(Number(productId)),
    onSuccess: () => {
      setIsInWishlist(true);
      queryClient.invalidateQueries({ queryKey: ['wishlistProducts'] });
      queryClient.invalidateQueries({ queryKey: ['wishlistPage'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      toast.error('فشل إضافة المنتج للمفضلة');
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => removeFromWishlist(Number(productId)),
    onSuccess: () => {
      setIsInWishlist(false);
      queryClient.invalidateQueries({ queryKey: ['wishlistProducts'] });
      queryClient.invalidateQueries({ queryKey: ['wishlistPage'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      toast.error('فشل إزالة المنتج من المفضلة');
    },
  });

  const toggleWishlist = () => {
    if (!session?.user) {
      toast.error('يجب تسجيل الدخول أولاً');
      return;
    }

    if (isInWishlist) {
      removeMutation.mutate();
    } else {
      addMutation.mutate();
    }
  };

  const isLoading = addMutation.isPending || removeMutation.isPending;

  return {
    isInWishlist,
    toggleWishlist,
    isLoading,
  };
};
