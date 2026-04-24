import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useBackend } from "../hooks/useBackend";
import { useCartStore } from "../store/cartStore";
import { useThemeStore } from "../store/themeStore";
import type { ShippingAddress } from "../types/index";

const FIELD_LABELS: Record<keyof ShippingAddress, string> = {
  name: "Full Name",
  line1: "Address Line 1",
  line2: "Address Line 2 (optional)",
  city: "City",
  state: "State / Province",
  postalCode: "Postal Code",
  country: "Country",
};

const FIELD_PLACEHOLDERS: Record<keyof ShippingAddress, string> = {
  name: "Priya Sharma",
  line1: "123 Culture Street",
  line2: "Apt 4B",
  city: "New York",
  state: "NY",
  postalCode: "10001",
  country: "US",
};

function CheckoutPageInner() {
  const { actor } = useBackend();
  const navigate = useNavigate();
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const { items, getTotal, clearCart } = useCartStore();

  const [form, setForm] = useState<ShippingAddress>({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  });

  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const subtotalCents = getTotal();
  const taxCents = Math.round(subtotalCents * 0.1);
  const totalCents = subtotalCents + taxCents;

  const priceColor = isFunky
    ? "oklch(var(--secondary))"
    : "oklch(var(--primary))";
  const ctaBg = isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))";
  const ctaFg = isFunky
    ? "oklch(0.98 0 0)"
    : "oklch(var(--primary-foreground))";
  const accentColor = isFunky ? "oklch(var(--lime))" : "oklch(0.48 0.2 273)";

  // Stripe checkout session flow
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected to backend");

      const origin = window.location.origin;
      const successUrl = `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${origin}/checkout`;

      // Build ShoppingItems for Stripe
      const shoppingItems = items.map((item) => ({
        productName: item.name,
        productDescription:
          [item.variantSize, item.variantColor].filter(Boolean).join(", ") ||
          item.name,
        currency: "usd",
        quantity: BigInt(item.quantity),
        priceInCents: BigInt(item.price),
      }));

      const sessionUrl = await actor.createCheckoutSession(
        shoppingItems,
        successUrl,
        cancelUrl,
      );

      return sessionUrl;
    },
    onSuccess: (sessionUrl) => {
      // Store shipping address and cart snapshot in sessionStorage for order confirmation
      sessionStorage.setItem("checkout_shipping", JSON.stringify(form));
      sessionStorage.setItem("checkout_items", JSON.stringify(items));
      sessionStorage.setItem("checkout_total_cents", String(totalCents));
      // Redirect to Stripe
      window.location.href = sessionUrl;
    },
    onError: (err) => {
      const msg =
        err instanceof Error
          ? err.message
          : "Payment failed. Please try again.";
      setPaymentError(msg);
      toast.error("Payment setup failed. Please try again.");
    },
  });

  // Fallback direct order placement (if Stripe not configured)
  const directOrderMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected to backend");
      const orderItems = items.map((item) => ({
        productId: item.productId,
        productName: item.name,
        quantity: BigInt(item.quantity),
        priceInCents: BigInt(item.price),
        variantSize: item.variantSize,
        variantColor: item.variantColor,
      }));
      const orderId = await actor.placeOrder(
        orderItems,
        BigInt(totalCents),
        form,
        null,
      );
      return orderId;
    },
    onSuccess: (orderId) => {
      clearCart();
      sessionStorage.removeItem("checkout_shipping");
      sessionStorage.removeItem("checkout_items");
      sessionStorage.removeItem("checkout_total_cents");
      navigate({ to: "/order-confirmation", search: { orderId } });
    },
    onError: (err) => {
      const msg =
        err instanceof Error ? err.message : "Order failed. Please try again.";
      setPaymentError(msg);
      toast.error("Failed to place order. Please try again.");
    },
  });

  const handleChange =
    (field: keyof ShippingAddress) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const isFormValid =
    form.name.trim() &&
    form.line1.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    form.postalCode.trim() &&
    form.country.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);
    if (!isFormValid) return;
    // Try Stripe first; fallback handled server-side
    checkoutMutation.mutate();
  };

  const isPending = checkoutMutation.isPending || directOrderMutation.isPending;

  if (items.length === 0) {
    return (
      <div className="text-center py-20" data-ocid="checkout.empty_state">
        <p
          className="font-display text-2xl font-bold uppercase mb-4"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          Your cart is empty
        </p>
        <p
          className="font-body text-sm mb-6"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          Add some bold pieces before checking out.
        </p>
        <Link to="/products">
          <Button
            data-ocid="checkout.browse_button"
            className="font-body font-bold uppercase tracking-widest"
            style={{ backgroundColor: ctaBg, color: ctaFg }}
          >
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-10">
      {/* Shipping + Payment (left col) */}
      <div className="md:col-span-3 space-y-6">
        {/* Section header */}
        <div>
          <h2
            className="font-display font-bold uppercase tracking-widest text-xs mb-1"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Shipping Details
          </h2>
          <div
            className="h-0.5 rounded-full"
            style={{ backgroundColor: accentColor, width: "48px" }}
          />
        </div>

        {/* Full Name */}
        <div className="space-y-1.5">
          <Label
            htmlFor="name"
            className="font-body text-xs uppercase tracking-widest"
            style={{ color: "oklch(var(--foreground))" }}
          >
            {FIELD_LABELS.name}
          </Label>
          <Input
            id="name"
            data-ocid="checkout.name_input"
            required
            value={form.name}
            onChange={handleChange("name")}
            placeholder={FIELD_PLACEHOLDERS.name}
          />
        </div>

        {/* Address Line 1 */}
        <div className="space-y-1.5">
          <Label
            htmlFor="line1"
            className="font-body text-xs uppercase tracking-widest"
            style={{ color: "oklch(var(--foreground))" }}
          >
            {FIELD_LABELS.line1}
          </Label>
          <Input
            id="line1"
            data-ocid="checkout.line1_input"
            required
            value={form.line1}
            onChange={handleChange("line1")}
            placeholder={FIELD_PLACEHOLDERS.line1}
          />
        </div>

        {/* Address Line 2 */}
        <div className="space-y-1.5">
          <Label
            htmlFor="line2"
            className="font-body text-xs uppercase tracking-widest"
            style={{ color: "oklch(var(--foreground))" }}
          >
            {FIELD_LABELS.line2}
          </Label>
          <Input
            id="line2"
            data-ocid="checkout.line2_input"
            value={form.line2 ?? ""}
            onChange={handleChange("line2")}
            placeholder={FIELD_PLACEHOLDERS.line2}
          />
        </div>

        {/* City + State */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="city"
              className="font-body text-xs uppercase tracking-widest"
              style={{ color: "oklch(var(--foreground))" }}
            >
              {FIELD_LABELS.city}
            </Label>
            <Input
              id="city"
              data-ocid="checkout.city_input"
              required
              value={form.city}
              onChange={handleChange("city")}
              placeholder={FIELD_PLACEHOLDERS.city}
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="state"
              className="font-body text-xs uppercase tracking-widest"
              style={{ color: "oklch(var(--foreground))" }}
            >
              {FIELD_LABELS.state}
            </Label>
            <Input
              id="state"
              data-ocid="checkout.state_input"
              required
              value={form.state}
              onChange={handleChange("state")}
              placeholder={FIELD_PLACEHOLDERS.state}
            />
          </div>
        </div>

        {/* Postal Code + Country */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="postalCode"
              className="font-body text-xs uppercase tracking-widest"
              style={{ color: "oklch(var(--foreground))" }}
            >
              {FIELD_LABELS.postalCode}
            </Label>
            <Input
              id="postalCode"
              data-ocid="checkout.postal_code_input"
              required
              value={form.postalCode}
              onChange={handleChange("postalCode")}
              placeholder={FIELD_PLACEHOLDERS.postalCode}
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="country"
              className="font-body text-xs uppercase tracking-widest"
              style={{ color: "oklch(var(--foreground))" }}
            >
              {FIELD_LABELS.country}
            </Label>
            <Input
              id="country"
              data-ocid="checkout.country_input"
              required
              value={form.country}
              onChange={handleChange("country")}
              placeholder={FIELD_PLACEHOLDERS.country}
            />
          </div>
        </div>

        {/* Same as billing checkbox */}
        <div
          className="flex items-center gap-3 p-3 rounded-md"
          style={{ backgroundColor: "oklch(var(--muted))" }}
        >
          <Checkbox
            id="sameAsBilling"
            data-ocid="checkout.billing_same_checkbox"
            checked={sameAsBilling}
            onCheckedChange={(v) => setSameAsBilling(v === true)}
          />
          <label
            htmlFor="sameAsBilling"
            className="font-body text-sm cursor-pointer"
            style={{ color: "oklch(var(--foreground))" }}
          >
            Billing address same as shipping
          </label>
        </div>

        {/* Payment section */}
        <div>
          <h2
            className="font-display font-bold uppercase tracking-widest text-xs mb-1"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Payment
          </h2>
          <div
            className="h-0.5 rounded-full mb-4"
            style={{ backgroundColor: accentColor, width: "48px" }}
          />
          <div
            className="rounded-lg p-4 text-center"
            style={{
              backgroundColor: "oklch(var(--muted))",
              border: "1px solid oklch(var(--border))",
            }}
          >
            <p
              className="font-body text-sm mb-1"
              style={{ color: "oklch(var(--foreground))" }}
            >
              🔒 Secure Payment via Stripe
            </p>
            <p
              className="font-body text-xs"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              You'll be redirected to Stripe's secure checkout to enter your
              card details. We never store payment information.
            </p>
          </div>
        </div>

        {/* Payment error */}
        {paymentError && (
          <div
            className="flex items-start gap-3 p-4 rounded-lg"
            data-ocid="checkout.error_state"
            style={{
              backgroundColor: "oklch(var(--destructive) / 0.1)",
              border: "1px solid oklch(var(--destructive) / 0.3)",
            }}
          >
            <AlertCircle
              size={16}
              style={{
                color: "oklch(var(--destructive))",
                flexShrink: 0,
                marginTop: "2px",
              }}
            />
            <div>
              <p
                className="font-body text-sm font-semibold"
                style={{ color: "oklch(var(--destructive))" }}
              >
                Payment Error
              </p>
              <p
                className="font-body text-xs mt-0.5"
                style={{ color: "oklch(var(--destructive))" }}
              >
                {paymentError}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Order summary sidebar */}
      <div className="md:col-span-2">
        <div
          className="card-brand p-6 sticky top-24"
          data-ocid="checkout.summary_panel"
        >
          <h2
            className="font-display font-bold uppercase tracking-widest text-xs mb-4"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Order Summary
          </h2>

          {/* Items */}
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div
                key={`${item.productId}__${item.variantSize ?? ""}__${item.variantColor ?? ""}`}
                className="flex gap-3 items-start"
              >
                <div
                  className="w-10 h-10 rounded overflow-hidden flex-shrink-0"
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
                    className="font-body text-xs font-semibold truncate"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    {item.name}
                  </p>
                  {(item.variantSize || item.variantColor) && (
                    <p
                      className="font-body text-xs"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      {[item.variantSize, item.variantColor]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                  <p
                    className="font-body text-xs"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Qty: {item.quantity}
                  </p>
                </div>
                <span
                  className="font-body text-xs font-semibold flex-shrink-0"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <Separator className="mb-4" />

          {/* Totals */}
          <div className="space-y-2 mb-6">
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

          {/* Place Order CTA */}
          <Button
            type="submit"
            data-ocid="checkout.place_order_button"
            disabled={isPending || !isFormValid}
            className="w-full font-body font-bold uppercase tracking-widest text-sm h-12"
            style={{
              backgroundColor:
                isPending || !isFormValid ? "oklch(var(--muted))" : ctaBg,
              color:
                isPending || !isFormValid
                  ? "oklch(var(--muted-foreground))"
                  : ctaFg,
            }}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Processing…
              </span>
            ) : (
              "Pay with Stripe →"
            )}
          </Button>

          {!isFormValid && (
            <p
              className="text-center text-xs mt-2 font-body"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Please complete all required fields above
            </p>
          )}

          <p
            className="text-center text-xs mt-3 font-body"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            🔒 256-bit SSL encrypted · Cancel anytime
          </p>
        </div>
      </div>
    </form>
  );
}

export default function Checkout() {
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const accentColor = isFunky ? "oklch(var(--lime))" : "oklch(0.48 0.2 273)";

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(var(--background))" }}
    >
      {/* Header */}
      <div
        className="py-10 text-center"
        style={{ backgroundColor: "oklch(var(--card))" }}
      >
        <h1
          className="heading-brand text-4xl md:text-5xl"
          style={{ color: accentColor }}
        >
          CHECKOUT
        </h1>
        <p
          className="font-body text-sm mt-2"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          Secure · Fast · Worldwide Shipping
        </p>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <CheckoutPageInner />
      </div>
    </div>
  );
}
