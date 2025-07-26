export interface RelatedProductsInterface {
  message: string;
  count: number;
  relatedProducts: RelatedProduct[];
}

export interface RelatedProduct {
  rateAvg: number;
  rateCount: number;
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
  id: string;
}
