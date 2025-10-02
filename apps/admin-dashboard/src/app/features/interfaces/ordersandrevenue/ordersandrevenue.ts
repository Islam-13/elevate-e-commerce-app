
export interface Ordersandrevenue {
  message: string;
  statistics: Statistics;
}

export interface Statistics {
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
