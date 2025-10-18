export type Template = {
  id: string;
  title: string;
  image: string | null;
  description?: string | null;
  demo_url: string | null;
  slug: string;
  price: number;
  rtl: boolean;
  created_at: Date;
  updated_at: Date;
  score: 1 | 2 | 3 | 4 | 5 | null;
  sellCount: number;
  reviewCount: number;
  status: "active" | "draft";
  categories: string[];
  tags: string[];
  features: string[];
  addons: string[];
  requirements: string[];
};

export type InsertType = {
  title: string;
  image: string | null;
  description?: string;
  demo_url?: string;
  slug: string;
  price: number;
  rtl: boolean;
  status: "active" | "draft";
  categories?: string[];
  tags?: string[];
  features?: string[];
  addons?: string[];
  requirements?: string[];
};
