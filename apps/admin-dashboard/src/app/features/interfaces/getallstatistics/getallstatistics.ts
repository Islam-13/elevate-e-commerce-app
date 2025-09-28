
export interface Getallstatistics {
  message: string;
  statistics: Statistics;
}

export interface Statistics {
  overall: Overall;
  products: Products;
  orders: Orders;
  categories: Category[];
}

export interface Category {
  _id: string;
  name: string;
  totalProducts: number;
  totalRevenue: number;
}

export interface Orders {
  ordersByStatus: OrdersByStatus[];
  dailyRevenue: DailyRevenue[];
  monthlyRevenue: DailyRevenue[];
}

export interface DailyRevenue {
  _id: string;
  revenue: number;
  count: number;
}

export interface OrdersByStatus {
  _id: null | string;
  count: number;
}

export interface Products {
  productsByCategory: ProductsByCategory[];
  topSellingProducts: TopSellingProduct[];
  lowStockProducts: LowStockProduct[];
}

export interface LowStockProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  quantity: number;
  id: string;
}

export interface TopSellingProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  sold: number;
  id: string;
}

export interface ProductsByCategory {
  _id: string;
  count: number;
  category: string;
  products: Product[];
}

export interface Product {
  title: string;
  price: number;
  imgCover: string;
  quantity: number;
  sold: number;
}

export interface Overall {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}
