export interface OrderDetailsModelServer {
  product_id: string,
  title: string,
  description: string,
  image: string,
  price: string,
  qty_ordered: string
}

export interface OrderModelServer {
  order_id : string,
  username: string,
  details: OrderDetailsModelServer[]
}
