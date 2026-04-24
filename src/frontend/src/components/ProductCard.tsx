import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { type CSSProperties, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { useThemeStore } from "../store/themeStore";
import { useWishlistStore } from "../store/wishlistStore";
import type { Product } from "../types/index";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const CATEGORY_COLORS: Record<string, CSSProperties> = {
  Apparel: {
    backgroundColor: "oklch(0.6 0.32 330 / 0.18)",
    color: "oklch(0.6 0.32 330)",
  },
  Accessories: {
    backgroundColor: "oklch(0.88 0.3 130 / 0.18)",
    color: "oklch(0.88 0.3 130)",
  },
  Lifestyle: {
    backgroundColor: "oklch(0.65 0.28 210 / 0.18)",
    color: "oklch(0.65 0.28 210)",
  },
  "Fusion Art": {
    backgroundColor: "oklch(0.76 0.18 72 / 0.18)",
    color: "oklch(0.76 0.18 72)",
  },
} as const;

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const { addItem: addToCart } = useCartStore();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const wishlisted = isInWishlist(product.id);
  const [imgError, setImgError] = useState(false);

  const priceInCents = Number(product.price);
  const priceDisplay = `$${(priceInCents / 100).toFixed(0)}`;
  const categoryStyle =
    CATEGORY_COLORS[product.category] ?? CATEGORY_COLORS.Apparel;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: priceInCents,
      imageUrl: product.imageUrl,
      variantSize: product.variants[0]?.size,
      variantColor: product.variants[0]?.color,
    });
    toast.success(`${product.name} added to cart!`, {
      description: "View your cart to checkout.",
    });
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) return;
    if (wishlisted) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        price: priceInCents,
        imageUrl: product.imageUrl,
        category: product.category,
      });
      toast.success("Added to wishlist!");
    }
  };

  return (
    <article
      className="card-brand group relative flex flex-col overflow-hidden"
      data-ocid={`product.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5] bg-muted">
        {!imgError && product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center pattern-block-print"
            style={{ backgroundColor: "oklch(var(--muted))" }}
          >
            <ShoppingBag
              size={40}
              style={{ color: "oklch(var(--muted-foreground) / 0.4)" }}
            />
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 collection-card-overlay opacity-0 group-hover:opacity-100 transition-smooth" />

        {/* Stock badge */}
        {Number(product.stockQuantity) === 0 && (
          <div
            className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-body font-bold uppercase tracking-wider"
            style={{
              backgroundColor: "oklch(var(--destructive))",
              color: "oklch(var(--destructive-foreground))",
            }}
          >
            Sold Out
          </div>
        )}

        {/* Wishlist button */}
        <div className="absolute top-2 right-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  data-ocid={`product.wishlist_toggle.${index + 1}`}
                  onClick={handleWishlistToggle}
                  disabled={!isAuthenticated}
                  aria-disabled={!isAuthenticated}
                  aria-label={
                    !isAuthenticated
                      ? "Login to save to wishlist"
                      : wishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                  }
                  className="p-2 rounded-full transition-smooth"
                  style={{
                    backgroundColor: "oklch(var(--background) / 0.85)",
                    color: wishlisted
                      ? "oklch(var(--destructive))"
                      : "oklch(var(--muted-foreground))",
                    cursor: isAuthenticated ? "pointer" : "not-allowed",
                    opacity: isAuthenticated ? 1 : 0.5,
                  }}
                >
                  <Heart
                    size={16}
                    fill={wishlisted ? "currentColor" : "none"}
                  />
                </button>
              </TooltipTrigger>
              {!isAuthenticated && (
                <TooltipContent>
                  <p>Login to save to wishlist</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category + Price row */}
        <div className="flex items-center justify-between gap-2">
          <Badge
            className="text-xs font-body font-semibold uppercase tracking-wider border-0"
            style={categoryStyle}
          >
            {product.category}
          </Badge>
          <span
            className="font-display font-bold text-lg"
            style={{
              color: isFunky
                ? "oklch(var(--secondary))"
                : "oklch(var(--primary))",
            }}
          >
            {priceDisplay}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-display font-bold text-base uppercase tracking-tight leading-tight line-clamp-2"
          style={{ color: "oklch(var(--foreground))" }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p
          className="font-body text-xs leading-relaxed line-clamp-2 flex-1"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          {product.description}
        </p>

        {/* Add to Cart */}
        <Button
          data-ocid={`product.add_to_cart.${index + 1}`}
          onClick={handleAddToCart}
          disabled={Number(product.stockQuantity) === 0}
          className="w-full font-body font-bold uppercase tracking-widest text-xs transition-smooth"
          style={
            Number(product.stockQuantity) > 0
              ? {
                  backgroundColor: isFunky
                    ? "oklch(var(--accent))"
                    : "oklch(var(--primary))",
                  color: isFunky
                    ? "oklch(var(--accent-foreground))"
                    : "oklch(var(--primary-foreground))",
                }
              : {}
          }
        >
          {Number(product.stockQuantity) === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </article>
  );
}
