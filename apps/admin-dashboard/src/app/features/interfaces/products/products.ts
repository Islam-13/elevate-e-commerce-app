export interface ApiStatisticsResponse {
  message: string;
  statistics: {
    topSellingProducts: ApiTopSellingProduct[];
    lowStockProducts: ApiLowStockProduct[];
  };
};

export interface ApiTopSellingProduct {
  _id: string;
  id: string;
  title: string;
  imgCover: string;
  price: number;
  sold: number;
};

export interface ApiLowStockProduct {
  _id: string;
  id: string;
  title: string;
  imgCover: string;
  price: number;
  quantity: number;
};


export interface TopSellingItem {
  id: string;
  title: string;
  image: string;
  price: number;
  sold: number;
};

export interface LowStockItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  isCritical: string;
};
