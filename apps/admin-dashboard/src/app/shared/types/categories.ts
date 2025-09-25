export interface CategoriesRes {
  message: string;
  metadata: Metadata;
  categories: Category[];
}
export interface CategoryRes {
  message: string;
  category: Category;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  productsCount: number;
}

export interface Metadata {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface AddCategoryData {
  name: string;
  image: File;
}
