import { OrderStatus, UserRole } from "../backend";
import type { backendInterface } from "../backend.d";

const MOCK_PRINCIPAL = {
  toString: () => "aaaaa-aa",
  toUint8Array: () => new Uint8Array(29),
  toHex: () => "00",
  compareTo: () => 0,
  isAnonymous: () => false,
} as unknown as import("@icp-sdk/core/principal").Principal;

const MOCK_PRODUCTS = [
  {
    id: "prod-001",
    name: "Saffron Mandala Hoodie",
    description: "Bold mandala-print hoodie blending Indian folk art with streetwear silhouettes. Heavyweight cotton, oversized fit.",
    price: BigInt(7999),
    stockQuantity: BigInt(42),
    category: "Tops",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
    variants: [
      { size: "S", color: "Saffron" },
      { size: "M", color: "Saffron" },
      { size: "L", color: "Indigo" },
      { size: "XL", color: "Indigo" },
    ],
  },
  {
    id: "prod-002",
    name: "Paisley Graffiti Jacket",
    description: "Street-art meets paisley in this limited-edition bomber jacket. Neon accents on jet-black canvas.",
    price: BigInt(14999),
    stockQuantity: BigInt(15),
    category: "Outerwear",
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    variants: [
      { size: "M", color: "Black/Neon" },
      { size: "L", color: "Black/Neon" },
    ],
  },
  {
    id: "prod-003",
    name: "Mughal Block Print Tee",
    description: "Hand-block print inspired by Mughal motifs on premium ringspun cotton. Unisex oversized cut.",
    price: BigInt(3999),
    stockQuantity: BigInt(68),
    category: "Tops",
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    variants: [
      { size: "XS", color: "Off-White" },
      { size: "S", color: "Off-White" },
      { size: "M", color: "Crimson" },
      { size: "L", color: "Crimson" },
    ],
  },
  {
    id: "prod-004",
    name: "Neon Indigo Cargo Pants",
    description: "Six-pocket utility cargos with neon contrast stitching. Built for the streets, styled for the stage.",
    price: BigInt(8999),
    stockQuantity: BigInt(30),
    category: "Bottoms",
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=600&q=80",
    variants: [
      { size: "28", color: "Indigo" },
      { size: "30", color: "Indigo" },
      { size: "32", color: "Black" },
    ],
  },
];

export const mockBackend: backendInterface = {
  addToCart: async () => undefined,
  addToWishlist: async () => undefined,
  adminAddProduct: async () => undefined,
  adminDeleteProduct: async () => true,
  adminGetAllOrders: async () => [],
  adminGetLowStockProducts: async () =>
    MOCK_PRODUCTS.filter((p) => p.stockQuantity < BigInt(20)),
  adminUpdateOrderStatus: async () => true,
  adminUpdateProduct: async () => true,
  adminUpdateStock: async () => true,
  assignCallerUserRole: async () => undefined,
  clearCart: async () => undefined,
  createCheckoutSession: async () => "mock_session_id_123",
  getCallerUserRole: async () => UserRole.guest,
  getCart: async () => ({
    userId: MOCK_PRINCIPAL,
    updatedAt: BigInt(Date.now()),
    items: [],
  }),
  getMyOrders: async () => [],
  getProduct: async (id: string) =>
    MOCK_PRODUCTS.find((p) => p.id === id) ?? null,
  getProducts: async () => MOCK_PRODUCTS,
  getStripeSessionStatus: async () => ({
    __kind__: "failed" as const,
    failed: { error: "Mock session" },
  }),
  getWishlist: async () => [],
  isCallerAdmin: async () => false,
  isStripeConfigured: async () => false,
  placeOrder: async () => "order-mock-001",
  removeFromCart: async () => undefined,
  removeFromWishlist: async () => undefined,
  setStripeConfiguration: async () => undefined,
  subscribeNewsletter: async () => ({ __kind__: "ok" as const, ok: null }),
  transform: async (input) => ({
    status: BigInt(200),
    body: new Uint8Array(),
    headers: [],
  }),
  updateCartQuantity: async () => undefined,
};
