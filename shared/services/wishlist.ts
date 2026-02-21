import { Axios } from '@/core/lib/axios';

interface WishlistResponse {
  message: string;
}

export interface WishlistProductImage {
  id: number;
  image: string;
  is_primary: boolean;
}

export interface WishlistProduct {
  id: number;
  name: string;
  short_description: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
  price: string;
  offer_price: number;
  discount_percentage: number;
  discount_label: string;
  is_active: boolean;
  is_in_stock: boolean;
  available_stock: number;
  ratings_count: number;
  images: WishlistProductImage[];
  created_at: string;
  updated_at: string;
}

export interface WishlistProductsResponse {
  next: string | null;
  previous: string | null;
  count: number;
  num_pages: number;
  current_page: number;
  result: WishlistProduct[];
  status: boolean;
  other: unknown;
  message: string;
}

export const getWishlistProducts = async (params?: { search?: string; page_size?: number; page?: number }): Promise<WishlistProductsResponse> => {
  const response = await Axios.get<WishlistProductsResponse>('lists/wishlist/products/', { params });
  return response.data;
};

export const addToWishlist = async (productId: number): Promise<WishlistResponse> => {
  const response = await Axios.post<WishlistResponse>('lists/wishlist/add/', {
    product_id: productId,
  });
  return response.data;
};

export const removeFromWishlist = async (productId: number): Promise<WishlistResponse> => {
  const response = await Axios.post<WishlistResponse>('lists/wishlist/remove/', {
    product_id: productId,
  });
  return response.data;
};
