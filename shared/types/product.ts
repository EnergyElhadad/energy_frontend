import { Category } from './category';
import { Image } from './Image';

export interface ProductImage extends Image {
  is_primary: boolean;
}

export interface Product {
  id: number;
  name: string;
  short_description: string;
  description: string;
  category: Category;
  price: string;
  offer_price: number;
  discount_percentage: number;
  discount_label: string;
  is_active: boolean;
  is_in_stock: boolean;
  available_stock: number;
  ratings_count: number;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
  is_in_wishlist?: boolean;
}
