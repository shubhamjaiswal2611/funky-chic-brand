import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import ProtectedRoute from "../components/ProtectedRoute";
import { useCartStore } from "../store/cartStore";
import { useThemeStore } from "../store/themeStore";
import { useWishlistStore } from "../store/wishlistStore";
import type { WishlistItem } from "../types/index";

// Block-print SVG header accent
function BlockPrintHeader({ isFunky }: { isFunky: boolean }) {
  const c1 = isFunky
    ? "oklch(0.88 0.3 130 / 0.25)"
    : "oklch(0.76 0.18 72 / 0.18)";
  const c2 = isFunky
    ? "oklch(0.6 0.32 330 / 0.2)"
    : "oklch(0.48 0.2 273 / 0.12)";
  return (
    <svg
      width="100%"
      height="48"
      viewBox="0 0 800 48"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <title>Block print decoration</title>
      {Array.from({ length: 16 }).map((_, i) => (
        <g key={`bp-${i * 52}`} transform={`translate(${i * 52} 0)`}>
          <ellipse cx="26" cy="12" rx="10" ry="6" fill={c1} />
          <ellipse cx="26" cy="28" rx="6" ry="10" fill={c2} />
          <circle cx="26" cy="40" r="3" fill={c1} />
        </g>
      ))}
    </svg>
  );
}

interface WishlistCardProps {
  item: WishlistItem;
  index: number;
  isFunky: boolean;
  onRemove: (id: string) => void;
  onAddToCart: (item: WishlistItem) => void;
}

function WishlistCard({
  item,
  index,
  isFunky,
  onRemove,
  onAddToCart,
}: WishlistCardProps) {
  const priceDisplay = `$${(item.price / 100).toFixed(0)}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className="card-brand group flex flex-col overflow-hidden"
      data-ocid={`wishlist.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] bg-muted overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center pattern-block-print"
            style={{ backgroundColor: "oklch(var(--muted))" }}
          >
            <ShoppingBag
              size={36}
              style={{ color: "oklch(var(--muted-foreground) / 0.4)" }}
            />
          </div>
        )}

        {/* Remove overlay */}
        <button
          type="button"
          aria-label={`Remove ${item.name} from wishlist`}
          data-ocid={`wishlist.delete_button.${index + 1}`}
          onClick={() => onRemove(item.productId)}
          className="absolute top-2 right-2 p-2 rounded-full transition-smooth opacity-0 group-hover:opacity-100"
          style={{
            backgroundColor: "oklch(var(--destructive))",
            color: "oklch(var(--destructive-foreground))",
          }}
        >
          <Trash2 size={14} />
        </button>

        {/* Category badge */}
        <div
          className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs font-body font-bold uppercase tracking-wider"
          style={{
            backgroundColor: isFunky
              ? "oklch(0.88 0.3 130 / 0.2)"
              : "oklch(var(--secondary) / 0.15)",
            color: isFunky ? "oklch(var(--lime))" : "oklch(var(--secondary))",
          }}
        >
          {item.category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-display font-bold text-base uppercase tracking-tight leading-tight line-clamp-2 min-w-0"
            style={{ color: "oklch(var(--foreground))" }}
          >
            {item.name}
          </h3>
          <span
            className="font-display font-bold text-lg shrink-0"
            style={{
              color: isFunky ? "oklch(var(--lime))" : "oklch(var(--primary))",
            }}
          >
            {priceDisplay}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Button
            data-ocid={`wishlist.add_to_cart.${index + 1}`}
            onClick={() => onAddToCart(item)}
            className="flex-1 font-body font-bold uppercase tracking-widest text-xs transition-smooth"
            style={{
              backgroundColor: isFunky
                ? "oklch(var(--hotpink))"
                : "oklch(var(--primary))",
              color: isFunky
                ? "oklch(0.98 0 0)"
                : "oklch(var(--primary-foreground))",
              boxShadow: isFunky
                ? "0 0 16px oklch(0.6 0.32 330 / 0.35)"
                : "none",
            }}
          >
            <ShoppingBag size={13} className="mr-1.5" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            data-ocid={`wishlist.remove_button.${index + 1}`}
            onClick={() => onRemove(item.productId)}
            aria-label={`Remove ${item.name}`}
            className="px-3 transition-smooth border-border"
            style={{
              color: "oklch(var(--destructive))",
              borderColor: "oklch(var(--destructive) / 0.4)",
            }}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

function WishlistContent() {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";

  const handleRemove = (productId: string) => {
    removeItem(productId);
    toast.info("Removed from wishlist");
  };

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
    });
    toast.success(`${item.name} added to cart!`);
  };

  const accentColor = isFunky
    ? "oklch(var(--hotpink))"
    : "oklch(var(--primary))";

  return (
    <div data-ocid="wishlist.page">
      {/* Page header */}
      <div
        className="relative overflow-hidden py-10 px-4 sm:px-8 border-b border-border"
        style={{ backgroundColor: "oklch(var(--card))" }}
      >
        <BlockPrintHeader isFunky={isFunky} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Heart
              size={28}
              fill="currentColor"
              style={{ color: accentColor }}
            />
            <h1
              className="heading-brand text-3xl md:text-5xl"
              style={{ color: "oklch(var(--foreground))" }}
            >
              {isFunky ? "YOUR FIRE LIST" : "YOUR WISHLIST"}
            </h1>
          </div>
          <p
            className="font-body text-sm"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            {items.length === 0
              ? "Nothing saved yet — start exploring."
              : `${items.length} item${items.length !== 1 ? "s" : ""} saved`}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        {items.length === 0 ? (
          // Empty state
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center py-24 gap-6"
            data-ocid="wishlist.empty_state"
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center pattern-mandala"
              style={{ backgroundColor: "oklch(var(--muted))" }}
            >
              <Heart
                size={40}
                style={{ color: "oklch(var(--muted-foreground) / 0.5)" }}
              />
            </div>
            <div>
              <h2
                className="heading-brand text-2xl md:text-3xl mb-3"
                style={{ color: "oklch(var(--foreground))" }}
              >
                {isFunky ? "NOTHING HERE YET." : "Your Wishlist is Empty"}
              </h2>
              <p
                className="font-body text-sm max-w-xs mx-auto"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                {isFunky
                  ? "Find something loud, bold, and undeniably you."
                  : "Discover pieces that speak to your style and save them here."}
              </p>
            </div>
            <Link to="/products" data-ocid="wishlist.go_shopping_link">
              <Button
                className="font-body font-bold uppercase tracking-widest text-sm px-8 py-5 transition-smooth"
                style={{
                  backgroundColor: accentColor,
                  color: isFunky
                    ? "oklch(0.98 0 0)"
                    : "oklch(var(--primary-foreground))",
                  boxShadow: isFunky
                    ? "0 0 24px oklch(0.6 0.32 330 / 0.4)"
                    : "none",
                }}
              >
                {isFunky ? "SHOP THE DROP \u2192" : "Browse Collection"}
              </Button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Controls bar */}
            <div className="flex items-center justify-between mb-8">
              <p
                className="font-body text-sm font-medium"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                {items.length} saved item{items.length !== 1 ? "s" : ""}
              </p>
              <Link to="/products">
                <Button
                  variant="outline"
                  data-ocid="wishlist.continue_shopping_link"
                  className="font-body font-bold uppercase tracking-widest text-xs border-border transition-smooth"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              <AnimatePresence>
                {items.map((item, index) => (
                  <WishlistCard
                    key={item.productId}
                    item={item}
                    index={index}
                    isFunky={isFunky}
                    onRemove={handleRemove}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Discover more CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-14 text-center"
            >
              <Link to="/products" data-ocid="wishlist.discover_more_link">
                <Button
                  className="font-body font-bold uppercase tracking-widest text-sm px-10 py-5 transition-smooth"
                  style={{
                    backgroundColor: accentColor,
                    color: isFunky
                      ? "oklch(0.98 0 0)"
                      : "oklch(var(--primary-foreground))",
                    boxShadow: isFunky
                      ? "0 0 28px oklch(0.6 0.32 330 / 0.35)"
                      : "none",
                  }}
                >
                  {isFunky ? "DISCOVER MORE \u2192" : "Discover More Pieces"}
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Wishlist() {
  return (
    <ProtectedRoute redirectTo="/login">
      <WishlistContent />
    </ProtectedRoute>
  );
}
