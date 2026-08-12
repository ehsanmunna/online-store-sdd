export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentCategoryId?: string;
  productCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  imageUrl?: string;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
  categoryName: string;
  createdAt: string;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  shippingFullName: string;
  shippingAddressLine1: string;
  shippingAddressLine2?: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingPhone: string;
  subTotal: number;
  shippingCost: number;
  tax: number;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

export interface AuthResponse {
  accessToken: string;
  expiresAtUtc: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}
