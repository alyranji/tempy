export interface FilterParams {
  isRtl?: string;
  price_min?: number;
  price_max?: number;
  sort?: "price_asc" | "price_desc" | "newest" | "popular";
  limit?: number;
  page?: number;
  search?: string;
  min_score?: number;
  category?: string[];
  tag?: string[];
  addons?: string[];
  features?: string[];
  requirements?: string[];
}
