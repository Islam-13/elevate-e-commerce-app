export interface OrderDTO {
  _id: string;
  user: string;
  orderItems: OrderItemDTO[];
  totalPrice: number;
  paymentType: string;
  isPaid: boolean;
  isDelivered: boolean;
  state: string;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  __v: number;
}

interface OrderItemDTO {
  product: ProductDTO;
  price: number;
  quantity: number;
  _id: string;
}

interface ProductDTO {
  rateAvg: number;
  rateCount: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
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
}

export interface OrderResponseDTO {
  message: string;
  metaData: MetaData;
  orders: OrderDTO[];
}

export interface MetaData {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}
