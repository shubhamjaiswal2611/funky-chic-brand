import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  Package,
  RefreshCw,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useBackend } from "../hooks/useBackend";
import { useCartStore } from "../store/cartStore";
import { useThemeStore } from "../store/themeStore";
import type { CartItem, ShippingAddress } from "../types/index";

// Mandala SVG decoration
function MandalaDecor({ isFunky }: { isFunky: boolean }) {
  const c1 = isFunky ? "oklch(0.88 0.3 130)" : "oklch(0.76 0.18 72)";
  const c2 = isFunky ? "oklch(0.6 0.32 330)" : "oklch(0.48 0.2 273)";
  const c3 = isFunky ? "oklch(0.65 0.28 210)" : "oklch(0.54 0.24 22)";

  const angles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      aria-hidden="true"
      role="presentation"
      className="mx-auto mb-4 opacity-60"
    >
      <title>{"mandala decoration"}</title>
      <circle cx="60" cy="60" r="8" fill={c1} />
      <circle
        cx="60"
        cy="60"
        r="16"
        fill="none"
        stroke={c2}
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <circle
        cx="60"
        cy="60"
        r="26"
        fill="none"
        stroke={c3}
        strokeWidth="1"
        strokeDasharray="2 4"
      />
      {angles.map((a) => {
        const rad = (a * Math.PI) / 180;
        const x1 = 60 + 18 * Math.cos(rad);
        const y1 = 60 + 18 * Math.sin(rad);
        const x2 = 60 + 38 * Math.cos(rad);
        const y2 = 60 + 38 * Math.sin(rad);
        return (
          <line
            key={a}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={a % 90 === 0 ? c1 : c2}
            strokeWidth={a % 90 === 0 ? 2 : 1}
          />
        );
      })}
      {angles.map((a) => {
        const rad = (a * Math.PI) / 180;
        const cx = 60 + 38 * Math.cos(rad);
        const cy = 60 + 38 * Math.sin(rad);
        return (
          <circle key={a} cx={cx} cy={cy} r="3" fill={a % 90 === 0 ? c1 : c3} />
        );
      })}
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke={c1}
        strokeWidth="0.5"
        opacity="0.4"
      />
    </svg>
  );
}

type ConfirmationState = "loading" | "success" | "polling" | "failed";

export default function OrderConfirmation() {
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const { actor } = useBackend();
  const { clearCart } = useCartStore();

  const search = useSearch({ strict: false }) as {
    orderId?: string;
    session_id?: string;
  };

  const orderId = search.orderId;
  const stripeSessionId = search.session_id;

  const accentColor = isFunky ? "oklch(var(--lime))" : "oklch(0.48 0.2 273)";
  const priceColor = isFunky
    ? "oklch(var(--secondary))"
    : "oklch(var(--primary))";
  const ctaBg = isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))";
  const ctaFg = isFunky
    ? "oklch(0.98 0 0)"
    : "oklch(var(--primary-foreground))";

  // Recover cart snapshot stored before Stripe redirect
  const [savedItems] = useState<CartItem[]>(() => {
    try {
      const raw = sessionStorage.getItem("checkout_items");
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [savedShipping] = useState<ShippingAddress | null>(() => {
    try {
      const raw = sessionStorage.getItem("checkout_shipping");
      return raw ? (JSON.parse(raw) as ShippingAddress) : null;
    } catch {
      return null;
    }
  });
  const [savedTotalCents] = useState<number>(() => {
    const raw = sessionStorage.getItem("checkout_total_cents");
    return raw ? Number(raw) : 0;
  });

  const [confirmState, setConfirmState] = useState<ConfirmationState>(
    stripeSessionId ? "polling" : orderId ? "success" : "loading",
  );
  const [finalOrderId, setFinalOrderId] = useState<string>(orderId ?? "");
  const placeOrderCalledRef = useRef(false);

  // Poll Stripe session status and place order once confirmed
  useQuery({
    queryKey: ["stripe-session", stripeSessionId],
    queryFn: async () => {
      if (!actor || !stripeSessionId) return null;

      const status = await actor.getStripeSessionStatus(stripeSessionId);

      if (status.__kind__ === "completed" && !placeOrderCalledRef.current) {
        placeOrderCalledRef.current = true;
        setConfirmState("loading");

        try {
          const orderItems = savedItems.map((item) => ({
            productId: item.productId,
            productName: item.name,
            quantity: BigInt(item.quantity),
            priceInCents: BigInt(item.price),
            variantSize: item.variantSize,
            variantColor: item.variantColor,
          }));

          const shipping: ShippingAddress = savedShipping ?? {
            name: "Guest",
            line1: "N/A",
            city: "N/A",
            state: "N/A",
            postalCode: "00000",
            country: "US",
          };

          const newOrderId = await actor.placeOrder(
            orderItems,
            BigInt(savedTotalCents),
            shipping,
            stripeSessionId,
          );

          clearCart();
          sessionStorage.removeItem("checkout_items");
          sessionStorage.removeItem("checkout_shipping");
          sessionStorage.removeItem("checkout_total_cents");

          setFinalOrderId(newOrderId);
          setConfirmState("success");
        } catch {
          setConfirmState("failed");
        }

        return status;
      }

      if (status.__kind__ === "failed") {
        setConfirmState("failed");
        return status;
      }

      // Still polling
      return status;
    },
    enabled: !!actor && !!stripeSessionId && confirmState === "polling",
    refetchInterval: 2000,
    refetchIntervalInBackground: false,
  });

  // If no session_id and no orderId, just show success for direct orders
  useEffect(() => {
    if (!stripeSessionId && !orderId) {
      setConfirmState("failed");
    }
  }, [stripeSessionId, orderId]);

  const displayItems = savedItems.length > 0 ? savedItems : [];
  const displayTotal = savedTotalCents > 0 ? savedTotalCents : 0;

  return (
    <div
      className="min-h-screen flex items-start justify-center pt-12 pb-16"
      style={{ backgroundColor: "oklch(var(--background))" }}
    >
      <div className="w-full max-w-2xl mx-4">
        {/* Polling / Loading */}
        {(confirmState === "polling" || confirmState === "loading") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-brand p-10 text-center"
            data-ocid="order_confirmation.loading_state"
          >
            <div className="flex items-center justify-center mb-6">
              <RefreshCw
                size={48}
                className="animate-spin"
                style={{ color: accentColor }}
              />
            </div>
            <h1
              className="heading-brand text-3xl mb-3"
              style={{ color: "oklch(var(--foreground))" }}
            >
              {confirmState === "polling"
                ? "CONFIRMING PAYMENT"
                : "PLACING YOUR ORDER"}
            </h1>
            <p
              className="font-body text-sm"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Please wait while we verify your payment and place your order…
            </p>
            <div className="mt-6 space-y-2">
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          </motion.div>
        )}

        {/* Failed */}
        {confirmState === "failed" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-brand p-10 text-center"
            data-ocid="order_confirmation.error_state"
          >
            <XCircle
              size={64}
              className="mx-auto mb-6"
              style={{ color: "oklch(var(--destructive))" }}
            />
            <h1
              className="heading-brand text-3xl mb-4"
              style={{ color: "oklch(var(--foreground))" }}
            >
              PAYMENT FAILED
            </h1>
            <p
              className="font-body text-sm mb-6"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              We couldn't process your order. Your cart is still saved — please
              try again.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/checkout">
                <Button
                  data-ocid="order_confirmation.retry_button"
                  className="font-body font-bold uppercase tracking-widest text-sm"
                  style={{ backgroundColor: ctaBg, color: ctaFg }}
                >
                  Try Again
                </Button>
              </Link>
              <Link to="/cart">
                <Button
                  variant="outline"
                  data-ocid="order_confirmation.cart_button"
                  className="font-body font-semibold text-xs uppercase tracking-widest"
                >
                  Back to Cart
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Success */}
        {confirmState === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            data-ocid="order_confirmation.success_state"
          >
            {/* Cultural motif header */}
            <div
              className="card-brand p-8 text-center mb-4"
              style={{
                borderBottom: isFunky
                  ? "3px solid oklch(var(--lime))"
                  : "2px solid oklch(0.76 0.18 72)",
              }}
            >
              <MandalaDecor isFunky={isFunky} />
              <CheckCircle2
                size={56}
                className="mx-auto mb-4"
                style={{
                  color: isFunky
                    ? "oklch(var(--secondary))"
                    : "oklch(0.6 0.2 165)",
                }}
              />
              <h1
                className="heading-brand text-3xl md:text-4xl mb-3"
                style={{ color: "oklch(var(--foreground))" }}
              >
                ORDER CONFIRMED!
              </h1>
              <p
                className="font-body text-base leading-relaxed max-w-md mx-auto"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Thank you for shopping with us! Your bold style choice is on its
                way. We've received your order and will ship it soon. ✨
              </p>
            </div>

            {/* Order details card */}
            <div className="card-brand p-6 mb-4">
              {/* Order number */}
              {finalOrderId && (
                <div
                  className="flex items-center justify-between p-3 rounded-md mb-4"
                  style={{ backgroundColor: "oklch(var(--muted))" }}
                >
                  <span
                    className="font-body text-xs uppercase tracking-widest"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Order ID
                  </span>
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: accentColor }}
                    data-ocid="order_confirmation.order_id"
                  >
                    {finalOrderId.length > 16
                      ? `${finalOrderId.slice(0, 8)}…${finalOrderId.slice(-8)}`
                      : finalOrderId}
                  </span>
                </div>
              )}

              {/* Estimated delivery */}
              <div
                className="flex items-center gap-3 p-3 rounded-md mb-4"
                style={{ backgroundColor: "oklch(var(--muted))" }}
              >
                <Clock
                  size={16}
                  style={{ color: accentColor, flexShrink: 0 }}
                />
                <div>
                  <p
                    className="font-body text-xs uppercase tracking-wide font-semibold"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    Estimated Delivery
                  </p>
                  <p
                    className="font-body text-sm"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    5–10 business days · International shipping available
                  </p>
                </div>
              </div>

              {/* Items in order */}
              {displayItems.length > 0 && (
                <>
                  <h3
                    className="font-display font-bold uppercase tracking-widest text-xs mb-3"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Items Ordered
                  </h3>
                  <div className="space-y-3 mb-4">
                    {displayItems.map((item, i) => (
                      <motion.div
                        key={`${item.productId}__${item.variantSize ?? ""}__${item.variantColor ?? ""}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="flex gap-3 items-center"
                        data-ocid={`order_confirmation.item.${i + 1}`}
                      >
                        <div
                          className="w-12 h-12 rounded overflow-hidden flex-shrink-0"
                          style={{ backgroundColor: "oklch(var(--muted))" }}
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
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-body text-sm font-semibold truncate"
                            style={{ color: "oklch(var(--foreground))" }}
                          >
                            {item.name}
                          </p>
                          <p
                            className="font-body text-xs"
                            style={{ color: "oklch(var(--muted-foreground))" }}
                          >
                            {[item.variantSize, item.variantColor]
                              .filter(Boolean)
                              .join(" · ")
                              ? [item.variantSize, item.variantColor]
                                  .filter(Boolean)
                                  .join(" · ")
                              : null}{" "}
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span
                          className="font-body text-sm font-bold flex-shrink-0"
                          style={{ color: priceColor }}
                        >
                          ${((item.price * item.quantity) / 100).toFixed(2)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <Separator className="mb-4" />
                  <div
                    className="flex justify-between font-display font-bold text-xl"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    <span>Total Paid</span>
                    <span style={{ color: priceColor }}>
                      ${(displayTotal / 100).toFixed(2)}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Shipping summary */}
            {savedShipping && (
              <div className="card-brand p-6 mb-4">
                <h3
                  className="font-display font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  <Package size={14} />
                  Shipping To
                </h3>
                <p
                  className="font-body text-sm"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {savedShipping.name}
                </p>
                <p
                  className="font-body text-sm"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {savedShipping.line1}
                  {savedShipping.line2 ? `, ${savedShipping.line2}` : ""}
                </p>
                <p
                  className="font-body text-sm"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {savedShipping.city}, {savedShipping.state}{" "}
                  {savedShipping.postalCode}
                </p>
                <p
                  className="font-body text-sm"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {savedShipping.country}
                </p>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/products" className="flex-1">
                <Button
                  data-ocid="order_confirmation.shop_button"
                  className="w-full font-body font-bold uppercase tracking-widest text-sm h-12"
                  style={{ backgroundColor: ctaBg, color: ctaFg }}
                >
                  <ShoppingBag size={16} className="mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  data-ocid="order_confirmation.home_button"
                  className="font-body font-semibold text-xs uppercase tracking-widest h-12 px-6"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
