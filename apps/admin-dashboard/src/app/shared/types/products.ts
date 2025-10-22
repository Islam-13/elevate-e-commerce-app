export interface ProductsRes {
  message: string;
  metadata: Metadata;
  products: Product[];
}
export interface ProductRes {
  message: string;
  product: Product;
}

export interface Product {
  rateAvg: number;
  rateCount: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: [];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isSuperAdmin: boolean;
  sold: number;
  id: string;
  discount:number;
}

export interface Metadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}

export interface AddProductData{

 title: string;
description: string;
imgCover: File;
 price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  images: File;
discount:number;
}
