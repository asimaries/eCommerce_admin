type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
}

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: CollectionType[];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
}
enum OrderStatus {
  Pending = "Pending",
  Completed = "Completed",
  Shipping = "Shipping",
}

type OrderColumnType = {
  _id: string;
  customer: string;
  products: number;
  totalAmount: number;
  createdAt: string;
  status: OrderStatus;
}

type OrderItemType = {
  product: ProductType
  color: string;
  size: string;
  quantity: number;
  images?: string[];
  description?: string;
}

type CustomerType = {
  clerkId: string;
  name: string;
  email: string;
}