import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { type CSSProperties, useState } from "react";
import { toast } from "sonner";
import ProductCard from "../components/ProductCard";
import { useBackend } from "../hooks/useBackend";
import { useAuth } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { useThemeStore } from "../store/themeStore";
import { useWishlistStore } from "../store/wishlistStore";
import type { Product } from "../types/index";

const CATEGORY_COLORS: Record<string, CSSProperties> = {
  Apparel: {
    backgroundColor: "oklch(0.6 0.32 330 / 0.15)",
    color: "oklch(0.6 0.32 330)",
  },
  Accessories: {
    backgroundColor: "oklch(0.88 0.3 130 / 0.15)",
    color: "oklch(0.88 0.3 130)",
  },
  Lifestyle: {
    backgroundColor: "oklch(0.65 0.28 210 / 0.15)",
    color: "oklch(0.65 0.28 210)",
  },
  "Fusion Art": {
    backgroundColor: "oklch(0.76 0.18 72 / 0.15)",
    color: "oklch(0.76 0.18 72)",
  },
};

function PaisleyDecor({
  className = "",
  style,
}: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 100 160"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <title>Decorative paisley</title>
      <g fill="currentColor" opacity="0.7">
        <path d="M50 10 C70 10 85 30 80 55 C75 80 55 90 50 120 C45 90 25 80 20 55 C15 30 30 10 50 10Z" />
        <path
          d="M50 20 C65 20 75 35 72 55 C69 75 55 85 50 110 C45 85 31 75 28 55 C25 35 35 20 50 20Z"
          fill="none"
          stroke="oklch(var(--background))"
          strokeWidth="1.5"
        />
        <circle cx="50" cy="140" r="8" />
        <circle
          cx="50"
          cy="135"
          r="4"
          fill="none"
          stroke="oklch(var(--background))"
          strokeWidth="1"
        />
        <path d="M46 10 C30 5 20 18 26 28 C32 38 46 32 50 10Z" />
      </g>
    </svg>
  );
}

function MandalaDecor({
  className = "",
  style,
}: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <title>Decorative mandala</title>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.6"
        transform="translate(100,100)"
      >
        {([0, 45, 90, 135, 180, 225, 270, 315] as number[]).map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <line x1="0" y1="0" x2="0" y2="-82" />
            <ellipse cx="0" cy="-52" rx="8" ry="14" />
            <circle cx="0" cy="-26" r="4" fill="currentColor" opacity="0.3" />
          </g>
        ))}
        <circle r="16" />
        <circle r="36" strokeDasharray="4 4" />
        <circle r="60" strokeDasharray="2 6" />
        <circle r="80" />
      </g>
    </svg>
  );
}

function DetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Skeleton className="h-5 w-28 mb-8" />
      <div className="grid md:grid-cols-2 gap-12">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="space-y-5">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-20 w-full" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <Skeleton key={i} className="h-10 w-14" />
            ))}
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const { actor, isFetching: actorFetching } = useBackend();
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const { isAuthenticated } = useAuth();
  const { addItem: addToCart } = useCartStore();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();

  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts() as Promise<Product[]>;
    },
    enabled: !!actor && !actorFetching,
  });

  const { data: product, isLoading } = useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(id) as Promise<Product | null>;
    },
    enabled: !!actor && !actorFetching && !!id,
  });

  if (isLoading || actorFetching) return <DetailSkeleton />;

  if (!product) {
    return (
      <div
        className="container mx-auto px-4 py-20 text-center"
        data-ocid="product_detail.error_state"
      >
        <MandalaDecor
          className="w-20 h-20 mx-auto mb-5 opacity-20"
          style={{ color: "oklch(var(--muted-foreground))" }}
        />
        <p
          className="font-display text-2xl font-bold uppercase mb-2"
          style={{ color: "oklch(var(--foreground))" }}
        >
          Product not found
        </p>
        <p
          className="font-body text-sm mb-6"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          This item may have sold out or been removed.
        </p>
        <Link to="/products">
          <Button
            className="font-body font-bold uppercase tracking-widest text-sm"
            style={{
              backgroundColor: "oklch(var(--primary))",
              color: "oklch(var(--primary-foreground))",
            }}
          >
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  const priceDisplay = `$${(Number(product.price) / 100).toFixed(0)}`;
  const sizes = [
    ...new Set(
      product.variants.filter((v) => v.size).map((v) => v.size as string),
    ),
  ];
  const colors = [
    ...new Set(
      product.variants.filter((v) => v.color).map((v) => v.color as string),
    ),
  ];
  const wishlisted = isInWishlist(product.id);
  const inStock = Number(product.stockQuantity) > 0;
  const categoryStyle =
    CATEGORY_COLORS[product.category] ?? CATEGORY_COLORS.Apparel;

  // Related products: same category, exclude current
  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      imageUrl: product.imageUrl,
      variantSize: selectedSize,
      variantColor: selectedColor,
      quantity,
    });
    toast.success(`${product.name} added to cart!`, {
      description: `Qty: ${quantity}`,
    });
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast.info("Login to save to wishlist");
      return;
    }
    if (wishlisted) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        category: product.category,
      });
      toast.success("Added to wishlist!");
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(var(--background))" }}
      data-ocid="product_detail.page"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          to="/products"
          data-ocid="product_detail.back_link"
          className="inline-flex items-center gap-2 mb-8 font-body text-sm transition-smooth hover:opacity-70"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          <ArrowLeft size={15} /> Back to Shop
        </Link>

        {/* ── Product Main ── */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            {/* Funky: neon border frame */}
            {isFunky && inStock && (
              <div
                className="absolute -inset-1 rounded-xl -z-10"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(var(--hotpink)), oklch(var(--neonblue)), oklch(var(--lime)))",
                }}
              />
            )}
            <div className="relative rounded-xl overflow-hidden aspect-square bg-muted">
              {!imgError && product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center pattern-paisley relative">
                  <ShoppingBag
                    size={60}
                    style={{ color: "oklch(var(--muted-foreground) / 0.3)" }}
                  />
                  {/* Paisley decorations */}
                  <PaisleyDecor
                    className="absolute top-6 left-6 w-12 h-20 opacity-30 rotate-12"
                    style={{
                      color: isFunky
                        ? "oklch(var(--hotpink))"
                        : "oklch(var(--secondary))",
                    }}
                  />
                  <PaisleyDecor
                    className="absolute bottom-6 right-6 w-10 h-16 opacity-25 -rotate-20"
                    style={{
                      color: isFunky
                        ? "oklch(var(--lime))"
                        : "oklch(var(--primary))",
                    }}
                  />
                </div>
              )}

              {!inStock && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: "oklch(var(--background) / 0.75)" }}
                >
                  <span
                    className="font-display text-3xl font-black uppercase tracking-wider"
                    style={{ color: "oklch(var(--destructive))" }}
                  >
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* Decorative mandala behind image */}
            <MandalaDecor
              className="absolute -bottom-8 -right-8 w-32 h-32 pointer-events-none -z-10 opacity-30"
              style={{
                color: isFunky
                  ? "oklch(var(--lime))"
                  : "oklch(var(--secondary))",
              }}
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-5"
          >
            {/* Category + Stock */}
            <div className="flex items-center gap-3">
              <Badge
                className="text-xs uppercase tracking-wider border-0 font-body font-semibold"
                style={categoryStyle}
              >
                {product.category}
              </Badge>
              {inStock && (
                <span
                  className="font-body text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {Number(product.stockQuantity)} in stock
                </span>
              )}
            </div>

            {/* Name */}
            <h1
              className="heading-brand text-3xl md:text-4xl lg:text-5xl"
              style={{ color: "oklch(var(--foreground))" }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <p
                className="font-display text-4xl font-black"
                style={{
                  color: isFunky
                    ? "oklch(var(--secondary))"
                    : "oklch(var(--primary))",
                  textShadow: isFunky
                    ? "0 0 20px oklch(var(--secondary) / 0.4)"
                    : "none",
                }}
              >
                {priceDisplay}
              </p>
              {isFunky && (
                <span
                  className="font-body text-xs uppercase tracking-wider px-2 py-1 rounded"
                  style={{
                    backgroundColor: "oklch(var(--lime) / 0.15)",
                    color: "oklch(var(--lime))",
                  }}
                >
                  Free Shipping
                </span>
              )}
            </div>

            {/* Description */}
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              {product.description}
            </p>

            {/* Divider */}
            <div
              className="h-px"
              style={{
                background: isFunky
                  ? "linear-gradient(90deg, oklch(var(--hotpink)), oklch(var(--neonblue)), transparent)"
                  : "oklch(var(--border))",
              }}
            />

            {/* Sizes */}
            {sizes.length > 0 && (
              <div>
                <p
                  className="font-body font-semibold text-xs uppercase tracking-widest mb-3"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Size
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  data-ocid="product_detail.size_selector"
                >
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      data-ocid={`product_detail.size.${size}`}
                      onClick={() =>
                        setSelectedSize(
                          size === selectedSize ? undefined : size,
                        )
                      }
                      className="min-w-[44px] h-10 px-4 rounded-md text-sm font-body font-semibold uppercase tracking-wider border transition-smooth"
                      style={
                        selectedSize === size
                          ? {
                              backgroundColor: isFunky
                                ? "oklch(var(--hotpink))"
                                : "oklch(var(--primary))",
                              color: "oklch(var(--primary-foreground))",
                              borderColor: isFunky
                                ? "oklch(var(--hotpink))"
                                : "oklch(var(--primary))",
                              boxShadow: isFunky
                                ? "2px 2px 0 oklch(var(--lime))"
                                : "none",
                            }
                          : {
                              backgroundColor: "transparent",
                              borderColor: "oklch(var(--border))",
                              color: "oklch(var(--foreground))",
                            }
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {colors.length > 0 && (
              <div>
                <p
                  className="font-body font-semibold text-xs uppercase tracking-widest mb-3"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Color
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  data-ocid="product_detail.color_selector"
                >
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      data-ocid={`product_detail.color.${color.toLowerCase()}`}
                      onClick={() =>
                        setSelectedColor(
                          color === selectedColor ? undefined : color,
                        )
                      }
                      className="px-4 h-10 rounded-md text-sm font-body font-semibold tracking-wider border transition-smooth"
                      style={
                        selectedColor === color
                          ? {
                              backgroundColor: isFunky
                                ? "oklch(var(--neonblue))"
                                : "oklch(var(--primary))",
                              color: "oklch(var(--primary-foreground))",
                              borderColor: isFunky
                                ? "oklch(var(--neonblue))"
                                : "oklch(var(--primary))",
                              boxShadow: isFunky
                                ? "2px 2px 0 oklch(var(--hotpink))"
                                : "none",
                            }
                          : {
                              backgroundColor: "transparent",
                              borderColor: "oklch(var(--border))",
                              color: "oklch(var(--foreground))",
                            }
                      }
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p
                className="font-body font-semibold text-xs uppercase tracking-widest mb-3"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Quantity
              </p>
              <div
                className="flex items-center gap-1"
                data-ocid="product_detail.quantity_selector"
              >
                <button
                  type="button"
                  data-ocid="product_detail.quantity_minus"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 rounded-md border flex items-center justify-center transition-smooth disabled:opacity-40"
                  style={{
                    borderColor: "oklch(var(--border))",
                    color: "oklch(var(--foreground))",
                  }}
                >
                  <Minus size={14} />
                </button>
                <span
                  className="w-12 text-center font-display font-bold text-lg"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  data-ocid="product_detail.quantity_plus"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  disabled={
                    quantity >= 10 || quantity >= Number(product.stockQuantity)
                  }
                  aria-label="Increase quantity"
                  className="w-10 h-10 rounded-md border flex items-center justify-center transition-smooth disabled:opacity-40"
                  style={{
                    borderColor: "oklch(var(--border))",
                    color: "oklch(var(--foreground))",
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA Row */}
            <div className="flex gap-3 mt-1">
              <Button
                data-ocid="product_detail.add_to_cart_button"
                onClick={handleAddToCart}
                disabled={!inStock}
                className="flex-1 font-body font-bold uppercase tracking-widest text-sm h-12 transition-smooth"
                style={
                  inStock
                    ? {
                        backgroundColor: isFunky
                          ? "oklch(var(--hotpink))"
                          : "oklch(var(--primary))",
                        color: "oklch(var(--primary-foreground))",
                        boxShadow: isFunky
                          ? "4px 4px 0 oklch(var(--lime))"
                          : "none",
                      }
                    : {}
                }
              >
                {inStock
                  ? `Add ${quantity > 1 ? `${quantity}x ` : ""}to Cart`
                  : "Out of Stock"}
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      data-ocid="product_detail.wishlist_toggle"
                      onClick={handleWishlistToggle}
                      aria-label={
                        wishlisted ? "Remove from wishlist" : "Add to wishlist"
                      }
                      className="h-12 w-12 transition-smooth"
                      style={{
                        borderColor: wishlisted
                          ? "oklch(var(--destructive))"
                          : "oklch(var(--border))",
                        color: wishlisted
                          ? "oklch(var(--destructive))"
                          : "oklch(var(--muted-foreground))",
                        boxShadow:
                          isFunky && wishlisted
                            ? "2px 2px 0 oklch(var(--hotpink))"
                            : "none",
                      }}
                    >
                      <Heart
                        size={18}
                        fill={wishlisted ? "currentColor" : "none"}
                      />
                    </Button>
                  </TooltipTrigger>
                  {!isAuthenticated && (
                    <TooltipContent>
                      <p>Login to save to wishlist</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-2">
              {["Free Returns", "Ethically Made", "Ships in 2-3 Days"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="font-body text-xs flex items-center gap-1"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    <span
                      style={{
                        color: isFunky
                          ? "oklch(var(--lime))"
                          : "oklch(var(--secondary))",
                      }}
                    >
                      ✓
                    </span>
                    {badge}
                  </span>
                ),
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <section className="mt-20" data-ocid="product_detail.related_section">
            {/* Section header */}
            <div className="relative mb-8 flex items-center gap-4">
              <div
                className="h-px flex-1"
                style={{ backgroundColor: "oklch(var(--border))" }}
              />
              <h2
                className="heading-brand text-xl md:text-2xl shrink-0"
                style={{
                  color: isFunky
                    ? "oklch(var(--lime))"
                    : "oklch(var(--foreground))",
                  textShadow: isFunky
                    ? "0 0 20px oklch(var(--lime) / 0.4)"
                    : "none",
                }}
              >
                {isFunky ? "⚡ YOU MIGHT ALSO WANT ⚡" : "You May Also Like"}
              </h2>
              <div
                className="h-px flex-1"
                style={{ backgroundColor: "oklch(var(--border))" }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((relatedProduct, i) => (
                <Link
                  key={relatedProduct.id}
                  to="/product/$id"
                  params={{ id: relatedProduct.id }}
                  data-ocid={`product_detail.related.${i + 1}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <ProductCard product={relatedProduct} index={i} />
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Cultural accent band ── */}
        <div
          className="mt-16 py-8 rounded-xl relative overflow-hidden pattern-paisley flex items-center justify-center"
          style={{
            backgroundColor: isFunky
              ? "oklch(var(--card))"
              : "oklch(var(--muted) / 0.4)",
            border: isFunky
              ? "2px solid oklch(var(--hotpink) / 0.4)"
              : "1px solid oklch(var(--border))",
          }}
        >
          <PaisleyDecor
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-16 opacity-30"
            style={{
              color: isFunky ? "oklch(var(--lime))" : "oklch(var(--secondary))",
            }}
          />
          <PaisleyDecor
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-16 opacity-30 scale-x-[-1]"
            style={{
              color: isFunky
                ? "oklch(var(--hotpink))"
                : "oklch(var(--primary))",
            }}
          />
          <p
            className="heading-brand text-sm tracking-[0.3em] text-center"
            style={{
              color: isFunky
                ? "oklch(var(--neonblue))"
                : "oklch(var(--muted-foreground))",
            }}
          >
            {isFunky
              ? "⚡ HANDCRAFTED · GLOBALLY SOURCED · STREET CERTIFIED ⚡"
              : "Handcrafted · Globally Sourced · Ethically Made"}
          </p>
        </div>
      </div>
    </div>
  );
}
