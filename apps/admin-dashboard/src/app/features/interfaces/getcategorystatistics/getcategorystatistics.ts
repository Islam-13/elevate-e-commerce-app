
export interface Getcategorystatistics {
  message: string;
  statistics: Statistic[];
}

export interface Statistic {
  _id: string;
  name: string;
  totalProducts: number;
  totalRevenue: number;
}
