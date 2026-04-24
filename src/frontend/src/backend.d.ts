import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShippingAddress {
    country: string;
    city: string;
    postalCode: string;
    name: string;
    line1: string;
    line2?: string;
    state: string;
}
export interface WishlistItem {
    productId: string;
    addedAt: bigint;
}
export interface OrderItem {
    variantColor?: string;
    productId: string;
    productName: string;
    variantSize?: string;
    quantity: bigint;
    priceInCents: bigint;
}
export type SubscribeResult = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export interface ProductVariant {
    color?: string;
    size?: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Order {
    id: string;
    status: OrderStatus;
    userId: Principal;
    createdAt: bigint;
    totalInCents: bigint;
    shippingAddress: ShippingAddress;
    items: Array<OrderItem>;
    stripeSessionId?: string;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Cart {
    userId: Principal;
    updatedAt: bigint;
    items: Array<CartItem>;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface CartItem {
    variantColor?: string;
    productId: string;
    variantSize?: string;
    quantity: bigint;
}
export interface Product {
    id: string;
    stockQuantity: bigint;
    name: string;
    description: string;
    variants: Array<ProductVariant>;
    imageUrl: string;
    category: string;
    price: bigint;
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addToCart(item: CartItem): Promise<void>;
    addToWishlist(productId: string): Promise<void>;
    adminAddProduct(product: Product): Promise<void>;
    adminDeleteProduct(id: string): Promise<boolean>;
    adminGetAllOrders(): Promise<Array<Order>>;
    adminGetLowStockProducts(): Promise<Array<Product>>;
    adminUpdateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean>;
    adminUpdateProduct(product: Product): Promise<boolean>;
    adminUpdateStock(id: string, quantity: bigint): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Cart>;
    getMyOrders(): Promise<Array<Order>>;
    getProduct(id: string): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getWishlist(): Promise<Array<WishlistItem>>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    placeOrder(items: Array<OrderItem>, totalInCents: bigint, shippingAddress: ShippingAddress, stripeSessionId: string | null): Promise<string>;
    removeFromCart(productId: string): Promise<void>;
    removeFromWishlist(productId: string): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    subscribeNewsletter(email: string): Promise<SubscribeResult>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCartQuantity(productId: string, quantity: bigint): Promise<void>;
}
