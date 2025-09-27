export interface OccasionsRes {
  message: string;
  metadata: Metadata;
  occasions: Occasion[];
}

export interface Occasion {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
}

interface Metadata {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}
