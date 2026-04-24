import type { Principal } from "@icp-sdk/core/principal";

// Re-exported from backend types for frontend use
export { OrderStatus, UserRole } from "../backend.d";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  price: bigint; // price in cents
  stockQuantity: bigint;
  variants: ProductVariant[];
}

export interface ProductVariant {
  size?: string;
  color?: string;
}

// Frontend cart item (augmented with display info)
export interface CartItem {
  productId: string;
  name: string;
  price: number; // in cents
  imageUrl: string;
  quantity: number;
  variantSize?: string;
  variantColor?: string;
}

export interface WishlistItem {
  productId: string;
  name: string;
  price: number; // in cents
  imageUrl: string;
  category: string;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: bigint;
  priceInCents: bigint;
  variantSize?: string;
  variantColor?: string;
}

export interface Order {
  id: string;
  status: import("../backend.d").OrderStatus;
  userId: Principal;
  createdAt: bigint;
  totalInCents: bigint;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  stripeSessionId?: string;
}

export interface User {
  role: import("../backend.d").UserRole;
  isAdmin: boolean;
}
