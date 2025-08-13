

export interface CartInterface {
  message: string
  numOfCartItems: number
  cart: Cart
}

export interface Cart {
  user: string
  cartItems: CartItem[]
  _id: string
  appliedCoupons: any[]
  totalPrice: number
  createdAt: string
  updatedAt: string
  __v: number
   numOfCartItems: number;
}

export interface CartItem {
  product: Product
  price: number
  quantity: number
  idProduct: string

  id: string,
  name: string,
  image: string, 
  category: string,
  priceOfProduct: number,
  count: number,
  rateAvg: number,
  rateCount: number,
  totalPrice: number
}

export interface Product {
  rateAvg: number
  rateCount: number
  _id: string
  title: string
  slug: string
  description: string
  imgCover: string
  images: string[]
  price: number
  priceAfterDiscount: number
  quantity: number
  category: string
  occasion: string
  createdAt: string
  updatedAt: string
  __v: number
  sold: number
  isSuperAdmin: boolean
  id: string
}

export interface addProduct{
  product:string
  quantity: number
}
