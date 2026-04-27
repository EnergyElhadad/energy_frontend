export interface ProductsQueryParams {
  page?: number;
  page_size?: number;
  category?: number;
  home_sections?: number;
  min_price?: number;
  max_price?: number;
  on_sale?: boolean;
  search?: string;
  ordering?: 'id' | '-id';
  rating?: number;
}
