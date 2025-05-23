
export interface PopularItemsInterface {
  message: string;
  metadata: Metadata;
  products: any[];
}

interface Metadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}
