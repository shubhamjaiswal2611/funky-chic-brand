import { c as createLucideIcon, a as useThemeStore, u as useBackend, f as useCartStore, G as useSearch, r as reactExports, b as useQuery, j as jsxRuntimeExports, m as motion, L as Link, B as Button, S as ShoppingBag } from "./index-vtaZNhFN.js";
import { S as Separator } from "./separator-Djd4Xkbs.js";
import { S as Skeleton } from "./skeleton-CpEEvU_U.js";
import { R as RefreshCw } from "./refresh-cw-DuGgTKyw.js";
import { P as Package } from "./package-CtzEFHWd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
function MandalaDecor({ isFunky }) {
  const c1 = isFunky ? "oklch(0.88 0.3 130)" : "oklch(0.76 0.18 72)";
  const c2 = isFunky ? "oklch(0.6 0.32 330)" : "oklch(0.48 0.2 273)";
  const c3 = isFunky ? "oklch(0.65 0.28 210)" : "oklch(0.54 0.24 22)";
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "120",
      height: "120",
      viewBox: "0 0 120 120",
      "aria-hidden": "true",
      role: "presentation",
      className: "mx-auto mb-4 opacity-60",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "mandala decoration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "60", cy: "60", r: "8", fill: c1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "60",
            cy: "60",
            r: "16",
            fill: "none",
            stroke: c2,
            strokeWidth: "1.5",
            strokeDasharray: "4 3"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "60",
            cy: "60",
            r: "26",
            fill: "none",
            stroke: c3,
            strokeWidth: "1",
            strokeDasharray: "2 4"
          }
        ),
        angles.map((a) => {
          const rad = a * Math.PI / 180;
          const x1 = 60 + 18 * Math.cos(rad);
          const y1 = 60 + 18 * Math.sin(rad);
          const x2 = 60 + 38 * Math.cos(rad);
          const y2 = 60 + 38 * Math.sin(rad);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1,
              y1,
              x2,
              y2,
              stroke: a % 90 === 0 ? c1 : c2,
              strokeWidth: a % 90 === 0 ? 2 : 1
            },
            a
          );
        }),
        angles.map((a) => {
          const rad = a * Math.PI / 180;
          const cx = 60 + 38 * Math.cos(rad);
          const cy = 60 + 38 * Math.sin(rad);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx, cy, r: "3", fill: a % 90 === 0 ? c1 : c3 }, a);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "60",
            cy: "60",
            r: "52",
            fill: "none",
            stroke: c1,
            strokeWidth: "0.5",
            opacity: "0.4"
          }
        )
      ]
    }
  );
}
function OrderConfirmation() {
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const { actor } = useBackend();
  const { clearCart } = useCartStore();
  const search = useSearch({ strict: false });
  const orderId = search.orderId;
  const stripeSessionId = search.session_id;
  const accentColor = isFunky ? "oklch(var(--lime))" : "oklch(0.48 0.2 273)";
  const priceColor = isFunky ? "oklch(var(--secondary))" : "oklch(var(--primary))";
  const ctaBg = isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))";
  const ctaFg = isFunky ? "oklch(0.98 0 0)" : "oklch(var(--primary-foreground))";
  const [savedItems] = reactExports.useState(() => {
    try {
      const raw = sessionStorage.getItem("checkout_items");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [savedShipping] = reactExports.useState(() => {
    try {
      const raw = sessionStorage.getItem("checkout_shipping");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [savedTotalCents] = reactExports.useState(() => {
    const raw = sessionStorage.getItem("checkout_total_cents");
    return raw ? Number(raw) : 0;
  });
  const [confirmState, setConfirmState] = reactExports.useState(
    stripeSessionId ? "polling" : orderId ? "success" : "loading"
  );
  const [finalOrderId, setFinalOrderId] = reactExports.useState(orderId ?? "");
  const placeOrderCalledRef = reactExports.useRef(false);
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
            variantColor: item.variantColor
          }));
          const shipping = savedShipping ?? {
            name: "Guest",
            line1: "N/A",
            city: "N/A",
            state: "N/A",
            postalCode: "00000",
            country: "US"
          };
          const newOrderId = await actor.placeOrder(
            orderItems,
            BigInt(savedTotalCents),
            shipping,
            stripeSessionId
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
      return status;
    },
    enabled: !!actor && !!stripeSessionId && confirmState === "polling",
    refetchInterval: 2e3,
    refetchIntervalInBackground: false
  });
  reactExports.useEffect(() => {
    if (!stripeSessionId && !orderId) {
      setConfirmState("failed");
    }
  }, [stripeSessionId, orderId]);
  const displayItems = savedItems.length > 0 ? savedItems : [];
  const displayTotal = savedTotalCents > 0 ? savedTotalCents : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen flex items-start justify-center pt-12 pb-16",
      style: { backgroundColor: "oklch(var(--background))" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl mx-4", children: [
        (confirmState === "polling" || confirmState === "loading") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "card-brand p-10 text-center",
            "data-ocid": "order_confirmation.loading_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  size: 48,
                  className: "animate-spin",
                  style: { color: accentColor }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "heading-brand text-3xl mb-3",
                  style: { color: "oklch(var(--foreground))" },
                  children: confirmState === "polling" ? "CONFIRMING PAYMENT" : "PLACING YOUR ORDER"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-body text-sm",
                  style: { color: "oklch(var(--muted-foreground))" },
                  children: "Please wait while we verify your payment and place your order…"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4 mx-auto" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2 mx-auto" })
              ] })
            ]
          }
        ),
        confirmState === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            className: "card-brand p-10 text-center",
            "data-ocid": "order_confirmation.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleX,
                {
                  size: 64,
                  className: "mx-auto mb-6",
                  style: { color: "oklch(var(--destructive))" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "heading-brand text-3xl mb-4",
                  style: { color: "oklch(var(--foreground))" },
                  children: "PAYMENT FAILED"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-body text-sm mb-6",
                  style: { color: "oklch(var(--muted-foreground))" },
                  children: "We couldn't process your order. Your cart is still saved — please try again."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "order_confirmation.retry_button",
                    className: "font-body font-bold uppercase tracking-widest text-sm",
                    style: { backgroundColor: ctaBg, color: ctaFg },
                    children: "Try Again"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    "data-ocid": "order_confirmation.cart_button",
                    className: "font-body font-semibold text-xs uppercase tracking-widest",
                    children: "Back to Cart"
                  }
                ) })
              ] })
            ]
          }
        ),
        confirmState === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            "data-ocid": "order_confirmation.success_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "card-brand p-8 text-center mb-4",
                  style: {
                    borderBottom: isFunky ? "3px solid oklch(var(--lime))" : "2px solid oklch(0.76 0.18 72)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MandalaDecor, { isFunky }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CircleCheck,
                      {
                        size: 56,
                        className: "mx-auto mb-4",
                        style: {
                          color: isFunky ? "oklch(var(--secondary))" : "oklch(0.6 0.2 165)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h1",
                      {
                        className: "heading-brand text-3xl md:text-4xl mb-3",
                        style: { color: "oklch(var(--foreground))" },
                        children: "ORDER CONFIRMED!"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-body text-base leading-relaxed max-w-md mx-auto",
                        style: { color: "oklch(var(--muted-foreground))" },
                        children: "Thank you for shopping with us! Your bold style choice is on its way. We've received your order and will ship it soon. ✨"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-brand p-6 mb-4", children: [
                finalOrderId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between p-3 rounded-md mb-4",
                    style: { backgroundColor: "oklch(var(--muted))" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-body text-xs uppercase tracking-widest",
                          style: { color: "oklch(var(--muted-foreground))" },
                          children: "Order ID"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-mono text-sm font-bold",
                          style: { color: accentColor },
                          "data-ocid": "order_confirmation.order_id",
                          children: finalOrderId.length > 16 ? `${finalOrderId.slice(0, 8)}…${finalOrderId.slice(-8)}` : finalOrderId
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3 p-3 rounded-md mb-4",
                    style: { backgroundColor: "oklch(var(--muted))" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Clock,
                        {
                          size: 16,
                          style: { color: accentColor, flexShrink: 0 }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-body text-xs uppercase tracking-wide font-semibold",
                            style: { color: "oklch(var(--foreground))" },
                            children: "Estimated Delivery"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-body text-sm",
                            style: { color: "oklch(var(--muted-foreground))" },
                            children: "5–10 business days · International shipping available"
                          }
                        )
                      ] })
                    ]
                  }
                ),
                displayItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "font-display font-bold uppercase tracking-widest text-xs mb-3",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: "Items Ordered"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-4", children: displayItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, x: -10 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: 0.3 + i * 0.08 },
                      className: "flex gap-3 items-center",
                      "data-ocid": `order_confirmation.item.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-12 h-12 rounded overflow-hidden flex-shrink-0",
                            style: { backgroundColor: "oklch(var(--muted))" },
                            children: item.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: item.imageUrl,
                                alt: item.name,
                                className: "w-full h-full object-cover"
                              }
                            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full pattern-block-print" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "font-body text-sm font-semibold truncate",
                              style: { color: "oklch(var(--foreground))" },
                              children: item.name
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: "font-body text-xs",
                              style: { color: "oklch(var(--muted-foreground))" },
                              children: [
                                [item.variantSize, item.variantColor].filter(Boolean).join(" · ") ? [item.variantSize, item.variantColor].filter(Boolean).join(" · ") : null,
                                " ",
                                "Qty: ",
                                item.quantity
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "font-body text-sm font-bold flex-shrink-0",
                            style: { color: priceColor },
                            children: [
                              "$",
                              (item.price * item.quantity / 100).toFixed(2)
                            ]
                          }
                        )
                      ]
                    },
                    `${item.productId}__${item.variantSize ?? ""}__${item.variantColor ?? ""}`
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex justify-between font-display font-bold text-xl",
                      style: { color: "oklch(var(--foreground))" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Paid" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: priceColor }, children: [
                          "$",
                          (displayTotal / 100).toFixed(2)
                        ] })
                      ]
                    }
                  )
                ] })
              ] }),
              savedShipping && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-brand p-6 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h3",
                  {
                    className: "font-display font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2",
                    style: { color: "oklch(var(--muted-foreground))" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 14 }),
                      "Shipping To"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-body text-sm",
                    style: { color: "oklch(var(--foreground))" },
                    children: savedShipping.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "font-body text-sm",
                    style: { color: "oklch(var(--muted-foreground))" },
                    children: [
                      savedShipping.line1,
                      savedShipping.line2 ? `, ${savedShipping.line2}` : ""
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "font-body text-sm",
                    style: { color: "oklch(var(--muted-foreground))" },
                    children: [
                      savedShipping.city,
                      ", ",
                      savedShipping.state,
                      " ",
                      savedShipping.postalCode
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-body text-sm",
                    style: { color: "oklch(var(--muted-foreground))" },
                    children: savedShipping.country
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": "order_confirmation.shop_button",
                    className: "w-full font-body font-bold uppercase tracking-widest text-sm h-12",
                    style: { backgroundColor: ctaBg, color: ctaFg },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 16, className: "mr-2" }),
                      "Continue Shopping"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    "data-ocid": "order_confirmation.home_button",
                    className: "font-body font-semibold text-xs uppercase tracking-widest h-12 px-6",
                    children: "Back to Home"
                  }
                ) })
              ] })
            ]
          }
        )
      ] })
    }
  );
}
export {
  OrderConfirmation as default
};
