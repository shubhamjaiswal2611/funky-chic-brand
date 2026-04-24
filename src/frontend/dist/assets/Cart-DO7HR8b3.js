import { f as useCartStore, a as useThemeStore, z as useNavigate, j as jsxRuntimeExports, S as ShoppingBag, m as motion, L as Link, B as Button, A as AnimatePresence } from "./index-vtaZNhFN.js";
import { S as Separator } from "./separator-Djd4Xkbs.js";
import { P as Package } from "./package-CtzEFHWd.js";
import { T as Trash2 } from "./trash-2-Bm2nxum4.js";
import { M as Minus } from "./minus-BewN81Z1.js";
import { P as Plus } from "./plus-AIFiaiMi.js";
function MotifAccent({ isFunky }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "100%",
      height: "24",
      viewBox: "0 0 800 24",
      preserveAspectRatio: "none",
      "aria-hidden": "true",
      role: "presentation",
      style: { display: "block" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "decorative motif" }),
        isFunky ? (
          // Graffiti-style zigzag neon
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "polyline",
            {
              points: "0,12 25,4 50,20 75,4 100,20 125,4 150,20 175,4 200,20 225,4 250,20 275,4 300,20 325,4 350,20 375,4 400,20 425,4 450,20 475,4 500,20 525,4 550,20 575,4 600,20 625,4 650,20 675,4 700,20 725,4 750,20 775,4 800,20",
              fill: "none",
              stroke: "oklch(0.88 0.3 130)",
              strokeWidth: "3",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              opacity: "0.8"
            }
          )
        ) : (
          // Chic paisley-inspired wave
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M0,12 C50,4 100,20 150,12 C200,4 250,20 300,12 C350,4 400,20 450,12 C500,4 550,20 600,12 C650,4 700,20 750,12 C775,8 787,14 800,12",
              fill: "none",
              stroke: "oklch(0.76 0.18 72)",
              strokeWidth: "2",
              strokeLinecap: "round",
              opacity: "0.6"
            }
          )
        )
      ]
    }
  );
}
function Cart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const navigate = useNavigate();
  const subtotalCents = getTotal();
  const taxCents = Math.round(subtotalCents * 0.1);
  const totalCents = subtotalCents + taxCents;
  const accentColor = isFunky ? "oklch(var(--lime))" : "oklch(var(--indigo, 0.48 0.2 273))";
  const priceColor = isFunky ? "oklch(var(--secondary))" : "oklch(var(--primary))";
  const ctaBg = isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))";
  const ctaFg = isFunky ? "oklch(0.98 0 0)" : "oklch(var(--primary-foreground))";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: { backgroundColor: "oklch(var(--background))" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "pt-10 pb-0 text-center relative overflow-hidden",
            style: { backgroundColor: "oklch(var(--card))" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 20, style: { color: accentColor } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "heading-brand text-4xl md:text-5xl",
                      style: { color: accentColor },
                      children: "YOUR CART"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 20, style: { color: accentColor } })
                ] }),
                items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "font-body text-sm mb-3",
                    style: { color: "oklch(var(--muted-foreground))" },
                    children: [
                      items.reduce((s, i) => s + i.quantity, 0),
                      " item",
                      items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : "",
                      " in your bag"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MotifAccent, { isFunky })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-10 max-w-5xl", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "flex flex-col items-center justify-center gap-6 py-20 text-center",
            "data-ocid": "cart.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-24 h-24 rounded-full flex items-center justify-center",
                  style: { backgroundColor: "oklch(var(--muted))" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Package,
                    {
                      size: 40,
                      style: { color: "oklch(var(--muted-foreground))" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-display text-2xl font-bold uppercase mb-2",
                    style: { color: "oklch(var(--foreground))" },
                    children: "Your cart is empty"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-body text-sm",
                    style: { color: "oklch(var(--muted-foreground))" },
                    children: "Discover bold pieces from global cultures — add something extraordinary."
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "cart.shop_button",
                  className: "font-body font-bold uppercase tracking-widest text-sm px-8",
                  style: { backgroundColor: ctaBg, color: ctaFg },
                  children: "Explore Collection"
                }
              ) })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-8 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              layout: true,
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, x: -30, scale: 0.95 },
              transition: { delay: i * 0.04, duration: 0.25 },
              className: "card-brand flex gap-4 p-4",
              "data-ocid": `cart.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-22 h-22 rounded-md overflow-hidden flex-shrink-0",
                    style: {
                      width: "88px",
                      height: "88px",
                      backgroundColor: "oklch(var(--muted))",
                      border: isFunky ? "2px solid oklch(var(--hotpink) / 0.3)" : "1px solid oklch(var(--border))"
                    },
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
                      className: "font-display font-bold uppercase text-sm tracking-tight leading-tight line-clamp-2",
                      style: { color: "oklch(var(--foreground))" },
                      children: item.name
                    }
                  ),
                  (item.variantSize || item.variantColor) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-body text-xs mt-1 uppercase tracking-wide",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: [item.variantSize, item.variantColor].filter(Boolean).join(" · ")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-body text-xs mt-1",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: [
                        "$",
                        (item.price / 100).toFixed(2),
                        " each"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-display font-bold text-base mt-1",
                      style: { color: priceColor },
                      children: [
                        "$",
                        (item.price * item.quantity / 100).toFixed(2)
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `cart.delete_button.${i + 1}`,
                      onClick: () => removeItem(
                        item.productId,
                        item.variantSize,
                        item.variantColor
                      ),
                      "aria-label": "Remove item",
                      className: "p-1.5 rounded transition-smooth hover:opacity-70",
                      style: { color: "oklch(var(--destructive))" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center rounded-full overflow-hidden",
                      style: { border: "1px solid oklch(var(--border))" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": `cart.decrease.${i + 1}`,
                            onClick: () => updateQuantity(
                              item.productId,
                              item.quantity - 1,
                              item.variantSize,
                              item.variantColor
                            ),
                            "aria-label": "Decrease quantity",
                            className: "w-8 h-8 flex items-center justify-center transition-smooth hover:opacity-70",
                            style: {
                              backgroundColor: "oklch(var(--muted))",
                              color: "oklch(var(--foreground))"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 12 })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-body font-semibold text-sm w-8 text-center",
                            style: { color: "oklch(var(--foreground))" },
                            children: item.quantity
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": `cart.increase.${i + 1}`,
                            onClick: () => updateQuantity(
                              item.productId,
                              item.quantity + 1,
                              item.variantSize,
                              item.variantColor
                            ),
                            "aria-label": "Increase quantity",
                            className: "w-8 h-8 flex items-center justify-center transition-smooth hover:opacity-70",
                            style: {
                              backgroundColor: "oklch(var(--muted))",
                              color: "oklch(var(--foreground))"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 })
                          }
                        )
                      ]
                    }
                  )
                ] })
              ]
            },
            `${item.productId}__${item.variantSize ?? ""}__${item.variantColor ?? ""}`
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-brand p-6 h-fit sticky top-24",
              "data-ocid": "cart.summary_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-display font-bold uppercase tracking-widest text-xs mb-4",
                    style: { color: "oklch(var(--muted-foreground))" },
                    children: "Order Summary"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex justify-between text-xs font-body",
                    style: { color: "oklch(var(--muted-foreground))" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate mr-2 flex-1", children: [
                        item.name,
                        " × ",
                        item.quantity
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-shrink-0", children: [
                        "$",
                        (item.price * item.quantity / 100).toFixed(2)
                      ] })
                    ]
                  },
                  `${item.productId}__${item.variantSize ?? ""}__${item.variantColor ?? ""}`
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex justify-between font-body text-sm",
                      style: { color: "oklch(var(--foreground))" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "$",
                          (subtotalCents / 100).toFixed(2)
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex justify-between font-body text-sm",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Est. Tax (10%)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "$",
                          (taxCents / 100).toFixed(2)
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex justify-between font-display font-bold text-xl pt-1",
                      style: { color: "oklch(var(--foreground))" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: priceColor }, children: [
                          "$",
                          (totalCents / 100).toFixed(2)
                        ] })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "cart.checkout_button",
                    onClick: () => navigate({ to: "/checkout" }),
                    className: "w-full font-body font-bold uppercase tracking-widest text-sm",
                    style: { backgroundColor: ctaBg, color: ctaFg },
                    children: "Proceed to Checkout"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    "data-ocid": "cart.continue_shopping_button",
                    className: "w-full mt-2 font-body font-semibold text-xs uppercase tracking-widest",
                    style: { color: "oklch(var(--muted-foreground))" },
                    children: "Continue Shopping"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-center text-xs mt-4 font-body",
                    style: { color: "oklch(var(--muted-foreground))" },
                    children: "🔒 Secure checkout · Free returns"
                  }
                )
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  Cart as default
};
