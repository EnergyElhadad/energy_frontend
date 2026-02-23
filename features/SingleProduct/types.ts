export interface CategoryData {
  id: number;
  name: string;
}

export interface ImagesData {
  id: number;
  image: string;
  is_primary: boolean;
}

export interface ProductData {
  id: number;
  name: string;
  short_description: string;
  description: string;
  category: CategoryData;
  price: string;
  offer_price: number;
  discount_percentage: number;
  discount_label: string;
  is_active: boolean;
  is_in_stock: boolean;
  is_in_wishlist: boolean;
  available_stock: number;
  ratings_count: number;
  images: ImagesData[];
  created_at: string;
  updated_at: string;
}
