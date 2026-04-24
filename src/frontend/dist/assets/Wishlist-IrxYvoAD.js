import { e as useAuth, j as jsxRuntimeExports, N as Navigate, g as useWishlistStore, f as useCartStore, a as useThemeStore, H as Heart, m as motion, L as Link, B as Button, A as AnimatePresence, S as ShoppingBag, i as ue } from "./index-vtaZNhFN.js";
import { T as Trash2 } from "./trash-2-Bm2nxum4.js";
function ProtectedRoute({
  children,
  redirectTo = "/login"
}) {
  const { isAuthenticated, isInitializing } = useAuth();
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center min-h-[60vh]",
        "data-ocid": "protected.loading_state",
        style: { color: "oklch(var(--muted-foreground))" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-3",
              style: { borderColor: "oklch(var(--primary))" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm", children: "Loading…" })
        ] })
      }
    );
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: redirectTo });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
function BlockPrintHeader({ isFunky }) {
  const c1 = isFunky ? "oklch(0.88 0.3 130 / 0.25)" : "oklch(0.76 0.18 72 / 0.18)";
  const c2 = isFunky ? "oklch(0.6 0.32 330 / 0.2)" : "oklch(0.48 0.2 273 / 0.12)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "100%",
      height: "48",
      viewBox: "0 0 800 48",
      preserveAspectRatio: "xMidYMid slice",
      className: "absolute inset-0 w-full h-full pointer-events-none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Block print decoration" }),
        Array.from({ length: 16 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: `translate(${i * 52} 0)`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "26", cy: "12", rx: "10", ry: "6", fill: c1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "26", cy: "28", rx: "6", ry: "10", fill: c2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "26", cy: "40", r: "3", fill: c1 })
        ] }, `bp-${i * 52}`))
      ]
    }
  );
}
function WishlistCard({
  item,
  index,
  isFunky,
  onRemove,
  onAddToCart
}) {
  const priceDisplay = `$${(item.price / 100).toFixed(0)}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      layout: true,
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.35, delay: index * 0.07 },
      className: "card-brand group flex flex-col overflow-hidden",
      "data-ocid": `wishlist.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] bg-muted overflow-hidden", children: [
          item.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.imageUrl,
              alt: item.name,
              className: "w-full h-full object-cover transition-smooth group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full h-full flex items-center justify-center pattern-block-print",
              style: { backgroundColor: "oklch(var(--muted))" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ShoppingBag,
                {
                  size: 36,
                  style: { color: "oklch(var(--muted-foreground) / 0.4)" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": `Remove ${item.name} from wishlist`,
              "data-ocid": `wishlist.delete_button.${index + 1}`,
              onClick: () => onRemove(item.productId),
              className: "absolute top-2 right-2 p-2 rounded-full transition-smooth opacity-0 group-hover:opacity-100",
              style: {
                backgroundColor: "oklch(var(--destructive))",
                color: "oklch(var(--destructive-foreground))"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs font-body font-bold uppercase tracking-wider",
              style: {
                backgroundColor: isFunky ? "oklch(0.88 0.3 130 / 0.2)" : "oklch(var(--secondary) / 0.15)",
                color: isFunky ? "oklch(var(--lime))" : "oklch(var(--secondary))"
              },
              children: item.category
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-4 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-display font-bold text-base uppercase tracking-tight leading-tight line-clamp-2 min-w-0",
                style: { color: "oklch(var(--foreground))" },
                children: item.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-display font-bold text-lg shrink-0",
                style: {
                  color: isFunky ? "oklch(var(--lime))" : "oklch(var(--primary))"
                },
                children: priceDisplay
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": `wishlist.add_to_cart.${index + 1}`,
                onClick: () => onAddToCart(item),
                className: "flex-1 font-body font-bold uppercase tracking-widest text-xs transition-smooth",
                style: {
                  backgroundColor: isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))",
                  color: isFunky ? "oklch(0.98 0 0)" : "oklch(var(--primary-foreground))",
                  boxShadow: isFunky ? "0 0 16px oklch(0.6 0.32 330 / 0.35)" : "none"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 13, className: "mr-1.5" }),
                  "Add to Cart"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                "data-ocid": `wishlist.remove_button.${index + 1}`,
                onClick: () => onRemove(item.productId),
                "aria-label": `Remove ${item.name}`,
                className: "px-3 transition-smooth border-border",
                style: {
                  color: "oklch(var(--destructive))",
                  borderColor: "oklch(var(--destructive) / 0.4)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function WishlistContent() {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const handleRemove = (productId) => {
    removeItem(productId);
    ue.info("Removed from wishlist");
  };
  const handleAddToCart = (item) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl
    });
    ue.success(`${item.name} added to cart!`);
  };
  const accentColor = isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "wishlist.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative overflow-hidden py-10 px-4 sm:px-8 border-b border-border",
        style: { backgroundColor: "oklch(var(--card))" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BlockPrintHeader, { isFunky }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-6xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Heart,
                {
                  size: 28,
                  fill: "currentColor",
                  style: { color: accentColor }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "heading-brand text-3xl md:text-5xl",
                  style: { color: "oklch(var(--foreground))" },
                  children: isFunky ? "YOUR FIRE LIST" : "YOUR WISHLIST"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-body text-sm",
                style: { color: "oklch(var(--muted-foreground))" },
                children: items.length === 0 ? "Nothing saved yet — start exploring." : `${items.length} item${items.length !== 1 ? "s" : ""} saved`
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-8 py-10", children: items.length === 0 ? (
      // Empty state
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "flex flex-col items-center justify-center text-center py-24 gap-6",
          "data-ocid": "wishlist.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-24 h-24 rounded-full flex items-center justify-center pattern-mandala",
                style: { backgroundColor: "oklch(var(--muted))" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Heart,
                  {
                    size: 40,
                    style: { color: "oklch(var(--muted-foreground) / 0.5)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "heading-brand text-2xl md:text-3xl mb-3",
                  style: { color: "oklch(var(--foreground))" },
                  children: isFunky ? "NOTHING HERE YET." : "Your Wishlist is Empty"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-body text-sm max-w-xs mx-auto",
                  style: { color: "oklch(var(--muted-foreground))" },
                  children: isFunky ? "Find something loud, bold, and undeniably you." : "Discover pieces that speak to your style and save them here."
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", "data-ocid": "wishlist.go_shopping_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "font-body font-bold uppercase tracking-widest text-sm px-8 py-5 transition-smooth",
                style: {
                  backgroundColor: accentColor,
                  color: isFunky ? "oklch(0.98 0 0)" : "oklch(var(--primary-foreground))",
                  boxShadow: isFunky ? "0 0 24px oklch(0.6 0.32 330 / 0.4)" : "none"
                },
                children: isFunky ? "SHOP THE DROP →" : "Browse Collection"
              }
            ) })
          ]
        }
      )
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "font-body text-sm font-medium",
            style: { color: "oklch(var(--muted-foreground))" },
            children: [
              items.length,
              " saved item",
              items.length !== 1 ? "s" : ""
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            "data-ocid": "wishlist.continue_shopping_link",
            className: "font-body font-bold uppercase tracking-widest text-xs border-border transition-smooth",
            children: "Continue Shopping"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        WishlistCard,
        {
          item,
          index,
          isFunky,
          onRemove: handleRemove,
          onAddToCart: handleAddToCart
        },
        item.productId
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          className: "mt-14 text-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", "data-ocid": "wishlist.discover_more_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "font-body font-bold uppercase tracking-widest text-sm px-10 py-5 transition-smooth",
              style: {
                backgroundColor: accentColor,
                color: isFunky ? "oklch(0.98 0 0)" : "oklch(var(--primary-foreground))",
                boxShadow: isFunky ? "0 0 28px oklch(0.6 0.32 330 / 0.35)" : "none"
              },
              children: isFunky ? "DISCOVER MORE →" : "Discover More Pieces"
            }
          ) })
        }
      )
    ] }) })
  ] });
}
function Wishlist() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { redirectTo: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WishlistContent, {}) });
}
export {
  Wishlist as default
};
