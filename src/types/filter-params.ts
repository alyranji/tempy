export type FilterParams = {
  search?: string;
  price_min?: number;
  price_max?: number;
  min_score?: number;
  review_count?: number;
  sell_count?: number;
  rtl?: boolean;
  categories?: string[];
  tags?: string[];
  features?: string[];
  addons?: string[];
  sort?: "price_asc" | "price_desc" | "newest" | "popular";
  limit?: number;
  page?: number;
};
