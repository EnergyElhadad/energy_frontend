export interface Category {
  id: number;
  name: string;
  image?: string;
  is_active?: boolean;
  order?: number;
  products_count?: number;
}
