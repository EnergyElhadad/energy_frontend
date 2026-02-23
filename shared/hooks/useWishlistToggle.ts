'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { addToWishlist, removeFromWishlist } from '@/shared/services/wishlist';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export const useWishlistToggle = (productId: number | string, initialIsInWishlist: boolean = false) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);
  const t = useTranslations('Common');

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
      toast.error(t('wishlist_add_failed'));
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
      toast.error(t('wishlist_remove_failed'));
    },
  });

  const toggleWishlist = () => {
    if (!session?.user) {
      toast.error(t('login_required'));
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
