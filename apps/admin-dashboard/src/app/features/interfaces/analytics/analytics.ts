export interface ApiOrderStatus {
  _id: string | null;
  count: number;
}

export interface ApiDailyRevenueItem {
  _id: string;
  revenue: number;
  count: number;
}

export interface ApiMonthlyRevenueItem {
  _id: string;
  revenue: number;
  count: number;
}

export interface ApiStatistics {
  ordersByStatus: ApiOrderStatus[];
  dailyRevenue:   ApiDailyRevenueItem[];
  monthlyRevenue: ApiMonthlyRevenueItem[];
}

export interface ApiRevenueResponse {
  message: string;
  statistics: ApiStatistics;
}


export interface RevenueData {
  monthlyLabels: string[];
  monthlyValues: number[];
  dailyLabels: string[];
  dailyValues: number[];
}

export type RevenueMode = 'monthly' | 'daily';
