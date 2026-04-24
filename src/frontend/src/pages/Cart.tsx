import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "@tanstack/react-router";
import { Minus, Package, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCartStore } from "../store/cartStore";
import { useThemeStore } from "../store/themeStore";

// Cultural motif SVG header accent
function MotifAccent({ isFunky }: { isFunky: boolean }) {
  return (
    <svg
      width="100%"
      height="24"
      viewBox="0 0 800 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      role="presentation"
      style={{ display: "block" }}
    >
      <title>{"decorative motif"}</title>
      {isFunky ? (
        // Graffiti-style zigzag neon
        <polyline
          points="0,12 25,4 50,20 75,4 100,20 125,4 150,20 175,4 200,20 225,4 250,20 275,4 300,20 325,4 350,20 375,4 400,20 425,4 450,20 475,4 500,20 525,4 550,20 575,4 600,20 625,4 650,20 675,4 700,20 725,4 750,20 775,4 800,20"
          fill="none"
          stroke="oklch(0.88 0.3 130)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      ) : (
        // Chic paisley-inspired wave
        <path
          d="M0,12 C50,4 100,20 150,12 C200,4 250,20 300,12 C350,4 400,20 450,12 C500,4 550,20 600,12 C650,4 700,20 750,12 C775,8 787,14 800,12"
          fill="none"
          stroke="oklch(0.76 0.18 72)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      )}
    </svg>
  );
}

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const navigate = useNavigate();

  const subtotalCents = getTotal();
  const taxCents = Math.round(subtotalCents * 0.1);
  const totalCents = subtotalCents + taxCents;

  const accentColor = isFunky
    ? "oklch(var(--lime))"
    : "oklch(var(--indigo, 0.48 0.2 273))";
  const priceColor = isFunky
    ? "oklch(var(--secondary))"
    : "oklch(var(--primary))";
  const ctaBg = isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))";
  const ctaFg = isFunky
    ? "oklch(0.98 0 0)"
    : "oklch(var(--primary-foreground))";

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(var(--background))" }}
    >
      {/* Banner with cultural motif */}
      <div
        className="pt-10 pb-0 text-center relative overflow-hidden"
        style={{ backgroundColor: "oklch(var(--card))" }}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ShoppingBag size={20} style={{ color: accentColor }} />
            <h1
              className="heading-brand text-4xl md:text-5xl"
              style={{ color: accentColor }}
            >
              YOUR CART
            </h1>
            <ShoppingBag size={20} style={{ color: accentColor }} />
          </div>
          {items.length > 0 && (
            <p
              className="font-body text-sm mb-3"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              {items.reduce((s, i) => s + i.quantity, 0)} item
              {items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""} in
              your bag
            </p>
          )}
        </div>
        <MotifAccent isFunky={isFunky} />
      </div>

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-6 py-20 text-center"
            data-ocid="cart.empty_state"
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "oklch(var(--muted))" }}
            >
              <Package
                size={40}
                style={{ color: "oklch(var(--muted-foreground))" }}
              />
            </div>
            <div>
              <p
                className="font-display text-2xl font-bold uppercase mb-2"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Your cart is empty
              </p>
              <p
                className="font-body text-sm"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Discover bold pieces from global cultures — add something
                extraordinary.
              </p>
            </div>
            <Link to="/products">
              <Button
                data-ocid="cart.shop_button"
                className="font-body font-bold uppercase tracking-widest text-sm px-8"
                style={{ backgroundColor: ctaBg, color: ctaFg }}
              >
                Explore Collection
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Items list */}
            <div className="md:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item, i) => (
                  <motion.div
                    key={`${item.productId}__${item.variantSize ?? ""}__${item.variantColor ?? ""}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30, scale: 0.95 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    className="card-brand flex gap-4 p-4"
                    data-ocid={`cart.item.${i + 1}`}
                  >
                    {/* Product image */}
                    <div
                      className="w-22 h-22 rounded-md overflow-hidden flex-shrink-0"
                      style={{
                        width: "88px",
                        height: "88px",
                        backgroundColor: "oklch(var(--muted))",
                        border: isFunky
                          ? "2px solid oklch(var(--hotpink) / 0.3)"
                          : "1px solid oklch(var(--border))",
                      }}
                    >
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full pattern-block-print" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-display font-bold uppercase text-sm tracking-tight leading-tight line-clamp-2"
                        style={{ color: "oklch(var(--foreground))" }}
                      >
                        {item.name}
                      </p>
                      {(item.variantSize || item.variantColor) && (
                        <p
                          className="font-body text-xs mt-1 uppercase tracking-wide"
                          style={{ color: "oklch(var(--muted-foreground))" }}
                        >
                          {[item.variantSize, item.variantColor]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      )}
                      <p
                        className="font-body text-xs mt-1"
                        style={{ color: "oklch(var(--muted-foreground))" }}
                      >
                        ${(item.price / 100).toFixed(2)} each
                      </p>
                      <p
                        className="font-display font-bold text-base mt-1"
                        style={{ color: priceColor }}
                      >
                        ${((item.price * item.quantity) / 100).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity + Remove */}
                    <div className="flex flex-col items-end justify-between gap-2">
                      <button
                        type="button"
                        data-ocid={`cart.delete_button.${i + 1}`}
                        onClick={() =>
                          removeItem(
                            item.productId,
                            item.variantSize,
                            item.variantColor,
                          )
                        }
                        aria-label="Remove item"
                        className="p-1.5 rounded transition-smooth hover:opacity-70"
                        style={{ color: "oklch(var(--destructive))" }}
                      >
                        <Trash2 size={14} />
                      </button>
                      <div
                        className="flex items-center rounded-full overflow-hidden"
                        style={{ border: "1px solid oklch(var(--border))" }}
                      >
                        <button
                          type="button"
                          data-ocid={`cart.decrease.${i + 1}`}
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity - 1,
                              item.variantSize,
                              item.variantColor,
                            )
                          }
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center transition-smooth hover:opacity-70"
                          style={{
                            backgroundColor: "oklch(var(--muted))",
                            color: "oklch(var(--foreground))",
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          className="font-body font-semibold text-sm w-8 text-center"
                          style={{ color: "oklch(var(--foreground))" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          data-ocid={`cart.increase.${i + 1}`}
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity + 1,
                              item.variantSize,
                              item.variantColor,
                            )
                          }
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center transition-smooth hover:opacity-70"
                          style={{
                            backgroundColor: "oklch(var(--muted))",
                            color: "oklch(var(--foreground))",
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary sidebar */}
            <div
              className="card-brand p-6 h-fit sticky top-24"
              data-ocid="cart.summary_panel"
            >
              <h2
                className="font-display font-bold uppercase tracking-widest text-xs mb-4"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Order Summary
              </h2>

              {/* Per-item breakdown */}
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div
                    key={`${item.productId}__${item.variantSize ?? ""}__${item.variantColor ?? ""}`}
                    className="flex justify-between text-xs font-body"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    <span className="truncate mr-2 flex-1">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="flex-shrink-0">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="mb-4" />

              {/* Subtotal / Tax / Total */}
              <div className="space-y-2 mb-4">
                <div
                  className="flex justify-between font-body text-sm"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  <span>Subtotal</span>
                  <span>${(subtotalCents / 100).toFixed(2)}</span>
                </div>
                <div
                  className="flex justify-between font-body text-sm"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  <span>Est. Tax (10%)</span>
                  <span>${(taxCents / 100).toFixed(2)}</span>
                </div>
                <Separator />
                <div
                  className="flex justify-between font-display font-bold text-xl pt-1"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  <span>Total</span>
                  <span style={{ color: priceColor }}>
                    ${(totalCents / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                data-ocid="cart.checkout_button"
                onClick={() => navigate({ to: "/checkout" })}
                className="w-full font-body font-bold uppercase tracking-widest text-sm"
                style={{ backgroundColor: ctaBg, color: ctaFg }}
              >
                Proceed to Checkout
              </Button>
              <Link to="/products">
                <Button
                  variant="ghost"
                  data-ocid="cart.continue_shopping_button"
                  className="w-full mt-2 font-body font-semibold text-xs uppercase tracking-widest"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust badge */}
              <p
                className="text-center text-xs mt-4 font-body"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                🔒 Secure checkout · Free returns
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
