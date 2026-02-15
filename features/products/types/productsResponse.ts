import { Product } from "@/shared/types/product";

export interface ProductsResponse {
  count: number;
  next: string | null;
  num_pages: number;
  current_page: number;
  previous: string | null;
  result: Product[];

    pagination: {
    page: number;
    limit: number;
    total: number;
    
  };
}
