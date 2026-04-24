import { d as useParams, u as useBackend, a as useThemeStore, e as useAuth, f as useCartStore, g as useWishlistStore, r as reactExports, b as useQuery, j as jsxRuntimeExports, L as Link, B as Button, m as motion, S as ShoppingBag, h as Badge, H as Heart, i as ue } from "./index-vtaZNhFN.js";
import { S as Skeleton } from "./skeleton-CpEEvU_U.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent, P as ProductCard } from "./ProductCard-DkQ5i3QS.js";
import { A as ArrowLeft } from "./arrow-left-D0f2sd0y.js";
import { M as Minus } from "./minus-BewN81Z1.js";
import { P as Plus } from "./plus-AIFiaiMi.js";
const CATEGORY_COLORS = {
  Apparel: {
    backgroundColor: "oklch(0.6 0.32 330 / 0.15)",
    color: "oklch(0.6 0.32 330)"
  },
  Accessories: {
    backgroundColor: "oklch(0.88 0.3 130 / 0.15)",
    color: "oklch(0.88 0.3 130)"
  },
  Lifestyle: {
    backgroundColor: "oklch(0.65 0.28 210 / 0.15)",
    color: "oklch(0.65 0.28 210)"
  },
  "Fusion Art": {
    backgroundColor: "oklch(0.76 0.18 72 / 0.15)",
    color: "oklch(0.76 0.18 72)"
  }
};
function PaisleyDecor({
  className = "",
  style
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 100 160",
      className,
      style,
      "aria-hidden": "true",
      focusable: "false",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Decorative paisley" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "currentColor", opacity: "0.7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M50 10 C70 10 85 30 80 55 C75 80 55 90 50 120 C45 90 25 80 20 55 C15 30 30 10 50 10Z" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M50 20 C65 20 75 35 72 55 C69 75 55 85 50 110 C45 85 31 75 28 55 C25 35 35 20 50 20Z",
              fill: "none",
              stroke: "oklch(var(--background))",
              strokeWidth: "1.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "140", r: "8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "50",
              cy: "135",
              r: "4",
              fill: "none",
              stroke: "oklch(var(--background))",
              strokeWidth: "1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M46 10 C30 5 20 18 26 28 C32 38 46 32 50 10Z" })
        ] })
      ]
    }
  );
}
function MandalaDecor({
  className = "",
  style
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 200 200",
      className,
      style,
      "aria-hidden": "true",
      focusable: "false",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Decorative mandala" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "g",
          {
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "0.8",
            opacity: "0.6",
            transform: "translate(100,100)",
            children: [
              [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: `rotate(${deg})`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "0", y1: "0", x2: "0", y2: "-82" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "0", cy: "-52", rx: "8", ry: "14" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "0", cy: "-26", r: "4", fill: "currentColor", opacity: "0.3" })
              ] }, deg)),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: "16" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: "36", strokeDasharray: "4 4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: "60", strokeDasharray: "2 6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: "80" })
            ]
          }
        )
      ]
    }
  );
}
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28 mb-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-1/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-14" }, i)
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" })
      ] })
    ] })
  ] });
}
function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const { actor, isFetching: actorFetching } = useBackend();
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const { isAuthenticated } = useAuth();
  const { addItem: addToCart } = useCartStore();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist
  } = useWishlistStore();
  const [selectedSize, setSelectedSize] = reactExports.useState();
  const [selectedColor, setSelectedColor] = reactExports.useState();
  const [quantity, setQuantity] = reactExports.useState(1);
  const [imgError, setImgError] = reactExports.useState(false);
  const { data: allProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !actorFetching
  });
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !actorFetching && !!id
  });
  if (isLoading || actorFetching) return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-20 text-center",
        "data-ocid": "product_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MandalaDecor,
            {
              className: "w-20 h-20 mx-auto mb-5 opacity-20",
              style: { color: "oklch(var(--muted-foreground))" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-display text-2xl font-bold uppercase mb-2",
              style: { color: "oklch(var(--foreground))" },
              children: "Product not found"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body text-sm mb-6",
              style: { color: "oklch(var(--muted-foreground))" },
              children: "This item may have sold out or been removed."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "font-body font-bold uppercase tracking-widest text-sm",
              style: {
                backgroundColor: "oklch(var(--primary))",
                color: "oklch(var(--primary-foreground))"
              },
              children: "Back to Shop"
            }
          ) })
        ]
      }
    );
  }
  const priceDisplay = `$${(Number(product.price) / 100).toFixed(0)}`;
  const sizes = [
    ...new Set(
      product.variants.filter((v) => v.size).map((v) => v.size)
    )
  ];
  const colors = [
    ...new Set(
      product.variants.filter((v) => v.color).map((v) => v.color)
    )
  ];
  const wishlisted = isInWishlist(product.id);
  const inStock = Number(product.stockQuantity) > 0;
  const categoryStyle = CATEGORY_COLORS[product.category] ?? CATEGORY_COLORS.Apparel;
  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      imageUrl: product.imageUrl,
      variantSize: selectedSize,
      variantColor: selectedColor,
      quantity
    });
    ue.success(`${product.name} added to cart!`, {
      description: `Qty: ${quantity}`
    });
  };
  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      ue.info("Login to save to wishlist");
      return;
    }
    if (wishlisted) {
      removeFromWishlist(product.id);
      ue.info("Removed from wishlist");
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        category: product.category
      });
      ue.success("Added to wishlist!");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen",
      style: { backgroundColor: "oklch(var(--background))" },
      "data-ocid": "product_detail.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/products",
            "data-ocid": "product_detail.back_link",
            className: "inline-flex items-center gap-2 mb-8 font-body text-sm transition-smooth hover:opacity-70",
            style: { color: "oklch(var(--muted-foreground))" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
              " Back to Shop"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 lg:gap-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -30 },
              animate: { opacity: 1, x: 0 },
              className: "relative",
              children: [
                isFunky && inStock && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute -inset-1 rounded-xl -z-10",
                    style: {
                      background: "linear-gradient(135deg, oklch(var(--hotpink)), oklch(var(--neonblue)), oklch(var(--lime)))"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden aspect-square bg-muted", children: [
                  !imgError && product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: product.imageUrl,
                      alt: product.name,
                      className: "w-full h-full object-cover",
                      onError: () => setImgError(true)
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex items-center justify-center pattern-paisley relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ShoppingBag,
                      {
                        size: 60,
                        style: { color: "oklch(var(--muted-foreground) / 0.3)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      PaisleyDecor,
                      {
                        className: "absolute top-6 left-6 w-12 h-20 opacity-30 rotate-12",
                        style: {
                          color: isFunky ? "oklch(var(--hotpink))" : "oklch(var(--secondary))"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      PaisleyDecor,
                      {
                        className: "absolute bottom-6 right-6 w-10 h-16 opacity-25 -rotate-20",
                        style: {
                          color: isFunky ? "oklch(var(--lime))" : "oklch(var(--primary))"
                        }
                      }
                    )
                  ] }),
                  !inStock && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 flex items-center justify-center",
                      style: { backgroundColor: "oklch(var(--background) / 0.75)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-display text-3xl font-black uppercase tracking-wider",
                          style: { color: "oklch(var(--destructive))" },
                          children: "Sold Out"
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MandalaDecor,
                  {
                    className: "absolute -bottom-8 -right-8 w-32 h-32 pointer-events-none -z-10 opacity-30",
                    style: {
                      color: isFunky ? "oklch(var(--lime))" : "oklch(var(--secondary))"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 30 },
              animate: { opacity: 1, x: 0 },
              className: "flex flex-col gap-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: "text-xs uppercase tracking-wider border-0 font-body font-semibold",
                      style: categoryStyle,
                      children: product.category
                    }
                  ),
                  inStock && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-body text-xs",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: [
                        Number(product.stockQuantity),
                        " in stock"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "heading-brand text-3xl md:text-4xl lg:text-5xl",
                    style: { color: "oklch(var(--foreground))" },
                    children: product.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-display text-4xl font-black",
                      style: {
                        color: isFunky ? "oklch(var(--secondary))" : "oklch(var(--primary))",
                        textShadow: isFunky ? "0 0 20px oklch(var(--secondary) / 0.4)" : "none"
                      },
                      children: priceDisplay
                    }
                  ),
                  isFunky && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-body text-xs uppercase tracking-wider px-2 py-1 rounded",
                      style: {
                        backgroundColor: "oklch(var(--lime) / 0.15)",
                        color: "oklch(var(--lime))"
                      },
                      children: "Free Shipping"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-body text-sm leading-relaxed",
                    style: { color: "oklch(var(--muted-foreground))" },
                    children: product.description
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-px",
                    style: {
                      background: isFunky ? "linear-gradient(90deg, oklch(var(--hotpink)), oklch(var(--neonblue)), transparent)" : "oklch(var(--border))"
                    }
                  }
                ),
                sizes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-body font-semibold text-xs uppercase tracking-widest mb-3",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: "Size"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex flex-wrap gap-2",
                      "data-ocid": "product_detail.size_selector",
                      children: sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `product_detail.size.${size}`,
                          onClick: () => setSelectedSize(
                            size === selectedSize ? void 0 : size
                          ),
                          className: "min-w-[44px] h-10 px-4 rounded-md text-sm font-body font-semibold uppercase tracking-wider border transition-smooth",
                          style: selectedSize === size ? {
                            backgroundColor: isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))",
                            color: "oklch(var(--primary-foreground))",
                            borderColor: isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))",
                            boxShadow: isFunky ? "2px 2px 0 oklch(var(--lime))" : "none"
                          } : {
                            backgroundColor: "transparent",
                            borderColor: "oklch(var(--border))",
                            color: "oklch(var(--foreground))"
                          },
                          children: size
                        },
                        size
                      ))
                    }
                  )
                ] }),
                colors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-body font-semibold text-xs uppercase tracking-widest mb-3",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: "Color"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex flex-wrap gap-2",
                      "data-ocid": "product_detail.color_selector",
                      children: colors.map((color) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `product_detail.color.${color.toLowerCase()}`,
                          onClick: () => setSelectedColor(
                            color === selectedColor ? void 0 : color
                          ),
                          className: "px-4 h-10 rounded-md text-sm font-body font-semibold tracking-wider border transition-smooth",
                          style: selectedColor === color ? {
                            backgroundColor: isFunky ? "oklch(var(--neonblue))" : "oklch(var(--primary))",
                            color: "oklch(var(--primary-foreground))",
                            borderColor: isFunky ? "oklch(var(--neonblue))" : "oklch(var(--primary))",
                            boxShadow: isFunky ? "2px 2px 0 oklch(var(--hotpink))" : "none"
                          } : {
                            backgroundColor: "transparent",
                            borderColor: "oklch(var(--border))",
                            color: "oklch(var(--foreground))"
                          },
                          children: color
                        },
                        color
                      ))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-body font-semibold text-xs uppercase tracking-widest mb-3",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: "Quantity"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-1",
                      "data-ocid": "product_detail.quantity_selector",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "product_detail.quantity_minus",
                            onClick: () => setQuantity((q) => Math.max(1, q - 1)),
                            disabled: quantity <= 1,
                            "aria-label": "Decrease quantity",
                            className: "w-10 h-10 rounded-md border flex items-center justify-center transition-smooth disabled:opacity-40",
                            style: {
                              borderColor: "oklch(var(--border))",
                              color: "oklch(var(--foreground))"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14 })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-12 text-center font-display font-bold text-lg",
                            style: { color: "oklch(var(--foreground))" },
                            children: quantity
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "product_detail.quantity_plus",
                            onClick: () => setQuantity((q) => Math.min(10, q + 1)),
                            disabled: quantity >= 10 || quantity >= Number(product.stockQuantity),
                            "aria-label": "Increase quantity",
                            className: "w-10 h-10 rounded-md border flex items-center justify-center transition-smooth disabled:opacity-40",
                            style: {
                              borderColor: "oklch(var(--border))",
                              color: "oklch(var(--foreground))"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 })
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      "data-ocid": "product_detail.add_to_cart_button",
                      onClick: handleAddToCart,
                      disabled: !inStock,
                      className: "flex-1 font-body font-bold uppercase tracking-widest text-sm h-12 transition-smooth",
                      style: inStock ? {
                        backgroundColor: isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))",
                        color: "oklch(var(--primary-foreground))",
                        boxShadow: isFunky ? "4px 4px 0 oklch(var(--lime))" : "none"
                      } : {},
                      children: inStock ? `Add ${quantity > 1 ? `${quantity}x ` : ""}to Cart` : "Out of Stock"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        size: "icon",
                        "data-ocid": "product_detail.wishlist_toggle",
                        onClick: handleWishlistToggle,
                        "aria-label": wishlisted ? "Remove from wishlist" : "Add to wishlist",
                        className: "h-12 w-12 transition-smooth",
                        style: {
                          borderColor: wishlisted ? "oklch(var(--destructive))" : "oklch(var(--border))",
                          color: wishlisted ? "oklch(var(--destructive))" : "oklch(var(--muted-foreground))",
                          boxShadow: isFunky && wishlisted ? "2px 2px 0 oklch(var(--hotpink))" : "none"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Heart,
                          {
                            size: 18,
                            fill: wishlisted ? "currentColor" : "none"
                          }
                        )
                      }
                    ) }),
                    !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Login to save to wishlist" }) })
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4 pt-2", children: ["Free Returns", "Ethically Made", "Ships in 2-3 Days"].map(
                  (badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-body text-xs flex items-center gap-1",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              color: isFunky ? "oklch(var(--lime))" : "oklch(var(--secondary))"
                            },
                            children: "✓"
                          }
                        ),
                        badge
                      ]
                    },
                    badge
                  )
                ) })
              ]
            }
          )
        ] }),
        related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-20", "data-ocid": "product_detail.related_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-8 flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-px flex-1",
                style: { backgroundColor: "oklch(var(--border))" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "heading-brand text-xl md:text-2xl shrink-0",
                style: {
                  color: isFunky ? "oklch(var(--lime))" : "oklch(var(--foreground))",
                  textShadow: isFunky ? "0 0 20px oklch(var(--lime) / 0.4)" : "none"
                },
                children: isFunky ? "⚡ YOU MIGHT ALSO WANT ⚡" : "You May Also Like"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-px flex-1",
                style: { backgroundColor: "oklch(var(--border))" }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: related.map((relatedProduct, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/product/$id",
              params: { id: relatedProduct.id },
              "data-ocid": `product_detail.related.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.08 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: relatedProduct, index: i })
                }
              )
            },
            relatedProduct.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-16 py-8 rounded-xl relative overflow-hidden pattern-paisley flex items-center justify-center",
            style: {
              backgroundColor: isFunky ? "oklch(var(--card))" : "oklch(var(--muted) / 0.4)",
              border: isFunky ? "2px solid oklch(var(--hotpink) / 0.4)" : "1px solid oklch(var(--border))"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PaisleyDecor,
                {
                  className: "absolute left-4 top-1/2 -translate-y-1/2 w-10 h-16 opacity-30",
                  style: {
                    color: isFunky ? "oklch(var(--lime))" : "oklch(var(--secondary))"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PaisleyDecor,
                {
                  className: "absolute right-4 top-1/2 -translate-y-1/2 w-10 h-16 opacity-30 scale-x-[-1]",
                  style: {
                    color: isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "heading-brand text-sm tracking-[0.3em] text-center",
                  style: {
                    color: isFunky ? "oklch(var(--neonblue))" : "oklch(var(--muted-foreground))"
                  },
                  children: isFunky ? "⚡ HANDCRAFTED · GLOBALLY SOURCED · STREET CERTIFIED ⚡" : "Handcrafted · Globally Sourced · Ethically Made"
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
export {
  ProductDetail as default
};
