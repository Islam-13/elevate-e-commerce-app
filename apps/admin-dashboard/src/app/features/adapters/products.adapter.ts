import { ApiLowStockProduct, ApiTopSellingProduct, LowStockItem, TopSellingItem } from "../interfaces/products/products";


export function adaptTopSelling(p: ApiTopSellingProduct): TopSellingItem {
  return {
    id: p.id ?? p._id,
    title: p.title,
    image: p.imgCover,
    price: p.price,
    sold: p.sold,
  };
}

export function adaptLowStock(p: ApiLowStockProduct): LowStockItem {
  const qty = p.quantity ?? 0;

  return {
    id: p._id,
    title: p.title,
    image: p.imgCover,
    price: p.price,
    quantity: qty,
    isCritical: p.id
  }
}
